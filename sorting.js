
//buble sort
function bubbleSort(arr) {
  let l = arr.length;
  while (l-- > 0) {
    let swapped = false;
    for (let i = 0; i < l; i++) {

      if (arr[i] > arr[i + 1]) {
        const temp = arr[i];
        arr[i] = arr[i + 1];
        arr[i + 1] = temp;
        swapped = true;
      }
    }
    if (!swapped) break;
  }
  return arr;
}

console.log(bubbleSort([4, 20, 12, 10, 7, 9]));
console.log (bubbleSort([0, -10, 7, 4]));
console.log (bubbleSort([1, 2, 3]));
console.log (bubbleSort([]));

//merge
function merge (arr1, arr2) {
    let out = [];
    let i=0;
    let j=0;
    while (i<arr1.length && j<arr2.length) {
        if (arr1[i] <= arr2[j]) {
            out.push (arr1[i]);
            i++;
        }
        else {
            out.push(arr2[j]);
            j++;
        }
    }
    while (i < arr1.length) {
        out.push(arr1[i++]);
    }
    while (j < arr2.length) {
        out.push (arr2[j++]);
    }

    return out;
}

let arr1 = [1,3,4,5];
let arr2 = [2,4,6,8];
console.log (merge(arr1,arr2));

let arr3 = [-2,-1,0,4,5,6];
let arr4 = [-3,-2,-1,2,3,5,7,8];
console.log (merge(arr3,arr4));

let arr5 = [3,4,5]
let arr6 = [1,2]
console.log (merge(arr5,arr6));

//merge sort
function mergeSort (arr) {

    if (arr.length <= 1) {
        return arr;
    }
    else {
        const mid = Math.floor (arr.length/2);
        
        const left = mergeSort (arr.slice (0, mid));
        const right = mergeSort(arr.slice (mid));

        return merge (left, right);
    }
}

console.log (mergeSort([4, 20, 12, 10, 7, 9]));
console.log (mergeSort([0, -10, 7, 4]));
console.log (mergeSort([1, 2, 3]));
console.log (mergeSort([]));

//insertion sort
function insertionSort (arr) {
  for (let i = 1; i < arr.length; i++) {
    let key = arr[i];
    let j = i - 1;

    while (j >= 0 && arr[j] > key) {
      arr[j + 1] = arr[j];
      --j;
    }
    arr[j + 1] = key;
  }
  return arr;
}

console.log (insertionSort([4, 20, 12, 10, 7, 9]));
console.log (insertionSort([0, -10, 7, 4]));
console.log (insertionSort([1, 2, 3]));
console.log (insertionSort([]));

let nums = [
    4, 3, 5, 3, 43, 232, 4, 34, 232, 32, 4, 35, 34, 23, 2,
    453, 546, 75, 67, 4342, 32
];

console.log (insertionSort(nums));

//selection sort
function selectionSort(arr) {
  let sl = 0;

  while (sl < arr.length - 1) {
    let minIndex = sl;
    for (let i = sl + 1; i < arr.length; i++) {
      if (arr[minIndex] > arr[i])
        minIndex = i;
    }
    let temp = arr[sl];
    arr[sl] = arr[minIndex];
    arr[minIndex] = temp;
    ++sl;
  }
  return arr;
}

console.log (selectionSort([4, 20, 12, 10, 7, 9]));
console.log (selectionSort([0, -10, 7, 4]));
console.log (selectionSort([1, 2, 3]));
console.log (selectionSort([]));
console.log (selectionSort(nums));


function pivot(arr) {
    const pivot= arr[0];
    let pivotIndex = 0;

    for (let i=1; i<arr.length; i++) {
        if (arr[i] < pivot) {
            ++pivotIndex;
            if (pivotIndex !== i) {
                const temp = arr[pivotIndex];
                arr[pivotIndex] = arr[i];
                arr[i] = temp;
            }
        }
    }
    const temp = arr[0];
    arr[0] = arr[pivotIndex];
    arr[pivotIndex] = temp;

    console.log (arr);
    return pivotIndex;
}

let arr = [4, 2, 5, 3, 6];
console.log (pivot(arr)); // 2

let arr7 = [5, 4, 9, 10, 2, 20, 8, 7, 3];
let arr8 = [8, 4, 2, 5, 0, 10, 11, 12, 13, 16];

console.log (pivot(arr7)); // 3
console.log (pivot(arr8)); // 4

console.log (arr7.slice(0, 3).sort((a, b) => a - b)); // [2, 3, 4]
console.log(arr7.slice(3).sort((a, b) => a - b)); // [5, 7, 8, 9, 10, 20]

console.log(arr8.slice(0, 4).sort((a, b) => a - b)); // [0, 2, 4, 5]
console.log(arr8.slice(4).sort((a, b) => a - b)); // [8, 10, 11, 12, 13, 16]

//quick sort
function quickSort (arr) {
    if (arr.length <= 1)
        return arr;
  
    let pivotIndex = pivot (arr);
    let left = quickSort(arr.slice (0, pivotIndex));
    let right = quickSort(arr.slice (pivotIndex+1));

    return [...left, arr[pivotIndex], ...right];
 
}

console.log (quickSort([4, 20, 12, 10, 7, 9]));
console.log (quickSort([0, -10, 7, 4]));
console.log (quickSort([1, 2, 3]));
console.log (quickSort([]));
console.log (quickSort(nums));

//Radix sort
function radixSort (arr) {

    const max = Math.max (...arr);
    let digit = 1;
    let buckets = [];
    
    while (max/digit > 0) {
        let buckets = [];
        for (let i=0; i<10; i++) {
            buckets.push ([]);
        }
        
        for (let i=0; i<arr.length; i++) {
            let eleDigit = Math.floor((arr[i]/digit) % 10);
            buckets [eleDigit].push (arr[i]);
        }
        arr = buckets.flat();
        digit *= 10;
    }
   return arr; 
}

console.log (radixSort ([8, 6, 1, 11]));
console.log (radixSort ([10, 100, 1, 1000, 10000000]));
console.log (radixSort ([902, 4, 7, 408, 29, 9637, 1556, 3556, 8157, 4386, 86, 593]));