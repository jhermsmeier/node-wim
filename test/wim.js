var WIM = require( '..' )
var assert = require( 'assert' )
var path = require( 'path' )
var util = require( 'util' )

function inspect( value ) {
  return util.inspect( value, {
    depth: null,
    colors: process.stdout.isTTY,
  })
}

function log( value ) {
  console.log( '' )
  console.log( inspect( value ) )
  console.log( '' )
}

before( function() {
  log( WIM )
})

describe( 'WIM', function() {

  context( 'Image', function() {

    // var WIM_IMAGE_PATH = path.resolve( 'E:/sources/boot.wim' )
    var WIM_IMAGE_PATH = path.join( __dirname, 'data', 'boot-header.wim' )
    var image = null

    specify( 'new', function() {
      image = new WIM.Image()
    })

    specify( '#open()', function( done ) {
      image.open( WIM_IMAGE_PATH, done )
    })

    specify( '#readHeader()', function( done ) {
      image.readHeader( function( error, header ) {
        log( error || header )
        done( error )
      })
    })

    specify.skip( '#readMetadata()', function( done ) {
      image.readMetadata( function( error, metadata ) {
        log( error || metadata )
        done( error )
      })
    })

    specify.skip( '#readXmlData()', function( done ) {
      image.readXmlData( function( error, metadata ) {
        log( error || metadata )
        done( error )
      })
    })

    specify( '#close()', function( done ) {
      image.close( done )
    })

  })

})
