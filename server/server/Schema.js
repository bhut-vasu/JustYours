var mongoose = require("mongoose");
const productschema = new mongoose.Schema({
  name: {
    type: String,
  },
  email: {
    type: String,
  },
  reason: {
    type: String,
  },
  remarks: {
    type: String,
  },
});
module.exports = mongoose.model("Arcfit", productschema);
