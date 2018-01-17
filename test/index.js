const path = require('path');

const fs = require('fs-extra');

const getEntries = require('../dist');

const files = ['a/index.js', 'b/index.js', 'c/d/index.js', 'e/f/index.js'];

const testFolder = path.join(__dirname, 'test-dir');

beforeAll(() => {
  files.forEach((f) => {
    fs.outputFileSync(path.join(testFolder, f), '');
  });
});

afterAll(() => {
  fs.removeSync(testFolder);
});

test('Test basic usage', () => {
  const entries = getEntries('./test/test-dir/**/*.js', './test/test-dir/');

  console.log(entries);

  files.forEach((f) => {
    const key = f.slice(0, -3);

    const val = entries[key];

    expect(val).toBeDefined();

    expect(val.length).toBe(1);

    expect(val[0]).toBe('./test/test-dir/' + f);
  });
});

test('Test common modules', () => {
  const entries = getEntries('./test/test-dir/**/*.js', './test/test-dir/', {
    useDir: true,
    commonModules: ['lodash', 'jquery']
  });

  console.log(entries);

  files.forEach((f) => {
    const key = f
      .split('/')
      .slice(0, -1)
      .join('/');

    const val = entries[key];

    expect(val).toBeDefined();

    expect(val.length).toBe(3);

    expect(val[0]).toBe('lodash');

    expect(val[1]).toBe('jquery');

    expect(val[2]).toBe('./test/test-dir/' + f);
  });
});
