#AQUI ESTUVO DODOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOOO!
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

##Deployment of your Lambda Function
Some Node.js plugins do the deployment of your code via aws cli, I don't suggest you that, because you are missing testing coverage and continuous integration. I suggest you to use a continous integration like travis that deploys your code to Amazon S3 and to link your Lambda Function to the S3 bucket of your code.

