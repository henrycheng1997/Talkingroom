function isPrime(n) {
  for (var i=2; i<n; i++) {
    if (n%i === 0)
      return false;
  }
  return true;
}

function Factor(n){
  var factors=[],sum=n;
  while(sum>1){
    for (var i=2; i<=sum;i++) {
      if(sum%i === 0){
        if (isPrime(i)){
          factors.push(i);
          sum=sum/i;
        }
      }
    }  
  }
  return factors;
}

console.log("factor(45)=>",Factor(45));