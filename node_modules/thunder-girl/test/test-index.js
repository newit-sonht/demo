const test = require('ava');
const thunderGirl = require("../index")

test('should load source_arr to destination_arr', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 1, 0);
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should load source_arr to destination_arr by 2 split', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 2, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should load source_arr to destination_arr by 3 split', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 3, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should load source_arr to destination_arr case of 1000msec', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 1, 1000)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should load source_arr to destination_arr two times', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 3, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);

  await thunderGirl.load(destination_arr, source_arr, 3, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should load source_arr to destination_arr in the case of split is bigger than length', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.load(destination_arr, source_arr, 100, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should accumulately load source_arr to destination_arr', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  await thunderGirl.accLoad(destination_arr, source_arr, 3, 0)
  t.is(3, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);

  await thunderGirl.accLoad(destination_arr, source_arr, 3, 0)
  t.is(6, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);

  await thunderGirl.accLoad(destination_arr, source_arr, 3, 0)
  t.is(9, destination_arr.length);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
  t.is(1, destination_arr[0]);
  t.is(2, destination_arr[1]);
  t.is(3, destination_arr[2]);
});

test('should not load source_arr to destination_arr when slice is 0', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  const error = await t.throwsAsync(thunderGirl.load(destination_arr, source_arr, 0, 0))
  t.is(error.message, 'invalid split number. please make it a number greater than 0');
});

test('should not load source_arr to destination_arr when slice is str', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  let error = await t.throwsAsync(thunderGirl.load(destination_arr, source_arr, "a", 0))
  t.is(error.message, 'split is not number type');

  error = await t.throwsAsync(thunderGirl.load(destination_arr, source_arr, "1", 0))
  t.is(error.message, 'split is not number type');
});

test('should not load source_arr to destination_arr when msec is str', async t => {
  let destination_arr = []
  let source_arr = [1, 2, 3]

  let error = await t.throwsAsync(thunderGirl.load(destination_arr, source_arr, 1, "a"))
  t.is(error.message, 'msec is not number type');

  error = await t.throwsAsync(thunderGirl.load(destination_arr, source_arr, 1, "1"))
  t.is(error.message, 'msec is not number type');
});