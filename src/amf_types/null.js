var AMFType = require('./base_type')

class AMFNull extends AMFType {
  constructor(type) {
    super(type)
  }
  encode() {
    return super.encode()
  }
}

module.exports = AMFNull