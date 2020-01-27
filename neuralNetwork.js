class Matrix {

    //Matrix multiplication
    static multiply(matrix, vector){ 
        if(matrix[0].length==vector.length){
            var result = [];
            for(var i=0;i<matrix.length;i++){
                var sum =0;
                for(var j=0;j<matrix[0].length;j++){
                    sum+=matrix[i][j]*vector[j];
                }
                result[i] = sum;
            }
            return result;
        }
        else {
            console.log("Wrong dimensions!");
        }
    }

    //Vector addition
    static vectorAdd(vector, addend){
        var result = [];
        if(vector.length == addend.length) {
            for(var i=0;i<vector.length;i++){
                result[i] = parseFloat(vector[i]) + parseFloat(addend[i]);
            }
            return result;
        }
        else {
            console.log("Wrong dimensions!");
        }
    }

    //Matrix addition
    static matrixAdd(matrix1, matrix2){
        var result = [];
        if(matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length) {
            for(var i=0;i<matrix1.length;i++) {
                result[i] = [];
                for(var j =0;j<matrix1[0].length;j++){
                    result[i][j] = matrix1[i][j]+matrix2[i][j];
                }
            }
            return result;
        }
        else {
            console.log("Wrong dimensions!");
        }
    }

     //Vector substraction
     static vectorSubstract(vector, subtractor){
         var result = [];
        if(vector.length == subtractor.length) {
            for(var i=0;i<vector.length;i++){
                result[i] = parseFloat(vector[i]) - parseFloat(subtractor[i]);
            }
            return result;
        }
        else {
            console.log("Wrong dimensions!");
        }
    }

     //Matrix substraction
     static matrixSubstract(matrix1, matrix2){
        var result = [];
        if(matrix1.length == matrix2.length && matrix1[0].length == matrix2[0].length) {
            for(var i=0;i<matrix1.length;i++) {
                result[i] = [];
                for(var j =0;j<matrix1[0].length;j++){
                    result[i][j] = matrix1[i][j] - matrix2[i][j];
                }
            }
            return result;
        }
        else {
            console.log("Wrong dimensions!");
        }
    }

    //Scalar Product
    static vectorScalarProduct(vector1, vector2) {
        var result = 0;
        if(vector1.length == vector2.length){
            for(var i = 0; i < vector1.length; i++) {
                    result += vector1[i] * vector2[i];
            }
            return result;
        } else {
            console.log("Wrong dimensions!");
        }
    }

    //Matrix Scalar Product
    static matrixScalarProduct(matrix1, matrix2) {
        var result = 0;
        if(matrix1.length == matrix2.length) {

            for(var i = 0; i < matrix1.length; i++){
                result += this.vectorScalarProduct(matrix1[i], matrix2[i]);
            }
            return result;

        } else {
            console.log("Wrong dimensions!");
        }
    }

    //Norm
    static vectorNorm(vector) {
        var scalar_product = Matrix.vectorScalarProduct(vector, vector);
        var result = Math.sqrt(scalar_product);
        return result;
    }

    //Matrix "Norm"
    static matrixNorm(matrix) {
        var scalar_product = Matrix.matrixScalarProduct(matrix, matrix);
        var result = Math.sqrt(scalar_product);
        return result;
    }

    //Transposing Matrix
    static transposeMatrix(matrix)
    {
        var result = Matrix.create(matrix[0].length, matrix.length);
        for(var i=0;i<matrix.length;i++) {
            for(var j=0;j<matrix[0].length;j++) {
                result[j][i] = matrix[i][j];
            }
        }

        return result;
    }

    //Creating Matrix or Vector filled with 0
    static create(rows, cols){
        var data = [];
        for(var i = 0; i < rows; i++)
        {
            if(cols==0) {
                data[i] = 0;
            }
            else {
                data[i] = [];
                for(var j = 0; j < cols; j++) {
                    data[i][j] = 0;
                }
            }
        }
        return data;
    }

    //Creating random Matrix or Vector
    static createRandom(rows, cols, maxValue){
        var data = [];
        for(var i = 0; i < rows; i++)
        {
            if(cols==0) {
                data[i] = Math.random()*maxValue;
            }
            else {
                data[i] = [];
                for(var j = 0; j < cols; j++) {
                    data[i][j] = Math.random() * 2 * maxValue - maxValue;
                }
            }
        }
        return data;
    }

    //Randomising a given Vector 
    static randomiseVector(vector, maxValue) {
        for(var i=0;i<vector.length;i++) {
            vector[i] = Math.random() * maxValue * 2 - maxValue;
        }
    }

    //Randomising a given Matrix
    static randomiseMatrix(matrix, maxValue) {
        for(var i = 0;i < matrix.length; i++) {
            for(var j = 0;j<matrix[0].length;j++) {
                matrix[i][j] =  Math.random() * maxValue * 2 - maxValue;
            }
        }
    }

    //Copying Matrix
    static copyMatrix(matrix)
    {
        var result = [];
        for(var i = 0; i < matrix.length; i++) {
            result[i] = [];
            for(var j = 0; j < matrix[0].length; j++){
                result[i][j] = matrix[i][j];
            }
        }
        return result;
    }

    //Copying Vector
    static copyVector(vector)
    {
        var result = [];
        for(var i = 0; i < vector.length; i++) {
            result[i] = vector[i];
        }
        return result;
    }
}

