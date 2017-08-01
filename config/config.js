//เรียก production หรือ development
module.exports = require('./env/' + process.env.NODE_ENV + '.js');
