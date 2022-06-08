class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
        document.getElementById("refreshIcon").onclick = this.refreshIconClick;
    }

    playButtonClick() {
        let username = document.getElementById("usernameInput").value
        console.log(username);
        if (username == '') {     // do testowania (nic nie wpisuj do inputa), potem usuniemy
            document.getElementById("usernameInput").style.display = "none"
            document.getElementById("neonBox").classList.add("hidden")
            document.getElementById("scoreDiv").classList.remove("hidden")
            document.getElementById("refreshIcon").classList.add("hidden")
            game.startGame()

        } else {        // zwykłe logowanie
            document.getElementById("usernameInput").style.display = "none"
            document.getElementById("neonBox").classList.add("hidden")
            document.getElementById("waitingBox").classList.remove("hidden")
            net.addUser()
        }
    }

    startGame() {
        document.getElementById("waitingBox").classList.add("hidden")
        document.getElementById("refreshIcon").classList.add("hidden")
        document.getElementById("scoreDiv").classList.remove("hidden")
        game.startGame()
    }

    updateScore() {
        document.getElementById("score").innerText = game.score + "/5"
        if (game.score == 5) {
            game.endGame()
        }
    }

    playerWon(){
        console.log('wygrałeś');
    }

    playerLost(){
        console.log('przegrałeś');
    }

    refreshIconClick(){
        fetch("/REFRESH", { method: "post" })
    }

}