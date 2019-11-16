# showdown-toc

[![NPM version][npm-image]][npm-url] [![build status][travis-image]][travis-url] [![Test coverage][codecov-image]][codecov-url] [![npm download][download-image]][download-url]

[npm-image]: https://img.shields.io/npm/v/showdown-toc.svg?style=flat-square
[npm-url]: https://npmjs.org/package/showdown-toc
[travis-image]: https://img.shields.io/travis/ahungrynoob/showdown-toc.svg?style=flat-square
[travis-url]: https://travis-ci.org/ahungrynoob/showdown-toc
[codecov-image]: https://codecov.io/gh/ahungrynoob/showdown-toc/branch/master/graph/badge.svg
[codecov-url]: https://codecov.io/gh/ahungrynoob/showdown-toc
[download-image]: https://img.shields.io/npm/dm/showdown-toc.svg?style=flat-square
[download-url]: https://npmjs.org/package/showdown-toc

A markdown-toc extension for [showdown](https://github.com/showdownjs/showdown).
<br/>
**Features:**
- export table of contents info through closure
- output table of contents into your html string

---

## Install

### esm
```bash
$ npm i showdown-toc --save
```

### umd
```html
<script src="showdown.js"></script>
<script src="//unpkg.com/showdown-toc/dist/index.umd.min.js"></script> 
```

## Usage

### 1. export toc info through closure
```javascript
import Showdown from 'showdown';
import showdownToc from 'showdown-toc';

const content = 'your markdown content';
const toc = [];
const showdown = new Showdown.Converter({ extensions: [showdownToc({ toc })] });
const result = showdown.makeHtml(content);
return result;
```
The `toc` array you pass in `showdownToc` will be:
```javascript
[
    { anchor: 'header-1', level: 1, text: 'header 1' }, // # header 1
    { anchor: 'header-4', level: 4, text: 'header 4' }, // #### header 4
    ...
]
```

### 2. output table of contents into your html string
In your markdown just put a [toc] where you want a Table of Contents to appear. This extension will look for the first header after the [toc] and use whatever it finds first as the element for the rest of the TOC.

You can have multiple [toc] in a file, each one will show a Table of Contents for headers after it (and before the next [toc]).

If you move up a level from the headers being used for a [toc], the Table of Contents will stop (the assumption being you're "outside" of that section).

#### example

**Markdown Input**

```markdown
# Main Page Heading
This is the intro to the main page.

## Section 1
A story.

[toc]

### Part 1
It was a nice day.

### Part 2
There were stormy clouds on the horizon.

#### Part 2A
They were very dark.

### Part 3
Then it rained.

## Section 2
Notice the section 2 header above is not included in the TOC of section 1? That's 
because each toc tag assumes it should stay in it's own section.

[toc]

### Part 1

### Part 2

#### Part 2A
Notice this heading isn't in the contents above. We only index the top level 
headings in each section, to keep things tidy. You may or may not like this, but 
that's the way it is. If you want to create a pull request with an option, 
you're welcome to! :)

### Part 3

The End.
```

**HTML Output**

> <h1 id="mainpageheading">Main Page Heading</h1>
> <p>This is the intro to the main page.</p>
> <h2 id="section1">Section 1</h2>
> <p>A story.</p>
> <ol class="showdown-toc"><li><a href="#part1">Part 1</a></li><li><a href="#part2">Part 2</a></li><li><a href="#part3">Part 3</a></li></ol>
> <h3 id="part1">Part 1</h3>
> <p>It was a nice day.</p>
> <h3 id="part2">Part 2</h3>
> <p>There were stormy clouds on the horizon.</p>
> <h4 id="part2a">Part 2A</h4>
> <p>They were very dark.</p>
> <h3 id="part3">Part 3</h3>
> <p>Then it rained.</p>
> <h2 id="section2">Section 2</h2>
> <p>Notice the section 2 header above is not included in the TOC of section 1? That's because each toc tag assumes it should stay in it's own section.</p>
> <ol class="showdown-toc"><li><a href="#part1">Part 1</a></li><li><a href="#part2">Part 2</a></li><li><a href="#part3">Part 3</a></li></ol>
> <h3 id="part1">Part 1</h3>
> <h3 id="part2">Part 2</h3>
> <h4 id="part2a">Part 2A</h4>
> <p>Notice this heading isn't in the contents above. We only index the top level headings in each section, to keep things tidy. You may or may not like this, but that's the way it is. If you want to create a pull request with an option, you're welcome to! :)</p>
> <h3 id="part3">Part 3</h3>
> <p>The End.</p>

## License

[MIT](LICENSE)
