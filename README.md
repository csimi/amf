# rtmp-amf

Just create an instance for the version you need (0 or 3) to encode or decode:

```
const { AMF3 } = require('rtmp-amf')
const amf3 = new AMF3()

const amf3Buffer = amf3.encode('connect', 1)
const [command, streamId] = amf3.decode(amf3Buffer)
```
