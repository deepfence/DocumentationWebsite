# Building docs

## Get the Skeleton Files

Check out the github repo you wish to add docs to.

Remove (back-up) any existing `/docs/` directory in the repo.

Copy `skel/docs` into the root of the repo, to create a new `/docs/` directory.  This directory contains:

| Filename | Purpose |
| -------- | ------- |
| `docs/docusaurus.config.js` | Sample configuration for your docusaurus docs site |
| `docs/sidebars.js` | Sample sidebar for your documentation tree |
| `docs/README.md` | README for the docs in your new repo, with build instructions |
| `docs/docs/threatmapper` | Location for your docs files (must rename first) |
| `docs/docs/threatmapper/index.md` | Your first documentation file |
| In `docs/static:`<br/> `css/deepfence.css`,<br/> `img/deepfence-logo-black.svg`,<br/> `img/deepfence-logo-white.svg` | Styling for the deepfence skin for the `classic` theme |
| `docs/src/pages/index.md` | Default home page for Deepfence docs; no need to edit |
| `docs/yarn.lock`, `docs/package.json` | NPM package list, used when initialized with `yarn` |
| `docs/.gitignore` | Configuration to ignore node dependencies and temporary files |
| `docs/babel.config.js` | Babel config |


These are the basic skeleton files needed to create a local docs site.

### Customise the Skeleton files

The skeleton files are set up for the `threatmapper` product.  You'll need to select an alternative product name (e.g. `packetstreamer`) and edit the files appropriately.

```
cd docs/
```

Rename the `docs/threatmapper` directory to be product-appropriate, e.g. `packetstreamer`.  The markdown files for the product documentation will be wholy contained in that location.

Edit `docusaurus.config.js` to make it product-appropriate.  You'll want to replace:

1. config.title
1. config.tagline
1. config.presets.docs.editURL
1. themeconfig.navbar.items[0]

Edit `sidebars.js`:

1. Replace the name of the sidebar object to the appropriate product name.  
1. Correct the value in the `sidebar-title`

You will want to edit sidebars.js further, to define the nav structure of the documentation, but that can wait.

Check you've replaced all instances:

```
# Should return nothing
grep -ir threatmapper .
```

You'll then want to add these files into your repository, before you initialize docusaurus:

```
git add `find . -type f`
```

## Initialise Docusaurus

Initialize Docusaurus:

```
cd docs/

# you're now in the docs folder, with package.json and yarn.lock

# Do this once to initialize the necessary packages
yarn
```

Docusaurus will create a number of local temporary files which should not be tracked by git; these are excluded by the local `.gitignore`.

# Do this to start the docs application

```
yarn start
```

## Write your docs

```cd docs```

You can now begin adding docs, into `docs/productname`, and edit the sidebar at `sidebar.js`. Take a look at other Deepfence products to understand the schema.
