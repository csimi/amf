class AMF {
  encode(...values) {
    let encodedValues = values.map(value => this.encodeValue(value))
    return Buffer.concat(encodedValues)
  }
  decode(buffer) {
    if (!buffer.length) return []
    const type = this.decodeValue(buffer)
    const remainingValues = this.decode(buffer.slice(type.length))
    return [type.value].concat(...remainingValues)
  }
  encodeValue(value) {
    return this.inferJSType(value).encode()
  }
  decodeValue(buffer) {
    return this.inferAMFType(buffer[0]).decode(buffer)
  }
  inferJSType(value) {
    switch (typeof value) {
      case "number": return this.handleNumber(value)
      case "boolean": return this.handleBoolean(value)
      case "string": return this.handleString(value)
      case "object":
        if (value === null) return this.handleNull()
        if (value instanceof Array) return this.handleArray(value)
        if (value instanceof Date) return this.handleDate(value)
        return this.handleObject(value)
      case "undefined": return this.handleUndefined()
    }
  }
  inferAMFType(int) {
    throw new Error("AMF type inference depends on version")
  }
  getEncoding(){
    throw new Error("encoding not set")
  }
  handleNumber(value) {
    throw new Error("cannot handle Number type")
  }
  handleBoolean(value) {
    throw new Error("cannot handle Boolean type")
  }
  handleString(value) {
    throw new Error("cannot handle String type")
  }
  handleNull() {
    throw new Error("cannot handle Null type")
  }
  handleArray(value) {
    throw new Error("cannot handle Array type")
  }
  handleDate(value) {
    throw new Error("cannot handle Date type")
  }
  handleObject(value) {
    throw new Error("cannot handle Object type")
  }
  handleUndefined() {
    throw new Error("cannot handle Undefined type")
  }
}

module.exports = AMF