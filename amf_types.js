export class AMFDouble {
  constructor() {}
  encode(value) {
    let buffer = new Buffer(8)
    buffer.writeDoubleBE(value)
    return buffer
  }
  decode() {}
}

export class AMFBoolean {
  constructor() {}
  encode() {}
  decode() {}
}