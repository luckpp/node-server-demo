# node-server-demo

## Git Instructions
* List untracked files `git ls-files --others --exclude-standard`
* Include untracked files in commit `git ls-files -z -o --exclude-standard | xargs -0 git add`
* Commit `git commit -m "Commit Name"` or `git commit .`
* Push `git push -u origin master`

## Usage
* `git clone https://github.com/luckpp/node-server-demo.git`
* `npm install`

## Referenced Modules

* [bcrypt](https://www.npmjs.com/package/bcrypt): Lib to help you hash passwords.
* [body-parser](https://www.npmjs.com/package/body-parser): Node.js body parsing middleware.
* [cors](https://www.npmjs.com/package/cors): CORS is a node.js package for providing a Connect/Express middleware that can be used to enable CORS with various options.
* [express](https://www.npmjs.com/package/express): Fast, unopinionated, minimalist web framework for node.
* [express-jwt](https://www.npmjs.com/package/express-jwt): Middleware that validates JsonWebTokens and sets req.user.
* [jsonwebtoken](https://www.npmjs.com/package/jsonwebtoken): An implementation of JSON Web Tokens.
* [lodash](https://www.npmjs.com/package/lodash): The Lodash library exported as Node.js modules.
* [log4js](https://www.npmjs.com/package/log4js): This is a conversion of the log4js framework to work with node.
* [mongoose](https://www.npmjs.com/package/mongoose): Mongoose is a MongoDB object modeling tool designed to work in an asynchronous environment.
* [morgan](https://www.npmjs.com/package/morgan): HTTP request logger middleware for node.js.
* [role-acl](https://www.npmjs.com/package/role-acl): Role, Attribute and conditions based Access Control for Node.js.
