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
        it('should call console.error with invalid module', function (){
            spyOn(console, 'error');
            spyOn(console, 'trace');
            var lambdaName = 'random';
            lambdaRunner.run(lambdaName);
            expect(console.error).toHaveBeenCalledWith('Invalid module: ' + lambdaName);
            var exception = {code : 'MODULE_NOT_FOUND'};
            expect(console.trace).toHaveBeenCalledWith(exception);
        });
    });

    describe('broken lambda function', function () {
        it('should call console.error with invalid module', function (){
            spyOn(console, 'error');
            spyOn(console, 'trace');
            var lambdaName = 'lambda-broken-js';
            lambdaRunner.run(lambdaName);
            expect(console.error).toHaveBeenCalledWith('Invalid module: ' + lambdaName);
            expect(console.trace).toHaveBeenCalled();
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
            spyOn(console, 'error');
            lambdaRunner.run('lambda-example', 'throwError');
            var message = 'Uncaught exception running the lambdaFunction. ';
            message += 'Error: random error';
            expect(console.error).toHaveBeenCalledWith(message);
        });
    });

});
