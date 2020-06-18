const colors = [ "red", "green", "yellow", "black" ];

// print the colors? 
// how to? 
// for, foreach , 

const types = [ "BMW", "MRCDS", "Mazda", "Subaro" ];


function generateCars(numberOfCars){ //return array with Cars ( each car is an object in JS)
    if(typeof numberOfCars !== 'number') return;
    const cars = [];
    for (let index = 0; index < numberOfCars; index++) {
        cars.push(generateSingleCar(index))
    }
    return cars;
}

function generateSingleCar(index){

    return {
        lp:_generateLP(),
        color: _generateColor(),
    };


    function _generateLP(){
        return Math.ceil(Math.random()*999999);
    }
    function _generateColor(){
        return colors[Math.floor(Math.random()*colors.length)];
    }
}


const result = generateCars(50);
console.log(result)