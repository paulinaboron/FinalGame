const socket = io('http://localhost:3000/')

socket.on('connection')

const sendMessage = () =>{
    let msg = document.getElementById("msg").value
    socket.emit("message", msg)
}

socket.on("message", (data) =>{
    document.getElementById("header").innerHTML = data
})

window.onload = () => {
    scenery = new Scenery();
}