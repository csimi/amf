class AMFType {
  constructor(type) {
    this.type = type !== undefined ? Buffer.from([type]) : Buffer.alloc(0)
  }
  encode(buffer = Buffer.alloc(0)) {
    return Buffer.concat([this.type, buffer])
  }
  decode() {
    return this
  }
}

module.exports = AMFType