// map 임의 구현
Array.prototype.map = function (callback, thisArgs){
    var mappedArr = [];
    for (var i=0; i<this.length; i++){
        var mappedValue = callback.call(thisArgs || window, this[i], i, this);
        mappedArr[i] = mappedValue;
    }
    return mappedArr;
}

var obj = {
    vals: [1,2,3],
    logValues: function(v, i) {
        console.log(this, v, i);
    }
};

//obj.logValues(1,2);
//[4,5,6].forEach(obj.logValues);


var obj1 = {
    name: 'obj1',
    func: function () {
        console.log(this.name); // obj1
    }
};

var callback = obj1.func.bind(obj1);
// setTimeout(callback, 1000);


var obj2 = {
    name: 'obj2'
};
// setTimeout(obj1.func.bind(obj2), 1500);

// 콜백지옥
/*
setTimeout(name=>{
    var coffeeList = name;
    console.log(coffeeList);

    setTimeout(name=>{
        coffeeList += ', ' + name;
        console.log(coffeeList);
        
        setTimeout(name=>{
            coffeeList += ', ' + name;
            console.log(coffeeList);
            
            setTimeout(name=>{
                coffeeList += ', ' + name;
                console.log(coffeeList);

            }, 500, '카페모카');
        }, 500, '카페라떼');
    }, 500, '아메리카노');
}, 500, '에스프레소');
*/

// Promise
/*
new Promise((resolve, reject) => {
    setTimeout(()=>{
        var name = '에스프레소';
        console.log(name);
        resolve(name); // 성공시 결과 보내줌
    }, 500);
}).then((결과값)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            var name = 결과값 + ', ' + '아메리카노';
            console.log(name);
            resolve(name);
        }, 500);
    });
}).then((결과값)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            var name = 결과값 + ', ' + '카페라떼';
            console.log(name);
            resolve(name);
        }, 500);
    });
}).then((결과값)=>{
    return new Promise((resolve)=>{
        setTimeout(()=>{
            var name = 결과값 + ', ' + '카페모카';
            console.log(name);
            resolve(name);
        }, 500);
    });
});
*/


var addCoffee = name => {
    return new Promise(resolve => {
        setTimeout(()=>{
            resolve(name);
        }, 500);
    });
}

var coffeeMaker = async function() {
    var coffeeList = '';
    var _addCoffee = async function (name) {
        coffeeList += (coffeeList? ', ': '') + await addCoffee(name);
    };
    await _addCoffee('에스프레소');
    console.log(coffeeList);
    await _addCoffee('아메리카노');
    console.log(coffeeList);
    await _addCoffee('카페라떼');
    console.log(coffeeList);
    await _addCoffee('카페모카');
    console.log(coffeeList);
};
coffeeMaker();