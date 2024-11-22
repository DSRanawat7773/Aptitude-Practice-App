function isPalindrome(str) {
    // Remove non-alphanumeric characters and convert to lowercase
    const cleanStr = str.toLowerCase();

    // Use two-pointer technique to compare characters from start and end
    let left = 0;
    let right = cleanStr.length - 1;

    while (left < right) {
        if (cleanStr[left] !== cleanStr[right]) {
            return false;
        }
        left++;
        right--;
    }

    return true;
}
console.log("The palindrome is " + isPalindrome("madam"));
// const numbers = [1, 2, 3, 4, 5, 6, 7]; 
// function filterEvenNumbers(numbers) {
//   return numbers.filter(num => num % 2 === 0); 
// }

// const evenNumbers = filterEvenNumbers(numbers); 
// console.log(evenNumbers); 

// // const n = 5;

// function factorial(n){
//     if(n==1 || n==0) return 1;
//     else return factorial(n-1)*n;
// }

// console.log(factorial(5))

function isPrime(n){
    if(n<1) return false;

    for(let i=2; i<=Math.sqrt(n); i++){
        if(n%i===0) return false;
    }

    return true;
}

console.log(isPrime(79));

function fiboancci(num){
    if(num<=0) return [];
    if(num===1) return [0];

    let numArr = [0,1];

    while(numArr.length<=num){
        let next = numArr[numArr.length-1] + numArr[numArr.length-2];
        numArr.push(next);
    }

    return numArr;
}

console.log(Math.max(...fiboancci(7)));

