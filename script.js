var canvas = document.getElementById("plot");
var ctx = canvas.getContext("2d");
var height = canvas.height = window.innerHeight;
var width = canvas.width = window.innerWidth;

network = new NeuralNetwork([6,4,3,1]);
var iterations = 0;
var step_size = 0.05;
var training_tensor = network.generateRandomTrainingTensor(step_size);
var trainingdata = [];

for(var i = 0; i < 4000; i++){
    var x = Math.random() * 10 - 5;
    var y = Math.random() * 10 - 5;

    trainingdata[i] = {};
    trainingdata[i].data = [x, y, x*x, y*y, Math.sin(x), Math.sin(y)];

    // if(x*y*10>=5-y*y){
    //     trainingdata[i].target = [1];
    // }else {
    //     trainingdata[i].target = [0];
    // }

     if(x<y*x){
        trainingdata[i].target = [1];
    }else {
        trainingdata[i].target = [0];
    }
}

setInterval(update, 1);
var keys = {};
var error_now = network.getGeneralError(trainingdata);
var error_before = error_now;

function update()
{
    if(keys.KeyR) {
        network.setRandom();
        iterations = 0;
    }

    if(keys.Space) {
        network.applyTrainingTensor(network.generateRandomTrainingTensor(1));
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


            ctx.fillStyle = toColour(network.calculate([i/10,j/10,(i*i/100),(j*j/100),Math.sin(i/100),Math.sin(j/100)]));
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
    ctx.fillText("Space - Jump, R - randomise",100,700);
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