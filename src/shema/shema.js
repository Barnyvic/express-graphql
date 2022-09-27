const { GraphQLObjectType, GraphQLID, GraphQLString, GraphQLSchema, GraphQLNonNull, GraphQLList, GraphQLEnumType } = require('graphql');

// importing from model
const Projects = require('../model/Projectmodel');
const Clients = require('../model/Clientmodule');

// Client type
const ClientType = new GraphQLObjectType({
    name: 'Clients',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        email: { type: GraphQLString },
        phoneNumber: { type: GraphQLString }
    })
});

// Project type
const ProjectType = new GraphQLObjectType({
    name: 'Project',
    fields: () => ({
        id: { type: GraphQLID },
        name: { type: GraphQLString },
        description: { type: GraphQLString },
        status: { type: GraphQLString },
        client: {
            type: ClientType,
            resolve(parent, args) {
                return Clients.findById(parent.clientId);
            }
        }
    })
});

// creating  RootQueryObject
const RootQuery = new GraphQLObjectType({
    name: 'RootQuery',
    fields: {
        // get all clients
        clients: {
            type: new GraphQLList(ClientType),
            resolve(parent, args) {
                return Clients.find();
            }
        },
        // Get one client
        client: {
            type: ClientType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Clients.findById(args.id);
            }
        },
        // get all Projects
        projects: {
            type: new GraphQLList(ProjectType),
            resolve(parent, args) {
                return Projects.find();
            }
        },
        // get a single project
        project: {
            type: ProjectType,
            args: { id: { type: GraphQLID } },
            resolve(parent, args) {
                return Projects.findById(args.id);
            }
        }
    }
});

// Mutation

const mutation = new GraphQLObjectType({
    name: 'mutation',
    fields: {
        // add a client
        addClient: {
            type: ClientType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phoneNumber: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Clients.create({
                    name: args.name,
                    email: args.email,
                    phoneNumber: args.phoneNumber
                });
            }
        },
        // delete a client
        deleteClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Clients.findByIdAndDelete(args.id);
            }
        },
        // Update a client
        updateClient: {
            type: ClientType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLString) },
                name: { type: new GraphQLNonNull(GraphQLString) },
                email: { type: new GraphQLNonNull(GraphQLString) },
                phoneNumber: { type: new GraphQLNonNull(GraphQLString) }
            },
            resolve(parent, args) {
                return Clients.findByIdAndUpdate({ _id: args.id }, { $set: { name: args.name, email: args.email, phoneNumber: args.phoneNumber } }, { new: true });
            }
        },
        // addProject
        addProject: {
            type: ProjectType,
            args: {
                name: { type: new GraphQLNonNull(GraphQLString) },
                description: { type: new GraphQLNonNull(GraphQLString) },
                status: {
                    type: new GraphQLEnumType({
                        name: 'ProjectStatus',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' }
                        }
                    }),
                    defaultValue: 'Not Started'
                },
                clientId: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                try {
                    const project = await new Projects({
                        name: args.name,
                        description: args.description,
                        status: args.status,
                        clientId: args.clientId
                    });
                    return project.save();
                } catch (error) {
                    console.log(error);
                }
            }
        },
        // Delete Project
        deleteProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) }
            },
            async resolve(parent, args) {
                return await Projects.findByIdAndDelete(args.id);
            }
        },
        // Update Project
        updateProject: {
            type: ProjectType,
            args: {
                id: { type: new GraphQLNonNull(GraphQLID) },
                name: { type: GraphQLString },
                description: { type: GraphQLString },
                status: {
                    type: new GraphQLEnumType({
                        // has to be Unquie
                        name: 'ProjectStatusUpdated',
                        values: {
                            new: { value: 'Not Started' },
                            progress: { value: 'In Progress' },
                            completed: { value: 'Completed' }
                        }
                    })
                }
            },
            async resolve(parent, args) {
                return await Projects.findByIdAndUpdate({ _id: args.id }, { $set: { name: args.name, description: args.description, status: args.status } }, { new: true });
            }
        }
    }
});

module.exports = new GraphQLSchema({
    query: RootQuery,
    mutation
});
