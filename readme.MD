This is all the material for the Wix NodeJS Workshop, 
first conducted on 6th March, 2016

# Setup Instructions
## Using the Wix Node Workshop github repository
1. Install Node v5 (currently v5.8.0)
1. `$ git clone https://github.com/wix/nodejs-workshop.git`
1. `$ npm install`
1. To run code, use `$ npm run node <js-file>`
1. To test your setup, run `$ npm run node try-setup.js`.

## Using your own node folder for the exercises
1. Install Node v5 (currently v5.8.0)
1. `$ npm install --save-dev babel-cli babel-preset-es2015`
1. `$ echo '{ "presets": ["es2015"] }' > .babelrc`
1. To run code, use `$ npm run node <js-file>`
1. To test your setup, run `$ npm run node try-setup.js`.

## Setup Visual Studio Code
1. Install Visual Studio Code
1. Install "typings": `$ npm install -g typings`
1. Install Intellisense for Node: `$ typings install node --ambient`
