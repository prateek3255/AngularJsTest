angular.module("tictactoe",[])
.controller("tic",tic)

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
    t.changeState=function(id){
        if(t.buttons[id].state){
            if(t.player)
                t.buttons[id].value="X";
            else
                t.buttons[id].value="O";
        }
        t.buttons[id].state=false;
        t.player=!t.player;
        console.log(t.player);
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


    }

    function disableAll(){
        for(i=0;i<9;i++){
            t.buttons[i].state=false;
        }
    }
} 