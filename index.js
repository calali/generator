
//例子1
// var gen = function* (){
// 	return 1;
// }

// var  a = gen()
// // console.log(a());

// console.log(a.next())

// console.log(a.next());

// console.log(a.next());


//例子2
// var gen = function* (){
// 	yield 2;
// 	return 1;
// }
// var a = gen();
// console.log( a.next() );
// console.log( a.next() );
// console.log( a.next() );

// var item = null;
// while( item = a.next() ){
// 	if(item.done === true){
// 		break;
// 	}
// 	// do anything with {item}
// 	console.log(item.value);
// }

// 例子3
// function* abc() {
//     let count = 0;
//     while(true) {
//         let msg = yield ++count;
//         console.log(msg);
//     }
// }

// let iter = abc();
// console.log('ha',iter.next().value);
// // 1
// console.log('ha',iter.next('abc').value);
// 'abc'
// 2

//例子4
// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
//   }
   
//   var a = foo(5);
//   console.log(a.next());// Object{value:6, done:false}
//   console.log(a.next());// Object{value:NaN, done:false} // 第二次next方法的时候不带参数，导致 y 的值等于2 * undefined（即NaN）
//   console.log(a.next());// Object{value:NaN, done:true}
  
   
//   var b = foo(5);
//   console.log(b.next()); // { value:6, done:false }
//   console.log(b.next(12)); // { value:8, done:false }// 上面的y = 2*12（即next的传参是上一个yield的返回值）,然后24/3=8
//   console.log(b.next(13));//{ value: 42, done: true }
  
  
  
             
//例子5
// var g = function* () {
//     try {
//       yield;
//     } catch (e) {
//       console.log('内部捕获', e);
//     }
//   };
   
//   var i = g();
//   i.next();
   
//   try {                 
//     i.throw(new Error('a'));  // 第一个错误被 Generator 函数体内的catch语句捕获。
//     i.throw(new Error('b'));  // i第二次抛出错误，由于 Generator 函数内部的catch语句已经执行过了
//                               // 所以这个错误就被抛出了 Generator 函数体，被函数体外的catch语句捕获。
//                               // 建议抛出Error对象的实例。
//   } catch (e) {
//     console.log('外部捕获', e);
//   }
  // 内部捕获 a
  // 外部捕获 b

  // 例子5
// var gen = function* gen(){
//     try {
//       yield console.log('a');
//     } catch (e) {
//       // ...
//     }
//     yield console.log('b');
//     yield console.log('c');
//   }
   
//   var g = gen();
//   g.next() // a
//   g.throw() // b // 执行了一次next

//     g.next() // c
  

// 例子6
// function* dataConsumer() {
//     console.log('Started');
//     console.log(`1. ${yield}`);
//     console.log(`2. ${yield}`);
//     return 'result';
//   }
  
//   let genObj = dataConsumer();
//   genObj.next();
//   // Started
//   genObj.next('a')
//   // 1. a
//   genObj.next('b')
//   // 2. b

// 例子7
// function* gen(x){
//     try {
//       var y = yield x + 2;
//     } catch (e){
//       console.log(123,e);
//     }
//     return y;
//   }
  
//   var g = gen(1);
//   console.log(g.next());
  
//   console.log(g.next());
  
// //   g.throw('出错了');
//   // 出错了


//例子7
// var fetch = require('node-fetch');

// function* gen(){
//   var url = 'https://api.github.com/users/github';
//   var result = yield fetch(url);
//   console.log(result.bio);
// }

// var g = gen();
// var result = g.next();
// console.log(result);

// result.value.then(function(data){
    
//     var result = data.json()
//     console.log(1,result);
//   return result
// }).then(function(data){
//     console.log(2,data);
    
//   g.next(data);
// });