var cities = ["delhi","pune","mumbai","jaippur"];
city = cities;
console.log(city);
city.push("NY");
console.log(cities);
cities=[];
cities=cities.concat(city);
cities.push("washington");
console.log(city);
console.log(cities);

var tell=function(){
    console.log("yo!")
    return "hello";
};
person={};
person.speak=tell;
person.age=19;
// function calc(fx,b){
//     return fx(b);
// }

//console.log(calc(tell,5));

setTimeout(tell,2000);
console.log(person);