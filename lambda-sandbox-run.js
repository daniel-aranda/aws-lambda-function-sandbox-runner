
var awsEmulator = {

    succeed: function(response){
        console.log('AWS Lambda Function was executed without issues.');
        console.log('Output: ' + response);
    },

    fail: function(error){
        console.log('AWS Lambda Function failed, reason:' + error);
    }

};

exports.aws = awsEmulator;

exports.run = function(lambdaName, handlerName, eventPayLoad){

    var lambdaFunction, handler;

    if( !lambdaName){
        console.error('Lambda Function Name is required.');
        console.error('Example to call mylambda.js:');
        console.error('npm lambda-runner.js mylambda');
        return null;
    }

    handlerName = handlerName || 'handler';

    if( eventPayLoad ){
        eventPayLoad = JSON.parse(eventPayLoad);
    }else{
        eventPayLoad = {};
    }

    try{
        lambdaFunction = require(process.cwd() + '/' + lambdaName + '.js');
    }catch(exception){
        console.error('Invalid module: ' + lambdaName);
        return null;
    }

    handler = lambdaFunction[handlerName];
    if( !handler ){
        console.error('Handler not found: ' + handlerName + ' on ' + lambdaName);
        return null;
    }

    try{
        handler(eventPayLoad, awsEmulator);
    }catch(exception){
        console.error('Uncaught exception running the lambdaFunction. ' + exception);
    }

};
