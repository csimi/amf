var AMF0 = require('./src/amf0')

var amf0 = new AMF0()
console.log(amf0.encode(30))
console.log(amf0.encode(true))
console.log(amf0.encode('Mike'))
console.log(amf0.encode(''))
console.log(amf0.encode(null))
console.log(amf0.encode({
  name: 'Mike', age: 30, alias: 'Mike'
}))