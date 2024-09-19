// some dynamic programming
// TASK: we have a frog on stone 1 and stones N we need find every possible path to last stone. Frog can jump for 1 or 2 to right.

const input = prompt("give me stones: ");
let v = -1;

if (input != null && !isNaN(+input)) v = +input;

const frogSolution = (n: number): void => {
  const size = v;
  const dp = new Array(size).fill(0);

  dp[0] = 1;
  for (let i = 0; i < n; i++) {
    dp[i + 1] += dp[i];
    dp[i + 2] += dp[i];
  }

  // n - 1 because starting from 0
  console.log(dp[n - 1]);
};

// frogSolution(v);

// https://cses.fi/problemset/task/1633

const diceSolution = (n: number): void => {
  const size = n + 1;
  const dp = new Array(size).fill(0);
  dp[0] = 1;
  const mod = 10e9 + 7;

  for (let i = 1; i <= n; i++) {
    // set limits corresponding to task description
    for (let j = 1; j <= 6; j++) {
      if (i - j >= 0) {
        dp[i] = (dp[i] + dp[i - j]) % mod;
      }
    }
  }
  console.log(dp[n]);
};
diceSolution(v);
