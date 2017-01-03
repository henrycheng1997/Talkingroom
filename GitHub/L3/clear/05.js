a =[1,2,3,4,5];
sum =0;
mean =3;
for(i=0;i<a.length;i++){
  a[i]=a[i]-mean;
  sum = sum + a[i]*a[i];
}

sd =Math.sqrt(sum/a.length);
console.log("sd([1,2,3,4,5]) = sqrt((2^2+1^2+0^2+1^2+2^2)/5) = sqrt(2)=",sd);