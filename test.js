const Towers_GD = require("./towers_GD");

// test cases array
tests = [
  Towers_GD.test("3 2 2 3 4 1 5", 2),
  Towers_GD.test("4 1 3 2 100000000 7 3 6 2", 0),
  Towers_GD.test("3 2 2 2 3 10 6", 9),
  Towers_GD.test("3 2 2 3 4 1 5", 1), //negative test
  Towers_GD.test("5 1 4 3 3 3 1 2 3 4 5", 4),
  Towers_GD.test("6 1 4 3 3 3 3 1 2 3 4 5 6", 9), // negative test it should be 10 
];


//test swite to atomate tests
testSwite = async () => {
  let results = [];
  try {
    let i = 0;
    for await (const result of tests) {
      results.push(result);
      i++;
    }
  } finally {
    report = {
      Success: results.filter((result) => {
        return result == true;
      }).length,
      Fails: results.filter((result) => {
        return result == false;
      }).length,
      TestCases: tests.length,
    };
    console.log(report);
  }
};
testSwite();
