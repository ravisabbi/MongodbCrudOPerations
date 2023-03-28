const mongoose = require('mongoose');
const modelEmpSchema = new mongoose.Schema({
_id:{
    type:Number,
    required:true
},
name:{
    type:String,
    required:true,
},
age:{
    type:Number,
    required:true
},
salary:{
    type:Number,
    required:true
}
},{versionKey:false} );

module.exports = mongoose.model("Employee",modelEmpSchema,"employee");