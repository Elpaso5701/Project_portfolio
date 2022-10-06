"use strict";

const { forEach } = require("lodash");



// console.log('запрос данных');

// const req = new Promise(function(resolve, reject){
// setTimeout(()=>{
//     console.log('загрузка данных...');
//       let product = {
//           price: 250,
//           hight: 340
//         };
//         resolve(product);
//      reject();//выполняется в Promise в случаем положительного исхода//product данные которые будут идти дальше
//     },2000);

// });

//     req.then((product) => {//метод для обработки положительного результата
//         return new Promise((resolve, reject)=>{
//        setTimeout(()=>{
//           product.width = 245;
//           resolve(product);
//         }, 2000);
//        });
//     }).then(data=>{
//         data.modify = true;
//         return data;
//     }).then( data =>{
//         console.log(data);
//     }).catch(()=>{
//         console.error('Error');
// });

// var food = [
//     {
//     menu: 'salat'
//     },
//     {
//     menu: 'Борщ'
//     },
//     {
//     menu: 'Сырники'
//     },
// ];
// function setFilmsIds(b){
//     return b.map((item, i)=> {
//          item.id = i + 1;
//       return item;
//       });
//   }
//   console.log(setFilmsIds(food));

// const films = [
//     {
//         name: 'Titanic',
//         rating: 9
//     },
//     {
//         name: 'Die hard 5',
//         rating: 5
//     },
//     {
//         name: 'Matrix',
//         rating: 8
//     },
//     {
//         name: 'Some bad film',
//         rating: 4
//     }
// ];


// function showGoodFilms(arr) {
//     return arr.filter(item => item.rating >= 8);
//     }
//     console.log(showGoodFilms(films));

// function showListOfFilms(arr) {
// return arr.reduce((acc, curr) =>`${typeof(acc) === 'object' ? acc.name : acc}, ${curr.name}`);

//     return arr.reduce((acc, curr) => {
//       if (typeof acc === "object") {
//         return `${acc.name}, ${curr.name}`;
//       } else {
//         return `${acc}, ${curr.name}`;
//       }
//     });
//   }



//  Можно ещё проще.


//      return arr.map(elem => elem.name).join(', ');

//  }

//  console.log(showListOfFilms(films));
// function setFilmsIds(arr) {

// }

// const tranformedArray = setFilmsIds(films);

// function checkFilms(arr) {

// }
// function setFilmsIds(arr){
// return arr.map((elem, i)=>{
// elem.id = i;
// return elem;
// });
// }
// console.log(setFilmsIds(films)); 


