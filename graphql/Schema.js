const { buildSchema } = require("graphql");
const controllers = require("./controller");
const youthObjectField = require("./newSchemaObjectField");
const newSchema = buildSchema(`
type response{
    id:ID!,
    message:String!,
    success:Boolean!
}
input createYouth{  
    ${youthObjectField}
}
type Youth{
    ${youthObjectField}
}
type Birthdays{
    today:[Youth],
    week:[Youth],
    month:[Youth]
}
 type Query{
    youth(id:ID!):Youth,
    youths:[Youth],
    birthdays:Birthdays
 }
 type Mutation{
  createYouth(input:createYouth!):Youth
  updateYouth(id:ID!,input:createYouth):Youth
  deleteYouth(id:ID!):response
 }

`)

const root ={
    youth:({id})=>controllers.getYouth(id),
    youths:()=>controllers.getAllYouths(),
    birthdays:()=>{
        return {
            month: controllers.getMonthBirthday(),
            week: controllers.getWeekBirthday(),
            today: controllers.getDayBirthday(),
          };
    },
    createYouth:({input})=>controllers.addYouth(input),
    updateYouth:({id,input})=>controllers.updateYouth(id,input),
    deleteYouth:({id})=>controllers.deleteYouth(id)

}

module.exports = {newSchema,root}