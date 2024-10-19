const fs = require("fs");
const path = require("path");
const zlib = require("zlib");
const crypto = require("crypto");

const command = process.argv[2];
console.log(command)

switch (command) {
  case "init":
    createGitDirectory();
    break;
// this command is used to know the content from the hash: 
// git cat-file -p <blob_hash>
  case "cat-file":
		const hash = process.argv[4];
		catFile(hash);
		break;
// this command is used to create blob object
// git hash-object -w test.txt
	case "hash-object":
		process.stdout.write(hashObject(process.argv[4]));
		break;
// this command create the tree object
	case "ls-tree":
		lsTree();
		break;
// write tree object
	case "write-tree":
		process.stdout.write(writeTree(process.cwd()));
		break;
// create commit object
	case "commit-tree":
		const tag = process.argv[4];
		if(tag==="-m") {
			process.stdout.write(commitTree("", process.argv[5]));
		}
		else if(tag=="-p") {
			process.stdout.write(commitTree(process.argv[5], process.argv[7]));
		}
	break;
  default:
    throw new Error(`Unknown command ${command}`);
}

function createGitDirectory() {
  fs.mkdirSync(path.join(process.cwd(), ".git"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "objects"), { recursive: true });
  fs.mkdirSync(path.join(process.cwd(), ".git", "refs"), { recursive: true });

  fs.writeFileSync(path.join(process.cwd(), ".git", "HEAD"), "ref: refs/heads/main\n");
  process.stdout.write("Initialized git directory");
}

function catFile(hash) {
  const content = fs.readFileSync(path.join(process.cwd(), ".git", "objects", hash.slice(0, 2), hash.slice(2)));
  const dataUnzipped = zlib.inflateSync(content);
  const res = dataUnzipped.toString().split('\0')[1];
  process.stdout.write(res);
}

function hashObject(file) {
	const content = fs.readFileSync(file);
	const header = `blob ${content.length}\x00`;
	const data = header + content;
	const hash = crypto.createHash("sha1").update(data).digest("hex");
	const objectsDirPath = path.join(__dirname, ".git", "objects");
	const hashDirPath = path.join(objectsDirPath, hash.slice(0, 2));
	const filePath = path.join(hashDirPath, hash.slice(2));
	fs.mkdirSync(hashDirPath, { recursive: true });
	fs.writeFileSync(filePath, zlib.deflateSync(data));
	return hash;
}

function lsTree() {
	const hash = process.argv[process.argv.length-1];
	if(process.argv[3]==="--name-only") {
		const data = fs.readFileSync(path.join(".git", "objects", hash.slice(0, 2), hash.slice(2)));
		const dataUnzipped = zlib.inflateSync(data).toString().split('\0');
		const content = dataUnzipped.slice(1).filter(value => value.includes(" "));
        const names = content.map(value => value.split(" ")[1]);
        names.forEach((name) => process.stdout.write(`${name}\n`));
	}
}

function writeTree(directoryPath) {
	const entries = [];
	const files = fs.readdirSync(directoryPath).filter((file)=> file!==".git" && file!=="main.js" && file!=="compile.sh" && file!=="run.sh" && file!=="your_program.sh" && file!==".codecrafters" && file!=="tempCodeRunnerFile.js");
	
	files.forEach(file => {
		const filePath = path.join(directoryPath, file);
		const stats = fs.statSync(filePath);
		
		if (stats.isDirectory()) {
			entries.push({
				mode: 40000,
				name: file,
				hash: writeTree(filePath)
			})
		} else if (stats.isFile()) {
			entries.push({
				mode: 100644,
				name: file,
				hash: hashObject(filePath)
			})
		}
	});

	const treeData = entries.reduce((acc,{mode,name,hash}) => {
		return Buffer.concat([
			acc,
			Buffer.from(`${mode} ${name}\0`),
			Buffer.from(hash, "hex"),
		])
	},Buffer.alloc(0));

	const tree = Buffer.concat([
		Buffer.from(`tree ${treeData.length}\0`),
		treeData
	])

	const data = zlib.deflateSync(tree);
	const treeHash = crypto.createHash("sha1").update(data).digest("hex");
	fs.mkdirSync(path.resolve(directoryPath,".git","objects",treeHash.slice(0, 2)),{ recursive: true});
	fs.writeFileSync(path.resolve(directoryPath,".git","objects",treeHash.slice(0, 2), treeHash.slice(2)), data);
	return treeHash;
}

function commitTree(parentHash, message) {
	const treeHash = process.argv[3];
	const content = Buffer.concat([
		Buffer.from(`tree ${treeHash}\n`),
		Buffer.from(`parent ${parentHash}\n`),
		Buffer.from(`author The Author <author@test.com> ${Date.now} +0000\n`),
		Buffer.from(`committer The Committer <committer@test.com> ${Date.now} +0000\n\n`),
		Buffer.from(`${message}\n`)
	]);

	const commitBuffer = Buffer.concat([
		Buffer.from(`commit ${content.length}\0`),
		content
	])

	const commitHash = crypto.createHash("sha1").update(commitBuffer).digest("hex");
	const compressedCommit = zlib.deflateSync(commitBuffer);

	fs.mkdirSync(path.resolve(process.cwd(),".git","objects",commitHash.slice(0, 2)),{ recursive: true});
	fs.writeFileSync(path.resolve(process.cwd(),".git","objects",commitHash.slice(0, 2), commitHash.slice(2)), compressedCommit);
    return commitHash;	
}