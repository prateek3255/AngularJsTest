angular.module("firebaseApp",["firebase"])
.controller("firstCtrl",firstCtrl)

function firstCtrl($firebaseArray){
   
   var todo=this;
   //reference to database path
   var students = firebase.database().ref("students");
   //parsing the reference to an array
   todo.students = $firebaseArray(students);
   todo.add=function(){
        todo.students.$add({name:todo.name,age:todo.age});
   }
   todo.delete=function(i){
       todo.students.$remove(i);
   }
   

   
   console.log(todo.students);
   console.log("testing")
}