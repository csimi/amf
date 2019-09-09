var AMFType = require('./base_type')

const TYPE_LENGTH = 1
const DOUBLE_LENGTH = 8
const TIMEZONE_LENGTH = 2

class AMFDate extends AMFType {
  constructor(type, value) {
    super(type)
    this.value = value
  }
  encode() {
    let buffer = Buffer.alloc(DOUBLE_LENGTH + TIMEZONE_LENGTH)
    buffer.writeDoubleBE(this.value)
    return super.encode(buffer)
  }
  decode(buffer) {
    this.value = new Date(buffer.readDoubleBE(1))
    return super.decode()
  }
  get length() {
    return TYPE_LENGTH + DOUBLE_LENGTH + TIMEZONE_LENGTH
  }
}

module.exports = AMFDate