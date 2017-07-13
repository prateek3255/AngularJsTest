angular.module("tictactoe",['ngRoute','firebase'])
.config(function($routeProvider){

    $routeProvider
    .when("/",{templateUrl:"views/login.html"})
    .when("/game/:gameId",{templateUrl:"views/game.html"})
    .when("/leaderboard",{templateUrl:"views/leaderboard.html"})
    // .otherwise({redirectto})
})
.controller("tic",tic)
.controller("loginCtrl",loginCtrl)
.controller("leaderCtrl",leaderCtrl)


function loginCtrl($firebaseAuth,$location,$firebaseArray){
    var login=this;
    var auth =  $firebaseAuth();
    login.loginWithGoogle=function(){
        var promise = auth.$signInWithPopup("google")

        promise.then(function(result) {
            console.log("Signed in as:", result);
            var leaderRef=firebase.database().ref("leaderboard");
            var leaderboard=$firebaseArray(leaderRef);
            var present = false;
            leaderboard.$loaded().then(function(){
                for(i=0;i<leaderboard.length;i++){
                    if(leaderboard[i].uid==result.user.uid){
                        present=true;
                    }
                }
                if(!present){
                    var player={};
                    player.uid=result.user.uid;
                    player.displayName=result.user.displayName;
                    player.photoURL=result.user.photoURL;
                    player.score=0;
                    player.challenge=0;
                    player.accept=leader.user.uid;
                    player.gameId=0;
                    leaderboard.$add(player);
                }

            });
            
            $location.path("/leaderboard");
        })
        .catch(function(error) {
            console.error("Authentication failed:", error);
        }); 
    }   


}

function leaderCtrl($firebaseAuth,$location,$firebaseArray){
    var auth =  $firebaseAuth();
    var leader=this;
    auth.$onAuthStateChanged(function(user){
        if(user){
            leader.user=user;
            for(i=0;i<leader.user.displayName.length;i++){
                if(leader.user.displayName[i]==" "){
                    leader.dName=leader.user.displayName.substr(0,i);
                    break;
                }
            }
        }
        else{
            $location.path("/");
        }
    });
   leader.leaderIndex=0;
   leader.loaded=false;
   leader.count=false;
   leader.ch=false;
    var gameRef=firebase.database().ref("game");
    var game=$firebaseArray(gameRef);
    leader.game=game;
    var leaderRef=firebase.database().ref("leaderboard");
    var onlineRef=firebase.database().ref("online");
    var leaderboard=$firebaseArray(leaderRef);
    leader.leaderboards=leaderboard;
    leader.leaderboards.$loaded().then(function(){
        for(i=0;i<leader.leaderboards.length;i++){
            if(leader.leaderboards[i].uid==leader.user.uid)
                break;
        }
        leader.leaderIndex=i;
        leader.leaderboards[leader.leaderIndex].challenge=0;
        leader.leaderboards[leader.leaderIndex].accept=leader.user.uid;
        leader.leaderboards.$save(leader.leaderIndex);
        leader.loaded=true;
        var connectedRef = firebase.database().ref(".info/connected");
        connectedRef.on("value", function(snap) {
            if (snap.val() === true) {
                console.log("connected");

                var person={};
                person.uid=leader.user.uid;
                person.photoURL=leader.user.photoURL;
                person.displayName=leader.user.displayName;

                var con = onlineRef.push(person);

                con.onDisconnect().remove();
                
            } else {
                
            }
        });

     var ref = firebase.database().ref("leaderboard");
     ref.orderByChild("accept").equalTo(leader.user.uid).on("value", function(snapshot) {
        if(leader.count&&!leader.ch){
             $location.path("/game/"+leader.leaderboards[leader.leaderIndex].gameId);
             console.log("working");
        
        }
            
           
         
         leader.count=!leader.count;
             
});

    });
    var onlineUsersRef=firebase.database().ref("online");
    onlineUsers=$firebaseArray(onlineUsersRef);
    leader.onlineUsers=onlineUsers;

    leader.request=function(index){
        for(i=0;i<leader.leaderboards.length;i++){
            if(leader.leaderboards[i].uid==leader.onlineUsers[index].uid)
                break;
        }
        leader.leaderboards[i].challenge=leader.user.displayName;
        leader.leaderboards.$save(i);
        leader.ch=true;
    }

    leader.declineRequest=function(){
        leader.leaderboards[leader.leaderIndex].challenge=0;
        leader.leaderboards.$save(leader.leaderIndex);
    }

    leader.acceptRequest=function(){
        for(i=0;i<leader.leaderboards.length;i++){
            if(leader.leaderboards[leader.leaderIndex].challenge==leader.leaderboards[i].displayName)
                break;
        }
        leader.leaderboards[i].accept=true;
        ran=Math.round(Math.random()*100000);
        leader.leaderboards[leader.leaderIndex].gameId=ran;
        leader.leaderboards[i].gameId=ran;
        leader.leaderboards.$save(i);
        leader.leaderboards.$save(leader.leaderIndex);
        leader.game.$add({"id":ran});
        $location.path("/game/"+ran);
        
    }

   
   
}


