var bufferEqual = require('buffer-equal')
var AMF0 = require('./src/amf0')

function hexString2Buffer(string) {
  var hexArray = []
  while(string.length > 0) {
    var hexByte = string.substring(0, 2)
    hexArray.push(parseInt("0x" + hexByte))
    string = string.slice(2)
  }
  return new Buffer(hexArray)
}

var amf0 = new AMF0()
var dumpCommand = "020007636f6e6e656374003ff000000000000003000361707002000c313233666c617368636861740008666c61736856657202000e57494e2031352c302c302c3138390005746355726c02001872746d703a3a32313933352f313233666c617368636861740004667061640100000c6361706162696c697469657300406de00000000000000b617564696f436f646563730040abee0000000000000b766964656f436f6465637300406f800000000000000d766964656f46756e6374696f6e003ff0000000000000000e6f626a656374456e636f64696e67004008000000000000000009"
var connectCommand = amf0.encode(
  'connect',
  1,
  {
    app: "123flashchat",
    flashVer: "WIN 15,0,0,189",
    tcUrl: "rtmp::21935/123flashchat",
    fpad: false,
    capabilities: 239,
    audioCodecs: 3575,
    videoCodecs: 252,
    videoFunction: 1,
    objectEncoding: 3
  }
)

console.log(bufferEqual(
  connectCommand,
  hexString2Buffer(dumpCommand)
))