module.exports= function(Users){
	return function(Users){
		console.log('hello');
		for(i=0;i<Users.length;i++){
			console.log("This is the element in the user array: ");
			console.log(Users[i]);
		}
	}
}