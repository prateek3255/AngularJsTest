angular.module("demo",[])
.controller("one",onetwothree)


function onetwothree(){
    var o=this;
    o.name="yo";
    o.a=2;
    o.b=3;
    o.product = function(a,b){
        return a*b;
    }
    o.c=0;
    o.sum = function(a,b){
        return a+b;
    }
    o.diff= function(a,b){
        return a-b;
    }
}