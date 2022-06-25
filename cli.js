#!/usr/bin/env node

var WIM = require( './lib/wim' )
var image = new WIM.Image()
 
if (process.argv.length < 4) {
    console.log('npx wim wimfile -h|-x|-m')
    console.log('  dump wimfile header, xml data or metadata')
    process.exit(-1)
}

function handleError(error) {
    console.error(error);
    process.exit(-1)
}

image.open( process.argv[2], function( error ) {
  if( error ) return handleError( error )
  image.readHeader( function( error, header ) {
    if (process.argv[3] === '-h') {
      console.log( header )
    }
    if (process.argv[3] === '-x') {
        image.readXmlData( function( error, header ) {
            console.log( header )
        })
    }
    if (process.argv[3] === '-m') {
        image.readMetadata( function( error, header ) {
            console.log( header )
        })
    }
  })
})