function tic(){
    var t=this;
    t.buttons=[];
    for(i=0;i<9;i++){
        button={};
        button.id=i;
        button.state=true;
        button.value="";
        t.buttons.push(button);
    }
    t.player=true;
    t.win=0;
    tie=true;
    t.changeState=function(id){
        if(t.buttons[id].state){
            if(t.player)
                t.buttons[id].value="X";
            else
                t.buttons[id].value="O";
            t.player=!t.player;
        }
        t.buttons[id].state=false;
        checkIfComplete();

    }
    function checkIfComplete(){
        for(i=0;i<7;i=i+3){
            if(t.buttons[i].value=='X'&&t.buttons[i+1].value=='X'&&t.buttons[i+2].value=='X'){
                t.win=1;
                disableAll();
            }
            else
                if(t.buttons[i].value=='O'&&t.buttons[i+1].value=='O'&&t.buttons[i+2].value=='O'){
                    t.win=2;
                    disableAll();
                }
        }
        for(i=0;i<3;i++){
            if(t.buttons[i].value=='X'&&t.buttons[i+3].value=='X'&&t.buttons[i+6].value=='X'){
                t.win=1;
                disableAll();
            }
            else
                if(t.buttons[i].value=='O'&&t.buttons[i+3].value=='O'&&t.buttons[i+6].value=='O'){
                    t.win=2;
                    disableAll();
                }
        }

        if(t.buttons[0].value=='X'&&t.buttons[4].value=='X'&&t.buttons[8].value=='X'){
                t.win=1;
                disableAll();
            }
            else
                if(t.buttons[0].value=='O'&&t.buttons[4].value=='O'&&t.buttons[8].value=='O'){
                    t.win=2;
                    disableAll();
                }


        if(t.buttons[2].value=='X'&&t.buttons[4].value=='X'&&t.buttons[6].value=='X'){
                t.win=1;
                disableAll();
            }
            else
                if(t.buttons[2].value=='O'&&t.buttons[4].value=='O'&&t.buttons[6].value=='O'){
                    t.win=2;
                    disableAll();
                }
        console.log(allSelected(),tie);
        if(allSelected()&&tie)
            t.win=3;
    }


    function disableAll(){
        for(i=0;i<9;i++){
            t.buttons[i].state=false;
        }
        tie=false;
    }

    function allSelected(){
        flag=true;
        for(i=0;i<9;i++){
            if(t.buttons[i].state)
                flag=false;
        }
        return flag;
    }

    t.reset=function(){
        // for(i=0;i<9;i++){
        //     t.buttons[i].state=true;
        //     t.buttons[i].value="";
        // }
        // t.win=0;
        // t.player=true;
        // tie=true;
        
    }
} 