// import AMF from './amf'
// import { AMFDouble } from './amf_types'

var AMF = require('./amf')
var AMFTypes = require('./amf_types')
var AMFDouble = AMFTypes.AMFDouble
var AMFBoolean = AMFTypes.AMFBoolean
var AMFString = AMFTypes.AMFString
var AMFNull = AMFTypes.AMFNull

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
  handleNull(value) {
    const type = 0x05
    return new AMFNull(type)
  }
  handleArray(value) {
    const isStrict = keys => keys.reduce((isStrict, key) => isStrict && Number.isInteger(key), true)
    return isStrict(Object.keys(array))
      ? new AMFArray(type, value, { encoder: array => this.encode(array) })
      : new AMFArray(type, value, { encoder: array => new AMFObject(array) })
  }
}

//export default AMF0
module.exports = AMF0