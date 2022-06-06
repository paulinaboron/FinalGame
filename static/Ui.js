class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
    }

    playButtonClick(){
        let username = document.getElementById("usernameInput").value
        console.log(username);
        if(username == ''){     // do testowania (nic nie wpisuj do inputa), potem zmienić na logowanie
            document.getElementById("usernameInput").style.display = "none"
            document.getElementById("neonBox").classList.add("hidden")
            document.getElementById("scoreDiv").classList.remove("hidden")
            game.startGame()
            
        }else{
            document.getElementById("usernameInput").style.display = "none"
            document.getElementById("neonBox").classList.add("hidden")
            document.getElementById("waitingBox").classList.remove("hidden")
        }
    }

    updateScore(){
        document.getElementById("score").innerText = game.score + "/5"
        if (game.score == 5) {
            game.playerWon()
        }
    }

}