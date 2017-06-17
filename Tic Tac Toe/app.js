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
        for(i=0;i<9;i++){
            t.buttons[i].state=true;
            t.buttons[i].value="";
        }
        t.win=0;
        t.player=true;
        tie=true;
    }
} 