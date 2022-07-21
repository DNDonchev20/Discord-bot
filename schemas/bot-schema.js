const mongoose = require('mongoose')

const db = mongoose.connection.useDb("bot")

const schema = new mongoose.Schema({
    server_id: String,
    user_id: String,
    warning_message: Array,
})

module.exports = db.model("bot",schema, 'warnings');
