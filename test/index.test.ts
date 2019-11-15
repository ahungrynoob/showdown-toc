import fs from 'fs';
import Showdown from 'showdown';
import showdownToc from '../src/index';

Showdown.setFlavor('github');

describe('test/index.test.ts', () => {
  const fixturesDir = 'test/fixtures';
  const cases = fs.readdirSync(fixturesDir).map(name => {
    const input = fs.readFileSync(`${fixturesDir}/${name}/index.md`, 'utf8');
    const expected = fs.readFileSync(`${fixturesDir}/${name}/index.output`, 'utf8');
    const option = require(`../${fixturesDir}/${name}/option.ts`).default;
    return { input, expected, name, option };
  });

  cases.forEach(({ name, input, expected, option }) => {
    it(`should output correct html content - ${name}`, () => {
      const showdown = new Showdown.Converter({ extensions: [showdownToc(option)] });
      const output = showdown.makeHtml(input);
      expect(output).toEqual(expected);
    });
  });
});
