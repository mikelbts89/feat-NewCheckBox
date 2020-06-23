const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
};
console.log(displayFunctions)


function generateCars(numberOfCars, isArray) { //return array with Cars ( each car is an object in JS)
    if (typeof numberOfCars !== 'number') return;
    const cars = isArray ? [] : {};
    for (let index = 0; index < numberOfCars; index++) {
        if (isArray) cars.push(generateSingleCar(index))
        else {
            const singleCar = generateSingleCar(index)
            cars[singleCar.lp.toString()] = singleCar;
        }
    }
    return cars;
}

function generateSingleCar(index) {
    return {
        lp: _generateLP(),
        color: _generateColor(),
        type: _generateType(),
        doors: _generateDoors(),
        isSunRoof: _isSunRoof(index)
    };


    function _generateLP() {
        return Math.ceil(Math.random() * 999999);
    }
    function _generateColor() {
        return colors[Math.floor(Math.random() * colors.length)];
    }
    function _generateDoors() {
        return doors[Math.floor(Math.random() * doors.length)];
    }
    function _isSunRoof(index) {
        return index % 2 === 0 ? true : false
    }
    function _generateType() {
        return types[Math.floor(Math.random() * types.length)];
    }

}

// array [....]
// filter - filter by boolean statment
// find - like filter but exactly one, the first one.
// findIndex - exactly like find, but return only the index.
// map - return partial result
// reduce - next time..


(function () {
    const cars = generateCars(100, true)
    DOM.listData = document.getElementById("data");
    DOM.cardsData = document.getElementById("data-cards");
    draw(cars, DOM.listData, "list");

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    listViewButton.addEventListener("click", function () {
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        draw(cars, DOM.cardsData, "cards")
    })
}())


function draw(data, domContainer, displayType) {
    clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    data.forEach(car => {
        domContainer.append(displayFunction(car))
    });
}

function clearDOM() {
    DOM.listData.innerHTML = "";
    DOM.cardsData.innerHTML = "";
}
function getListItem(carData) {
    const listItem = document.createElement("li");
    listItem.classList.add("list-group-item");
    listItem.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
    return listItem;
}

function getCardItem(carData) {
    const card = document.createElement("div");
    card.style.border = "1px solid black";
    card.style.height = "50px";
    card.style.width = "300px";
    card.style.display = "inline-block";
    card.innerText = `car lp: ${carData.lp}, car color: ${carData.color}`;
    return card;
}
function getRowItem() { }
