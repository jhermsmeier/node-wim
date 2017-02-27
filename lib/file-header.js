/**
 * FileHeader
 * @constructor
 * @memberOf WIM
 * @returns {FileHeader}
 */
function FileHeader() {

  if( !(this instanceof FileHeader) )
    return new FileHeader()

  // _RESHDR_BASE_DISK
  this.size = 0x00000000000000 // 7 bytes (!)
  this.flags = 0x00
  this.offset = 0x0000000000000000

  // _RESHDR_DISK_SHORT
  this.originalSize = 0x0000000000000000

}

FileHeader.size = 24

/**
 * Parse a WIM FileHeader
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {FileHeader}
 */
FileHeader.parse = function( buffer, offset ) {
  return new FileHeader().parse( buffer, offset )
}

/**
 * FileHeader prototype
 * @type {Object}
 * @ignore
 */
FileHeader.prototype = {

  constructor: FileHeader,

  getFlag( mask ) {
    return ( this.flags & mask ) === mask
  },

  /**
   * Parse a WIM FileHeader
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {FileHeader}
   */
  parse( buffer, offset ) {

    offset = offset || 0

    // _RESHDR_BASE_DISK
    this.size = buffer.readUIntLE( offset + 0, 7 )
    this.flags = buffer.readUInt8( offset + 7 )
    this.offset = buffer.readIntLE( offset + 8, 8 )

    // _RESHDR_DISK_SHORT
    this.originalSize = buffer.readIntLE( offset + 16, 8 )

    return this

  },

}

module.exports = FileHeader
