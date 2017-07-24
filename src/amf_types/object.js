var AMFType = require('./base_type')
var AMFString = require('./string')

const propertyEncoder = {
  encode: () => new Buffer(0)
}
const propertyDecoder = {
  decode: () => {}
}

class AMFObject extends AMFType {
  constructor(type, value = {}, options = { propertyEncoder, propertyDecoder, endType: 0x00 }) {
    super(type)
    this.value = value
    this.endType = options.endType
    this.propertyEncoder = options.propertyEncoder
    this.propertyDecoder = options.propertyDecoder
  }
  encode() {
    const keys = Object.keys(this.value)
    const properties = keys.map(key => Buffer.concat([
      new AMFString(undefined, key).encode(),
      this.propertyEncoder.encode(this.value[key])
    ]))
    return Buffer.concat([
      super.encode(Buffer.concat(properties)),
      new Buffer([0, 0, this.endType])
    ])
  }
  decode(buffer) {
    this.length = buffer.length
    this.value = this._decode(buffer.slice(1))
    return super.decode()
  }
  _decode(buffer, obj = {}) {
    if (!buffer.length) throw new Error('object truncated')
    const key = new AMFString().decode(Buffer.concat([Buffer.from([2]), buffer]))
    const remainingBuffer = buffer.slice(key.length - 1)
    if (!key.value && remainingBuffer[0] === this.endType) {
      this.length -= (remainingBuffer.length - 1)
      return obj
    }
    const value = this.propertyDecoder.decodeValue(remainingBuffer)
    obj[key.value] = value.value
    return this._decode(remainingBuffer.slice(value.length), obj)
  }
}

module.exports = AMFObject