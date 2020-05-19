const graphql = require("graphql");
const controllers = require("./controller");
const {
  GraphQLObjectType,
  GraphQLString,
  GraphQLSchema,
  GraphQLList,
} = graphql;
const YouthType = new GraphQLObjectType({
  name: "Youth",
  fields: () => ({
    id: { type: GraphQLString },
    Name: { type: GraphQLString },
    Date_of_Birth: { type: GraphQLString },
    Email: { type: GraphQLString },
    Telephone_1: { type: GraphQLString },
    Telephone_2: { type: GraphQLString },
    Address: { type: GraphQLString },
    Member: { type: GraphQLString },
    Gender: { type: GraphQLString },
    Marital_Status: { type: GraphQLString },
    Gender: { type: GraphQLString },
    Occupation: { type: GraphQLString },
    Place_of_Work: { type: GraphQLString },
    Course: { type: GraphQLString },
    Next_of_kin: { type: GraphQLString },
    Membership_Status: { type: GraphQLString },
    Dept: { type: GraphQLString },
    HFellowship: { type: GraphQLString },
  }),
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
        const test = controllers.getYouth(args.id);
        console.log(test);
        return test;
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
module.exports = new GraphQLSchema({
  query: RootQuery,
});
