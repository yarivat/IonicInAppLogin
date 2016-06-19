String.prototype.startsWith = function (str) {
  return this.indexOf(str) == 0;
}

String.prototype.format = function(){
  var args = arguments;
  return this.replace(/\{(\d+)\}/g, function(m,n){
    return args[n] ? args[n] : m;
  });
};
