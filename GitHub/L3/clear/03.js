function filter357(a,b){
  x=[];
  for(i=a;i<=b;i++){
    if(i%3 !== 0 && i%5 !== 0 && i%7 !==0){
      x.push(i);
    }
  }
  return x;
}

console.log("filter357(5,15)=", filter357(5,15));
console.log("filter357(1,30)=", filter357(1,30));