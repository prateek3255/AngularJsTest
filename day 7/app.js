angular.module("demo",[])
.controller("firstCtrl",firstCtr)



function firstCtr(){
    
    var todo=this;
    todo.submit=function(form1){
        console.log(form1);
    }

}

