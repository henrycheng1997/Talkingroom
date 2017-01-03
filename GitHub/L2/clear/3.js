function sqrt(n) {
x=0;
while(x*x<n) {x=x+0.000001;
}
return x;}

console.log("sqrt(9)=",sqrt(9));
console.log("sqrt(16)=",sqrt(16));
console.log("sqrt(29)=",sqrt(29));