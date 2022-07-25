// Sidebars are copied from the individual docs sites into ./sidebars, loaded and merged

const products = [ 'threatmapper', 'secretscanner', 'yaradare', 'packetstreamer', 'flowmeter', 'threatstryker' ];

var sidebars = {};

products.forEach( product => {
  const sidebar = require( `./sidebars/${product}.js` );

  sidebars[product] = sidebar[product];
});

module.exports = sidebars;