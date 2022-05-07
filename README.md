# Windows Imaging File Format (WIM)
[![npm](https://img.shields.io/npm/v/wim.svg?style=flat-square)](https://npmjs.com/package/wim)
[![npm license](https://img.shields.io/npm/l/wim.svg?style=flat-square)](https://npmjs.com/package/wim)
[![npm downloads](https://img.shields.io/npm/dm/wim.svg?style=flat-square)](https://npmjs.com/package/wim)
[![build status](https://img.shields.io/travis/jhermsmeier/node-wim.svg?style=flat-square)](https://travis-ci.org/jhermsmeier/node-wim)

## Install via [npm](https://npmjs.com)

```sh
$ npm install --save wim
```

## References

- [Windows Imaging File Format on TechNet](https://technet.microsoft.com/en-us/library/cc749478(v=ws.10).aspx)
- [Windows Imaging File Format (WIM) white paper](http://go.microsoft.com/fwlink/?LinkId=92227)

## Usage

```js
var WIM = require( 'wim' )
```

### Read a WIM header

```js
var image = new WIM.Image()

image.open( 'sources.wim', function( error ) {
  if( error ) return handleError( error )
  image.readHeader( function( error, header ) {
    console.log( header )
  })
})
```

```js
Header {
  imageTag: 'MSWIM\u0000\u0000\u0000',
  size: 208,
  version: 68864,
  flags: 262274,
  compressedSize: 32768,
  guid: <Buffer 29 f7 36 06 03 77 e4 41 96 f8 1b b8 69 fd 49 7d>,
  partNumber: 1,
  partCount: 1,
  imageCount: 2,
  offsetTable: FileHeader {
     size: 461850,
     flags: 2,
     offset: 307668199,
     originalSize: 461850
  },
  xmlData: FileHeader {
    size: 3824,
    flags: 2,
    offset: 308130049,
    originalSize: 3824
  },
  bootMetadata: FileHeader {
     size: 920042,
     flags: 6,
     offset: 306748157,
     originalSize: 4555704
  },
  bootIndex: 2,
  integrity: FileHeader {
    size: 0,
    flags: 0,
    offset: 0,
    originalSize: 0
  },
  reserved: <Buffer 00 00 00 00 00 00 00 00 00 00 00 00 00  ... >
}
```

### CLI Usage
```
npx wim wimfile -h|-x|-m
  dump wimfile header, xml data or metadata
```

### CLI - read version from windows installation ISO 

ISO mount on filesystem is Linux-specific here.

```
mount win10.iso /mnt/win10/ -o loop
npx wim /mnt/win10/sources/install.wim -x | npx --package @toycode/xml2json-cli xml2json | jq -r .WIM.IMAGE[0].WINDOWS[0].SERVICINGDATA[0].PKEYCONFIGVERSION[0]
```

You get `10.0.19041.1202;2016-01-01T00:00:00Z` for instance.
