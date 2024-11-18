const mongoose = require('mongoose');

const Schema = mongoose.Schema({
  username:{
    type :String,
    required :true
  },
  password:{
    type :String,
    required :true
  },
  email:{
    type :String,
    required :true
  }
},{timesstamps:true});


module.exports=mongoose.model('User',Schema);