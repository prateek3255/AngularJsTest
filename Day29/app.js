angular.module("demo",[])
.controller("firstCtrl",firstCtr)
.controller("secondCtrl",secondCtrl)


function firstCtr($scope){
    console.log("hello");
    var first =this;
    var a=5; //not available
    first.b=4; //available


first.sum=function(a,b){
    console.log(a+b);
}
    $scope.c=7;


}


function secondCtrl(){
    this.name="abc"
}