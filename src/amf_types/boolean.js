var AMFType = require('./base_type')

class AMFBoolean extends AMFType {
  constructor(type, value) {
    super(type)
    this.value = +value
  }
  encode() {
    let buffer = new Buffer(1)
    buffer.writeUInt8(this.value)
    return super.encode(buffer)
  }
  decode() {}
}

module.exports = AMFBoolean