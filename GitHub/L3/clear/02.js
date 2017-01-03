a=[1,4,5,8,9];

function find(x){
for(i=0;i<a.length;i++){
  if(a[i] === x){
    return 2;
  }
 }
 return -1;
}

console.log("find([ 1, 4, 5, 8, 9], 5) => ",find(5));
console.log("find([ 1, 4, 5, 8, 9], 10) => ",find(10));