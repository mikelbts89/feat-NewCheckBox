const colors = [ "red", "green", "yellow", "black" ];

// print the colors? 
// how to? 
// for, foreach , 

const types = [ "BMW", "MRCDS", "Mazda", "Subaro" ];

const doors = [ 2,4,5 ];


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
        type: _generateType(),
        doors: _generateDoors(),
        isSunRoof: _isSunRoof(index)
    };


    function _generateLP(){
        return Math.ceil(Math.random()*999999);
    }
    function _generateColor(){
        return colors[Math.floor(Math.random()*colors.length)];
    }
    function _generateDoors(){
        return doors[Math.floor(Math.random()*doors.length)];
    }
    function _isSunRoof(index){
        return index % 2 === 0 ? true : false
    }
    function _generateType(){
          return types[Math.floor(Math.random()*types.length)];
    }
   
}


const result = generateCars(50);
console.log(result)