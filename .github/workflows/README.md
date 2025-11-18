# GitHub Actions Workflows

This directory contains GitHub Actions workflows for building and deploying the Jekyll site.

## Workflows

### deploy.yml
Builds and deploys the Jekyll site to GitHub Pages (gh-pages branch) when changes are pushed to the master branch.

- **Trigger**: Push to `master` branch
- **Target**: Root of gh-pages branch
- **URL**: Main site accessible via custom domain (jnyeholt.dev)
- **Method**: GitHub Pages with CNAME

### deploy-pr-preview.yml
Creates preview deployments for pull requests using Surge.sh, completely separate from the main site deployment.

- **Trigger**: Pull request opened, synchronized, or reopened
- **Target**: Surge.sh (separate hosting platform)
- **URL**: `https://blog-pr-<number>.surge.sh`
- **Features**:
  - Automatically builds the Jekyll site for preview
  - Deploys to Surge.sh to avoid conflicts with main site
  - Posts a comment on the PR with the preview URL
  - Updates the preview when the PR is updated
  - No conflicts with the main site's custom domain

### cleanup-pr-preview.yml
Removes PR preview deployments from Surge.sh when pull requests are closed.

- **Trigger**: Pull request closed (merged or unmerged)
- **Action**: Tears down the Surge.sh deployment
- **Features**:
  - Posts a confirmation comment on the PR
  - Cleans up the preview hosting

## PR Preview Usage

When you open a pull request:
1. The `deploy-pr-preview.yml` workflow automatically runs
2. It builds the Jekyll site (without baseurl, as Surge serves from root)
3. The site is deployed to Surge.sh at `https://blog-pr-<number>.surge.sh`
4. A bot comments on your PR with the preview URL
5. When you push updates, the preview is automatically redeployed
6. When the PR is closed, the Surge deployment is torn down

Preview URLs follow the pattern: `https://blog-pr-<number>.surge.sh`

## Requirements

### Main deployment (deploy.yml)
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile

### PR previews (deploy-pr-preview.yml)
- Ruby 3.2
- System dependencies for image processing (libvips, etc.)
- Jekyll and all gems specified in Gemfile
- **Surge.sh token**: Repository secret `SURGE_TOKEN` must be configured
  - Get your token by running `surge token` after installing surge globally
  - Add it as a repository secret at Settings > Secrets > Actions

## Setup Surge Token

To enable PR previews, you need to add a Surge.sh token as a repository secret:

1. Install Surge globally: `npm install -g surge`
2. Create an account or login: `surge login`
3. Get your token: `surge token`
4. Add the token as `SURGE_TOKEN` in repository secrets (Settings > Secrets and variables > Actions > New repository secret)
