
class Net {

    constructor() {
        console.log("net");
    }

    addUser(){
        fetch("/ADD_USER", { method: "post" })
            .then(response => response.json())
            .then(
                data => {
                    console.log(data);

                    if(data == "2"){
                        ui.startGame()
                    }else if(data == "1"){

                        var interval = setInterval(function () {

                            const body = JSON.stringify({ w: 1 })
                            const headers = { "Content-Type": "application/json" }

                            fetch("/GET_NR_OF_PLAYERS", { method: "post", body, headers })
                                .then(response => response.json())
                                .then(
                                    data => {
                                        console.log(data, "data")
                                        if (data == "2") {
                                            clearInterval(interval)
                                            ui.startGame()
                                        }
                                    }
                                )

                        }, 1000);
                    }

                })
    }

}

