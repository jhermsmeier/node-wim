var WIM = module.exports

WIM.HEADER_SIZE = 208

// Header flags
WIM.RESERVED = 0x00000001
WIM.COMPRESSION = 0x00000002
WIM.READONLY = 0x00000004
WIM.SPANNED = 0x00000008
WIM.RESOURCE_ONLY = 0x00000010
WIM.METADATA_ONLY = 0x00000020
WIM.WRITE_IN_PROGRESS = 0x00000040
WIM.REPARSE_FIX = 0x00000080
WIM.COMPRESS_RESERVED = 0x00010000
WIM.COMPRESS_XPRESS = 0x00020000
WIM.COMPRESS_LZX = 0x00040000

// File Resource Header flags
WIM.FILE_FREE = 0x01
WIM.FILE_METADATA = 0x02
WIM.FILE_COMPRESSED = 0x04
WIM.FILE_SPANNED = 0x08

WIM.extensions = [ '.wim', '.swm' ]

WIM.Header = require( './header' )
WIM.SecurityData = require( './secdata' )
WIM.DirectoryEntry = require( './direntry' )
WIM.FileResource = require( './file-resource' )
WIM.Image = require( './image' )

/**
 * Open a WIM format image
 * @param {String} filename
 * @param {Object} [options]
 * @param {Object} [options.fd] - file descriptor
 * @param {Object} [options.fs] - user `fs` api
 * @param {Function} callback - 'open' event callback
 * @returns {WIM.Image}
 */
WIM.open = function( filename, options, callback ) {
  return new WIM.Image().open( filename, options, callback )
}
