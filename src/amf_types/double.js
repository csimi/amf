var AMFType = require('./base_type')

const TYPE_LENGTH = 1
const DOUBLE_LENGTH = 8

class AMFDouble extends AMFType {
  constructor(type, value) {
    super(type)
    this.value = value
  }
  encode() {
    let buffer = new Buffer(8)
    buffer.writeDoubleBE(this.value)
    return super.encode(buffer)
  }
  decode(buffer) {
    this.value = buffer.readDoubleBE(1)
    return super.decode()
  }
  get length() {
    return TYPE_LENGTH + DOUBLE_LENGTH
  }
}

module.exports = AMFDouble