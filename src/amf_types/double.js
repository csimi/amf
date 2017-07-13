var AMFType = require('./base_type')

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
    return 9
  }
}

module.exports = AMFDouble