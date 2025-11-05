//task1
function forLoopFunc(){
    for(let i=0;i<10;i++){
        console.log(i);
    }
}

//task2
function whileLoopFunc(){
    let num = 10;
    while(num > 0){
        console.log(num);
        num--;
    }
}


//task3
function forInLoopFunc(){
    const cars = ["Toyota", "Nissan", "Mazda", "Datsun"];

    for(let i in cars){ // i is index
        console.log(cars[i]);
    }
}

//task4
function forOfLoopFunc(){
    const cars = ["Toyota", "Nissan", "Mazda", "Datsun"];

    for(car of cars){ //car is an element
        console.log(car);
    }
}

//task5
function ifFunc(num){
    if(num > 10){
        return true;
    }else{
        return false;
    }
}

//task6
function isConvertable(num1, num2){
    if(typeof num1 === "number" && typeof num2 === "number" && !isNaN(Number(num1)) && !isNaN(Number(num2))){
        return Number(num1) + Number(num2);
    }else{
        return new Error("Can not convert to numerical value.")
    }
}

//task7
function variableParam(...args){
    for(let i=0;i<args.length;i++){
        console.log(args[i]);
    }
}

//task8
function g(val, ifFunc, func1, func2){
    var res = ifFunc(val);

    var resFunc1 = func1("student");
    console.log(resFunc1);
    var resFunc2 = func2(true);
    console.log(resFunc2);

    return res;
}

function ex1(value){
    return "Hello, " + value + "!";
}

function ex2(value){
    if(typeof value === "boolean" && !isNaN(Boolean(value))){
        return "Can go to uni."
    }else{
        return "Can study at home!"
    }
}

//task9
function Vehicle(brand, model, manufactureYear, isEcoFriendly, engineLabel){
    this.brand = brand;
    this.model = model;
    this.manufactureYear = manufactureYear;
    this.isEcoFriendly = isEcoFriendly;
    this.engineLabel = engineLabel;

    this.revEngine = function(){
        console.log("Engine started");
    }

    this.stopEngine = function(){
        console.log("Engine stopped");
    }
}

//vehicleCreator();

function vehicleCreator(){
    const vehicles = [];
    let laurel = new Vehicle("Nissan", "Laurel C35", 1995, false, "RB25NEO");
    let lexusGs = new Vehicle("Lexus", "Gs300", 2005, true, "VQ30DET");
    let toyotaGt = new Vehicle("Toyota", "Gt86", 2017, true, "Opposite");

    laurel.revEngine = function(){
        console.log("Nice straight V6 sound!!");
    }
    lexusGs.revEngine = function(){
        console.log("Sharp V6 Sound!");
    }
    toyotaGt.revEngine = function(){
        console.log("Weird sound of opposite engine...");
    }

    vehicles.push(laurel);
    vehicles.push(lexusGs);
    vehicles.push(toyotaGt);

    for(let vehicle of vehicles){
        console.log(vehicle);
        vehicle.revEngine();
        vehicle.stopEngine()
    }
}



//task10
class Animal{
    constructor(type, age, color, isVaccinated) {
        this.type = type;
        this.age = age;
        this.color = color;
        this.isVaccinated = isVaccinated;
    }

    makeSound(){
        console.log("Making sound");
    }
}

//objectCreation();

function objectCreation() {
    const animals = [];
    let dog = new Animal("Dog", 5, "Sable", true);
    let horse = new Animal("Horse", 9, "Brown", true);
    let turtle = new Animal("Turtle", 58, "Green", false);

    dog.makeSound = function () {
        console.log("Woof woof");
    }

    horse.makeSound = function () {
        console.log("Nose sneezing");
    }

    turtle.makeSound = function () {
        console.log("Silent");
    }

    animals.push(dog);
    animals.push(horse);
    animals.push(turtle);

    for (let animal of animals) {
        console.log(animal);
        animal.makeSound();
    }
}

function main(){
     console.log("Task 1:");
    forLoopFunc();

    console.log("Task 2:");
    whileLoopFunc();

    console.log("Task 3:");
    forInLoopFunc();

    console.log("Task 4:");
    forOfLoopFunc();

    console.log("Task 5:");
    console.log(ifFunc(12));

    console.log("Task 6:");
    console.log(isConvertable(1, 2));

    console.log("Task 7:");
    console.log(variableParam(1, 2));

    console.log("Task 8:");
    console.log(g(12, ifFunc, ex1, ex2))

    console.log("Task 9:");
    objectCreation();

    console.log("Task 10:");
    vehicleCreator()
}

main();