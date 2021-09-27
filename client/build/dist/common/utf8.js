const utf8Encoder = new TextEncoder();
const utf8Decoder = new TextDecoder();
const utf8 = {
  encode(s) {
    return utf8Encoder.encode(s);
  },
  decode(b) {
    return utf8Decoder.decode(b);
  }
};
export default utf8;
