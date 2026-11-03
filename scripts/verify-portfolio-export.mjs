import { readFileSync, existsSync } from 'node:fs';
import { createHash } from 'node:crypto';
import assert from 'node:assert/strict';
import path from 'node:path';
const output = path.resolve('out');
const routes = [
  '',
  'what-i-do',
  'projects',
  'experience',
  'contact',
  'spreadsheet-escape',
];
let links = 0,
  downloads = 0;
for (const route of routes) {
  const file = path.join(output, route, 'index.html');
  assert(existsSync(file), 'Missing export: ' + route);
  const html = readFileSync(file, 'utf8');
  assert.equal(
    (html.match(/<h1\b/g) || []).length,
    1,
    'One main heading: ' + route
  );
  for (const tag of html.matchAll(/<a\b[^>]+>/g)) {
    const href = tag[0].match(/href="([^"]+)"/)?.[1];
    if (!href?.startsWith('/')) continue;
    const local = decodeURIComponent(href.split(/[?#]/)[0]);
    const destination = path.join(output, local);
    assert(
      existsSync(destination) ||
        existsSync(path.join(destination, 'index.html')) ||
        existsSync(destination + '.html'),
      'Broken internal link ' + href + ' on ' + route
    );
    links++;
    if (local.startsWith('/documents/')) {
      assert(
        /download="[^"]+\.pdf"/i.test(tag[0]),
        'Download filename missing: ' + tag[0]
      );
      assert.equal(
        readFileSync(destination).subarray(0, 5).toString(),
        '%PDF-',
        'Invalid PDF ' + local
      );
      downloads++;
    }
  }
}
for (const [file, sha] of Object.entries({
  'tafara-rugara-cv.pdf':
    '4d1a7cf05c65af01acfe18d6254804c76e6e3a7279af8d0e8713118a49b95b50',
  'tafara-rugara-reference.pdf':
    '12a5d296d2d9c868abd0df2195b53ccfef5ea4fe6d7726cf99b8b03cd4235e10',
}))
  assert.equal(
    createHash('sha256')
      .update(readFileSync(path.join(output, 'documents', file)))
      .digest('hex'),
    sha,
    'Unexpected document replacement: ' + file
  );
const config = readFileSync('netlify.toml', 'utf8');
assert(
  !/from\s*=\s*"\/\*"[\s\S]*?to\s*=\s*"\/index.html"/.test(config),
  'SPA fallback would mask missing PDF files'
);
assert(
  config.includes('Content-Disposition = "attachment"'),
  'Documents must download'
);
assert(existsSync(path.join(output, '404.html')), 'Missing static 404');
console.log(
  `${routes.length} routes, ${links} internal links and ${downloads} download links verified; current PDF hashes and real 404 confirmed.`
);
