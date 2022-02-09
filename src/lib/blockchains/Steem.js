export const steemInjection = function (steem) {
  Object.getOwnPropertyNames(steem.broadcast).forEach((operationName) => {
      if (!operationName.startsWith("_")) {
          let injectedCall = function () {
              let args = Array.prototype.slice.call(arguments);
              // last argument is always callback
              let callback = args.pop();
              // first argument will be operation name
              args.unshift(operationName);
              sendRequest('api', {
                  method: 'injectedCall',
                  params: args
              }).then((result) => {
                  callback(null, result);
              }).catch((err) => {
                  callback(err, null);
              });
          };
          steem.broadcast[operationName] = injectedCall;
      }
  });
  return steem;
}
