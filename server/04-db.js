var express = require('express')
const {buildSchema} =require('graphql')
var { graphqlHTTP } = require('express-graphql');

//--------------------------------Connect database service--------------------------------
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost:27017/maizuo',{
    useNewUrlParser: true,
    useUnifiedTopology: true
})
//限制数据库这个集合表只能存三个字段
var FilmModel=mongoose.model("film",new mongoose.Schema({
        name:String,
        poster:String,
        price:Number
}))
//FilmModel.create
//FilmModel.find
//FilmModel.update
//FilmModel.delete
//------------------------------------------------------------

var Schema= buildSchema(`
    type Film{
        id:String,
        name:String,
        poster:String,
        price:Int
    }

    input FilmInput{
        name:String,
        poster:String,
        price:Int
    }

    type Query{
        getNowPlayingList:[Film]
    }

    type Mutation{
        createFilm(input:FilmInput):Film
        updateFilm(id:String!,input:FilmInput):Film
        deleteFilm(id:String!):Int
    }
`)

//处理器
const root ={
    getNowPlayingList(){
        return FilmModel.find()
    },
    createFilm({input}){
        var obj={...input,id:fakeDb.length+1}
        fakeDb.push(obj)
        return obj
    },
    createFilm({input}){
        return FilmModel.create({
            ...input,
        })
    },
    updateFilm({id,input}){
        return FilmModel.updateOne({
            _id:id
        },{
            ...input
        }).then(res=>FilmModel.find({_id:id})
        ).then(res=>res[0])
    },
    deleteFilm({id}){
        return FilmModel.deleteOne({_id:id}).then(res=>1)
    }
}

var app = express();

app.use('/graphql',graphqlHTTP({
    schema:Schema,
    rootValue:root,
    graphiql:true
}))

//静态资源目录
app.use(express.static("public"))
app.listen(3000)