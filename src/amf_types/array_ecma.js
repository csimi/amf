var AMFObject = require('./object')

class AMFArrayEcma extends AMFObject {
  decode(buffer) {
    this.arrayLength= buffer.readUInt32BE(1)
    const ecmaArray = super.decode(Buffer.concat([
      Buffer.from([3]),
      buffer.slice(5)
    ]))
    this.length += 4
    return ecmaArray
  }
}

module.exports = AMFArrayEcma