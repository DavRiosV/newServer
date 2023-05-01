import express, { response } from 'express'
import manager from './users.js'

let server = express()

let PORT = 8080 

let ready = ()=> console.log('Server ready on port: '+PORT)

server.listen(PORT,ready)
server.use(express.urlencoded({extended:true}))

let index_route = '/'
let index_function = (req,res) => {
    let quantity = manager.read_users().length
    console.log(quantity)
    return res.send(`There're ${quantity} users`)
}
server.get(index_route,index_function) 

let one_route = '/users/:id';
let one_function = (req,res) => {
    let parametros = req.params
    let id = Number(parametros.id)
    //console.log(id)
    //console.log(typeof id)
    let one = manager.read_user(id)
    console.log(one)
    if (one){
        return res.send({
            success: true,
            users: one
    })
    } else {
        return res.send({
            success: false,
            users: 'Not found'
    })
}
}
server.get(one_route,one_function) 

let query_route = '/users'
let query_function = (req,res) =>{
    let quantity = req.query.quantity ?? 5 
    let users = manager.read_users().slice(0,quantity)
    if (users.length>0){
        return res.send({
            success: true,
            users
    })
    } else {
        return res.send({
            success: false,
            users: 'Not found'
    }) 
    }
}

server.get(query_route,query_function)