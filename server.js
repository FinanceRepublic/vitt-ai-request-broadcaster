const express = require('express');
const app = express()
const server = require('http').createServer(app)
const cors = require('cors');
let PORT = process.env.PORT || 5000

app.use(cors({
    origin:'*'
}))
app.use(express.json())
app.use(express.urlencoded({extended:true}))

let io = require('socket.io')(server,{
    cors:{
        origin:'*'
    }
})

// socket.on('connection',()=>{
//     setInterval(()=>{
//         if(data.length>0){
//         io.emit('receive-data',data)
//             data=[]
//     }
//     },1000)
//     console.log(`connected with`,socket.id)
// })

// app.get('/receiveData',(req,res)=>{
//     console.log("runned")
//     if(data.length > 0){
//     res.json(data)
//     data = []
//     }
//     else
//     res.json(null)

// })

let mysocket 
let id 
let keys = {}
io.on('connection',socket=>{
    //mysocket = socket
    
    socket.on('join-room',(roomId,id)=>{
        keys[roomId] = id
        console.log('join-room',roomId)
       // socket.join(socket.id)
        //socket.broadcast.emit('receive-data',"123456789")
        //socket.to(id).emit('receive-data', {msg: 'hello world.'})
        //console.log(keys) 
    })

    socket.on('disconnect',()=>{
        console.log('closed',socket.id)
    })
})

app.post('/sendData',async (req,res)=>{
    //to check responses coming
    //let date = new Date();
    
    //console.log(date.toTimeString(),date.toDateString(),req.body);
    //console.log(keys[req.body.sessionid])
    
    //if(keys[req.body.sessionid])
    //   io.to(keys[req.body.sessionid]).emit('receive-data',req.body);
   // let sockets = await io.fetchSockets();
   // console.log(sockets[0].nsp.sockets)

    //let iterator = sockets[0].adapter.rooms.get(req.body.sessionid).keys()
    //let val = iterator.next().value
   // console.log(val)
    //io.to(val.toString()).emit('receive-data',req.body);
    //if(val)
    //io.emit('receive-data',"minority");
   
   // console.log(val)
    io.emit('receive-data', req.body);
    
    res.sendStatus(200)
})
server.listen(PORT ,()=>console.log(`server is live ${PORT}`))


