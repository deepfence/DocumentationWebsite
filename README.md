# Deepfence Community and Documentation Website

This website serves two purposes:

 * As a product showcase and starting point for community users to find useful resources
 * To host documentation for the individual open source and enterprise products

The build process imports the documentation from individual Deepfence projects to create a larger website that documents all projects in one place.

To prepare a project for documentation, jump forward to the section [Adding docs to your own project](#adding-docs-to-your-own-project).

The website is built using [Docusaurus 2](https://docusaurus.io/).

## Quick Start

Clone the repo, then:

### Initialize the components:

Import the product docs from each project as a submodule.  Do this once:

```bash
git submodule init
```

Initialize the dependencies.  Do this once:

```bash
cd docs
yarn
```

### Import the docs content

Run `make` to import the docs from the submodule projects.  Do this any time the docs are updated.

```bash
cd docs
make
```

This operation will build the full source for the website:

1. Refresh the remote projects (`git submodule update --remote`)
1. Copy the docs content from each project (`docs/docs/projectname`) into the `docs/docs/projectname` location for this website, making some SEO customizations to the markdown frontmatter
1. Copy the sidebar navigation from each project


### Run the website

Run `make run` to preview the website.

```bash
make run
```

This command (running [`docusaurus start`](https://docusaurus.io/docs/cli#docusaurus-start-sitedir)) builds a site preview, starts a local development server and opens up a browser window.  Most changes are reflected live without having to restart the server.  Use `--port` to select a different port to the default (:3000).

### Build the content for publication

Run `make build` to create the static, production-ready site.

```bash
make build
```

A [full build](https://docusaurus.io/docs/cli#docusaurus-build-sitedir) goes through additional steps of packing, minifying and checking the build. This process may identify problems (e.g. broken links) that the quick preview build fails to detect.  It also enables the production-only features, such as google analytics and bigpicture beacons.

The resulting static build is located in `build/`.

Alternatively, you can build-and-serve the site as follows:

```bash
yarn run serve --build --port 8000 --host 0.0.0.0
```

## Docker image

```bash
./bootstrap.sh
make
docker run -dit --restart=always --name=deepfence-docs -e GITHUB_USER=aaa -e GITHUB_ACCESS_TOKEN=aaa -p 80:80 quay.io/deepfenceio/deepfence_docs:latest
```

## Hosting the site

The site is intended to be hosted behind two domains:

 * `community.mydomain.com`: the primary domain to be used to serve the site
 * `docs.mydomain.com`: used to provide links to the docs, particularly for the enterprise product documentation where a 'community' domain would not be appropriate.

It's an antipattern to serve an SPA from multiple domains, and switch domains during routing. Configuration is non-trivial and the user experience is poor as a change of domain means a full reload of the SPA. Therefore, `docs.mydomain.com/productname` redirects to `community.mydomain.com/docs/productname` to achieve this.

The following, minimal NGINX configuration is sufficient:

```nginx
# File: conf.d/community.mydomain.com.conf
server {
    server_name community.mydomain.com;
    listen 80;

    location / {
        # the contents of the build process from Docusaurus
        root /var/website/build;
    }
}
```

```nginx
# File: conf.d/docs.mydomain.com.conf
server {
    server_name docs.mydomain.com;
    listen 80;

    location / {
        return 302 $scheme://community.mydomain.com/docs$request_uri;
    }
}
```

TLS certificates can be obtained using, for example, `certbot --nginx -d community.mydomain.com -d docs.mydomain.com`.


## Editing the website

### Editing the home page

The home page is located in `docs/src/pages/index.js`.  You can edit this page directly, and changes will be reflected immediately in the running website.

### Editing the product docs

The product docs are sourced from the individual product repos, and are additionally decorated when they are imported (`make`) into the documentation website.  

You can edit the product docs in their respective submodules (`/product-docs`) and run `make` to re-import them.  Changes in the submodule are independent of this repo, can be submitted to their respective repos in the usual way.

For large changes to product docs (e.g. to prepare for a new release), it is better to develop these changes in the product's repo, test them locally, and then merge them to the product's `main` branch once complete.  You can then rebuild the documentation website.


## Adding docs to your own project

Follow these steps if you'd like to add docs to a new Deepfence project, and to have them included in this Documentation Website.

### Get the Skeleton Files

Check out the GitHub repo you wish to add docs to.

Remove (back-up) any existing `/docs/` directory in the repo.

Copy `skel/docs` into the root of the repo, to create a new `/docs/` directory.  This directory contains:

| Filename                                                                                                             | Purpose                                                       |
|----------------------------------------------------------------------------------------------------------------------|---------------------------------------------------------------|
| `docs/docusaurus.config.js`                                                                                          | Sample configuration for your docusaurus docs site            |
| `docs/sidebars.js`                                                                                                   | Sample sidebar for your documentation tree                    |
| `docs/README.md`                                                                                                     | README for the docs in your new repo, with build instructions |
| `docs/docs/threatmapper`                                                                                             | Location for your docs files (must rename first)              |
| `docs/docs/threatmapper/index.md`                                                                                    | Your first documentation file                                 |
| In `docs/static:`<br/> `css/deepfence.css`,<br/> `img/deepfence-logo-black.svg`,<br/> `img/deepfence-logo-white.svg` | Styling for the deepfence skin for the `classic` theme        |
| `docs/src/pages/index.md`                                                                                            | Default home page for Deepfence docs; no need to edit         |
| `docs/yarn.lock`, `docs/package.json`                                                                                | NPM package list, used when initialized with `yarn`           |
| `docs/.gitignore`                                                                                                    | Configuration to ignore node dependencies and temporary files |
| `docs/babel.config.js`                                                                                               | Babel config                                                  |

These are the basic skeleton files needed to create a local docs site.

### Customise the Skeleton files

The skeleton files are set up for the `threatmapper` product.  You'll need to select an alternative product name (e.g. `packetstreamer`) and edit the files appropriately.

```bash
cd docs
```

Rename the `docs/threatmapper` directory to be product-appropriate, e.g. `packetstreamer`.  The markdown files for the product documentation will be wholy contained in that location.

Edit `docusaurus.config.js` to make it product-appropriate.  You'll want to replace:

1. config.title
2. config.tagline
3. config.presets.docs.editURL
4. themeconfig.navbar.items[0]

Edit `sidebars.js`:

1. Replace the name of the sidebar object to the appropriate product name.  
2. Correct the value in the `sidebar-title`

You will want to edit sidebars.js further, to define the nav structure of the documentation, but that can wait.

Check you've replaced all instances:

```bash
# Should return nothing
grep -ir threatmapper .
```

You'll then want to add these files into your repository, before you initialize docusaurus:

```bash
git add -A
```

### Initialise Docusaurus

Initialize Docusaurus:

```bash
cd docs

# you're now in the docs folder, with package.json and yarn.lock

# Do this once to initialize the necessary packages
yarn
```

Docusaurus will create a number of local temporary files which should not be tracked by git; these are excluded by the local `.gitignore`.

### Start the docs application

```bash
yarn start
```

### Write your docs

```bash
cd docs
```

You can now begin adding docs to your repo, into `docs/docs/productname`, and edit the sidebar at `docs/sidebar.js`. Take a look at other Deepfence products to understand the sidebar schema.

## Adding a new project to the Documentation Website

This documentation website collects documentation from the various Deepfence projects (your `~repo/docs/docs/` folders) and imports the sidebar navigation from each project.  It assembles this into a single, larger Docusaurus project.

You'll need to:
 * Add your project as a new git submodule (`cd product-docs ; git submodule add <repo.git>`)
 * Add your project to the [MakeFile](docs/Makefile) targets so its assets are imported
 * Edit the site configuration [docusaurus.config.js](docs/docusaurus.config.js) to add your project into the nav, footer, editURL calculation and site metadata
 * Add your project to the sidebar generator [sidebars.js](docs/sidebars.js)

Additionally, you will want to:
 * Add an [icon](docs/static/img/products/) (source: [icons.svg](docs/static/img/products/icons.svg)) and [social card](docs/static/img/social) for your project
 * Edit the importer [import.pl](docs/import.pl) to decorate your docs with project-specific site metadata
 * Edit the home page [index.js](docs/src/pages/index.js) to add your project to the Community Home Page
 * Edit the documentation page [docs/index.md](docs/docs/index.md) to add your project to the documentation page
