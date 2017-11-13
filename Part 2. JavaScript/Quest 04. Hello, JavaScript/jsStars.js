var num = prompt("input number of lines");

if(!isNaN(num) && num>0) { 
    makeTree(num);
}
else {
    console.log("input valid number");
}

function makeTree(num){
    var str = "";
    for(var i = 0; i < num; i++){
        for(var j = num-i; j > 1; j--){
            str += " ";
        }
        for(var s = 0; s < ((2*i) + 1); s++){
            str += "*";
        }
        str += "\n";
    }
    console.log(str);
}
