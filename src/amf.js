class AMF {
  encode(...values) {
    let encodedValues = values.map(value => this.inferType(value).encode())
    return Buffer.concat(encodedValues)
  }
  decode(buffer) {}
  inferType(value) {
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