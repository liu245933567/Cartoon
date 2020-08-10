const { defaults } = require('jest-config');
const path = require('path');

module.exports = {
  moduleFileExtensions: [...defaults.moduleFileExtensions, 'ts', 'tsx'],
  verbose: true,
  // 单元测试环境根目录
  rootDir: path.resolve(__dirname),
  // setupFiles: ['raf/polyfill'],
  // transform: {
  //   '\\.(ts|tsx)$': 'ts-jest'
  // },
  // 指定需要进行单元测试的文件匹配规则
  testMatch: ['**/__test__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[tj]s?(x)'],
  // 需要忽略的文件匹配规则
  testPathIgnorePatterns: ['/node/modules'],
  testURL: 'http://localhost/',
  // 是否收集测试覆盖率，以及覆盖率文件路径
  collectCoverage: true,
  coverageDirectory: './coverage'
};
