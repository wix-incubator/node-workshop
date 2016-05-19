/**
 * Write the server as a dual mode server (cli and module)
 * It should serve everything in dist from `/static` using express.static
 * And it should serve `client/index.html` from `/` by reading the 
 * file and writing it to the response stream
 */

/**
 * The next line is a dummy server so that `before` of tests won't fail
 * You should delete this next line before starting
 */
module.exports = require('express')()