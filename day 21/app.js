angular.module("todoApp",[])
.controller("firstCtrl",firstCtrl)

function firstCtrl($http){
    var todo=this;
    var baseUrl="https://randomuser.me/api"
    var path="/"
    
    // var promise=$http.get(baseUrl+path);
    // promise.then(function(result){
    //     console.log(result);
    //     todo.user=result.data.results[0];

    // }).catch(function(err){
    //     console.log(err);
    // });
    todo.getSuperhero=function(){
        var baseUrl2="https://gateway.marvel.com:443/v1/public/characters";
        path2="?nameStartsWith="+todo.search+"&apikey=2feeda64f790c199777c58d8fe35a80d";
        var promise2=$http.get(baseUrl2+path2);
        promise2.then(function(result2){
            console.log(result2);
            todo.superheroes=result2.data.data.results;
        }).catch(function(err){
            console.log(err);
        });
    }

    
}