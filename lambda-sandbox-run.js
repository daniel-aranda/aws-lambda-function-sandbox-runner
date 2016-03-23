
var awsEmulator = {

    succeed: function(response){
        console.log('AWS Lambda Function was executed without issues.');
        console.log('Output: ', response);
    },

    fail: function(error){
        console.log('AWS Lambda Function failed, reason:', error);
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

    if( eventPayLoad ) {
        eventPayLoad = parseEventPayLoad(eventPayLoad);
    }else{
        eventPayLoad = {};
    }

    try{
        lambdaFunction = require(process.cwd() + '/' + lambdaName + '.js');
    }catch(exception){
        throw new Error('Invalid module: ' + lambdaName);
    }

    handler = lambdaFunction[handlerName];
    if( !handler ){
        console.error('Handler not found: ' + handlerName + ' on ' + lambdaName);
        return null;
    }

    try{
        handler(eventPayLoad, awsEmulator);
    }catch(exception){
        console.log(exception);
        throw new Error('Uncaught exception running the lambdaFunction. ' + lambdaName + '.' + handlerName);
    }

};

function parseEventPayLoad(eventPayLoad){
    console.log(eventPayLoad);
    try{
        eventPayLoad = JSON.parse(eventPayLoad);
    }catch(e){

        var filePath = eventPayLoad;
        if( filePath.indexOf('file://') === 0 ){
            filePath = filePath.substring(7);
        }

        if( filePath.indexOf('/') !== 0 ){
            filePath = process.cwd() + '/' + filePath;
        }
        eventPayLoad = require(filePath);

    }

    return eventPayLoad;
}