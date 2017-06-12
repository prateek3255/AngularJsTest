function Dna(a,b){
    x=a.split("");
    y=b.split("");
    console.log(x,y);
    var c=0;
    for(i=0;i<x.length;i++){
        if(x[i]!=y[i])
            c=c+1;
    }
    console.log(c);
}

function pangram(str){
    arr=str.split("");
    pan=[];
    for(i=0;i<arr.length;i++){
        if(pan.indexOf(arr[i])==-1){
            if(arr[i]!=" ")
                pan.push(arr[i]);
        }
    }
    if(pan.length==26)
        console.log("Panagram");
    else
        console.log("Not a panagram",pan);
}

function isogram(str){
    arr=str.split("");
    var flag=0;
    iso=[];
    for(i=0;i<arr.length;i++){
        if(iso.indexOf(arr[i])==-1)
            iso.push(arr[i]);
        else
            flag=1;
    }
    if(flag==0)
        console.log("Isogram");
    else
        console.log("Not an Isogram");
}

function acronym(str){
    var acro=str.charAt(0);
    for(i=1;i<str.length;i++){
        if(str.charAt(i)==" ")
            acro=acro+str.charAt(i+1);
    }
    console.log(acro);
}

function append(){
    var p=document.getElementById('p1');
    p.innerHTML=p.innerHTML+"<br>This text will be repeated again and again"
}

var m=58;
var s=58;
var h=0;

function digital(){
    // var cdate=new Date();
    // var h=cdate.getHours();
    // var m=cdate.getMinutes();
    // var s=cdate.getSeconds();
    // m=ticking(m);
    // s=ticking(s);
    // var p=document.getElementById('p2');
    // p.innerHTML=h+":"+m+":"+s;
    // time=setInterval('digital()',1000);
    if(s>=59){
        s=0;
        m=m+1;
    }
    if(m>=59){
        s=0;
        m=0;
        h=h+1;
    }
    s=s+1;
     var p=document.getElementById('p2');
    p.innerHTML=ticking(h)+":"+ticking(m)+":"+ticking(s);
    setTimeout('digital()',1000);

    


}
function ticking(ticVal) {
        if (ticVal < 10) {
            ticVal = "0" + ticVal;
        }
        return ticVal;
    }

function array(arr){
    var arr1=[];
    for(i=0;i<arr.length;i++){
        if(arr[i]!=null&&arr[i].length==undefined)
            arr1.push=arr[i];
        else{
            if(arr[i]!=null){
                arr=arr.concat(arr[i]);
            }
        }
            
    }
    console.log(arr1);
}

function arrrr(arr){
    console.log();
}


