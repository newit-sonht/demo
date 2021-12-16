# thunderGirl
[![Build Status](https://travis-ci.org/Kashiwara0205/thunderGirl.svg?branch=master)](https://travis-ci.org/Kashiwara0205/thunderGirl)
[![npm version](https://badge.fury.io/js/thunder-girl.svg)](https://badge.fury.io/js/thunder-girl)

npm library for vue lazy drawing

## Getting started

```
npm i thunder-girl
```

## Usage
Loads an array every specified number of milliseconds

```
thunderGirl.load(destinationArr, sourceArr, slice, msec)
```
accumulate load
```
thunderGirl.accLoad(destinationArr, sourceArr, slice, msec)
```

## args
|Name|description|
|:---|:---|
|destinationArr|destination array. array type|
|sourceArr|source array. array type|
|slice|number of arrays to divide. integer type|
|msec|sleep msec. integer type|

## vue example code

```
methods:{
  load: async function(){
    await thunderGirl.load(this.dispTable, this.sourceTable, 5, 50)
    console.log("complete reload")
  },

  accLoad: async function(){
    await thunderGirl.accLoad(this.dispTable, this.sourceTable, 5, 50)
    console.log("complete accLoad")
  }
}
```

## vue example code (ts version)

```
async load(){
  await thunderGirl.load(this.dispTable, this.sourceTable, 5, 50)
  console.log("complete reload")
}

async accLoad(){
  await thunderGirl.accLoad(this.dispTable, this.sourceTable, 5, 50)
  console.log("complete accLoad")
}
```

## Demo
https://github.com/Kashiwara0205/thunderGirl-demo

## License
The libray is available as open source under the terms of the [MIT License](http://opensource.org/licenses/MIT).