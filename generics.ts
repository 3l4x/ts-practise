//Notes after solving a few challenges from  https://tsch.js.org/  related to generic types


//T[number] returns all the indexes in an array, same as keyof but for arrays
type TupleToObject<T extends readonly (string | number)[]> = {
    [val in T[number]]: val
}



//PICK, OPPOSITE OF OMIT
type MyPick<T, K extends keyof T> = Pick<T, K>

//OMIT
type MyOmit<T, K extends keyof T> = Omit<T, K>

//Partial
type PartialObj<T> = Partial<T>



/* the difference between omit and exclude is that omit is a utility type that works on object types or interfaces to omit one or more key-value pairs, while exclude is a utility type that works on union types to remove one or more constituents from the union
 */
//EXCLUDE FOR TYPES NOT PROPERTIES
type MyExclude<T, U> = Exclude<T, U>
//When conditional types act on a generic type, they become distributive when given a union type.
type MyExclude2<T, U> = T extends U ? never : T


//INCLUDES (kinda scuffed for now)
type Includes<T extends readonly any[], U> = {
    [P in T[number]]: true
}[U] extends true ? true : false




//READONLY
type MyReadOnly<T> = Readonly<T>
//or
type MyReadonly<T> = {
    readonly [P in keyof T]: T[P]
}





//EXTENDS KEYWORD
type First<T extends readonly any[]> = T extends [] ? never : T[0]

//This works because the subset of an empty array must be an empty array or [never]
//The same with object wouldnt work because
// type {} in TypeScript is a bit tricky, because it does not mean an empty object.
//It means an object that can have any properties, as long as they are not undefined.
/* _____________ Test Cases _____________ *

type cases = [
  Expect<Equal<First<[3, 2, 1]>, 3>>,
  Expect<Equal<First<[() => 123, { a: string }]>, () => 123>>,
  Expect<Equal<First<[]>, never>>,
  Expect<Equal<First<[undefined]>, undefined>>,
]

*/



//length for generic arrays
type Length<T extends readonly any[]> = T['length']







//awaited
type MyAwaited<T> = T extends PromiseLike<infer U> ? MyAwaited<U> : T
type MyAwaited2<T> = Awaited<T>


type X = Promise<string>
const test: MyAwaited<X> = '';




//If
type If<C extends boolean, T, F> = C extends true ? T : F






