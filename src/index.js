const express = require("express")
require("dotenv").config()
const {graphqlHTTP} = require("express-graphql")
const shema = require("./shema/shema")


const Port = process.env.PORT || 5050

const app = express()


app.use("/graphql",graphqlHTTP({
    schema: shema,
    graphiql:true
}))


app.listen(Port, ()=>{
    console.log(`Server running on port ${Port}`)
})

