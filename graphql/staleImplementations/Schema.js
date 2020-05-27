const graphql = require("graphql");
const { buildSchema } = require("graphql");
const controllers = require("../controller");
const youthObjectField = require("./fieldsObject");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
  GraphQLInputObjectType,
  GraphQLNonNull
} = graphql;
const youthInput = new GraphQLInputObjectType({
  name: "YouthInput",
  fields: () => ({...youthObjectField})
})
const YouthType = new GraphQLObjectType({
  name: "Youth",
  fields: () => ({...youthObjectField})
});
const Birthdays = new GraphQLObjectType({
  name: "Birthdays",
  fields: () => ({
    month: { type: new GraphQLList(YouthType) },
    week: { type: new GraphQLList(YouthType) },
    today: { type: new GraphQLList(YouthType) },
  }),
});
const RootQuery = new GraphQLObjectType({
  name: "RootQueryType",
  fields: {
    youth: {
      type: YouthType,
      args: { id: { type: GraphQLString } },
      resolve(parent, args) {
        return controllers.getYouth(args.id);  
      },
    },
    youths: {
      type: GraphQLList(YouthType),
      resolve(parent, args) {
        return controllers.getAllYouths();
      },
    },
    birthdays: {
      type: Birthdays,
      resolve(parents, args) {
        return {
          month: controllers.getMonthBirthday(),
          week: controllers.getWeekBirthday(),
          today: controllers.getDayBirthday(),
        };
      },
    },
  },
});
const Mutation = new GraphQLObjectType({
  name:"Mutation",
  fields:{
      addYouth:{
        type:YouthType,
        args:{
          input: {
            type: new GraphQLNonNull(youthInput),
        },
        },
        resolve(parent,args){
          return controllers.addYouth(args);
        }
      }
  }
})
module.exports = new GraphQLSchema({
  query: RootQuery,
  mutation:Mutation
});
