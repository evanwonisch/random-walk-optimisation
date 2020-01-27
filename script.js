Plot.addPlot("Error",-1000,0,2000,500,"iterations","error");
Plot.addPlot("Distance to Stuck",-1000,550,2000,500,"iterations","d(stuck)");
Plot.addPlot("Result",1200,0,600,600,"x","y");

var max_error = 0.1;
var stepSize = 0.3;
var max_stuck = 50;
var minimumRate = 0.00001;
var max_iterations = 20000;
var min_distance_to_Minima = 10;

network = new NeuralNetwork([2,3,3,1]);

// var xhttp = new XMLHttpRequest();
// xhttp.open("GET", "data.json", false);
// xhttp.send();
// var data = JSON.parse(xhttp.responseText);

// network.weightsMatrixes = data.weightsMatrixes;
// network.biasVectors = data.biasVectors;

//Test

var trainingdata = [];

for(var i = 0; i < 4000; i++){
    var x = Math.random() * 10 - 5;
    var y = Math.random() * 10 - 5;

    trainingdata[i] = {};
    trainingdata[i].data = [x, y];

    if( 2.5*(x*x*x) + x*x*x*x >= y){
        trainingdata[i].target = [0];
        Plot.addPoint("Result", [x,y]);
    } else {
        trainingdata[i].target = [1];
    }
}


var result = network.train(trainingdata, max_error, stepSize, minimumRate, max_stuck, max_iterations, min_distance_to_Minima);


Plot.addLine("Error", "x", max_error);
Plot.addLine("Distance to Stuck","x",min_distance_to_Minima);

Plot.drawPlot("Error", 1000 / result.iterations, 200);
Plot.drawPlot("Distance to Stuck", 1000 / result.iterations, 1/2);


for(var i = -100; i < 100; i++){
    var j = - 100;
    while(network.calculate([i/20,j/20]) <= 0.5 && j <= 100){
        j ++;
        Plot.addPoint("Result", [i/20,j/20]);
    }

}

Plot.drawPlot("Result", 50,50);


// var obj = {"weightsMatrixes" : network.weightsMatrixes,
//             "biasVectors": network.biasVectors
// };

// var data = "text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(obj));

// var a = document.createElement('a');
// a.href = 'data:' + data;
// a.download = 'data.json';
// a.innerHTML = 'download JSON';
// a.click();

