var users = {
	"1": {
		"email": "sunny@note.com",
		"id": "sunny",
		"password": "1234"
	},
	"2": {
		"email": "root@note.com",
		"id": "root",
		"password": ""
	},
	"3": {
		"email": "kurt@note.com",
		"id": "kurt",
		"password": "1234"
	}
};

var checkUser = function(nick, pass){
   var found = false;
	for (var key in users) {
		if (users.hasOwnProperty(key)) {
			var user = users[key];
         if(user.id === nick && user.password === pass)
            found = user;
		}
	}
   return found;
}

var getAllUsers = function(){
   return users;
}


module.exports =  {
		check: checkUser,
		getAll: getAllUsers
	
}
