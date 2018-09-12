const card = require('./card');
const user = require('./user');

const { feenicia } = require('./feenicia');

feenicia.card = card;
feenicia.user = user;

module.exports = feenicia