//dimensioms = [2,3,4,5,1];
class NeuralNetwork {
    constructor(dimensions) {

        this.dimensions = dimensions;
        this.layers = [];

        for(var i = 0; i < dimensions.length; i++) {
            this.layers[i] = Matrix.create(dimensions[i], 1);
            
        }

        this.weightsMatrixes = [];

        for(var i = 0; i < dimensions.length - 1; i++){
            this.weightsMatrixes[i] = Matrix.create(dimensions[i + 1], dimensions[i]);
        }

        this.biasVectors = [];

        for(var i = 0; i < dimensions.length - 1; i++) {
            this.biasVectors[i] = Matrix.create(dimensions[i + 1], 1);
        }

        this.setRandom();
    }

    //Feedforward Algorithmn
    calculate(input) {

        if(input.length == this.layers[0].length){
            this.layers[0] = input;
        } else {
            console.log("Wrong dimensions!");
            return;
        }


        //Feedforward

        for(var i = 1; i < this.layers.length; i++){
            this.layers[i] = this.activation(Matrix.vectorAdd(Matrix.multiply(this.weightsMatrixes[i - 1],this.layers[i-1]), this.biasVectors[i-1]));
        }

        return this.layers[this.layers.length - 1];
    }

    //Randomises Weights and Balances
    setRandom(){
        
        for(var i = 0; i < this.weightsMatrixes.length; i++) {
            Matrix.randomiseMatrix(this.weightsMatrixes[i], 10);
        }

        for(var i = 0; i < this.biasVectors.length; i++ ){
            Matrix.randomiseVector(this.biasVectors[i], 10);
        }
    }

    //Implemented Activation Function
    activation(vector) {
        var result = [];
        for (var i = 0; i < vector.length; i++){
            result[i] = 1/(1 + Math.exp( -vector[i]));
        }
        return result;
    }

    //Generates Random Trainingdata Object Array
    // trainingdata = [{data: [], target: []}, ...];
    generateRandomTrainingData(amount) {

        var trainingdata = [];
        for(var j = 0; j < amount; j++){
    
            var input = [];
            var output = [];
    
            for(var i=0;i<this.inputLayer.length;i++){
                input[i]= Math.random();
            }
    
            for(var i=0;i<this.outputLayer.length;i++){
                output[i]= Math.random();
            }
            
            trainingdata[j] = {
                data : input,
                target : output
            };
        }
        return trainingdata;
    }

    train(trainingData, max_error, stepSize, minimumRate, max_stuck, max_iterations, min_distance_to_Minima) {

        var error_now = this.getGeneralError(trainingData);
        var error_before = error_now;
        var trainingTensor = this.generateRandomTrainingTensor(stepSize);

        var stuckPositions = [];

        var iterations = 0;      //Number of Total Training Iterations
        var stuck = 0;           //Gives number of iterations without progress
        var nOfStucks = 0;       //Gives the rotal number of other achieved local Minima

        console.log("Starting at: Error = " + error_now);

        while(error_now >= max_error && iterations <= max_iterations) { 
            this.applyTrainingTensor(trainingTensor);
            error_now = this.getGeneralError(trainingdata);


            if(error_now - error_before < -minimumRate * (error_now - max_error) * stepSize * 10) { //Progressing as long as rate is above minimum
                stuck = 0;
            } else {
                this.undoTrainingTensor(trainingTensor); //monoton Fallend (minimumRate)
                trainingTensor = this.generateRandomTrainingTensor(stepSize);
                error_now = this.getGeneralError(trainingdata);
                stuck++;
            }

            error_before = error_now;
            iterations++;

            Plot.addPoint("Error", [iterations, error_now]);


            //Avoiding known local Minima
            for(var i = 0; i < stuckPositions.length; i++) {
                var distance = this.getCurrentDistanceToConfiguration(stuckPositions[i]);
                Plot.addPoint("Distance to Stuck",[iterations, this.getCurrentDistanceToConfiguration(stuckPositions[i])]);

                if(distance < min_distance_to_Minima){
                    console.log("Avoided second encounter with local Minima");

                    this.setRandom();

                    error_now = this.getGeneralError(trainingdata);
                    error_before = error_now;
    
                    nOfStucks++;
                    stuck = 0;

                }
            }


            //jumping somewhere else in case of local minima above max_error
            if(stuck >= max_stuck) { 

                stuckPositions.push(this.getCurrentConfiguration());

                this.setRandom();

                error_now = this.getGeneralError(trainingdata);
                error_before = error_now;

                nOfStucks++;
                stuck = 0;
            }
        }

        console.log("Complete!\n"+"Reached: Error = "+ error_now +"\nIterations: "+iterations+"\nDiscovered local Minima: "+ nOfStucks);
        return {
            "iterations": iterations,
            "final_error": error_now,
            "nOfStucks": nOfStucks
        };
    }

