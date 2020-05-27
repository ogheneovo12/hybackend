const graphql = require("graphql");
const {  
    GraphQLString,
  } = graphql;

const youthObjectField = {
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
    Occupation: { type: GraphQLString },
    Place_of_Work: { type: GraphQLString },
    Course: { type: GraphQLString },
    Next_of_kin: { type: GraphQLString },
    Membership_Status: { type: GraphQLString },
    Dept: { type: GraphQLString },
    HFellowship: { type: GraphQLString },
}
module.exports =youthObjectField;