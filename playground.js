// const arrTrue = [true, true, true]
// const arrFalse = [false, true]
//
// console.log(arrTrue.reduce((res, v) => v && res, true))
// console.log(arrFalse.reduce((res, v) => v && res, true))

const fetch = require('node-fetch')

async function fetchAvatarUrl(userId) {

  const response =  fetch(`http://catappapi.herokuapp.com/users/${userId}`)

  return response
  // return fetch(`http://catappapi.herokuapp.com/users/${userId}`)
  //   .then(response => response.json())
  //   .then(data => data.imageUrl)
}

const result = fetchAvatarUrl(123)
console.log(result)
// result.then(r => console.log(r))
// const url = result.then(r => r.imageURL)
// url.then(console.log)