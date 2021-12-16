class InvalidNumberError extends Error {}

function checkArgs(split, msec){
  if(!Number.isInteger(split)){
    const msg = "split is not number type" 
    throw new TypeError(msg)
  }

  if(!Number.isInteger(msec)){
    const msg = "msec is not number type" 
    throw new TypeError(msg)
  }

  if (split < 1){
    const msg = "invalid split number. please make it a number greater than 0"
    throw new InvalidNumberError(msg)
  }
}

function sleep(sec) {
  return new Promise(function (resolve) {
    setTimeout(function() { resolve() }, sec);
  });
}

function restArray(destinationArr){
  destinationArr.splice(0, destinationArr.length)
}

// if call accLoad in load method then npm test failed
// so, Not calling accLoad
// perhaps The cause is async
const load = async function(destinationArr, sourceArr, split, msec){
  checkArgs(split, msec)
  restArray(destinationArr)
  let index = 0;
  while(index < sourceArr.length){
    let splited_arr = sourceArr.slice(index, index + split)
    index += split
    // vue don't detect concat method
    // so, instead of concat use push 
    for(let i = 0; i < splited_arr.length; i++){ destinationArr.push(splited_arr[i]) }
    await sleep(msec)
  }
}

const accLoad = async function(destinationArr, sourceArr, split, msec){
  checkArgs(split, msec)
  let index = 0;
  while(index < sourceArr.length){
    let splited_arr = sourceArr.slice(index, index + split)
    index += split
    // vue don't detect concat method
    // so, instead of concat use push 
    for(let i = 0; i < splited_arr.length; i++){ destinationArr.push(splited_arr[i]) }
    await sleep(msec)
  }
}

module.exports = { 
  load: load,
  accLoad: accLoad
}