module.exports = {
  preset: 'ts-jest',
  testEnvironment: 'node',
  cache: false,
  globals: {
    "ts-jest": {
      tsConfig: "tsconfig.test.json",
      diagnostics: true,
    }
  }
}
