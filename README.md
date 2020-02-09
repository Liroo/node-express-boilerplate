# Node Express Boilerplate - A modern API boilerplate 🌼

> I have no intention to produce a stable open-sourced version of this boilerplate for now. You can use it at your own risk.

### Instalation

##### Install the packages:

`yarn`

##### Scripts:

| cmd  | desc |
| ------------- | ------------- |
| `yarn start`  | Start the bundler with hot reloading  |
| `yarn build`  | Bundle the API in production mode  |
| `yarn prod`   | Start the API in production mode (build needed before)  |
| - | -  |
| `yarn lint-check`   | Lint check on /api  |
| `yarn test`   | Run tests  |
| `yarn commit` | Commit with citizen |

> I do not use pm2 in the commands or any tools in order to optimize the cluster. I highly recommand to use some of these tools on your own way.

### Features

> I always try to maintain packages to the last version

- [ExpressJS](https://github.com/expressjs/express) for http server
- [Mongoose](https://github.com/Automattic/mongoose) for the mongodb interface (for now, you have to install mongodb on your own way)
- [DotEnv](https://github.com/motdotla/dotenv) for your env variables
- [Nodemailer](https://github.com/nodemailer/nodemailer) with a pug templating for send mail
- [Babel 7](https://babeljs.io/learn-es2015/) for JavaScript

#### And a lot more!

Check the [package.json](https://github.com/Liroo/node-express-boilerplate/blob/master/package.json) for more dependencies used

### Contributing

Great that you are considering supporting the project. You have a lot of ways to help us grow. We appreciate all contributions, even the smallest.

- Report an issue
- Propose a feature
- Send a pull request
- Tell about project around your community

### License

The Liroo Node Express Boilerplate is licensed under the [MIT license](http://opensource.org/licenses/MIT).