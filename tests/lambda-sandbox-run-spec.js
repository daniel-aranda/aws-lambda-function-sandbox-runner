var lambdaRunner = require('../lambda-sandbox-run.js');

describe('AWS Lambda Function', function (){

    describe('perfect execution', function () {
        it('should call succeed', function (){
            spyOn(lambdaRunner.aws, 'succeed').andCallThrough();
            lambdaRunner.run('lambda-example', 'hello');
            expect(lambdaRunner.aws.succeed).toHaveBeenCalledWith('world');
        });
    });

    describe('send event pay load', function () {
        it('should call succeed and parse JSON', function (){
            spyOn(lambdaRunner.aws, 'succeed').andCallThrough();
            var event = '{"someProperty":"works"}';
            lambdaRunner.run('lambda-example', 'parseEvent', event);
            expect(lambdaRunner.aws.succeed).toHaveBeenCalledWith('works');
        });
    });

    describe('send event pay load from a file', function () {
        it('should call succeed and parse JSON', function (){
            spyOn(lambdaRunner.aws, 'succeed').andCallThrough();
            var event = 'file://tests/fixtures/event.json';
            lambdaRunner.run('lambda-example', 'parseEvent', event);
            expect(lambdaRunner.aws.succeed).toHaveBeenCalledWith('works');
        });
    });


    describe('failed execution', function () {
        it('should call fail', function (){
            spyOn(lambdaRunner.aws, 'fail').andCallThrough();
            lambdaRunner.run('lambda-example', 'shouldFail');
            expect(lambdaRunner.aws.fail).toHaveBeenCalledWith('buuuu');
        });
    });

    describe('empty lambda function name', function () {
        it('should call console.error three times', function (){
            spyOn(console, 'error');
            lambdaRunner.run();
            expect(console.error.calls.length).toBe(3);
        });
    });

    describe('invalid lambda function', function () {
        it('should throw invalid module exception', function (){
            var lambdaName = 'random';
            expect(function(){ lambdaRunner.run(lambdaName); }).toThrow('Invalid module: ' + lambdaName);
        });
    });

    describe('broken lambda function', function () {
        it('should call console.error with invalid module', function (){

            var lambdaName = 'lambda-broken-js';
            expect(function(){ lambdaRunner.run(lambdaName); }).toThrow('Invalid module: ' + lambdaName);
        });
    });

    describe('handler not found', function () {
        it('should call console.error with handler not found', function (){
            spyOn(console, 'error');
            lambdaRunner.run('lambda-example', 'random');
            var message = 'Handler not found: random on lambda-example';
            expect(console.error).toHaveBeenCalledWith(message);
        });
    });

    describe('lambda function exception', function () {
        it('should call console.error with exception', function (){
            var message = 'Uncaught exception running the lambdaFunction. ';
            message += 'lambda-example.throwError';
            expect(function(){ lambdaRunner.run('lambda-example', 'throwError'); }).toThrow(message);
        });
    });

});
