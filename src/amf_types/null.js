var AMFType = require('./base_type')

class AMFNull extends AMFType {
  constructor(type) {
    super(type)
  }
  encode() {
    return super.encode()
  }
  decode() {
    this.value = null
    return super.decode()
  }
  get length(){ return 1 }
}

module.exports = AMFNull