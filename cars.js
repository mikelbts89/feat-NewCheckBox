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
    return {};
}

const result = generateCars(10);
console.log(result)