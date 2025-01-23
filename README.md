[![progress-banner](https://backend.codecrafters.io/progress/git/32889ddb-db4e-4d8f-97aa-caf146ed1ed1)]()
# Simplified Git Implementation

This project implements a simplified version of Git, focusing on core Git functionalities such as managing and tracking file changes. It is designed to help users understand how Git manages version control through object storage and commit tracking. The key features include blob objects, tree objects, and commit management.

## Features

### 1. **Blob Objects**
   - Read and create blob objects to store file data.

### 2. **Tree Objects**
   - Read and write tree objects to represent directory structures.

### 3. **Commits**
   - Create and manage commits to capture project states.

### 4. **Git Commands**
   - `git init`: Initialize a new Git repository.
   - `git cat-file`: Display the content of a blob, tree, or commit object.
   - `git hash-object`: Compute the hash for a file and store it as a blob.
   - `git ls-tree`: List the contents of a tree object.
   - `git write-tree`: Write the current index to a tree object.
   - `git commit-tree`: Create a commit from a tree object.

## How It Works

This implementation allows users to interact with files and directories in a Git-like fashion using simple commands. It manages file data through **blob objects**, stores directory structures using **tree objects**, and tracks changes via **commit objects**. The commands mimic basic Git operations to perform file tracking and version control.

## Getting Started

### Prerequisites

To test and run the program, ensure you have the following:

- A Unix-like environment (Linux, macOS, or WSL on Windows)
- Basic understanding of how Git works

### Installation

1. Clone the repository:
    ```bash
    git clone https://github.com/yourusername/simplified-git.git
    cd simplified-git
    ```

2. Make sure `your_program.sh` is executable:
    ```bash
    chmod +x your_program.sh
    ```

### Usage

Run the `your_program.sh` script in a testing folder. Make sure you're not running it inside an actual Git repository to prevent accidental damage to the `.git` folder.

For testing, you can create a new temporary folder:

```bash
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init
```

This will initialize a new Git repository in `/tmp/testing`.

### Git Commands

Here are the available commands and their usage:

- **`git init`**: Initialize a new Git repository.
  
    ```bash
    ./your_program.sh init
    ```

- **`git cat-file <type> <object>`**: Display the content of a specific object. Replace `<type>` with `commit`, `tree`, or `blob`, and `<object>` with the object hash.

    Example:
    ```bash
    ./your_program.sh cat-file blob 1234567890abcdef
    ```

- **`git hash-object <file>`**: Compute the hash of a file and store it as a blob.

    Example:
    ```bash
    ./your_program.sh hash-object myfile.txt
    ```

- **`git ls-tree <tree>`**: List the contents of a tree object.

    Example:
    ```bash
    ./your_program.sh ls-tree 1234567890abcdef
    ```

- **`git write-tree`**: Write the current index to a tree object.

    ```bash
    ./your_program.sh write-tree
    ```

- **`git commit-tree <tree>`**: Create a commit from a tree object.

    Example:
    ```bash
    ./your_program.sh commit-tree 1234567890abcdef
    ```

## Testing Locally

To avoid accidentally damaging your repository's `.git` folder, it is recommended to test the `your_program.sh` script in a separate folder. For example:

```bash
mkdir -p /tmp/testing && cd /tmp/testing
/path/to/your/repo/your_program.sh init
```

## Conclusion

This simplified Git implementation offers a basic yet insightful view of how version control systems like Git manage file changes, directories, and commits. By using this project, you can gain a deeper understanding of Git's underlying mechanics.
