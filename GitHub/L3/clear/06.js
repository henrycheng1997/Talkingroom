a = [1,3,6,7,10];
check = 0;
for(i=0;i<a.length-1;i++){
  b = a[i+1]-a[i]; 
  if(check === 0){
        check = b;
    }
  if(b < check){
    check =  b;
  }
}

console.log("minGap([1,3,6,7,10]) =",check);