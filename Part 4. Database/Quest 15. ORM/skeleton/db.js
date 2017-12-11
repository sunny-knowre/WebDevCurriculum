/*
	Assuming you have a mysql server running
	If docker is available, run:
		
		docker run --name mysql -e MYSQL_ROOT_PASSWORD=password -e MYSQL_DATABASE=notepad -p 3306:3306 -d mysql

*/
const db = {};
const Sequelize = require('sequelize');
const crypto = require('crypto');

const sequelize = new Sequelize('notepad', 'root', 'password', {
	host: 'localhost',
	port: '3306',
	dialect: 'mysql',
	pool: {
		max: 5,
		min: 0,
		acquire: 30000,
		idle: 10000
	},
	operatorsAliases: false
});

const User = sequelize.define('user', {
	id: {
		type         : Sequelize.INTEGER,
		unique       : true,
		autoIncrement: true,
		primaryKey   : true
	},
	nickname: Sequelize.STRING,
	email   : Sequelize.STRING,
	password: Sequelize.STRING,
	salt    : Sequelize.STRING
});
User.prototype.validatePassword = function(pass){
	var answer = this.password;
	crypto.pbkdf2(pass, this.salt, 100000, 64, 'sha512', (err, derivedKey) => {
		if(err) throw err;
		if(derivedKey === answer)
			return true;
		
		return false;
	});
};

const Note = sequelize.define('note', {
	id: {
		type         : Sequelize.INTEGER,
		unique       : true,
		autoIncrement: true,
		primaryKey   : true
	},
	title: Sequelize.STRING,
	body : Sequelize.TEXT
});

Note.belongsTo(User);
Note.hasOne(User, { as: 'Last', foreignKey: 'last_note', constraints: false });

	
module.exports = {
		sequelize: sequelize,
		user : User,
		note : Note
}