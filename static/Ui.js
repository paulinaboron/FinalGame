class Ui {

    constructor() {
        console.log("ui");

        document.getElementById("playButton").onclick = this.playButtonClick;
    }

    playButtonClick(){
        let username = document.getElementById("usernameInput").value
        console.log(username);
        if(username){
            document.getElementById('spinnerIcon').classList.remove('hidden')
        }
    }

}