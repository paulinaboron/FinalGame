class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
    }

    playButtonClick(){
        // let username = document.getElementById("usernameInput").value
        // console.log(username);
        // if(username != "abc123"){
            document.getElementById("neonBox").classList.add("hidden")
            // document.getElementById("waitingBox").classList.remove("hidden")
            game.startGame()
            
        // }
    }

}