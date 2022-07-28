// Sidebars are copied from the individual docs sites into ./sidebars, loaded and merged

const products = [ 'threatmapper', 'secretscanner', 'yaradare', 'packetstreamer', 'flowmeter', 'threatstryker' ];

var sidebars = { 
  index: [
    {
      type: 'html',
      value: 'Deepfence Documentation',
      className: 'sidebar-title',
    },    
    {
      type: 'category',
      label: 'Getting Started',
      collapsible: false,
      link: {
        type: 'doc',
        id: 'index'
      },
      items: [
      ],
    },
  ]
};

products.forEach( product => {
  const sidebar = require( `./sidebars/${product}.js` );

  sidebars[product] = sidebar[product];

  sidebars['index'][1]['items'].push( { type: 'ref', id: `${product}/index` } );
});

module.exports = sidebars;