    getCurrentDistanceToConfiguration(configuration) {

        var distance = 0;

        for(var i = 0; i < this.weightsMatrixes.length; i++) {
            var differenceMatrix = Matrix.matrixSubstract(this.weightsMatrixes[i], configuration.weightsMatrixes[i]);
            distance += Matrix.matrixNorm(differenceMatrix);
        }

        for(var i = 0; i < this.biasVectors.length; i++) {
            var differenceVector = Matrix.vectorSubstract(Array.from(this.biasVectors[i]), configuration.biasVectors[i]);
            distance += Matrix.vectorNorm(differenceVector);
        }

        return distance;
    }

    getCurrentConfiguration(){
        var obj = {};
        obj["weightsMatrixes"] = [];
        obj["biasVectors"] =  [];


        for(var i = 0; i < this.weightsMatrixes.length; i++){
            obj.weightsMatrixes[i] = Matrix.copyMatrix(this.weightsMatrixes[i]);
        }

        for(var i = 0; i < this.biasVectors.length; i++){
            obj.biasVectors[i] = Matrix.copyVector(this.biasVectors[i]);
        }

        return obj;
    }

     //Returns the General Error over a Set of TrainingData
     //generalError = ||targetVector - resultVector||
    getGeneralError(trainingData){

        var general_error = 0;
        for(var i = 0; i < trainingData.length; i++) {

            //Result on given Training Object
            var result = this.calculate(trainingData[i].data);

            //Error
            var error_vector = Matrix.vectorSubstract(trainingData[i].target, result);
            var error = Matrix.vectorNorm(error_vector);
            general_error += error;

        }
        return general_error/trainingdata.length;
    }
    
    //returns TrainingTensor
    // obj = {deltaWeightsMatrixes = [][][], deltaBiasVectors = [][]};
    generateRandomTrainingTensor(speed) {
        var obj = {};

        obj.deltaWeightsMatrixes = [];

        for(var i = 0; i < this.dimensions.length - 1; i++){
            obj.deltaWeightsMatrixes[i] = Matrix.createRandom(this.dimensions[i + 1], this.dimensions[i], speed);
        }

        obj.deltaBiasVectors = [];

        for(var i = 0; i < this.dimensions.length - 1; i++) {
            obj.deltaBiasVectors[i] = Matrix.create(this.dimensions[i + 1], 1, speed);
        }
        return obj;
    }

    //Applying a given Tensor to the networks weights and biases
    applyTrainingTensor(trainingTensor){

        for(var i = 0; i < this.weightsMatrixes.length; i++){
            this.weightsMatrixes[i] = Matrix.matrixAdd(this.weightsMatrixes[i], trainingTensor.deltaWeightsMatrixes[i]);
        }

        for(var i = 0; i < this.biasVectors.length; i++){
            this.biasVectors[i] = Matrix.vectorAdd(this.biasVectors[i], trainingTensor.deltaBiasVectors[i]);
        }

    }

    //Undoes a given trainingTensor
    undoTrainingTensor(trainingTensor){

        for(var i = 0; i < this.weightsMatrixes.length; i++){
            this.weightsMatrixes[i] = Matrix.matrixSubstract(this.weightsMatrixes[i], trainingTensor.deltaWeightsMatrixes[i]);
        }

        for(var i = 0; i < this.biasVectors.length; i++){
            this.biasVectors[i] = Matrix.vectorSubstract(this.biasVectors[i], trainingTensor.deltaBiasVectors[i]);
        }

    }  
}