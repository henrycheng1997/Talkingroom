function gcd(a,b){
    for (var i=a;i>=2;i--){
        if (a%i===0 && b%i===0)
        return i;
    }
    return 1;
}

var g = gcd(12,15);
console.log("gcd(12,15)=",g);

var g2 =gcd(12,17);
console.log("gcd(12,17)",g2);