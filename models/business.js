const mongoose = require('mongoose')
  
const businesschema = new mongoose.Schema({ 

  business_name: { type: String, required: true  },
  business_description: {type: String, required: true },
  created_date: {type: Date, default : Date.now, required : true}
  
}) 

module.exports = mongoose.model('business', businesschema)