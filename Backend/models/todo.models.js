const mongoose=require("mongoose")
const todoSchemna=mongoose.Schema({
todoID:String,
todoText:String
}
)

const todoModel=mongoose.model("tasks", todoSchemna);
module.exports={todoModel};


