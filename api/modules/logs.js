import chalk from 'chalk';

/*
  Logs

  stdout used

  (use Errors to print to stderr)
*/
class Logs {
  static warn(prefix, msg) {
    if (!global.env.logs.warn) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      console.log(`${prefix}: ` + chalk.yellow(msg));
    }
  }

  static error(prefix, msg) {
    if (!global.env.logs.error) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      console.log(`${prefix}: ` + chalk.red(msg));
    }
  }
  static success(prefix, msg) {
    if (!global.env.logs.success) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      console.log(`${prefix}: ` + chalk.green(msg));
    }
  }

  static log(prefix, msg) {
    if (!global.env.logs.log) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      console.log(`${prefix}: ` + msg);
    }
  }

  static stdout(prefix, msg) {
    if (!global.env.logs.log) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      process.stdout.write(`${prefix}: ` + msg);
    }
  }
  static stderr(prefix, msg) {
    if (!global.env.logs.error) { return; }

    if (!msg) {
      msg = prefix;
      prefix = 'SEOTO';
    }
    if (process.env.NODE_ENV !== 'test') {
      process.stderr.write(`${prefix}: ` + chalk.red(msg));
    }
  }
}

export default Logs;