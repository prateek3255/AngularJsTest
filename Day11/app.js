angular.module("todoApp",[])
.controller("firstCtrl",firstCtrl)

function firstCtrl(){
    var todo=this;
    todo.tasks=[];
    todo.addTask=addTask;
    todo.editMode=false;
    todo.saveIndex=0;
    // taskObj={};
    

    function addTask(){
        taskObj={};
        taskObj.name=todo.task;
        taskObj.status=0;
        todo.tasks.push(taskObj);
        todo.task="";
        console.log(todo.tasks);
    }
    todo.deleteTask=function(i){
        todo.tasks.splice(i,1);
    }
    todo.editTask=function(i){
        todo.task=todo.tasks[i].name;
        todo.editMode=true;
        todo.saveIndex=i;
    }
    todo.updateTask=function(i){
        todo.tasks[todo.saveIndex].name=todo.task;
        todo.editMode=false;
        todo.task="";
    }
    todo.setStatus=function(i){
        todo.tasks[i].status=1;
    }
}