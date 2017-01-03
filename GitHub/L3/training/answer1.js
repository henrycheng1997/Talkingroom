function print(a) 
{
    var s = "";
    for (var i=0; i<a.length; i++)
    {
        for (var j=0; j<a[i].length; j++)
        {
            s = s+a[i][j]+'\t';
        }
        s = s + '\n';
    }
    console.log(s);
}


function transpose(a)
{
    var at=[];
    for (var j=0; j<a[0].length; j++)
    {
        at[j] = [];
        for (var i=0; i<a.length; i++)
        {
            at[j][i] = a[i][j];
        }
    }
    return at;
}

var m = [[1,2,3], [3,12,1]];
console.log("====== m =========");
print(m);
console.log("====== mt =========");
print(transpose(m)); // => [[1,3], [2,2], [3,1]]