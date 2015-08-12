exports.hello = function(event, context) {
    context.succeed('world');
};

exports.shouldFail = function(event, context){
    context.fail('buuuu');
}

exports.throwError = function(){
    throw new Error('random error');
}
