let cleanRoom = function() {
  return new Promise(function(resolve, reject) {
    resolve('Cleaned The Room');
  });
};

let removeGarbage = function(message) {
  return new Promise(function(resolve, reject) {
    resolve(message + ' remove Garbage');
  });
};

let winIcecream = function(message) {
  return new Promise(function(resolve, reject) {
    resolve( message + ' won Icecream');
  });
};

cleanRoom().then(function(test1){
	return removeGarbage(test1);
}).then(function(test2){
	return winIcecream(test2);
}).then(function(result){
	console.log('finished ' + result + "<br>");
})