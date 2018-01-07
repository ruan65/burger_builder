const arrTrue = [true, true, true]
const arrFalse = [false, true]

console.log(arrTrue.reduce((res, v) => v && res, true))
console.log(arrFalse.reduce((res, v) => v && res, true))