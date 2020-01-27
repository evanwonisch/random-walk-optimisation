var canvas = document.getElementById("plot");
var ctx = canvas.getContext("2d");
var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;

network = new NeuralNetwork([2,10,10,1]);
var iterations = 0;
var training_tensor = network.generateRandomTrainingTensor(0.1);
var trainingdata = [];
// for(var i = 0; i < 4000; i++){
//     var x = Math.random() * 10 - 5;
//     var y = Math.random() * 10 - 5;

//     trainingdata[i] = {};
//     trainingdata[i].data = [x, y];

//     if( 2.5*(x*x*x) + x*x*x*x >= y){
//         trainingdata[i].target = [0];
//     } else {
//         trainingdata[i].target = [1];
//     }
// }

for(var i = 0; i < 4000; i++){
    var x = Math.random() * 10 - 5;
    var y = Math.random() * 10 - 5;

    trainingdata[i] = {};
    trainingdata[i].data = [x, y];

    if( x*x*x*0.5 >= y){
        trainingdata[i].target = [0];
    } else {
        trainingdata[i].target = [1];
    }
}

setInterval(update, 10);
var keys = {};
var error_now = network.getGeneralError(trainingdata);
var error_before = error_now;

function update()
{
    if(keys.KeyR) {
        network.setRandom();
    }

   advance();

    display();
}

function advance(){
    iterations++;

    network.applyTrainingTensor(training_tensor);
    error_now = network.getGeneralError(trainingdata);

    if(error_now <= error_before){

    } else {
        network.undoTrainingTensor(training_tensor);
        training_tensor = network.generateRandomTrainingTensor(0.1);
        error_now = network.getGeneralError(trainingdata);
        error_before = error_now;
    }

    error_before = error_now;
}

function display() {
    ctx.fillStyle = "black";
    ctx.fillRect(0,0,width,height);

    for(var i = -50; i < 50; i++){
        for(var j = -50; j < 50;j++){


            ctx.fillStyle = toColour(network.calculate([i/10,j/10]));
            //ctx.fillStyle="red";
            ctx.fillRect(i*5+350,-j*5+350,5,5);
        }
    }

    ctx.fillStyle = "rgba(255,0,0.7)";

    for(var i = 0; i < trainingdata.length; i++){
        if(trainingdata[i].target == 0){
            ctx.fillRect(350+trainingdata[i].data[0]*50,350-trainingdata[i].data[1]*50,2,2);
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Georgia";
    ctx.fillText("Error: " + error_now, 650,500);
    ctx.fillText("Iterations: " + iterations, 650,550);
}

function toColour(value){
    return "rgb(100,"+value*255+","+value*255+")";
}

document.addEventListener("keydown", e => {
    keys[e.code] = true;
});

document.addEventListener("keyup", e => {
    keys[e.code] = false;
});