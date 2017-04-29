var AMF = require('./amf')
var types = require('./amf_types')

const AMF0_ENCODING = 0

class AMF0 extends AMF {
  handleNumber(value) {
    return new types.AMFDouble(AMF0.NUMBER, value)
  }
  handleBoolean(value) {
    return new types.AMFBoolean(AMF0.BOOLEAN, value)
  }
  handleString(value) {
    let type = AMF0.STRING
    let bitLength = 16
    const isLong = value.length >> bitLength
    if (isLong) {
      type = AMF0.STRING_LONG
      bitLength = 32
    }
    return new types.AMFString(type, value, { bitLength })
  }
  handleNull(value) {
    return new types.AMFNull(AMF0.NULL)
  }
  handleArray(value) {
    return types.AMFArray.isStrict(value)
      ? new types.AMFArray(AMF0.ARRAY_STRICT, value, { propertyEncoder: this })
      : new types.AMFObject(AMF0.ARRAY_ECMA, value, { propertyEncoder: this })
  }
  handleObject(value) {
    return new types.AMFObject(AMF0.OBJECT, value, { propertyEncoder: this, endType: AMF0.OBJECT_END })
  }
  
  get encoding() {
    return AMF0_ENCODING
  }

  static get NUMBER()       { return 0x00 }
  static get BOOLEAN()      { return 0x01 }
  static get STRING()       { return 0x02 }
  static get OBJECT()       { return 0x03 }
  static get NULL()         { return 0x05 }
  static get ARRAY_ECMA()   { return 0x08 }
  static get OBJECT_END()   { return 0x09 }
  static get ARRAY_STRICT() { return 0x0a }
  static get STRING_LONG()  { return 0x0c }
}

module.exports = AMF0
