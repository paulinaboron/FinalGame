const express = require('express')
const app = express()
const fs = require('fs');
var path = require("path")
const bp = require('body-parser')
const directoryPath = path.join(__dirname, 'static/models/nature');
app.use(express.static(__dirname + '/static'))
app.use(bp.json())
app.use(bp.urlencoded({ extended: true }))


// Przesłanie pliku index.html
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname + "/static/index.html"))
})

// Baza danych z położeniem robaczków
const Datastore = require('nedb');
const bugPositions = new Datastore({
    filename: 'data.db',
    autoload: true
});

bugPositions.remove({}, { multi: true }, function (err, numRemoved) {
});

const data = [
    [-40, -40, { r: 1, g: 1, b: 1 }],
    [-40, 40, { r: 1, g: 1, b: 0 }],
    [40, 40, { r: 0, g: 0, b: 1 }],
    [40, -40, { r: 1, g: 1, b: 1 }],
    [0, 47, { r: 1, g: 1, b: 0 }],
    [-3, 30, { r: 0, g: 0, b: 1 }],
    [2, -15, { r: 1, g: 1, b: 1 }],
    [30, -20, { r: 1, g: 1, b: 0 }],
    [-30, 3, { r: 0, g: 0, b: 1 }],
    [-15, 10, { r: 1, g: 1, b: 1 }],
]

const doc = {
    data: JSON.stringify(data)
};

bugPositions.insert(doc, function (err, newDoc) {
    if (err) {
        console.log(err);
    }
});

// przesłanie danych z położenie robaczków
app.post("/GET_BUG_POSITIONS", (req, res) => {
    bugPositions.findOne({}, function (err, doc) {
        res.send(JSON.parse(doc.data))
    });
})

// Przesłanie plików modeli z folderu models/nature
app.post("/GET_MODEL_FILES", (req, res) => {
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

let players = []

// Dodawanie gracza przy logowaniu (jeszcze tego nie używamy)
app.post("/ADD_USER", (req, res) => {
    if (players.length == 0) {
        players[0] = 'player1'
        res.send("1")
    } else if (players.length == 1) {
        players[1] = 'player2'
        res.send("2")
    } else {
        res.send("3")
    }
})

// Zwraca liczbę graczy
app.post("/GET_NR_OF_PLAYERS", (req, res) => {
    res.send(JSON.stringify(players.length))
})

// Refresh tablicy graczy
app.post("/REFRESH", (req, res) => {
    players = []
    gameEnded = false
    caughtBug = null
    res.end()
})

// Ostatnio złapany robaczek
let caughtBug = null
let gameEnded = false

app.post("/END_GAME", (req, res) => {
    gameEnded = req.body.gameEnded
    res.end()
})
app.post("/BUG_CAUGHT", (req, res) => {
    caughtBug = req.body.bug
    res.end()
})
app.post("/GET_CAUGHT_BUG", (req, res) => {
    res.send(JSON.stringify({ bug: caughtBug, gameEnded: gameEnded }))
})

app.listen(process.env.PORT || 3000, () => {
    console.log("Server runnig on http://localhost:3000/");
})
