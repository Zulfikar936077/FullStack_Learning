//var generateName = require('sillyname'); //when the type is commonjs

import generateName from 'sillyname'; //when the type is module
var sillyName = generateName();

console.log(`My name is ${sillyName}!`);


import {randomSuperhero} from 'superheroes';

var superhero = randomSuperhero();
console.log(`My superhero is ${superhero}!`);