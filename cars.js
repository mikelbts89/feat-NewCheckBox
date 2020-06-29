const colors = ["red", "green", "yellow", "black"];
const types = ["BMW", "MRCDS", "Mazda", "Subaro"];
const doors = [2, 4, 5];
const DOM = {}

const displayFunctions = {
    "cards": getCardItem,
    "list": getListItem,
    "table": getRowItem,
    "tableHeader": getRowHeaderItem
};

const headers = [[
    {
        value: "lp",
        label: "LP",
        isVisible: true,
    },
    {
        value: "color",
        label: "Color",
        isVisible: true,
    },
    {
        value: "type",
        label: "Type",
        isVisible: true
    },
    {
        value: "doors",
        label: "Doors",
        isVisible: true
    },
    {
        value: "isSunRoof",
        label: "Sun Roof",
        isVisible: true
    },
    {
        value: "isAWD",
        label: "4 X 4",
        isVisible: false
    }
]]


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
        isSunRoof: _isSunRoof(index),
        isAWD: _isAWD(index)
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
    function _isAWD(index) {
        return index % 2 === 0 ? true : false
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
    DOM.tableData = document.getElementById("table-data");
    DOM.tableHead = document.getElementById("table-head");
    DOM.whatToDraw = "list"

    draw(cars, DOM.listData, DOM.whatToDraw);

    const listViewButton = document.getElementById("listView");
    const cardViewButton = document.getElementById("cardView");
    const tableViewButton = document.getElementById("tableView");
    const searchOperation = document.getElementById("searchOperation");

    listViewButton.addEventListener("click", function () {
        DOM.whatToDraw = "list";
        draw(cars, DOM.listData, "list")
    })
    cardViewButton.addEventListener("click", function () {
        DOM.whatToDraw = "cards"
        draw(cars, DOM.cardsData, "cards")
    })
    tableViewButton.addEventListener("click", function () {
        DOM.whatToDraw = "table"
        draw(cars, DOM.tableData, "table")
        draw(headers, DOM.tableHead, "tableHeader", false)
    })

    searchOperation.addEventListener("click", function () {
        const value = document.getElementById("searchValue").value;
        if (!value) return;
        const result = cars.filter(car => { return car.type.toLowerCase() === value.toLowerCase() })
        if (DOM.whatToDraw === "table") {
            draw(result, DOM.tableData, "table")
            draw(headers, DOM.tableHead, "tableHeader", false)
        }
        if (DOM.whatToDraw === "cards") {
            draw(result, DOM.cardsData, "cards")
        }
        if (DOM.whatToDraw === "list") {
            draw(result, DOM.listData, "list")
        }

    })
}())


function draw(data, domContainer, displayType, clear = true) {
    if (clear) clearDOM()
    if (!Array.isArray(data)) return;
    if (typeof domContainer !== 'object') return;
    const displayFunction = displayFunctions[displayType]
    if (typeof displayFunction !== 'function') return;
    data.forEach(item => {
        const result = displayFunction(item)
        domContainer.append(result)
    });
}

function clearDOM() {
    // DOM.listData.innerHTML = "";
    // DOM.cardsData.innerHTML = "";
    // DOM.tableData.innerHTML = "";

    // this is more dynamic

    Object.keys(DOM).forEach((keyInDom) => {
        if (typeof DOM[keyInDom] !== "object") return;
        DOM[keyInDom].innerHTML = "";
    })

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
    card.innerText = `car lp: ${carData.lp}, car color: ${carData.color} , car type: ${carData.type}`;
    return card;
}

function getRowHeaderItem(headers) {
    const ths = headers.filter((header) => { return header.isVisible }).map(header => {
        const { label, isVisible } = header;
        if (isVisible) return _getTH(label)
    })
    const tr = _getTR();
    tr.append(...ths);
    return tr;
    function _getTR() {
        return document.createElement("TR");
    }

    function _getTH(value) {
        const th = document.createElement("TH");
        th.style.color = "red";
        th.innerText = value;
        return th;
    }
}
function getRowItem(carData) {
    // const lp = carData.lp;
    // const color = carData.color;
    // const type = carData.type;
    // const doors = carData.doors;
    const { lp, type, doors, color } = carData; // destructuring es6 
    // return getRowItem;

    const tr = _getTR();
    const firstRowFromHeaders = headers[0];
    const visibleHeaders = firstRowFromHeaders.filter((header) => { return header.isVisible });
    const tds = visibleHeaders.map((header) => {
        const { value } = header;
        const currentValue = carData[value];
        return _getTD(currentValue)
    })

    // const tdLP = _getTD(lp);
    // const tdColor = _getTD(color);
    // const tdType = _getTD(type);
    // const tdDoors = _getTD(doors);
    tr.append(...tds)
    return tr;
    function _getTR() {
        return document.createElement("TR");
    }

    function _getTD(value) {
        const allowedTypes = ["string", "number", "boolean"];
        const theType = typeof value;
        // if (!allowedTypes.includes(theType)) return;
        let currentValue = !allowedTypes.includes(theType) ? "-" : value
        // if (theType !== "string" && theType !== "number") return;
        const td = document.createElement("TD");
        td.innerText = currentValue;
        return td;
    }
}

