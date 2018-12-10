const mongoose = require("mongoose");
const schema = mongoose.Schema;

const cTodoSchema = new schema({
    todo : String
});

const completedTodoModel = mongoose.model('completedTodos',cTodoSchema);

module.exports = completedTodoModel;