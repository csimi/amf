class AMFType {
  constructor(type) {
    this.type = new Buffer([type])
  }
  encode(buffer) {
    return Buffer.concat([this.type, buffer])
  }
}

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
  decode(buffer) {}
}

exports.AMFDouble = AMFDouble

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

exports.AMFBoolean = AMFBoolean

class AMFString extends AMFType {
  constructor(type, value, options = { bitLength: 16 }) {
    super(type)
    this.value = value
    this.bitLength = options.bitLength
  }
  encodeLength() {
    let length = this.value.length
    let buffer = new Buffer(this.bitLength/8)
    this.bitLength === 16
      ? buffer.writeUInt16BE(length)
      : buffer.writeUInt32BE(length)
    return buffer
  }
  encode() {
    let buffer = new Buffer(this.value, 'utf8')
    let length = this.encodeLength()
    return super.encode(Buffer.concat([length, buffer]))
  }
}

exports.AMFString = AMFString