/**

// Пример сравнения строк
function checkSubstring(text, part) {
   // write code here
   let res1 = text.toUpperCase();
   let res2 = part.toUpperCase();
   if(res1.includes(res2)){
       return true;

       }else{
           return false;
       }
   }

// console.log(checkSubstring('mate academy', 'school')); 
// console.log(checkSubstring('mate academy', 'mate')); 
// console.log(checkSubstring('Mate academy', 'matE')); 
// console.log(checkSubstring('Mate academy', '')); 


const populations = [42000000, 9500000, 3500000, 8400000];


function calculateAverageCountryPopulation(arr) {
    // write code here
    if (arr.length <= 0){
       return 0;
   }else{
let avg1;
let avg2;
let avg3;
let avg4;
let avg;

let sum = 0;//сумма елементів массиву
let average = 0;// результат - середнє арифметичне
// 3. Цикл обчислення суми елементів масиву,
//   тут A.length - кількість елементів масиву
for (let i = 0; i < arr.length; i++){
 sum += arr[i];
}
avg = arr[0];
avg2 = arr[1]/arr.length;
avg3 = arr[2]/arr.length;
avg4 = arr[3]/arr.length;

// 4. Отримати середнє арифметичне
average = sum / arr.length;
return average;
}
}
console.log(calculateAverageCountryPopulation(populations));


//Реализация функции, которая возвращает последний символ строки
function getLastCharacter(str){
return str.substr(-1);
} 



console.log(getLastCharacter('abc')); // 'c'
console.log(getLastCharacter('number 13')); // '3'
console.log(getLastCharacter('#$@!')); // '!'


// let str = "stringify";
// // gi, получаем 2 символа, начиная с позиции 4 с конца строки
// console.log(str.substr(-1) );




//Напиши функцію hasNoneLetters, яка приймає два рядка phrase та blacklist і повертає true, 
//якщо phrase не містить жодної букви з blacklist, інакше false.

function hasNoneLetters(phrase, blacklist) {
   // write code here
let str = phrase.toUpperCase();
let str2 = blacklist.toUpperCase();
for (let i = 0; i < str2.length; i++){
   let arr =str2[i];
if(str.includes(arr[i])){
   return false;
}else{
  return true; 
}
}

}
console.log(hasNoneLetters('Mate Academy', 'Pqrs')); //=== true;
console.log(hasNoneLetters('ABC', 'a')); //=== false;

// Напиши функцію getLongestString, яка повертає найдовший рядок з масиву strings. 
// Якщо два рядка мають однакову довжину - поверни перший з них.
function getLongestString(arr){
  
       let longestWord = "";
     
       arr.forEach(function(word) {
         if(word.length > longestWord.length) {
           longestWord = word;
         }
       });
     
       return longestWord;
     }
     
   //   var word = findLongestWord(["The","quick","brown", "fox", "jumped", "over", "the", "lazy", "dog"]);
   //   console.log(word); // result is "jumped"

console.log(getLongestString(['One', 'two', 'three', 'four']));// === 'three');
console.log(getLongestString(['One', 'two', 'six']));// === 'One');

// Еще вариант

const getLongestText = (arr) => arr.reduce(
   (savedText`, text) => (text.length > savedText.length ? text : savedText),
   '',
 );
 console.log(getLongestText(['One', 'two', 'three', 'four']));// === 'three');
console.log(getLongestText(['One', 'two', 'six']));// === 'One');


// Допиши функцію getLargestNumber так, щоб вона повертала найбільше число з масиву numbers. Числа 
//у масиві можуть бути дробовими, цілими, додатніми та від'ємними.
const getLargestNumber = (arr) => arr.reduce(
   (savedNumber, num) => (num > savedNumber ? num : savedNumber)
 );

 
console.log(getLargestNumber([3, 8, 5, 7])); //=== 8
console.log(getLargestNumber([-4, -9, -3, 0, -6])); //=== 0
console.log(getLargestNumber([7, 7, 7, 7.1])); //=== 7.1
console.log(getLargestNumber([0, 0, 0])); //=== 0
console.log(getLargestNumber([3])); //=== 3
console.log(getLargestNumber([-1.52, -1.57, -1.55, -1.56, -1.53])); //=== -1.52
 */


// Реалізуй функцію generateRange(min, max, step), яка приймає три аргументи і повертає масив 
// цілих чисел починаючи з min з кроком step не більших ніж max.

function generateRange(min, max, step) {
  // write code here
  return Array((max - min + step) / step).fill().map(() => {
    while (min <= max) {
      return ((min = min + step) - step);
    }
  });

}
console.log(generateRange(1, 8, 1));// === [1, 2, 3, 4, 5, 6, 7, 8]);
console.log(generateRange(2, 10, 2));// === [2, 4, 6, 8, 10];



// function generateRange(min, max, step) {
//   return Array.from(Array(((max - min) / step) + 1).keys()).map(el => (el * step) + min);
// }

// console.log(generateRange(1, 8, 1));// === [1, 2, 3, 4, 5, 6, 7, 8]);
// console.log(generateRange(2, 10, 2));// === [2, 4, 6, 8, 10];
// console.log(generateRange(2, 14, 3));// === [2, 5, 8, 11, 14];

