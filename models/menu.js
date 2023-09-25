const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const MenuSchema = new Schema({
  restaurant_id: {
    type: Number,
    required: true,
  },
  menu: {
    type: Array,
    required: true,
  },
});

module.exports = mongoose.model("menu", MenuSchema, "menu");
