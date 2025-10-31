//! A. Iterative Implementation: O(n) time, O(1) space
var sum_to_n_a = function (n) {
  let sum = 0;                      // Initialize accumulator
  for (let i = 1; i <= n; i++) {    // Loop from 1 to n, until i exceeds n
    sum += i;                       // Add current number to sum
  }
  return sum;                       // Return final result
};

//! B. Mathematical Formula Implementation: O(1) time, O(1) space
var sum_to_n_b = function (n) {
  if (n <= 0) return 0;             // Handle non-positive n cases
  return (n * (n + 1)) / 2;         // Use the formula by Gauss: n(n + 1)/2
};

//! C. Recursive Implementation: O(n) time, O(n) space
var sum_to_n_c = function (n) {
  if (n <= 0) return 0;             // Base case: if n is non-positive, return 0
  return n + sum_to_n_c(n - 1);     // Recursive case: add n to the sum of numbers up to n-1
};

//! Test Cases
// const values = [5, 10, 100];
// values.forEach((n) => {
//   console.log(`n = ${n}`);
//   console.log(`A. Iterative: ${sum_to_n_a(n)}`);
//   console.log(`B. Formula:   ${sum_to_n_b(n)}`);
//   console.log(`C. Recursive: ${sum_to_n_c(n)}`);
//   console.log("-----------------------------");
// });

//! Final Results
const nA = 10;
console.log(`A. Iterative: sum(1-${nA}) = ${sum_to_n_a(nA)}`); // Expected: 55

const nB = 20;
console.log(`B. Formula:   sum(1-${nB}) = ${sum_to_n_b(nB)}`); // Expected: 210

const nC = 30;
console.log(`C. Recursive: sum(1-${nC}) = ${sum_to_n_c(nC)}`); // Expected: 465