// Є рядок, що складається лише з цифр '12320345'. Чи є він паліндромом: перша цифра така, 
// як остання, друга, як передостання і так далі...

// Приклад:

// function isPalindromeNumber(str){
//   let rev = 0;
//   if(str === ''){
//     return true;
//   }
// if(str < 0){
//   return false;
// } 
// if(str % 10 === 0){
//   return false;
// }
// if(str < 10 ){
//   return true;
// }
// while(str > rev){
//  console.log(str, rev);
// rev *= 10;
// rev = rev + str % 10;
// str = Math.trunc(str / 10);
//    }
//    console.log(str, rev);
//   return str === rev || str === Math.trunc(rev / 10);
// }

// console.log(isPalindromeNumber(1221));// === true
// isPalindromeNumber(12321)// === true
// isPalindromeNumber(123321) //=== true
// console.log(isPalindromeNumber('1')); //=== true
// isPalindromeNumber('') //=== true
// isPalindromeNumber('123210')// === false
//


// let start = 4;
// let end = 20;
// let newArr = Array(end - start +1).fill(start).map((x, y) => x + y);
// console.log(newArr);


//Нати самое длинное слово в массиве
var sorted = ["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"].sort(
  function (a, b) {
    return b.length - a.length;
  }
)[0];


console.log(sorted); // result is "jumped"



function findLongestWord(array) {
  let longestWord = "";

  array.forEach(function (item) {
    if (item.length > longestWord.length) {
      longestWord = item;
    }
  });

  return longestWord;
}

// var word = findLongestWord(["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]);
// console.log(word); // result is "jumped"

function maxItem(arr) {
  return Math.max(...arr.map(i => i.length));
}

console.log(maxItem(["The", "quick", "brown", "fox", "jumped", "over", "the", "lazy", "dog"]));

// localStorage.setItem('number', 3);//1й аргумент - название ключа, второй - значение
// localStorage.getItem('number');
// console.log(localStorage.getItem('number'));

// const shops = [
//   {rice:500},
//   {oil: 800},
//   {meat: 900}
// ];
// const budget = [5000, 6000, 7000];
// const map = new Map();

// shops.forEach((shop, i) =>{
//  map.set(shop, budget[i]);
// });
// console.log(map);


// const pers = {
//   name: 'Alex',
//   age : 23,

// get userName(){
//  return this.name;
// },

// get userAge(){
//   return this.age;
//  },

// set userAge(num){
//   this.age = num;

//     }
// };

// console.log(pers.userName);
// console.log(pers.userAge = 25);
// console.log(pers.userAge);


class User {
  constructor(name, age) {
    this.name = name;
    this._age = age;//чтобы никто не смог получить доступ к свойству this.age пропишем его как this._age
  }
  #surname = 'Shvets';

  say() {
    console.log(`Имя ${this.name} ${this.#surname}, возраст ${this._age}`);
  }
  get age() {
    return this._age;
  }
  get surname() {
    return this.#surname;
  }
  set surname(surname) {
    this.#surname = surname;
  }

  set age(age) {
    if (typeof age === 'number' && age > 0 && age < 45) {
      this._age = age;
    } else {
      console.log('Значение не подходит');
    }
  }

}

const alex = new User('Alex', 22);
console.log(alex.surname);
alex.surname = 'K';
console.log(alex.surname);
alex.say();


const number = 1;
(function () {//Анонимная самовызывающаяся функция
  let number = 2;
  console.log(number);
  console.log(number + 3);
}());
console.log(number);

//Об'ект интерфейс. //Анонимная самовызывающаяся функция function expression
const user = (function () {
  const privat = function () {
    console.log('Privat');
  };
  return {
    sayPrivat: privat
  };
}());

user.sayPrivat();

try{
  console.log('работает');
 console.log(b);

}catch(e){
  console.log('Ошибка');
}
console.log(b);
console.log('все еще работает');

