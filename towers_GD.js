/** There are N towers. the height of the  ith tower is Hi.
 *  A sequence of towers is goof if there are not any two adjacents towers that have the same heights.
 * 
 * 
 */

const readline = require("readline");
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout,
});

function isExpensierIfBacktracked(fromIndex, H, M, value) {
  if (fromIndex === 0 && M[fromIndex] < value) {
    return false;
  }
  H[fromIndex]++; // Simulating that the increment was done on this tower.
  let cost = M[fromIndex];
  if (cost > value) {
    return true;
  }
  // Go back, incrementing the first tower that is equal to the next,
  // sum the cost of this backtracking and return as soon as the
  // cost is greater than modifying the next tower.
  for (let i = fromIndex - 1; i > -1; i--) {
    const v1 = H[i];
    const v2 = H[i + 1];
    if (v1 !== v2) {
      return false;
    }
    cost += M[i];
    H[i]++;
    if (cost > value) {
      return true;
    }
  }
  return false;
}

function minCost(N, H, M) {
  console.log(M);
  let result = 0;
 
  const j = N - 1;

  for (let i = 0; i < j; i++) {
    const v1 = H[i];
    const v2 = H[i + 1];
    if (v1 === v2) {
      const cost1 = M[i];
      const cost2 = M[i + 1];
      // Check if backtracking is cheaper.
      if (isExpensierIfBacktracked(i, [...H], M, cost2)) {
        H[i + 1]++;
        result += cost2;
      } else {
        result += cost1;
        H[i]++;
        i -= 2; // Backtrack to check if the previous tower now is equal to the current tower
      }
    }
  }
  return result;
}

//this is a promise that creates an interface in case you want to introduce the values from console
let gets = new Promise((success, reject) => {
  rl.question("Write your tower sequece to process, Note you have to use spaces to separate values example '3 5 40 15 1 3 4' :\n", (series) => {
    console.log("procesing ...");
    series = series.split(' ');
    success(series);
    rl.close();
  });
});

gets.then((result) => {
  console.log("result is: ", result);
  let temp = result
  // console.log(temp);
  let N = parseInt(temp[0]);

  var H = [];
  for (let i = 1 + N; i < 1 + N; i++) {
    H.push(parseInt(temp[i])); //
    console.log(temp[i])  
  }
  console.log(H)
  var M = [];
  for (let i = 1 + N; i < 1 + N + N; i++) {
    M.push(parseInt(temp[i])); //
    console.log(temp[i])
    
  }
  console.log(M)

  console.log(minCost(N, H, M));
});


