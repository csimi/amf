var AMFType = require('./base_type')

class AMFUndefined extends AMFType {
  constructor(type) {
    super(type)
  }
  encode() {
    return super.encode()
  }
  decode() {
    this.value = undefined
    return super.decode()
  }
  get length(){ return 1 }
}

module.exports = AMFUndefined