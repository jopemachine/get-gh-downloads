#!/usr/bin/env node

const meow = require('meow');
const chalk = require('chalk');
const ora = require('ora');
const boxen = require('boxen');
const getDownloadCounts = require('./getDownloadCounts');

const cli = meow(chalk.white(
`  Usage

    $ get-gh-downloads [user_id] [repository_name] name_option tag_option

  Example:

    $ get-gh-downloads jopemachine some-lib --tag=v0.0.1

  ✔ Works done!

    ╔════════════════════════════════════════════╗
    ║                                            ║
    ║   Name: 0.0.1, Tag: v0.0.1                 ║
    ║   Assets:                                  ║
    ║       some_file.app: 1                     ║
    ║                                            ║
    ║   Total: 1                                 ║
    ║                                            ║
    ╚════════════════════════════════════════════╝

  Total: 1
`,
  {
    flags: {
      name: {
        type: 'string',
        alias: 'n',
        isRequired: () => false
      },
      tag: {
        type: 'string',
        alias: 't',
        isRequired: () => false
      },
    }
  }
));

let wholeTotal = 0;

const transform = (item) => {
  let totalDownload = 0;

  const assetInfo = item.assets.map((fileInfo) => {
    totalDownload += fileInfo.downloadCount;
    return `    ${chalk.blueBright(fileInfo.name)}: ${chalk.yellow(fileInfo.downloadCount)}`;
  }).join('\n');

  wholeTotal += totalDownload;

  const itemLine = chalk.whiteBright(
`${chalk.magentaBright('Name')}: ${chalk.greenBright(item.name)}, ${chalk.magentaBright('Tag')}: ${chalk.greenBright(item.tagName)}
${chalk.magentaBright('Assets')}:
${assetInfo}

${chalk.magentaBright('Total')}: ${chalk.greenBright(totalDownload)}`);

  return chalk.whiteBright(boxen(itemLine, { padding: 1, margin: 1, borderStyle: 'double' }));
};

(async function () {
  const userId = cli.input[0]
  const repository = cli.input[1];

  const { name, tag } = cli.flags;

  const spinner = ora({
    color: 'green',
    discardStdin: true
  }).start(chalk.whiteBright(`Fetching info..`));

  const data = await getDownloadCounts({
    userId,
    repository,
    name,
    tagName: tag,
  });

  spinner.succeed('Works done!');

  console.log(data.map(transform).join('\n'));

  console.log(`${chalk.magentaBright('Total')}: ${chalk.greenBright(wholeTotal)}`);
})();
