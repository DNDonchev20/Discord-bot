const mongoose = require('mongoose')

const db = mongoose.connection.useDb("bot")

const schema = new mongoose.Schema({
    user_id: String,
    warnings: Array,
})

module.exports = db.model("bot",schema, 'warnings');
