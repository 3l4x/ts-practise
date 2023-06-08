//type infered: number
let number = 6;

//literal type: 6
const number_literal = 6;


interface CarType1 {
    make: string
    model: string
    year: number
    chargeVoltage?: number
}

interface CarType2 {
    make: string
    model: string
    year: number
    chargeVoltage: number | undefined
};

const printCar = (car: CarType1): void => {
    //need to have safeguard
    if (car.chargeVoltage) {
        console.log(car.chargeVoltage);
    }
    console.log(car.make);
}


const car: CarType1 = {
    make: "Tesla",
    model: "Model 3",
    year: 2022,
};

//in this case eslint will complain because chargeVoltage is not defined
//so number | undefined is not the same as optional property
/* const car2 : CarType2 = {
    make: "Tesla",
    model: "Model 3",
    year: 2022,
}
 */

printCar(car);




/*!  TUPLE PRACTISE                                             */

// so this works but it is not a tuple
const carIncorrectTuple: (string | number)[] = [2000, "Tesla", "Model 3"];
//this is a tuple
const carTuple: [string, string, number] = ["Tesla", "Model 3", 2022];

//very dangerous with mutable types
const numPair: [number, number] = [1, 2];
numPair.push(3);
console.log(numPair);
//we ruined the tuple by pushing a third element

///



//using union types
const returnErrorOrSuccess = (): ['error', Error] | ['success', string] => {
    if (Math.random() > 0.5)
        return ['success', 'something went right'];
    return ['error', new Error('something went wrong')];
}

//USING TYPEGUARDS, this is called narrowing
const [first, second] = returnErrorOrSuccess();
//we need to narrow with typeguards
if (first === 'error') {
    console.log(second.message);
}
else {
    console.log(second);
}

//discriminated or tagged union types
/*
you can create a discriminated union of pets
that have a type property that can be either “cat” or “dog”,
and then use that property to narrow down the type of pet you have.
*/
const outcome = returnErrorOrSuccess();
if (outcome[0] === "error") {
    //typescript understands that outcome[1] is an error
    console.log(outcome);
}
else {
    console.log(outcome);
}


/*                                                    */

/* intersection types */

interface Person {
    name: string;
    age: number;
}

interface Employee {
    id: number;
    department: string;
}

function printPersonAndEmployee(personAndEmployee: Person & Employee) {
    console.log("Name:", personAndEmployee.name);
    console.log("Age:", personAndEmployee.age);
    console.log("ID:", personAndEmployee.id);
    console.log("Department:", personAndEmployee.department);
}


/*  TYPE ALIASES     */


//alias for this type
type UserContactInfo = {
    name: string;
    email: string;
}



/* interfaces */

/* window.exampleProperty = 5;
console.log(window.exampleProperty);
 */
//interface declaration hoisted
interface Window {
    exampleProperty: number;
}


//use interface for OOP related stuff
//it also allows u to augment the interface
//no union types tho




/* RECURSION */

type nestedNumbers = number | nestedNumbers[];

const val: nestedNumbers = [1, 2, 3, [4, 5, 6, [7, 8, 9]]];

if (typeof val !== 'number') {
    val.push(1);
    //this will not work
    /* val.push("asd") */
}

console.log(val);


//!JSON TYPE EXERCISE

type Primitive = string | number | boolean | null | undefined;
type JSONArray = JSONValue[]; //! IT CANNOT BE [JSONValue] because thats a tuple
type JSONObject = { [k: string]: JSONValue };
type JSONValue = Primitive | JSONArray | JSONObject
/*  */




const returnObj = (): { name: string, bool: boolean } => {
    return {
        name: "asd",
        bool: true
    }
}

const returnBool = (): true | false => {
    return true;
}


//! TOP TYPES

//*ANY
let flexible: any = 14;
//console.log(flexible?.but.is.possible.cuz.its.any.lol);
/*
its great to use any when you convert project
from js to ts and incrementally add static types
*/


//*UNKNOWN
let flexible2: unknown = 14;
// this wont compile
/* console.log(flexible2?.but.is.possible.cuz.its.any.lol); */
/*
unknown is great for values received at runtime
like API response, errors are caught earlier
*/
if (typeof flexible2 === "number") {
    console.log(flexible2 + 10);
}
else if (typeof flexible2 === "string") {
    console.log(flexible2);
}
else {
    console.log("not a string or number");
}



//! BOTTOM TYPES

//*NEVER

class Car {
    drive() {
        console.log("driving");
    }
}

class Truck {
    tow() {
        console.log("dragging something");
    }
}

/* class Boat{
    float(){
        console.log("floating");
    }
} */

type Vehicle = Car | Truck /* | Boat; */

const optainRandomVehicle = (): Vehicle => {
    return Math.random() > 0.5 ? new Car() : new Truck();
}


