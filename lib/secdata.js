var WIM = require( './wim' )

/**
 * SecurityData
 * @constructor
 * @memberOf WIM
 * @returns {SecurityData}
 */
function SecurityData() {

  if( !(this instanceof SecurityData) )
    return new SecurityData()

  /** @type {Number} Total size of the descriptor table (in entries?) */
  this.tableLength = 0x00000000
  /** @type {Number} Number of directory entries */
  this.entryCount = 0x00000000
  /** @type {Array} Sizes of the actual descriptors */
  this.entrySizes = []
  /** @type {Array<WIM.DirectoryEntry>} Security descriptors */
  this.entries = []

}

/**
 * Parse a WIM SecurityData
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {SecurityData}
 */
SecurityData.parse = function( buffer, offset ) {
  return new SecurityData().parse( buffer, offset )
}

/**
 * SecurityData prototype
 * @type {Object}
 * @ignore
 */
SecurityData.prototype = {

  constructor: SecurityData,

  parseEntries( buffer, offset ) {

    offset = offset || 0

    var entry = null

    for( var i = 0; i < this.entryCount; i++ ) {
      offset += this.entrySizes[i]
      entry = WIM.DirectoryEntry.parse( buffer, offset )
      this.entries.push( entry )
    }

    return this

  },

  parseHeader( buffer, offset ) {

    offset = offset || 0

    this.tableLength = buffer.readUInt32LE( offset + 0 )
    this.entryCount = buffer.readUInt32LE( offset + 4 )
    this.entrySizes = []

    for( var i = 0; i < this.tableLength; i++ ) {
      this.entrySizes.push( buffer.readUIntLE( offset + 8 + i * 8, 8 ) )
    }

    return this

  },

  /**
   * Parse WIM SecurityData
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {SecurityData}
   */
  parse( buffer, offset ) {
    offset = offset || 0
    this.parseHeader( buffer, offset )
    return this
  },

}

module.exports = SecurityData
