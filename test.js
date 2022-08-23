const Towers_GD = require("./towers_GD");
tests = [
  Towers_GD.test("3 2 2 3 4 1 5", 2),
  Towers_GD.test("3 2 2 3 4 1 5", 2),
  Towers_GD.test("3 2 2 3 4 1 5", 1),
  Towers_GD.test("3 2 2 3 4 1 5", 1),
  Towers_GD.test("3 2 2 3 4 1 5", 2),
];

testSwite = async () => {
  let results = [];
  try {
    let i = 0;
    for await (const result of tests) {
      results.push(result);
      i++;
    }
  } finally {
    const Fails = results.filter((result) => {
      return result == false;
    });
    const Success = results.filter((result) => {
      return result == true;
    });
    report = {
      Success: Success.length,
      Fails: Fails.length,
      Test_Count: tests.length,
    };
    console.log(report);
  }
};
testSwite();
