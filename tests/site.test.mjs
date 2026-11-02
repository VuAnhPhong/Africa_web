import { test } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync, existsSync } from 'node:fs';
import { resolve, join } from 'node:path';

const dist = resolve('dist');
const pages = ['index.html', 'Company/index.html', ...['About', 'History', 'Services', 'News', 'Contact'].map(name => `Company/${name}/index.html`)];
for (const page of pages) {
  test(`static page and local dependencies: ${page}`, () => {
    const html = readFileSync(join(dist, page), 'utf8');
    assert.match(html, /uni-body/);
    assert.match(html, /data-lang="vi"/);
    assert.match(html, /data-lang="en"/);
    assert.doesNotMatch(html, /@Render|@ViewData|@Configuration|~\//);
    assert.doesNotMatch(html, /href="https?:\/\/localhost/);
    const active = [...html.matchAll(/<a\b[^>]*class="[^"]*nav-item[^\"]*\bactive\b[^\"]*"[^>]*>/g)];
    assert.equal(active.length, 1, 'exactly one active navigation item');
    assert.ok(html.indexOf('/js/uni-i18n.js') < html.indexOf('/js/uni-script.js'), 'translations load before interactions');
    for (const match of html.matchAll(/(?:src|href)="(\/(?!\/)[^"?#]*)(?:[?#][^"]*)?"/g)) {
      const target = join(dist, decodeURIComponent(match[1]));
      assert.ok(existsSync(target) || existsSync(join(target, 'index.html')), `Missing local target ${match[1]}`);
    }
  });
}
test('CSS background images exist', () => {
  const css = readFileSync(join(dist, 'css/uni-style.css'), 'utf8');
  for (const match of css.matchAll(/url\(['"]?(\/[^)'"\s]+)['"]?\)/g)) {
    assert.ok(existsSync(join(dist, match[1])), `Missing background ${match[1]}`);
  }
});
