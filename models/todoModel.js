
const mongoose = require("mongoose");
const schema = mongoose.Schema;

const todoSchemea = new schema({
    todo : String
});

const todo = mongoose.model('todo',todoSchemea);

module.exports = todo;
