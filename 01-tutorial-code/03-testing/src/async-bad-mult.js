module.exports = (a, b, cb) => 
  process.nextTick(() => cb(null, Math.abs(a) * Math.abs(b)))