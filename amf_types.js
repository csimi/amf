class AMFType {
  constructor(type) {
    this.type = new Buffer([type])
  }
  encode(buffer = new Buffer(0)) {
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
    const buffer = new Buffer(this.value, 'utf8')
    const length = this.encodeLength()
    const value = Buffer.concat([length, buffer])
    return super.encode(value)
  }
}

exports.AMFString = AMFString

class AMFNull extends AMFType {
  constructor(type) {
    super(type)
  }
  encode() {
    return super.encode()
  }
}

exports.AMFNull = AMFNull

class AMFArray extends AMFType {
  constructo(type, value, options = { encoder: array => new Buffer(array) }) {
    super(type)
    this.value = value
    this.encoder = options.encoder
  }
  encodeLength() {
    const buffer = new Buffer(4)
    buffer.writeUInt32BE(this.value.length)
    return buffer
  }
  encode() {
    const length = this.encodeLength()
    const value = Buffer.concat([length, this.encoder(this.value)])
    return super.encode(value)
  }
}

exports.AMFStrictArray = AMFStrictArray