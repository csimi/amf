var AMFType = require('./base_type')

class AMFBoolean extends AMFType {
  constructor(type, value) {
    super(type)
    this.value = value
  }
  encode() {
    let buffer = Buffer.alloc(1)
    buffer.writeUInt8(+this.value)
    return super.encode(buffer)
  }
  decode(buffer) {
    this.value = !!buffer.readUInt8(1)
    return super.decode()
  }
  get length() {
    return 2
  }
}

module.exports = AMFBoolean