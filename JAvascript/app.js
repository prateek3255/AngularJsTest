var a=5;
var b=6;
console.log(a,b);

var cities =["jaipur","delhi","pune"];
console.log(cities);

var person={};
person.name="prateek";
person.age=20;
person.add=sum;

console.log(person.add(1,2));
console.log(person);

var speak=function(){
    console.log("hello");
}

speak();

function talk(){            //Hoisting
    console.log("talk");
}

talk();

function sum(a,b){
    return a+b;
}

console.log(sum("hello","world").split("w"));

console.log(talk);


function calc(fx,a,b){
    return fx(a,b);
}

console.log(calc(sum,1,2));

//TIMER

setTimeout(speak,2000);
console.log("world");


person2=person;
console.log(person2.name);
person2.name="xyz0";
console.log(person.name);