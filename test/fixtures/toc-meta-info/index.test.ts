import Showdown from 'showdown';
import fs from 'fs';
import path from 'path';
import showdownToc from '../../../src/index';

Showdown.setFlavor('github');

describe('test/fixtures/toc-meta-info/index.test.ts', () => {
  it('should get correct toc meta info', () => {
    const toc = [];
    const showdown = new Showdown.Converter({ extensions: [showdownToc({ toc })] });
    const input = fs.readFileSync(path.join(__dirname, 'index.md'), 'utf8');
    showdown.makeHtml(input);
    expect(toc).toEqual([
      { anchor: 'usereducer和redux的区别：', level: 2, text: 'useReducer和redux的区别：' },
      { anchor: '思路：', level: 2, text: '思路：' },
      {
        anchor: '第一步，通过usereducer在根组件上创建globaldispatch和globalstate：',
        level: 3,
        text: '第一步，通过useReducer在根组件上创建globalDispatch和globalState：',
      },
      {
        anchor: '第二步：-创建context并在根组件上传入globalstate和globaldispatch',
        level: 3,
        text: '第二步： 创建context并在根组件上传入globalState和globalDispatch',
      },
      {
        anchor: '在子组件中使用globalstate和globaldispatch：',
        level: 3,
        text: '在子组件中使用globalState和globalDispatch：',
      },
      { anchor: '总结和建议：', level: 3, text: '总结和建议：' },
    ]);
  });
});
