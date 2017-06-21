angular.module("todoApp",['ngRoute','firebase'])
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

function homeCtrl($firebaseArray,todolist){
    var home=this;
     var listRef = firebase.database().ref("lists");
    var lists = $firebaseArray(listRef);
    home.lists=lists;
    
    home.add=function(){
        home.lists.$add({"name":home.list});
        listObj={};
        listObj.name=home.list;
        listObj.tasks=[];
        todolist.push(listObj);
        home.list="";
    }
}

function firstCtrl($firebaseArray,$routeParams){
    var todo=this;
    todo.tasks=[];
    todo.name=$routeParams.listitem;

    var taskRef = firebase.database().ref('tasks').child(todo.name);
    todo.tasks = $firebaseArray(taskRef);

    todo.addTask=addTask;
    todo.editMode=false;
    todo.saveIndex=0;
    todo.tasks.$loaded().then(function(){
        console.log(todo.tasks.length);
        todo.totalTasks=todo.tasks.length;
        todo.completedTasks=0;
        cId=0;
        for(i=0;i<todo.tasks.length;i++){
            if(todo.tasks[i].status==1)
                todo.completedTasks=todo.completedTasks+1;
            if(todo.tasks[i].id>cId)
                cId=todo.tasks[i].id;
    }
    });
    
    
    
    todo.check=0;
    // taskObj={};
    

    function addTask(){
        cId=cId+1;
        taskObj={};
        taskObj.name=todo.task;
        taskObj.status=0;
        taskObj.id=cId;
        todo.tasks.$add(taskObj);
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
        todo.tasks.$remove(j);
        
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
        todo.tasks.$save(todo.saveIndex);
        todo.editMode=false;
        todo.task="";
    }
    todo.setStatus=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        todo.tasks[j].status=1;
        todo.tasks.$save(j);
        todo.completedTasks=todo.completedTasks+1;
    }
    todo.moveDown=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=todo.tasks.length-1){
            //  var tempObject = todo.tasks.splice(j, 1, todo.tasks[j + 1])[0];
            //  todo.tasks.splice(j+1, 1, tempObject);
            //  todo.tasks.$save(j);
            //  todo.tasks.$save(j+1);

            var temp=todo.tasks[j+1].name;
            todo.tasks[j+1].name=todo.tasks[j].name;
            todo.tasks[j].name=temp;
            
            var temp=todo.tasks[j+1].id;
            todo.tasks[j+1].id=todo.tasks[j].id;
            todo.tasks[j].id=temp;
            
            var temp=todo.tasks[j+1].status;
            todo.tasks[j+1].status=todo.tasks[j].status;
            todo.tasks[j].status=temp;
            
            todo.tasks.$save(j);
            todo.tasks.$save(j+1);

            



        }
       
        
    }

    todo.moveUp=function(id){
        for(j=0;j<todo.tasks.length;j++){
            if(todo.tasks[j].id==id)
                break;
        }
        if(j!=0){
            //  var tempObject = todo.tasks.splice(j-1, 1, todo.tasks[j])[0];
            //  console.log(tempObject);
            //  console.log(todo.tasks.splice(j, 1, tempObject));
            //  todo.tasks.$save(j-1);
            //  todo.tasks.$save(j);
            var temp=todo.tasks[j-1].name;
            todo.tasks[j-1].name=todo.tasks[j].name;
            todo.tasks[j].name=temp;
            
            var temp=todo.tasks[j-1].id;
            todo.tasks[j-1].id=todo.tasks[j].id;
            todo.tasks[j].id=temp;
            
            var temp=todo.tasks[j-1].status;
            todo.tasks[j-1].status=todo.tasks[j].status;
            todo.tasks[j].status=temp;
            
            
            todo.tasks.$save(j-1);
            todo.tasks.$save(j);
        }
       
        
    }
}