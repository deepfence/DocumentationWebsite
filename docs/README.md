# Deepfence Community and Documentation Website

*This is a work-in-progress*

This website serves two purposes:
 * As a product show case and starting point for the community to find useful resources
 * Hosting documentation for individual products

It's built using [Docusaurus 2](https://docusaurus.io/).

## Quickstart

Clone the repo, then:

### Initialize the components:

We import the product docs from each project as a submodule.  Do this once:

```
git submodule init
```

Do this once, or when updating the packages version lists:

```
cd docs
yarn
```

### Import the docs content

Go to `/docs/` and pull in the documentation files (markdown, images etc) and navigation sidebars from the individual projects.  This operation will:

1. Refresh the remote projects.  Note that this fails (don't know why) for FlowMeter; you can manually `git pull` while necessary.
1. Copy the docs content from each project, making some customizations to the markdown frontmatter
1. Copy the sidebar navigation from each project

```
make
```

### Run the website

```
make run
```

This command starts a local development server and opens up a browser window. Most changes are reflected live without having to restart the server.  Use `--port` to select a different port to the default (:3000).

### Build the content for publication

TODO - complete this step

```
yarn run serve --build --port 8001 --host 0.0.0.0
```

## Editing the Website

### Editing the home page

The home page is located in `docs/src/pages/index.js`.  You can edit this page directly, and changes will be reflected immediately in the running website.

### Editing the product docs

The product docs are sourced from the individual product repos, and are (slightly) modified when they are imported into the documentaiton website.  Edit these docs in their product repos, submit the changes to the master/main branch, then run `make` to re-import them.

There should be no need to edit the product docs within this repo, but if you must, then edit them in the appropriate submodule and re-run `make`.
