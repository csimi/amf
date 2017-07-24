var assert = require('assert'),
    bufferEqual = require('buffer-equal')

var AMF0 = require('../src/amf0'),
    amf0 = new AMF0()

var rawCommand = require('./mocks/connect_raw'),
    connectCommand = require('./mocks/connect_js'),
    encodedCommand = amf0.encode(...connectCommand),
    decodedCommand = amf0.decode(rawCommand)

assert(bufferEqual(encodedCommand, rawCommand))
assert.deepStrictEqual(decodedCommand, connectCommand)