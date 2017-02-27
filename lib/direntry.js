/**
 * DirectoryEntry
 * @constructor
 * @memberOf WIM
 * @returns {DirectoryEntry}
 */
function DirectoryEntry() {

  if( !(this instanceof DirectoryEntry) )
    return new DirectoryEntry()

}

/**
 * Parse a WIM DirectoryEntry
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {DirectoryEntry}
 */
DirectoryEntry.parse = function( buffer, offset ) {
  return new DirectoryEntry().parse( buffer, offset )
}

/**
 * DirectoryEntry prototype
 * @type {Object}
 * @ignore
 */
DirectoryEntry.prototype = {

  constructor: DirectoryEntry,

  /**
   * Parse a WIM DirectoryEntry
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {DirectoryEntry}
   */
  parse( buffer, offset ) {

    offset = offset || 0

    return this

  },

}

module.exports = DirectoryEntry
