/**
 * FileResource
 * @constructor
 * @memberOf WIM
 * @returns {FileResource}
 */
function FileResource() {

  if( !(this instanceof FileResource) )
    return new FileResource()

}

FileResource.Header = require( './file-header' )

/**
 * Parse a WIM FileResource
 * @param {Buffer} buffer
 * @param {Number} [offset=0]
 * @returns {FileResource}
 */
FileResource.parse = function( buffer, offset ) {
  return new FileResource().parse( buffer, offset )
}

/**
 * FileResource prototype
 * @type {Object}
 * @ignore
 */
FileResource.prototype = {

  constructor: FileResource,

  /**
   * Parse a WIM FileResource
   * @param {Buffer} buffer
   * @param {Number} [offset=0]
   * @returns {FileResource}
   */
  parse( buffer, offset ) {

    offset = offset || 0

    return this

  },

}

module.exports = FileResource
