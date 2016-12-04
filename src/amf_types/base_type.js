class AMFType {
  constructor(type = new Buffer(0)) {
    this.type = new Buffer([type])
  }
  encode(buffer = new Buffer(0)) {
    return Buffer.concat([this.type, buffer])
  }
}

module.exports = AMFType