// reference: https://github.com/showdownjs/showdown/blob/fc7ac1e1ca90d1849d120025105d1f45c9d4f8f6/src/subParsers/makehtml/headers.js#L58
/* istanbul ignore next */
import showdown, { ShowdownOptions } from 'showdown';

export function headerId(
  m: string,
  options: ShowdownOptions,
  hashLinkCounts: { [key: string]: number },
) {
  let title;
  let prefix;

  // It is separate from other options to allow combining prefix and customized
  if (options.customizedHeaderId) {
    const match = m.match(/\{([^{]+?)}\s*$/);
    if (match && match[1]) {
      m = match[1];
    }
  }

  title = m;

  // Prefix id to prevent causing inadvertent pre-existing style matches.
  if (showdown.helper.isString(options.prefixHeaderId)) {
    prefix = options.prefixHeaderId;
  } else if (options.prefixHeaderId === true) {
    prefix = 'section-';
  } else {
    prefix = '';
  }

  if (!options.rawPrefixHeaderId) {
    title = prefix + title;
  }

  if (options.ghCompatibleHeaderId) {
    title = title
      .replace(/ /g, '-')
      // replace previously escaped chars (&, ¨ and $)
      .replace(/&amp;/g, '')
      .replace(/¨T/g, '')
      .replace(/¨D/g, '')
      // replace rest of the chars (&~$ are repeated as they might have been escaped)
      // borrowed from github's redcarpet (some they should produce similar results)
      .replace(/[&+$,/:;=?@"#{}|^¨~[\]`\\*)(%.!'<>]/g, '')
      .toLowerCase();
  } else if (options.rawHeaderId) {
    title = title
      .replace(/ /g, '-')
      // replace previously escaped chars (&, ¨ and $)
      .replace(/&amp;/g, '&')
      .replace(/¨T/g, '¨')
      .replace(/¨D/g, '$')
      // replace " and '
      .replace(/["']/g, '-')
      .toLowerCase();
  } else {
    title = title.replace(/[^\w]/g, '').toLowerCase();
  }

  if (options.rawPrefixHeaderId) {
    title = prefix + title;
  }

  if (hashLinkCounts[title]) {
    title = `${title}-${hashLinkCounts[title]++}`;
  } else {
    hashLinkCounts[title] = 1;
  }
  return title;
}
