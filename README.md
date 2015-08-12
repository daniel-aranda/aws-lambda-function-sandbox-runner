# aws-lambda-function-sandbox-runner
Run AWS Lambda Functions on your local computers, for testing purposes

##Introduction
When you write AWS Lambda Functions, there is not a natural way to test the code in your computer or personal sandbox. This library helps you to run any AWS Lambda Function on your own environment.

##Installation
```
npm install aws-lambda-function-sandbox-runner
```


###Real World example:
```
mkdir testing
cd testing
touch mylambda.js//edit and put the content showed below
npm install aws-lambda-function-sandbox-runner
node node_modules/aws-lambda-function-sandbox-runner/run.js mylambda
```

You should see this:
```
AWS Lambda Function was executed without issues.
Output: worked!
```

content of mylambda.js:
```js
exports.handler = function(event, context) {
  context.succeed('worked!');
};
```


