const {
  GraphQLObjectType,
  GraphQLInt,
  GraphQLString,
  GraphQLList,
  GraphQLSchema
} = require('graphql')
const Db = require('./db')

const Person = new GraphQLObjectType({
  name: 'Person',
  description: 'This represents a Person',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(person) { //what is invoked so GraphQl knows how to get the data
          return person.id
        }
      },
      firstName: {
        type: GraphQLString,
        resolve(person) {
          return person.firstName
        }
      },
      lastName: {
        type: GraphQLString,
        resolve(person) {
          return person.lastName
        }
      },
      email: {
        type: GraphQLString,
        resolve(person) {
          return person.email
        }
      }
    }
  }
})

const Post = new GraphQLObjectType({
  name: 'Post',
  description: 'This represents a Post',
  fields: () => {
    return {
      id: {
        type: GraphQLInt,
        resolve(post) {
          return post.id
        }
      },
      title: {
        type: GraphQLString,
        resolve(post) {
          return post.title
        }
      },
      content: {
        type: GraphQLString,
        resolve(post) {
          return post.content
        }
      }
    }
  }
})

// You have one root query
const Query = new GraphQLObjectType({
  name: 'Query',
  description: 'This is a root query',
  fields: () => {
    return {
      people: {
        type: new GraphQLList(Person),
        args: {
          id: {
            type: GraphQLInt
          },
          email: {
            type: GraphQLString
          }
        },
        resolve(root, args) {
          return Db.models.person.findAll({where: args})
        }

      }
    }
  }
})

const Schema = new GraphQLSchema({
  query: Query
})

module.exports.Schema = Schema;
