var AMF = require('./amf')
var types = require('./amf_types')

const AMF0_ENCODING = 0

class AMF0 extends AMF {
  inferAMFType(code) {
    switch(code) {
    case AMF0.NUMBER:
        return new types.AMFDouble(code)
    case AMF0.BOOLEAN:
      return new types.AMFBoolean(code)
    case AMF0.STRING:
      return new types.AMFString(code, '', { bitLength: 16 })
    case AMF0.STRING_LONG:
      return new types.AMFString(code, '', { bitLength: 32 })
    case AMF0.NULL:
      return new types.AMFNull(code)
    case AMF0.UNDEFINED:
      return new types.AMFUndefined(code)
    case AMF0.ARRAY_STRICT:
      return new types.AMFArray(code, [], { propertyEncoder: this })
    case AMF0.ARRAY_ECMA:
      return new types.AMFArrayEcma(code, {}, { propertyEncoder: this, propertyDecoder: this, endType: AMF0.OBJECT_END })
    case AMF0.OBJECT:
      return new types.AMFObject(code, {}, { propertyEncoder: this, propertyDecoder: this, endType: AMF0.OBJECT_END })
    }
  }
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
  handleUndefined(value) {
    return new types.AMFUndefined(AMF0.UNDEFINED)
  }
  handleArray(value) {
    return types.AMFArray.isStrict(value)
      ? new types.AMFArray(AMF0.ARRAY_STRICT, value, { propertyEncoder: this })
      : new types.AMFObject(AMF0.ARRAY_ECMA, value, { propertyEncoder: this })
  }
  handleObject(value) {
    return new types.AMFObject(AMF0.OBJECT, value, { propertyEncoder: this, propertyDecoder: this, endType: AMF0.OBJECT_END })
  }

  get encoding() {
    return AMF0_ENCODING
  }
}

AMF0.NUMBER       = 0x00
AMF0.BOOLEAN      = 0x01
AMF0.STRING       = 0x02
AMF0.OBJECT       = 0x03
AMF0.NULL         = 0x05
AMF0.UNDEFINED    = 0x06
AMF0.ARRAY_ECMA   = 0x08
AMF0.OBJECT_END   = 0x09
AMF0.ARRAY_STRICT = 0x0a
AMF0.STRING_LONG  = 0x0c

module.exports = AMF0
