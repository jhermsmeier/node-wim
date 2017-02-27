var WIM = require( './wim' )

/**
 * Image
 * @constructor
 * @memberOf WIM
 * @param {String} filename
 * @param {Object} [options]
 * @returns {Image}
 */
function Image( filename, options ) {

  if( !(this instanceof Image) )
    return new Image( filename, options )

  options = options || {}

  this.fs = options.fs || require( 'fs' )
  this.filename = filename
  this.flags = options.flags || 'r'
  this.fd = options.fd || null

  this.header = new WIM.Header()
  this.securityData = new WIM.SecurityData()
  this.xmlData = null

  Object.defineProperty( this, 'fs', {
    enumberable: false
  })

}

/**
 * Image prototype
 * @type {Object}
 * @ignore
 */
Image.prototype = {

  constructor: Image,

  readXmlData( callback ) {

    var buffer = Buffer.alloc( this.header.xmlData.size, 0 )
    var length = buffer.length
    var position = this.header.xmlData.offset

    if( !this.header.xmlData.getFlag( WIM.FILE_METADATA ) ) {
      return callback.call( this, new Error( 'Not a metadata file' ) )
    }

    this.fs.read( this.fd, buffer, 0, length, position, ( error, bytesRead, buffer ) => {
      if( this.header.xmlData.getFlag( WIM.FILE_COMPRESSED ) ) {
        return callback.call( this, new Error( 'Compressed file resources not implemented' ) )
      }
      this.xmlData = buffer.toString( 'utf16le' )
      callback.call( this, error, this.xmlData )
    })

  },

  readMetadata( callback ) {

    var buffer = Buffer.alloc( this.header.bootMetadata.size, 0 )
    var length = buffer.length
    var position = this.header.bootMetadata.offset

    if( !this.header.bootMetadata.getFlag( WIM.FILE_METADATA ) ) {
      return callback.call( this, new Error( 'Not a metadata file' ) )
    }

    this.fs.read( this.fd, buffer, 0, length, position, ( error, bytesRead, buffer ) => {
      if( this.header.bootMetadata.getFlag( WIM.FILE_COMPRESSED ) ) {
        return callback.call( this, new Error( 'Compressed file resources not implemented' ) )
      }
      callback.call( this, error, this.securityData )
    })

  },

  readHeader( callback ) {

    var buffer = Buffer.alloc( WIM.HEADER_SIZE, 0 )
    var length = buffer.length
    var position = 0

    this.fs.read( this.fd, buffer, 0, length, position, ( error, bytesRead, buffer ) => {
      this.header.parse( buffer )
      callback.call( this, error, this.header )
    })

  },

  open( filename, options, callback ) {

    if( typeof options === 'function' ) {
      callback = options
      options = {}
    }

    // TODO: Close & reopen, or throw?
    if( this.fd != null ) {
      return callback.call( this, new Error( 'Already opened' ) )
    }

    if( options.fd ) {
      this.fd = options.fd
      return callback.call( this )
    }

    this.fs.open( filename, this.flags, ( error, fd ) => {
      this.fd = fd
      callback.call( this, error )
    })

    return this

  },

  close( callback ) {
    this.fs.close( this.fd, ( error ) => {
      callback.call( this, error )
    })
  },

}

module.exports = Image