let myVehicle: Vehicle = optainRandomVehicle();

/*  exhaustive conditionals */
if (myVehicle instanceof Car) {
    myVehicle.drive();
}
else if (myVehicle instanceof Truck) {
    myVehicle.tow();
}
//  100% of cases of things we know about
//  so this can be nothing else
//  NEITHER
else {
    /*  if we add boat this will not compile
        compiler is like wait there is boat still
        we are alerted that we need to add boat
        to exhaustive conditionals
    */
    const neverValue: never = myVehicle;
}


//error subclass

class UnreachableError extends Error {
    constructor(_nvr: never, msg: string) {
        super(msg);
    }
}

console.log(typeof myVehicle);
console.log(myVehicle instanceof Car);

if (myVehicle instanceof Car) {
    myVehicle.drive();
}
else if (myVehicle instanceof Truck) {
    myVehicle.tow();
}
else {
    throw new UnreachableError(myVehicle, "we should never get here");
}





//! callable types

//describing call signatures with interfaces

interface TwoNumbersCalc {
    (a: number, b: number): number
};
const add: TwoNumbersCalc = (a, b) => (a + b);



type TwoNumbersCalcType = (a: number, b: number) => number;

//no need to add type annotations, it infers from type declaration
const subtract: TwoNumbersCalcType = (a, b) => (a - b);


//i promise i will always return undefined
function invokeInFourSeconds(callback: () => undefined) {
    setTimeout(callback, 5000);
}


//void
//the return type of this function should be ignored
function invokeInFiveSeconds(callback: () => void) {
    setTimeout(callback, 5000);
}

const values: number[] = [];

/* invokeInFourSeconds(()=>values.push(5)); */
invokeInFiveSeconds(() => values.push(5));



//! construct signatures


/*
So, the line new (value: number) : Date in the interface definition
states that the constructor function for the Date object
should accept a single parameter of type number and
 return an object of type Date.
*/

interface DateConstructor {
    new(value: number): Date
}

/*
The purpose of this assignment is to create
an alias for the Date constructor.
By assigning Date to MyDateConstructor, you can use MyDateConstructor
as an alternative reference to the Date constructor.
*/

let MyDateConstructor: DateConstructor = Date;
const d = new MyDateConstructor(2023);




//! function overloads


type FormSubmitHandler = (data: FormData) => void;
type MessageHandler = (evt: MessageEvent) => void;

//2 heads
function handleMainEvent(
    elem: HTMLFormElement,
    handler: FormSubmitHandler
): void;
function handleMainEvent(
    elem: HTMLIFrameElement,
    handler: MessageHandler
): void;

//implementation

//implementation has to be compatible with heads
function handleMainEvent(
    elem: HTMLIFrameElement | HTMLFormElement,
    handler: MessageHandler | FormSubmitHandler,
    /* arg : any  */
): void { }
//now we have 2 separate cases for form and iframe
//handleMainEvent()





//! this types

/* 
//<button onClick="myClickHandler">Click me!</button>

function myClickHandler(event: Event){
    this.disabled = true;
}

myClickHandler(new Event("click")); */

/* const myButton = document.createElement('button');

function myClickHandler(this: HTMLButtonElement , event: Event){
    this.disabled = true;
}

myClickHandler.bind(myButton);
myClickHandler.call(myButton, new Event("click"));
 */



//! Classes

/* this would work in js
    but it is unsafe
*/
/* class Car {
    constructor(make, model, year) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}


let sedan = new Car('Honda', 'Accord', 2017);
sedan.activateTurnSignal('left'); //not safe and it would compile in js */

class CarClass {
    make: string;
    model: string;
    year: number;
    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }
}

let sedan = new CarClass('Honda', 'Accord', 2017);

//this wouldnt compile for obvious reasons
/* sedan.activateTurnSignal('left'); */


//! access modifier keywords
//! these access modifier keywords disappear as part of the build process
//! just fancy linter pretty much!!
//public,private,protected

const generateDoorLockCode: () => number = () => 1
const generateVinNumber: () => void = () => { }


class CarClass2 {
    public make: string;
    public model: string;
    public year: number;
    protected vinNumber = generateVinNumber();
    private doorLockCode = generateDoorLockCode();
    public isLocked: boolean = true;
    constructor(make: string, model: string, year: number) {
        this.make = make;
        this.model = model;
        this.year = year;
    }

    protected unlockAllDoors() {
        //unlockCar(this.doorLockCode);
    }
}

class Sedan extends CarClass2 {
    constructor(make: string, model: string, year: number) {
        super(make, model, year);
        this.year;
    }

    public unlock() {
        this.unlockAllDoors();
    }
}

//!  # keyword is private field in js now
//!  theres also readonly, so u cant reassign values with that keyword,
//!  though giving it initial value is fine like this.year = year;








