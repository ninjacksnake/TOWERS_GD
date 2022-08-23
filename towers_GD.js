/** There are N towers. the height of the  ith tower is Hi.
 *  A sequence of towers is goof if there are not any two adjacents towers that have the same heights.
 */

const readline = require("readline");
const assert = require("assert");

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
let gets = () =>
  new Promise((success, reject) => {
    rl.question(
      "Write your tower sequece to process, Note you have to use spaces to separate values example  3 5 40 15 1 3 4 :\n",
      (series) => {
        console.log("procesing ...");
        series = series.split(" ");
        success(series);
        rl.close();
      }
    );
  });

getN = (temp) => {
  try {
    return parseInt(temp[0]); // number of towers
  } catch (e) {
    console.log("Could not get number of towers", e.message);
  }
};

getH = (N, temp) => {
  try {
   
    let mH = [];
    for (let i = 1; i < 1 + N; i++) {
      // console.log(i, temp[i]);
      mH.push(parseInt(temp[i]));
    }
    // console.log("mH",mH)
    return mH;
  } catch (error) {
    console.log("Could not get heights ", error.message);
  }
};

getM = (N, temp) => {
  try {
    let mM = [];
    for (let i = 1 + N; i < 1 + N + N; i++) {
      mM.push(parseInt(temp[i]));
    }
    return mM;
  } catch (error) {
    console.log("Could not get costs", error.message);
  }
};

//this function is to execute the minCost function directly, parameters should be passed using the interface
let execute = () => {
  gets.then((result) => {
    let temp = result;
    let N = getN(temp); // number of towers
    let H = getH(N, temp); // array of Towers height
    let M = getM(N, temp); // array of costs
    console.log(
      "The minimun cost to Improve the sequence is: ",
      minCost(N, H, M)
    );
  });
};


async function test(args, expectedResult, testName ="" ) {
  if (args.length > 0) {
    args = args.split(" ");
    if (testName.length >= 0) {
      console.log(`Test: minCost of ${args} is equal to ${expectedResult}?`);
    }
  else {  console.log(testName); }
    let N = getN(args); // number of towers
    let H = getH(N, args); // array of Towers Height
    let M = getM(N, args); // array of Towers Cost]
    let result = minCost(N, H, M);
    // console.log("Test result: ",result);
    try {
     
      assert.equal(result, expectedResult);  //assertion
      console.log("TEST PASSED \n");
      return true;
    } catch (e) {
      console.log("TEST FAIL! expected value:", e.expected," is different from result:", e.actual, "\n");
      return false;
    }
  }
}

module.exports.test = test;
module.exports.execute = execute;
 