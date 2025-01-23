[![progress-banner](https://backend.codecrafters.io/progress/git/32889ddb-db4e-4d8f-97aa-caf146ed1ed1)]()

# Git Version Implementation

This project is a simplified version of Git that implements core Git functionalities, allowing users to manage and track file changes. Key features include:

- **Blob Objects**: Read and create blob objects to store file data.
- **Tree Objects**: Read and write tree objects to represent directory structures.
- **Commits**: Create and manage commits to capture project states.
- **Git Commands**:
  - `git init`: Initialize a new Git repository.
  - `git cat-file`: Display the content of a blob, tree, or commit object.
  - `git hash-object`: Compute the hash for a file and store it as a blob.
  - `git ls-tree`: List the contents of a tree object.
  - `git write-tree`: Write the current index to a tree object.
  - `git commit-tree`: Create a commit from a tree object.

This implementation provides a basic understanding of how Git manages version control through object storage and commit tracking.


# Testing locally

The `your_program.sh` script is expected to operate on the `.git` folder inside
the current working directory. If you're running this inside the root of this
repository, you might end up accidentally damaging your repository's `.git`
folder.

I suggest executing `your_program.sh` in a different folder when testing
locally. For example:

```sh
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init
```
