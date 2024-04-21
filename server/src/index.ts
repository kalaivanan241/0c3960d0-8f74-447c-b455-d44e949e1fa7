import { ApolloServer } from "@apollo/server";
import { startStandaloneServer } from "@apollo/server/standalone";
import { getData, getStatistics } from "./resolver/deviceUsages";
import { getDeviceById, getDevices } from "./resolver/devices";

const typeDefs = `#graphql
  # Comments in GraphQL strings (such as this one) start with the hash (#) symbol.

  # This "Book" type defines the queryable fields for every book in our data source.
  scalar DateTime @specifiedBy(url: "https://scalars.graphql.org/andimarek/date-time")

  type Device{
    id: Int!,
    name: String!,
    timezone: String!
  }

  type Statistics {
    carbonSaved: Float!,
    fuelSaved: Float!
  }

 type StatisticsData {
    total:Statistics!,
    monthlyAverage: Statistics!
 }

 type DataItem {    
    carbonSaved:Float!,
    fuelSaved:Float!
    date: DateTime!
 }

 type Data {
    statistics: StatisticsData!,
    data: [DataItem]
 }

  type Query {
    getDevices: [Device]!,
    getDeviceById(deviceId: Int!): Device!,
    savingStatistics(deviceId: Int): StatisticsData!,
    devicesSavingsData(deviceId: Int, from:DateTime!, to:DateTime!): Data
  }
`;

const resolvers = {
  Query: {
    savingStatistics: (_, args) => getStatistics(args),
    devicesSavingsData: (_, args) => getData(args),
    getDevices: getDevices,
    getDeviceById: (_, args) => getDeviceById(args),
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

// Passing an ApolloServer instance to the `startStandaloneServer` function:
//  1. creates an Express app
//  2. installs your ApolloServer instance as middleware
//  3. prepares your app to handle incoming requests
const { url } = await startStandaloneServer(server, {
  listen: { port: 4000 },
});

console.log(`🚀  Server ready at: ${url}`);
