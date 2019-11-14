// function showdownToc() {
//   return () => [
//     {
//       type: 'lang',
//       filter(source: string, _: any, options: any) {
//         const atxStyle = options.requireSpaceBeforeHeadingText
//           ? /^(#{1,6})[ \t]+(.+?)[ \t]*#*\n+/gm
//           : /^(#{1,6})[ \t]*(.+?)[ \t]*#*\n+/gm;
//         source.replace(atxStyle, (wholeMatch, m1) => '');
//         return source;
//       },
//     },
//   ];
// }

// export default showdownToc;
