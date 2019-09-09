var AMFType = require('./base_type')

class AMFArray extends AMFType {
  constructor(type, value, options = { propertyEncoder: () => Buffer.alloc(0) }) {
    super(type)
    this.value = value
    this.propertyEncoder = options.propertyEncoder
  }
  encodeLength() {
    const buffer = Buffer.alloc(4)
    buffer.writeUInt32BE(this.value.length)
    return buffer
  }
  encode() {
    const value = Buffer.concat([
      this.encodeLength(),
      this.propertyEncoder.encode(...this.value)
    ])
    return super.encode(value)
  }
}

module.exports = AMFArray