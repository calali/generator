// function * myGenerator() {
//   console.log(yield '1')  //test1
//   console.log(yield '2')  //test2
//   console.log(yield '3')  //test3
// }

// // 获取迭代器
// const gen = myGenerator();

// gen.next()
// gen.next('test1')
// gen.next('test2')
// gen.next('test3')


// function * myGenerator() {
//   yield Promise.resolve(1);
//   yield Promise.resolve(2);
//   yield Promise.resolve(3);
// }

// const gen = myGenerator()
// gen.next().value.then(val => {
//   console.log(val)
//   gen.next(9).value.then(val => {
//     console.log(val)
//     gen.next(10).value.then(val => {
//       console.log(val)
//     })
//   })
// })

// function * foo() {
//     yield 'result1'
//     yield 'result2'
//     yield 'result3'
//   }
  
//   const gen = foo()
//   console.log(gen.next().value)
//   console.log(gen.next().value)
//   console.log(gen.next().value)

// function generator(cb) {
//     return (function() {
//       var object = {
//         next: 0,
//         stop: function() {}
//       };
  
//       return {
//         next: function() {
//           var ret = cb(object);
//           if (ret === undefined) return { value: undefined, done: true };
//           return {
//             value: ret,
//             done: false
//           };
//         }
//       };
//     })();
//   }

// function * coffeeMachineGenerator (beans) {
//     do {
//       yield cookCoffee()
//     } while (--beans)
  
//     // 煮咖啡
//     function cookCoffee () {
//       console.log('cooking')
  
//       return 'Here you are'
//     }
//   }
  
//   // 往咖啡机放咖啡豆
//   let coffeeMachine = coffeeMachineGenerator(10)
  
//   // 我想喝咖啡了
//   console.log('ha',coffeeMachine.next());
  
  
//   // 我在3秒后还会喝咖啡
//   setTimeout(() => {
//     console.log('xi',coffeeMachine.next());
    
//   }, 3 * 1e3)

// 生成器函数根据yield语句将代码分割为switch-case块，后续通过切换_context.prev和_context.next来分别执行各个case
// function gen$(_context) {
//     while (1) {
//       switch (_context.prev = _context.next) {
//         case 0:
//           _context.next = 2;
//           return 'result1';
  
//         case 2:
//           _context.next = 4;
//           return 'result2';
  
//         case 4:
//           _context.next = 6;
//           return 'result3';
  
//         case 6:
//         case "end":
//           return _context.stop();
//       }
//     }
//   }
  
//   // 低配版context  
//   var context = {
//     next:0,
//     prev: 0,
//     done: false,
//     stop: function stop () {
//       this.done = true
//     }
//   }
  
//   // 低配版invoke
//   let gen = function() {
//     return {
//       next: function() {
//         value = context.done ? undefined: gen$(context)
//         done = context.done
//         return {
//           value,
//           done
//         }
//       }
//     }
//   } 
  
//   // 测试使用
//   var g = gen() 
//   g.next()  // {value: "result1", done: false}
//   g.next()  // {value: "result2", done: false}
//   g.next()  // {value: "result3", done: false}
//   g.next()  // {value: undefined, done: true}


(function() {
    var ContinueSentinel = {};
  
    var mark = function(genFun) {
      var generator = Object.create({
        next: function(arg) {
          return this._invoke("next", arg);
        }
      });
      genFun.prototype = generator;
      return genFun;
    };
  
    function wrap(innerFn, outerFn, self) {
      var generator = Object.create(outerFn.prototype);
  
      var context = {
        done: false,
        method: "next",
        next: 0,
        prev: 0,
        abrupt: function(type, arg) {
          var record = {};
          record.type = type;
          record.arg = arg;
  
          return this.complete(record);
        },
        complete: function(record, afterLoc) {
          if (record.type === "return") {
            this.rval = this.arg = record.arg;
            this.method = "return";
            this.next = "end";
          }
  
          return ContinueSentinel;
        },
        stop: function() {
          this.done = true;
          return this.rval;
        }
      };
  
      generator._invoke = makeInvokeMethod(innerFn, context,self);
  
      return generator;
    }
  
    function makeInvokeMethod(innerFn, context,self) {
      var state = "start";
  
      return function invoke(method, arg) {
        if (state === "completed") {
          return { value: undefined, done: true };
        }
  
        context.method = method;
        context.arg = arg;
  
        while (true) {
          state = "executing";
  
          var record = {
            type: "normal",
            arg: innerFn.call(self, context)
          };
  
          if (record.type === "normal") {
            state = context.done ? "completed" : "yield";
  
            if (record.arg === ContinueSentinel) {
              continue;
            }
  
            return {
              value: record.arg,
              done: context.done
            };
          }
        }
      };
    }
  
    global.regeneratorRuntime = {};
  
    regeneratorRuntime.wrap = wrap;
    regeneratorRuntime.mark = mark;
  })();
  
  var _marked = regeneratorRuntime.mark(helloWorldGenerator);
  console.log('_marked',_marked);
  
  function helloWorldGenerator() {
    return regeneratorRuntime.wrap(
      function helloWorldGenerator$(_context) {
        while (1) {
          switch ((_context.prev = _context.next)) {
            case 0:
              _context.next = 2;
              return "hello";
  
            case 2:
              _context.next = 4;
              return "world";
  
            case 4:
              return _context.abrupt("return", "ending");
  
            case 5:
            case "end":
              return _context.stop();
          }
        }
      },
      _marked,
      this
    );
  }
  
  var hw = helloWorldGenerator();
  
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
  console.log(hw.next());
