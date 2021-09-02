/*const ws = new WebSocket("ws://localhost:8082");

ws.addEventListener("open", () => {
    console.log("We are connected!");
});*/

var current_answer = "";

var p_1 = 0;
var p_2 = 0;
var p_3 = 0;
var p_4 = 0;

var order = [];
var buzzing = false;
var onplayer = 0;

function getArticle() {
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = function() {
        if (this.readyState == 4 && this.status == 200) {
            var page = xhttp.response;
            document.getElementById("question").innerHTML = page[0].question;
            current_answer = page[0].answer.replace(/[/()]/g, "");
            
        }
    };
    url = "https://jservice.io/api/random?count=1";
    xhttp.open("GET", url, true);
    xhttp.responseType = 'json';
    xhttp.send();
}

function buzz1() {
    order.push(1);
    document.getElementById("buzzorder").innerHTML = "Buzz Order: " + order.toString();
    if(order.length == 4) {
        listen();
    }
}
function buzz2() {
    order.push(2);
    document.getElementById("buzzorder").innerHTML = "Buzz Order: " + order.toString();
    if(order.length == 4) {
        listen();
    }
}
function buzz3() {
    order.push(3);
    document.getElementById("buzzorder").innerHTML = "Buzz Order: " + order.toString();
    if(order.length == 4) {
        listen();
    }
}
function buzz4() {
    order.push(4);
    document.getElementById("buzzorder").innerHTML = "Buzz Order: " + order.toString();
    if(order.length == 4) {
        listen();
    }
}

getArticle();

function reset() {
    order = [];
    onplayer = 0;
    getArticle();
    document.getElementById("correct").innerHTML = "";
    document.getElementById("answers").innerHTML = "";
    document.getElementById("buzzorder").innerHTML = "Buzz Order: ";
}


function listen() {
    num = order[onplayer];

    // start recognition
    var SpeechRecognition = SpeechRecognition || webkitSpeechRecognition;
    var recognition = new SpeechRecognition();
                
    // This runs when the speech recognition service starts
    recognition.onstart = function() {
        document.getElementById("correct").innerHTML = "Waiting for a response...";
    };

    recognition.onspeechend = function() {
        // when user is done speaking
        recognition.stop();
    }


    // This runs when the speech recognition service returns result
    recognition.onresult = function(event) {
        var transcript = event.results[0][0].transcript;
        document.getElementById("answers").innerHTML = transcript;
        if(transcript == current_answer) {
            document.getElementById("correct").innerHTML = "Correct!";
            if(num == 1) {
                p_1 += 1;
                document.getElementById("player1").innerHTML = "Player One: " + p_1;
            } else if(num == 2) {
                p_2 += 1;
                document.getElementById("player2").innerHTML = "Player Two: " + p_2;
            }else if(num == 3) {
                p_3 += 1;
                document.getElementById("player3").innerHTML = "Player Three: " + p_3;
            }else if(num == 4) {
                p_4 += 1;
                document.getElementById("player4").innerHTML = "Player Four: " + p_4;
            }
            setTimeout(reset, (3 * 1000));
        } else {
            if (onplayer == 3) {
                document.getElementById("correct").innerHTML = "Incorrect. Answer was: " + current_answer;

                setTimeout(reset, (3 * 1000));
            } else {
                onplayer += 1;
                listen();
            }
        }
    };

    recognition.start();
}
