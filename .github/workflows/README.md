# GitHub Actions Workflows

This directory contains GitHub Actions workflows for building and deploying the Jekyll site.

## Workflows

### deploy.yml
Builds and deploys the Jekyll site to GitHub Pages (gh-pages branch) when changes are pushed to the master branch.

- **Trigger**: Push to `master` branch
- **Target**: Root of gh-pages branch
- **URL**: Main site accessible via custom domain

### deploy-pr-preview.yml
Creates preview deployments for pull requests, allowing reviewers to see changes before merging.

- **Trigger**: Pull request opened, synchronized, or reopened
- **Target**: `pr-preview/pr-<number>/` on gh-pages branch
- **URL**: `https://wintermuted.github.io/blog/pr-preview/pr-<number>/`
- **Features**:
  - Automatically builds the site with PR-specific baseurl
  - Posts a comment on the PR with the preview URL
  - Updates the comment if the PR is updated
  - Preserves other PR previews and the main site

### cleanup-pr-preview.yml
Removes PR preview deployments when pull requests are closed.

- **Trigger**: Pull request closed (merged or unmerged)
- **Action**: Removes `pr-preview/pr-<number>/` directory from gh-pages
- **Features**:
  - Posts a confirmation comment on the PR
  - Only removes the specific PR's preview, not others

## PR Preview Usage

When you open a pull request:
1. The `deploy-pr-preview.yml` workflow automatically runs
2. It builds the Jekyll site with a unique baseurl for your PR
3. The site is deployed to a subdirectory on the gh-pages branch
4. A bot comments on your PR with the preview URL
5. When you push updates, the preview is automatically updated
6. When the PR is closed, the preview is automatically cleaned up

Preview URLs follow the pattern: `https://wintermuted.github.io/blog/pr-preview/pr-<number>/`

## Requirements

Both the preview and main deployment workflows require:
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile
