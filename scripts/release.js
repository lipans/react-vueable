const fs = require('node:fs');
const path = require('node:path');
const execa = require('execa');

const run = (bin, args, opts = {}) =>
  execa(bin, args, { stdio: 'inherit', shell: true, ...opts });

function updatePackageVersion() {
  const pkgRoot = path.resolve(__dirname, '..');
  const pkgPath = path.resolve(pkgRoot, 'package.json');
  const pkg = JSON.parse(fs.readFileSync(pkgPath, 'utf-8'));
  const versionArray = pkg.version.split('.');
  const newVersion = `${versionArray[0]}.${versionArray[1]}.${
    Number(versionArray[2]) + 1
  }`;
  pkg.version = newVersion;
  fs.writeFileSync(pkgPath, JSON.stringify(pkg, null, 2) + '\n');
  return newVersion;
}

function getNewChangeLog() {
  const pkgRoot = path.resolve(__dirname, '..');
  const changelogContent = fs.readFileSync(
    path.resolve(pkgRoot, 'CHANGELOG.md'),
    { encoding: 'utf8' },
  );
  return changelogContent.split('\n\n\n\n')[0];
}

function writeNewChangeLog(newChangeLog) {
  const pkgRoot = path.resolve(__dirname, '..');
  fs.writeFileSync(path.resolve(pkgRoot, '_CHANGELOG.md'), newChangeLog + '\n');
}

async function main() {
  console.log('update package version');
  const newVersion = updatePackageVersion();
  console.log('update changelog');
  await run(`pnpm`, ['run', 'changelog']);

  const newChangeLog = getNewChangeLog();
  console.log('new changelog:', newChangeLog);
  if (!newChangeLog.includes('\n\n\n')) {
    throw new Error('no new changes');
  }
  console.log('push change and tag to git');
  await run('git', ['config', '--global', 'user.email', '"li-pan2@163.com"']);
  await run('git', ['config', '--global', 'user.name', '"lipans"']);
  await run('git', ['add', '-A']);
  await run('git', ['commit', '-m', `"release: v${newVersion}"`]);

  await run('git', ['tag', `v${newVersion}`]);
  await run('git', ['push', 'origin', `refs/tags/v${newVersion}`]);
  await run('git', ['push']);

  await run('echo', [
    `"TAG_NAME=v${newVersion}"`,
    '>>',
    process.env.GITHUB_ENV,
  ]);

  console.log('write new changelog');
  writeNewChangeLog(newChangeLog);
}

main();
