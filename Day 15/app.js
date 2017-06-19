angular.module("todoApp",['ngRoute'])
.config(function($routeProvider){

$routeProvider
    .when("/",{templateUrl:"views/home.html"})
    .when("/list/:listitem",{templateUrl:"views/list.html"})
    // .otherwise({redirectto})

})
.controller("firstCtrl",firstCtrl)
.controller("homeCtrl",homeCtrl)
.factory("lists",lists)
.factory("todolist",todolist)

function lists(){
    return [];
}

function todolist(){
    return[];
}

function homeCtrl(lists,todolist){
    var home=this;
    home.lists=lists;
    
    home.add=function(){
        home.lists.push(home.list);
        listObj={};
        listObj.name=home.list;
        listObj.tasks=[];
        todolist.push(listObj);
        console.log(todolist);
        home.list="";
    }
}

function firstCtrl(todolist,$routeParams){
    var todo=this;
    todo.tasks=[];
    todo.name=$routeParams.listitem;
    for(i=0;i<todolist.length;i++){
        if(todo.name==todolist[i].name){
            break;
        }
           
    }
    todo.tasks=todolist[i].tasks;
    todo.addTask=addTask;
    todo.editMode=false;
    todo.saveIndex=0;
    todo.totalTasks=todo.tasks.length;
    todo.completedTasks=0;
    cId=0;
    for(i=0;i<todo.tasks.length;i++){
        if(todo.tasks[i].status==1)
            todo.completedTasks=todo.completedTasks+1;
        if(todo.tasks[i].id>cId)
            cId=todo.tasks[i].id;
    }
    
    todo.check=0;
    // taskObj={};
    

    function addTask(){
        cId=cId+1;
        taskObj={};
        taskObj.name=todo.task;
        taskObj.status=0;
        taskObj.id=cId;
        todo.tasks.push(taskObj);
        todo.task="";
        todo.totalTasks=todo.totalTasks+1;
        // console.log(todo.tasks);
    }
    todo.deleteTask=function(id){
        todo.totalTasks=todo.totalTasks-1;
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(todo.tasks[j].status==1)
            todo.completedTasks=todo.completedTasks-1;
        todo.tasks.splice(j,1);
        
    }
    todo.editTask=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        todo.task=todo.tasks[j].name;
        todo.editMode=true;
        todo.saveIndex=j;
    }
    todo.updateTask=function(){

        todo.tasks[todo.saveIndex].name=todo.task;
        todo.editMode=false;
        todo.task="";
    }
    todo.setStatus=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        todo.tasks[j].status=1;
        todo.completedTasks=todo.completedTasks+1;
    }
    todo.moveDown=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=todo.tasks.length-1){
             var tempObject = todo.tasks.splice(j, 1, todo.tasks[j + 1])[0];
             todo.tasks.splice(j+1, 1, tempObject);
        }
       
        
    }

    todo.moveUp=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=0){
             var tempObject = todo.tasks.splice(j-1, 1, todo.tasks[j])[0];
             console.log(tempObject);
             console.log(todo.tasks.splice(j, 1, tempObject))   ;
        }
       
        
    }
}