//!! Abbreviated syntax with param properties



//* before

/*
class Car{
    make: string;
    model : string;
    year: number;
    constructor(make: string, model : string, year: number){
        this.make = make;
        this.model = model;
        this.year = year;
    }
}



*/

//* AFTER


//access modifier keyword b4 constructor arguments
//so this will work
class CarShort {
    constructor(
        public make: string,
        public model: string,
        public year: number
    ) { };
}


//understanding order of operations

class Parent {
    foo = console.log('foo');
}

class Child extends Parent {
    bar = console.log('bar');
    constructor(public make: string) {
        super();
        console.log('constructor stuff');
    }
}
/*
the order is the following:

1: super
2: param properties with access modifiers like this.make = make;
3: class field initializers
4: constructor code
its possible to put stuff before super but
when you have initialized properties, parameter properties
super must be no1 thing

*/


const c = new Child('stuff');


//! type guards && narrowing


let value:
    | Date
    | null
    | undefined
    | "pineapple"
    | [number]
    | { dateRange: [Date, Date] }

value = [10];


//truthy falsy check
if (!value)
    value
//instanceof for classes
else if (value instanceof Date)
    value
//typeof for types
else if (typeof value === 'string')
    value
//specific value check
else if (value === null)
    value
//built in functions
else if (Array.isArray(value)) {
    console.log(value[0] * 3);
}
//property presence check
else if ("dataRange" in value) {

} else {
    //never
    value
}



//! user defined type guards

interface CarLike {
    make: string
    model: string
    year: number
}

let maybeCar: unknown;

//the guard
/*
validating this might work but there are issues
we would have to refactor it into a function
but that wouldnt mean the truth/false indicates a type for variable
*/
if (
    maybeCar &&
    typeof maybeCar === "object" &&
    "make" in maybeCar &&
    typeof maybeCar["make"] === "string" &&
    "model" in maybeCar &&
    typeof maybeCar["model"] === "string" &&
    "year" in maybeCar &&
    typeof maybeCar["year"] === "number"
) {
    maybeCar
}
/* 
function isCarLike(maybeCar: unknown){
    if(
        maybeCar &&
        typeof maybeCar === "object" &&
        "make" in maybeCar &&
        typeof maybeCar["make"] === "string" &&
        "model" in maybeCar &&
        typeof maybeCar["model"] === "string" &&
        "year" in maybeCar &&
        typeof maybeCar["year"] === "number"
    ){
        return true;
    }
    return false
}

//if we refactor it into a function , this typeguard wil actually have 0 effect
//like isCarLike(maybeCar) wont have an effect. IT wont do anything

if(isCarLike(maybeCar)){
    maybeCar
} */


//!is
function isCarLike(
    maybeCar: unknown
): maybeCar is CarLike {
    if (
        maybeCar &&
        typeof maybeCar === "object" &&
        "make" in maybeCar &&
        typeof maybeCar["make"] === "string" &&
        "model" in maybeCar &&
        typeof maybeCar["model"] === "string" &&
        "year" in maybeCar &&
        typeof maybeCar["year"] === "number"
    ) {
        return true;
    }
    return false
}


//returns an indication if that value conforms to CarLike interface
//u are telling typescript to trust u here
if (isCarLike(maybeCar)) {
    maybeCar
}


//!assert

function assertsIsCarLike(
    maybeCar: unknown
): asserts maybeCar is CarLike {
    if (
        !(
            maybeCar &&
            typeof maybeCar === "object" &&
            "make" in maybeCar &&
            typeof maybeCar["make"] === "string" &&
            "model" in maybeCar &&
            typeof maybeCar["model"] === "string" &&
            "year" in maybeCar &&
            typeof maybeCar["year"] === "number"
        )
    ) {
        throw new Error(
            `Value does not appear to be carlike`
        )
    }
}

/* maybeCar
assertsIsCarLike(maybeCar);
maybeCar */



function isNull(val: any): val is null {
    console.log('a: ' + !val);
    return !val;
}

const empty = ""
const zero = 0

if (isNull(zero)) {
    console.log(zero);
}

if (isNull(empty)) {
    console.log(empty);
}




//!null values


/*
    null        => 404, there is a value and that value is nothing
    undefined   => value isn't available (yet?)
    void        =>  should be used explicitly for fn return values
                return value should be ignored
*/

/*
    non null assertion operator
    !.
*/

type GroceryCart = {
    fruits?: { name: string, quantity: number }[]
    vegetables?: { name: string, quantity: number }[]

}

const cart: GroceryCart = {};


//fruits is possibly undefined
/* cart.fruits.push({name: 'whatever', quantity: 10}) */

//!will throw error at runtime
/* cart.fruits!.push({ name: 'whatever', quantity: 10 });
 */



