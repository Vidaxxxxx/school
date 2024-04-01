# How to work on this project

## Versionning

#### Branch creation

When you want to work on an issue :

```bash
git checkout -b name/description
# Equivalent to git branch <name> && git checkout <name>

# Example:
git checkout -b arthur/create_react_project
```

#### Conventionnal commits

See: https://www.conventionalcommits.org/en/v1.0.0/

**Overview**

Conventional commits are a standardized format for commit messages. They provide an easy way to convey the intent of the commit, making it easier to understand changes in the codebase.

**Main Keywords**

- feat: for a new feature
- fix: for a bug fix
- docs: for documentation changes
- style: for changes that do not affect the code's functionality
- refactor: for code refactoring
- test: for adding tests
- chore: for changes to the build process or auxiliary tools

```bash
git commit -m "feat( MyFunction ): Adds a function that does this for this purpose"
```

## GitHub issues

#### Closing GitHub Issue

To close a GitHub issue with a commit, you can use the following syntax in your commit message:

    close, closes, closed, fixes, fixed

```bash
git commit -m "fix( MyFunction ): Closes the issue #47"
```
