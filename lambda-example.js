exports.hello = function(event, context) {
    context.succeed('world');
};

exports.shouldFail = function(event, context){
    context.fail('buuuu');
}

exports.throwError = function(event, context){
    throw new Error('random error');
}

exports.parseEvent = function(event, context){
    context.succeed(event.someProperty);
}