class DefiniteAssignmentOperator {
    protected isTrue!: boolean
    constructor(
        public make: number
    ) {
        this.isTrue = true;
    }
}




//!!!!!!!!!! GENERICS

const phones: {
    [k: string]: {
        customerId: string
        areaCode: string
        num: string
    }
} = {}

const phoneList = [
    { customerId: "0001", areaCode: "321", num: "123-4566" },
    { customerId: "0002", areaCode: "174", num: "142-3626" },
    { customerId: "0003", areaCode: "192", num: "012-7190" },
    { customerId: "0005", areaCode: "402", num: "652-5782" },
    { customerId: "0004", areaCode: "301", num: "184-8501" },
]

interface PhoneInfo {
    customerId: string;
    areaCode: string;
    num: string;
}

function listToDict(
    list: PhoneInfo[],
    idGen: (arg: PhoneInfo) => string
): { [k: string]: PhoneInfo } {
    const dict: { [k: string]: PhoneInfo } = {};

    list.forEach((elem) => {
        const dictKey = idGen(elem);
        dict[dictKey] = elem
    })

    return dict;
}


console.log(
    listToDict(phoneList, (customer) => customer.customerId)
);

//now lets generalize this

function listToDictMoreGeneric(
    list: any[],
    idGen: (arg: any) => string
): { [k: string]: any } {
    const dict: { [k: string]: any } = {};

    list.forEach((elem) => {
        const dictKey = idGen(elem);
        dict[dictKey] = elem
    })

    return dict;
}

const dict = listToDictMoreGeneric(
    [{ name: "Mike" }, { name: "Mark" }],
    (item) => item.name
);

//this is why any is not the solution here.
/* dict.Mike.I.Should.not.be.able.to.do.this.But.I.am; */

//type parameters solve this issue
/* 

    Type parameters are like function arguments
    but for types.


*/


//<T> is the type parameter list
function listToDictGeneric<T>(
    list: T[],
    idGen: (arg: T) => string
): { [k: string]: T } {
    const dict: { [k: string]: T } = {};

    list.forEach((elem) => {
        const dictKey = idGen(elem);
        dict[dictKey] = elem
    })

    return dict;
}




//!practise



const fruits = {
    apple: { color: "red", mass: 100 },
    grape: { color: "red", mass: 5 },
    banana: { color: "yellow", mass: 183 },
    lemon: { color: "yellow", mass: 80 },
    pear: { color: "green", mass: 178 },
    orange: { color: "orange", mass: 262 },
    raspberry: { color: "red", mass: 4 },
    cherry: { color: "red", mass: 5 },
}

interface Dict<T> {
    [k: string]: T
}




// Array.prototype.map, but for Dict
function mapDict<T, U>(
    input: Dict<T>,
    mappingCb: (arg: T, key: string) => U
): Dict<U> {
    const toReturn: Dict<U> = {}
    for (let key in input) {
        const thisVal = input[key];
        toReturn[key] = mappingCb(thisVal, key);
    }
    return toReturn;
}
// Array.prototype.filter, but for Dict
function filterDict<T>(
    input: Dict<T>,
    filterCb: (arg: T) => boolean
): Dict<T> {
    const toReturn: Dict<T> = {}
    for (let key in input) {
        const thisVal = input[key];
        if (filterCb(thisVal))
            toReturn[key] = thisVal;
    }
    return toReturn;
}
// Array.prototype.reduce, but for Dict
function reduceDict<T, V>(
    input: Dict<T>,
    reducer: (currentValue: V, item: T) => V,
    initialVal: V
): V {
    let retVal = initialVal;
    for (let key in input) {
        const thisVal = input[key];
        retVal = reducer(retVal, thisVal);
    }
    return retVal;
}


//! type casting


const returnAsSomething = <T>(input: any): T => {
    return input;
}
//unsafe and u dont even know its being casted


const lol = returnAsSomething<number>((false));
console.log(lol);

//number type now, casted
const sameAs = String as any as number;



//
interface HasId {
    id: string;
}

function ex2<T extends HasId>(list: T[]) {
    return list.pop();
}


/* ################################################## */

type User = {
    age: number;
    name: string;
}

type Actions<T, K extends keyof T & string> = {
    type: `update-${K}`;
    payload: T[K];
}

type UpdateAgeAction = Actions<User, 'age'>

const action: UpdateAgeAction = {
    type: 'update-age',
    payload: 10
}

/* ################################################## */


type LinkNode<T> = {
    value: T,
    next?: LinkNode<T>
}

const TextNode: LinkNode<string> = {
    value: 'twenty-three',
    next: {
        value: 'forty-six'
    }
}

const createLink = <T,>(value: T): LinkNode<T> => {
    return {
        value
    }
}

const node = createLink('asd');
const anotherNode = createLink(23);

