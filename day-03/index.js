const fs = require("fs");

let input = fs.readFileSync("./input").toString("utf8").split("\n");
input.pop();
const numbers = ["0", "1", "2", "3", "4", "5", "6", "7", "8", "9"];
const nonSymbols = [...numbers, "."];

input = input.map((s) => "." + s + ".");
input = [".".repeat(input[0].length), ...input, ".".repeat(input[0].length)];

const adjacent = [
  [-1, -1],
  [-1, 0],
  [-1, 1],
  [0, -1],
  [0, 1],
  [1, -1],
  [1, 0],
  [1, 1],
];

const checkAdjacent = (list, y, x) =>
  adjacent.some(
    ([y1, x1]) => !nonSymbols.includes(list[y + y1]?.[x + x1] || ".")
  );

let resASum = 0;

input.forEach((v, y, l) => {
  let curString = "";
  let hasAdjacent = false;
  let x = 0;

  for (const c of v.split("")) {
    if (numbers.includes(c)) {
      hasAdjacent = hasAdjacent || checkAdjacent(l, y, x);
      curString += c;
    } else {
      if (hasAdjacent && curString.length) resASum += parseInt(curString, 10);

      curString = "";
      hasAdjacent = false;
    }
    x++;
  }
});

const expandNumber = (list, y, _x) => {
  let x = _x;
  const row = list[y];
  let number = row[_x];

  while (numbers.includes(row[++x])) number += row[x];
  x = _x;
  while (numbers.includes(row[--x])) number = row[x] + number;

  return Number(number);
};

const resBSum = input.reduce(
  (acc1, row, y, l) =>
    acc1 +
    row.split("").reduce((acc2, c, x) => {
      if (c !== "*") return acc2;

      const adjacentNumbers = adjacent
        .map(([y1, x1]) => [y + y1, x + x1])
        .map(([y1, x1]) =>
          numbers.includes(l[y1]?.[x1]) ? expandNumber(l, y1, x1) : null
        );

      if (adjacentNumbers[1]) {
        adjacentNumbers[0] = null;
        adjacentNumbers[2] = null;
      }

      if (adjacentNumbers[6]) {
        adjacentNumbers[5] = null;
        adjacentNumbers[7] = null;
      }

      const [a, b] = adjacentNumbers.filter(Boolean);

      if (!a || !b) return acc2;

      return acc2 + a * b;
    }, 0),
  0
);

console.log(resASum);
console.log(resBSum);
