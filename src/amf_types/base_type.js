class AMFType {
  constructor(type) {
    this.type = type !== undefined ? new Buffer([type]) : new Buffer(0)
  }
  encode(buffer = new Buffer(0)) {
    return Buffer.concat([this.type, buffer])
  }
}

module.exports = AMFType