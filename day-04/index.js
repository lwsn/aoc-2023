const fs = require("fs");

const input = fs
  .readFileSync("./input", "utf8")
  .split("\n")
  .slice(0, -1)
  .map((l) =>
    l
      .split(": ")[1]
      .split(" | ")
      .map((s) => s.split(" ").filter(Boolean).map(Number)),
  );

const resA = input.reduce(
  (a, [w, c]) =>
    a + c.reduce((b, n) => (w.includes(n) ? (b ? b * 2 : 1) : b), 0),
  0,
);

const resB = input
  .map(([w, c]) => c.reduce((acc, n) => acc + Number(w.includes(n)), 0))
  .map((wins) => [wins, 1])
  .reduce((acc, [wins, copies], i, l) => {
    new Array(wins).fill(i + 1).forEach((v, j) => {
      if (!l[v + j]) return;
      l[v + j][1] += copies;
    });

    return acc + copies;
  }, 0);

console.log(resA);
console.log(resB);
