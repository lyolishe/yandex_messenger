module.exports = {
    preset: 'ts-jest',
    testEnvironment: 'jsdom',
    roots: [
        '<rootDir>/__test__',
    ],
    moduleNameMapper: {
        '(.*)\\.js': '$1',
    },
};