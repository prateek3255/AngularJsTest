angular.module("todoApp",[])
.controller("firstCtrl",firstCtrl)

function firstCtrl(){
    var todo=this;
    todo.tasks=[];
    todo.addTask=addTask;
    todo.editMode=false;
    todo.saveIndex=0;

    function addTask(){
        todo.tasks.push(todo.task);
        todo.task="";
        console.log(todo.tasks);
    }
    todo.deleteTask=function(i){
        todo.tasks.splice(i,1);
    }
    todo.editTask=function(i){
        todo.task=todo.tasks[i];
        todo.editMode=true;
        todo.saveIndex=i;
    }
    todo.updateTask=function(i){
        todo.tasks[todo.saveIndex]=todo.task;
        todo.editMode=false;
        todo.task="";
    }
}