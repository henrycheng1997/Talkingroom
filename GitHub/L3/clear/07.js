function randomBetween(a,b) 
{
    return a+(b-a)*Math.random();

}

function random (n,a,b)
{
    var r=[];
    for (var i=0;i<n;i++)

{
r[i]=randomBetween(a,b)
}
return r;
}
console.log('random(3,10,20)=',random(3,10,20))