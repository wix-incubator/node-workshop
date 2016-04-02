"use strict";

function eventually(assertionFunc, timeout, delay, cb) {
  const startTime = new Date();
  const triggerWrapper = () => setTimeout(wrapper, delay);

  function wrapper() {
    if ((new Date()).getTime() - startTime.getTime() >= timeout)
      return cb(new Error("Timeout of eventually passed"));

    try {
      assertionFunc((err) => {
        if (err)
          return triggerWrapper();
        else
          return cb();
      })
    } catch(e) {
      return triggerWrapper();
    }
  }

  wrapper();
}

module.exports = function (assertionFunc, timeout, delay) {
  timeout = timeout || 10000
  delay = delay || 10
  return new Promise((fulfill, reject) => {
    eventually((assertCb) => {
      try {
        Promise.resolve(assertionFunc()).then(assertCb, assertCb);
      } catch (e) {
        assertCb(e);
      }
    }, timeout, delay, (err) => err ? reject(err) : fulfill());
  });
};
