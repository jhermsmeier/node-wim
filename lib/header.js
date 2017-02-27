var WIM = require( './wim' )

/**
 * Header
 * @constructor
 * @memberOf WIM
 * @returns {Header}
 */
function Header() {

  if( !(this instanceof Header) )
    return new Header()

  this.imageTag = 'MSWIM\0\0'
  this.size = 0x00000000
  this.version = 0x00000000
  this.flags = 0x00000000
  this.compressedSize = 0x00000000
  this.guid = new Buffer(16)
  this.partNumber = 0x0001
  this.partCount = 0x0000
  this.imageCount = 0x00000000
  this.offsetTable = new WIM.FileResource.Header()
  this.xmlData = new WIM.FileResource.Header()
  this.bootMetadata = new WIM.FileResource.Header()
  this.bootIndex = 0x00000000
  this.integrity = new WIM.FileResource.Header()
  this.reserved = new Buffer(60)

  this.guid.fill(0)
  this.reserved.fill(0)

}

Header.size = WIM.HEADER_SIZE

/**
 * Parse a WIM header
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {Header}
 */
Header.parse = function( buffer, offset ) {
  return new Header().parse( buffer, offset )
}

/**
 * Header prototype
 * @type {Object}
 * @ignore
 */
Header.prototype = {

  constructor: Header,

  getFlag( mask ) {
    return ( this.flags & mask ) === mask
  },

  /**
   * Parse a WIM header
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {Header}
   */
  parse( buffer, offset ) {

    offset = offset || 0

    this.imageTag = buffer.toString( 'ascii', offset + 0, offset + 8 )
    this.size = buffer.readUInt32LE( offset + 8 )
    this.version = buffer.readUInt32LE( offset + 12 )
    this.flags = buffer.readUInt32LE( offset + 16 )
    this.compressedSize = buffer.readUInt32LE( offset + 20 )

    buffer.copy( this.guid, 0, offset + 24, offset + 40 )

    this.partNumber = buffer.readUInt16LE( offset + 40 )
    this.partCount = buffer.readUInt16LE( offset + 42 )
    this.imageCount = buffer.readUInt32LE( offset + 44 )
    this.offsetTable.parse( buffer, offset + 48 )
    this.xmlData.parse( buffer, offset + 72 )
    this.bootMetadata.parse( buffer, offset + 96 )
    this.bootIndex = buffer.readUInt32LE( offset + 120 )
    this.integrity.parse( buffer, offset + 124 )

    buffer.copy( this.reserved, 0, offset + 148, offset + 208 )

    return this

  },

}

module.exports = Header
