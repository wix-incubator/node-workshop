/**
 * Write the server as a dual mode server (cli and module)
 * It should render everything in dist from `/static`.
 * And it should render `client/index.html` from `/`
 */

/**
 * Dummy server so that `before` of tests won't fail
 * You should delete this line before starting
 */
module.exports = require('express')()