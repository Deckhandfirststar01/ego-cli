[![npm](https://img.shields.io/npm/v/ego-cli.svg)](https://www.npmjs.com/package/ego-cli)

# ego-cli

Command Line Interface, which is designed to handle things, like Dev(Op) tasks, much faster.

## Install

You can install it globally:

```bash
npm install -g ego-cli
```

Or for your project, from where your `package.json` file is stored:

```bash
npm install --save-dev ego-cli
```

## Execute

For example run the integrated [Yeoman generator](https://github.com/egodigital/generator-ego) by executing:

```bash
ego new
```

To list all available commands, simply run

```bash
ego
```

## Custom commands

To implement a command, lets say `my-command`, create a `my-command.sh` (`my-command.cmd` on Windows) file inside the `.ego` subfolder of your home directory, give it enough rights to be executed and fill it with the code, you would like to execute.

To execute the new command, simply run

```bash
ego my-command ARG1 ARG2
```

All additional arguments, after `my-command`, will be passed to the shell / batch script.

### Scripts

With the help of `run` command, you can implement [Node.js]() based scripts.

Create a `.js`, like `test.js`, and use the following skeleton:

```javascript
exports.execute = async (context) => {
    // context.args     =>  List of command line arguments, s. https://www.npmjs.com/package/minimist
    // context.cwd      =>  The full path of the current working directory
    // context.package  =>  The 'package.json' file of the e.GO CLI
    // context.queue    =>  A queue, that only executes 1 action at the same time, s. https://www.npmjs.com/package/p-queue
    // context.require  =>  Allows to include a NPM module of the e.GO CLI
    // context.values   =>  A key/value pair storage, that is available while the execution
    // context.verbose  =>  Indicates, if script should output additional information or not

    // docker utils
    const docker = context.require('./docker');
    // git utils
    const git = context.require('./git');
    // common app utils
    const util = context.require('./util');

    util.writeLine('Hello, from ' + __filename);
};
```

You can run the script, by executing

```bash
ego run test.js
```

from the folder, that contains the file.

You also can store it globally, inside the `.ego` subfolder, inside your user's home directory (`${HOME}/.ego/test.js`).

## Contribute

The [contribution guide](./CONTRIBUTE.md) explains, how to implement a new command, work with the code and open a pull request.
