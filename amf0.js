// import AMF from './amf'
// import { AMFDouble } from './amf_types'

var AMF = require('./amf')
var AMFTypes = require('./amf_types')
var AMFDouble = AMFTypes.AMFDouble
var AMFBoolean = AMFTypes.AMFBoolean
var AMFString = AMFTypes.AMFString

class AMF0 extends AMF {
  handleNumber(value) {
    const type = 0x00
    return new AMFDouble(type, value)
  }
  handleBoolean(value) {
    const type = 0x01
    return new AMFBoolean(type, value)
  }
  handleString(value) {
    let type = 0x02
    let bitLength = 16
    let isLong = value.length >> bitLength
    if (isLong) {
      type = 0x0c
      bitLength = 32
    }
    return new AMFString(type, value, { bitLength })
  }
}

//export default AMF0
module.exports = AMF0