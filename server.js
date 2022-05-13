const express = require('express')
const app = express()
const server = require('http').createServer(app)
const fs = require('fs');
var path = require("path")
const directoryPath = path.join(__dirname, 'static/models/nature');

app.use(express.static('static'))


app.get('/', (req, res) =>{
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

app.post("/GET_MODEL_FILES", (req, res)=>{
    fs.readdir(directoryPath, function (err, files) {
        if (err) {
            return console.log('Unable to scan directory: ' + err);
        } 
        files.forEach(function (file) {
            files.push(file)
        });

        res.send(files)
    });
})

server.listen(3000, ()=>{
    console.log("Server runnig on http://localhost:3000/");
})
