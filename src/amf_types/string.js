var AMFType = require('./base_type')

class AMFString extends AMFType {
  constructor(type, value = '', options = { bitLength: 16 }) {
    super(type)
    this.value = value
    this.bitLength = options.bitLength
  }
  encodeLength() {
    let length = this.value.length
    let buffer = Buffer.alloc(this.bitLength/8)
    this.bitLength === 16
      ? buffer.writeUInt16BE(length)
      : buffer.writeUInt32BE(length)
    return buffer
  }
  encode() {
    const buffer = Buffer.from(this.value, 'utf8')
    const length = this.encodeLength()
    const value = Buffer.concat([length, buffer])
    return super.encode(value)
  }
  decode(buffer) {
    this.value = ''
    const length = this.bitLength === 16
      ? buffer.readUInt16BE(1)
      : buffer.readUInt32BE(1)
    this.value = buffer.slice(this.length, this.length + length).toString('utf8')
    return super.decode()
  }
  get length() {
    return 1 + this.bitLength/8 + this.value.length
  }
}

module.exports = AMFString