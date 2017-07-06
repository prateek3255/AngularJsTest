angular.module("Storage",[])
.controller("firstCtrl",firstCtrl)

function firstCtrl(){
   var demo=this;

   localStorage.setItem("name","prateek")
   name=localStorage.getItem("name");
   demo.name=name;
   var person={name:"hello"};
   var p=JSON.stringify(person);
   localStorage.setItem("person",p);
   name=localStorage.getItem("person");
   demo.name=JSON.parse(name).name;

    
}