class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
    }

    playButtonClick(){
        let username = document.getElementById("usernameInput").value
        console.log(username);
        if(username == ''){     // do testowania (nic nie wpisuj do inputa), potem zmienić na logowanie
            document.getElementById("neonBox").classList.add("hidden")
            game.startGame()
            
        }else{
            document.getElementById("neonBox").classList.add("hidden")
            document.getElementById("waitingBox").classList.remove("hidden")
        }
    }

}