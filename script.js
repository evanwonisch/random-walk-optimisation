var canvas = document.getElementById("plot");
var ctx = canvas.getContext("2d");
var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;

network = new NeuralNetwork([2,10,1]);
console.log("Created Network\nParameter Space Dimensionality: " + network.getDimensionality());

var iterations = 0;
var deltaError = 0;
var step_size = 0.05;
var training_tensor = network.generateRandomTrainingTensor(step_size);
var trainingdata = [];



function generateTrainingData(){

    var x1  = Math.random()*5;
    var x2  = Math.random()*7-2;
    var x3  = Math.random()*10-5;
    var x4  = Math.random()*10-5;
    var x5  = Math.random()*10-5;

    for(var i = 0; i < 2000; i++){
        var x = Math.random() * 10 - 5;
        var y = Math.random() * 10 - 5;
    
        trainingdata[i] = {};
        trainingdata[i].data = [x, y/*, x*x, y*y, Math.sin(x), Math.sin(y)*/];
    
        if(x*x*x1-x2 +x5*x*x >= y*y +x*y*x3+y*x4){
            trainingdata[i].target = [1];
        }else {
            trainingdata[i].target = [0];
        }
    }
}

generateTrainingData();

setInterval(update, 1);
var keys = {};
var error_now = network.getGeneralError(trainingdata);
var error_before = error_now;

function update()
{
    if(keys.KeyR) {
        network.setRandom();
        iterations = 0;
        console.log("Network randomised");
    }

    if(keys.Space) {
        network.applyTrainingTensor(network.generateRandomTrainingTensor(1));
        console.log("Jumped");
    }
    
    if(keys.KeyN) {
        generateTrainingData();
        console.log("New Dataset");
        network.setRandom();
        iterations = 0;
        console.log("Network randomised");
    }

    advance();

    if(iterations%10==0){
        display();
    }
}

function advance(){
    iterations++;

    network.applyTrainingTensor(training_tensor);
    error_now = network.getGeneralError(trainingdata);

    deltaError = error_now - error_before;

    if(error_now <= error_before){

    } else {
        network.undoTrainingTensor(training_tensor);
        training_tensor = network.generateRandomTrainingTensor(step_size);
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
            ctx.fillStyle = toColour(network.calculate([i/10,j/10/*,(i*i/100),(j*j/100),Math.sin(i/100),Math.sin(j/100)*/]));
            ctx.fillRect(i*5+350,-j*5+350,4,4);
        }
    }

    

    for(var i = 0; i < trainingdata.length; i++){
        if(trainingdata[i].target == 0){
            ctx.fillStyle = "rgba(255,0,0.7,1)";
            ctx.fillRect(600+350+trainingdata[i].data[0]*50,350-trainingdata[i].data[1]*50,2,2);
        }
        if(trainingdata[i].target == 1){
            ctx.fillStyle = "rgba(100,100,255,1)";
            ctx.fillRect(600+350+trainingdata[i].data[0]*50,350-trainingdata[i].data[1]*50,2,2);
        }
    }

    ctx.fillStyle = "white";
    ctx.font = "20px Georgia";
    ctx.fillText("Error: " + error_now, 100,50);
    ctx.fillText("Iterations: " + iterations, 700,50);
    ctx.font = "16px Georgia";
    ctx.fillText("Space - Jump, R - randomise Network, N - new Data set",100,700);
    ctx.fillText("ΔError: "+Math.round(deltaError*10000000000)/10000000000+"/step",700, 700);
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