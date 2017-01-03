function binary(n){
var s="",t=n;
while (t>=1){
    var r=(t%2);
    s=r+s;
    t=(t-r)/2;
}    
return s;
}
console.log(binary(6));