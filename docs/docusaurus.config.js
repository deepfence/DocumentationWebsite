// @ts-check
// Note: type annotations allow type checking and IDEs autocompletion

const lightCodeTheme = require('prism-react-renderer/themes/vsLight');
const darkCodeTheme = require('prism-react-renderer/themes/dracula');

/** @type {import('@docusaurus/types').Config} */
const config = {
  title: 'Deepfence Community',
  tagline: 'Security Observability for Cloud Native Applications',
  url: 'https://community.deepfence.io',
  baseUrl: '/',

  onBrokenLinks: 'warn',
  onBrokenMarkdownLinks: 'warn',
  favicon: '/img/deepfence.png',

  // Even if you don't use internalization, you can use this field to set useful
  // metadata like html lang. For example, if your site is Chinese, you may want
  // to replace "en" with "zh-Hans".
  i18n: {
    defaultLocale: 'en',
    locales: ['en'],
  },

  presets: [
    [
      'classic',
      /** @type {import('@docusaurus/preset-classic').Options} */
      ({
        docs: {
          sidebarPath: require.resolve('./sidebars.js'),
          
          editUrl: ({ versionDocsDirPath, docPath, locale }) => {
            const repoMain = {
              threatstryker:  'https://github.com/deepfence/ThreatStryker-docs',
              packetstreamer: 'https://github.com/deepfence/PacketStreamer',
              flowmeter:      'https://github.com/deepfence/FlowMeter',
              yarahunter:     'https://github.com/deepfence/YaraHunter'
            };
            const repoMaster = {
              threatmapper:   'https://github.com/deepfence/ThreatMapper',
              secretscanner:  'https://github.com/deepfence/SecretScanner',
            };
            var match;
            if(( match = docPath.match( /([^\/]*)\/(.*).md/ )) != null ) {
              var product  = match[1];
              var filepath = match[2];
              if( repoMain[product] != null ) {
                return `${repoMain[product]}/edit/main/docs/docs/${product}/${filepath}.md`;
              }
              if( repoMaster[product] != null ) {
                return `${repoMaster[product]}/edit/master/docs/docs/${product}/${filepath}.md`;
              }
            }
          },

          breadcrumbs: true,
          routeBasePath: '/docs',
          // options for remark-admonitions
          admonitions: {}, 
        },
        blog: false,
        theme: {
          customCss: require.resolve('./static/css/deepfence.css'),
        },
        gtag: {
          trackingID: 'G-39Y0P23F1G',
          anonymizeIP: false,
        },
      }),
    ],
  ],

  themeConfig:
    /** @type {import('@docusaurus/preset-classic').ThemeConfig} */
    ({
      /* Note that markdown documents outside of the docs tree are not processed for frontmatter metadata 
         Additionally, metadata is only applied in full client builds of the site */
      metadata: [
        { name: 'keywords', content: 'deepfence,documentation,howto,threatmapper,threatstryker,secretscanner,packetstreamer,flowmeter,yarahunter,security,secops,devsecops,appsec' },
        { property: 'og:keywords', content: 'deepfence,documentation,howto,threatmapper,threatstryker,secretscanner,packetstreamer,flowmeter,yarahunter,security,secops,devsecops,appsec' },
        { name: 'image', content: '/img/social/deepfence.jpg' },
        { property: 'og:image', content: '/img/social/deepfence.jpg' }
      ],
      announcementBar: {
        id: 'support_threatmapper',
        content:
          'Show your love for ThreatMapper, the open-source CNAPP, by <a href="https://github.com/deepfence/ThreatMapper" target="_blank">giving it a star on GitHub</a>',
        isCloseable: false
      },
      navbar: {
        hideOnScroll: false,
        title: '',
        logo: {
          alt: 'Deepfence',
          href: '/',
          src: '/img/deepfence-logo-black.svg',
          srcDark: '/img/deepfence-logo-white.svg',
        },
        items: [
          {
            to: '/',
            label: 'Community',
          },
          {
            to: 'https://deepfence.io/threatstryker',
            label: 'Enterprise',
          },
          {
            type: 'dropdown',
            label: 'Docs',
            position: 'left',
            items: [
              {
                type: 'html',
                value: '<div class="nav-dropdown-title">Open Source</div>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/docs/threatmapper">ThreatMapper</a>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/docs/secretscanner">SecretScanner</a>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/docs/yarahunter">YaraHunter</a>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/docs/packetstreamer">PacketStreamer</a>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/docs/flowmeter">FlowMeter</a>',
              },
              {
                type: 'html',
                value: '<div class="nav-dropdown-title">Enterprise</div>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/threatstryker/docs">ThreatStryker</a>',
              },
              {
                type: 'html',
                value: '<a class="dropdown__link" href="/threatstryker/docs/cloud">Deepfence Cloud</a>',
              },
            ],
          },
          {
            href: 'https://deepfence.io',
            position: 'right',
            className: 'header-deepfence-link',
            'aria-label': 'deepfence.io',
          },
          {
            href: 'https://github.com/deepfence',
            position: 'right',
            className: 'header-github-link',
            'aria-label': 'GitHub repository',
          },
        ],
      },
      footer: {
        style: 'dark',
        links: [
          {
            title: 'GitHub',
            items: [
              {
                label: 'ThreatMapper',
                href: 'https://github.com/deepfence/ThreatMapper',
              },
              {
                label: 'SecretScanner',
                href: 'https://github.com/deepfence/SecretScanner',
              },
              {
                label: 'YaraHunter',
                href: 'https://github.com/deepfence/YaraHunter',
              },
              {
                label: 'PacketStreamer',
                href: 'https://github.com/deepfence/PacketStreamer',
              },
              {
                label: 'FlowMeter',
                href: 'https://github.com/deepfence/FlowMeter',
              },
            ],
          },
          {
            title: 'Docs',
            items: [
              {
                html: '<a class="footer__link-item" href="/docs/threatmapper">ThreatMapper</a>',
              },
              {
                html: '<a class="footer__link-item" href="/docs/secretscanner">SecretScanner</a>',
              },
              {
                html: '<a class="footer__link-item" href="/docs/yarahunter">YaraHunter</a>',
              },
              {
                html: '<a class="footer__link-item" href="/docs/packetstreamer">PacketStreamer</a>',
              },
              {
                html: '<a class="footer__link-item" href="/docs/flowmeter">PacketStreamer</a>',
              },
            ],
          },
          {
            title: 'Community',
            items: [
              {
                label: 'Slack',
                href: 'https://bitly.com/threatmapper-slack',
              },
              {
                label: 'Twitter',
                href: 'https://twitter.com/deepfence',
              },
              {
                label: 'YouTube',
                href: 'https://www.youtube.com/channel/UCklvbuOjnzpmtXy-g97tfWQ',
              },
              {
                label: 'LinkedIn',
                href: 'https://www.linkedin.com/company/deepfence-inc',
              },
            ],
          },
          {
            title: 'Enterprise',
            items: [
              {
                label: 'ThreatStryker',
                href: 'https://deepfence.io/threatstryker',
              },
              {
                html: '<a class="footer__link-item" href="/threatstryker/docs">ThreatStryker</a>',
              },
              {
                label: 'Deepfence Cloud',
                href: 'https://deepfence.cloud',
              },
              {
                html: '<a class="footer__link-item" href="/threatstryker/docs/cloud">Deepfence Cloud Docs</a>',
              },
            ],
          },

          {
            title: 'More',
            items: [
              {
                label: 'Blog',
                href: 'https://deepfence.io/blog',
              },
              {
                label: 'GitHub',
                href: 'https://github.com/deepfence',
              },
            ],
          },
        ],
        logo: {
          alt: 'Deepfence, Inc',
          src: '/img/deepfence-logo-white.svg',
          width: 160,
          height: 51,
        },
        copyright: `Copyright © ${new Date().getFullYear()} Deepfence, Inc. Built with Docusaurus.`,
      },
      colorMode: {
        defaultMode: 'light',
        disableSwitch: false,
        respectPrefersColorScheme: true,
      },
      prism: {
        theme: lightCodeTheme,
        darkTheme: darkCodeTheme,
      },
    }),
  plugins: [
    ['./df-bigpicture-plugin', {
      trackingID: '1523'
    }], 
  ],
};

module.exports = config;