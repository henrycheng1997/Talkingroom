function transpose(a) {
  array1 =[];
  array2 =[];
  array3 =[];
  arrays =[];
  array1.push(a[0][0],a[1][0]);
  array2.push(a[0][1],a[1][1]);
  array3.push(a[0][2],a[1][2]);
  arrays.push(array1,array2,array3)
    console.log(arrays)
}

transpose([[1,2,3], [3,2,1]]);