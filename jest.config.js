module.exports = {
  roots: ["<rootDir>"],
  transform: {
    "^.+\\.tsx?$": "ts-jest",
  },
  // "testRegex": "(/__tests__/.*|(\\.|/)(test|spec))\\.tsx?$",
  // "testRegex": "/__tests__/(.*)\\.test\\.ts$",
  testRegex: "(.*)\\.test\\.(js|ts)$",
  moduleFileExtensions: ["ts", "tsx", "js"],
};
