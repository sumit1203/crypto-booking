function encodeHex (s) {
  // utf8 to latin1
  s = unescape(encodeURIComponent(s));
  let h = '';
  for (let i = 0; i < s.length; i++) {
    h += s.charCodeAt(i).toString(16);
  }
  return h;
}

function decodeHex (hex) {
  let s = '';
  for (let i = 0; i < hex.length; i += 2) {
    s += String.fromCharCode(parseInt(hex.substr(i, 2), 16));
  }
  return decodeURIComponent(escape(s));
}

function isHex (value) {
  return typeof value === 'string' && /^[0-9a-fA-F]+$/.test(value);
}
module.exports = { isHex, encodeHex, decodeHex };
