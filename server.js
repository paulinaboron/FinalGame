const express = require('express')
const app = express()
const server = require('http').createServer(app)
const io = require('socket.io')(server, {cors: {origin: "*"}})
var path = require("path")

app.use(express.static('static'))

app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

server.listen(3000, ()=>{
    console.log("Server runnig on http://localhost:3000/");
})

io.on('connection', (socket) =>{
    console.log("User ID: ", socket.id);

    socket.on("message", (data) =>{
        console.log(data);
        socket.broadcast.emit("message", data)
    })



})