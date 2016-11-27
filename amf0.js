// import AMF from './amf'
// import { AMFDouble } from './amf_types'

var AMF = require('./amf')
var AMFTypes = require('./amf_types')
var AMFDouble = AMFTypes.AMFDouble
var AMFBoolean = AMFTypes.AMFBoolean
var AMFString = AMFTypes.AMFString
var AMFNull = AMFTypes.AMFNull
var AMFArray = AMFTypes.AMFArray

const AMF0_TYPE_NUMBER = 0x00
const AMF0_TYPE_BOOLEAN = 0x01
const AMF0_TYPE_STRING = 0x02
const AMF0_TYPE_OBJECT = 0x03
const AMF0_TYPE_NULL = 0x05
const AMF0_TYPE_ECMA_ARRAY = 0x08
const AMF0_TYPE_OBJECT_END = 0x09
const AMF0_TYPE_STRICT_ARRAY = 0x0a
const AMF0_TYPE_LONG_STRING = 0x0c

class AMF0 extends AMF {
  handleNumber(value) {
    return new AMFDouble(AMF0_TYPE_NUMBER, value)
  }
  handleBoolean(value) {
    return new AMFBoolean(AMF0_TYPE_BOOLEAN, value)
  }
  handleString(value) {
    let type = AMF0_TYPE_STRING
    let bitLength = 16
    let isLong = value.length >> bitLength
    if (isLong) {
      type = AMF0_TYPE_LONG_STRING
      bitLength = 32
    }
    return new AMFString(type, value, { bitLength })
  }
  handleNull(value) {
    return new AMFNull(AMF0_TYPE_NULL)
  }
  handleArray(value) {
    const isStrict = keys => keys.reduce((isStrict, key) => isStrict && Number.isInteger(key), true)
    return isStrict(Object.keys(array))
      ? new AMFArray(AMF0_TYPE_STRICT_ARRAY, value, { encoder: array => this.encode(array) })
      : new AMFArray(AMF0_TYPE_ECMA_ARRAY, value, { encoder: array => new AMFObject(array) })
  }
}

//export default AMF0
module.exports = AMF0