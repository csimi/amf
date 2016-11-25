import AMF from './amf'
import { AMFDouble } from './amf_types'

class AMF0 extends AMF {
  handleNumber(value) {
    return new AMFDouble(value)
  }
  handleBoolean(value) {
    return new AMFBoolean(value)
  }
}

export default AMF0