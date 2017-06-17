angular.module("services",['ngRoute'])
.config(function($routeProvider){

$routeProvider
    .when("/",{templateUrl:"home.html"})
    .when("/about",{templateUrl:"about.html"})
    .otherwise({redirectTo:"/"})
})
.controller("firstCtrl",firstCtrl)
.controller("secondCtrl",secondCtrl)
.factory("dataService",dataService)


function dataService(){
    return {};
}

function firstCtrl(dataService){
    var first=this;
    first.person=dataService;
    first.person.name="xyz";
    console.log("first");
}

function secondCtrl(dataService){
    var second=this;
    second.person=dataService;
    console.log("second");
}
