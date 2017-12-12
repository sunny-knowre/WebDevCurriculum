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
	salt    : Sequelize.STRING,
	last_note: {
		type     : Sequelize.STRING,
		allowNull: true
	}
});
User.prototype.verifyPass = function(username, pass, callback){
	var answer = this.get('password');
	if(this.get('nickname') !== username ){
		callback.call(null, false);
		return;
	}
		
	crypto.pbkdf2(pass, this.get('salt'), 100000, 64, 'sha512', (err, derivedKey) => {
		if(err) throw err;
		callback.call(null, answer === derivedKey.toString('hex'));
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
})
Note.getAllUserTitles = function(user, callback){
	Note.findAll({
		where: {userId: user },
		raw: true
	}).then(function(data){
		var tabs = [];
		data.forEach(function(note){
			tabs.push({
				id: note.id,
				title: note.title
			});
		});
		callback.call(null, tabs);
	}).catch(function(err){
		return err;
	});
}
Note.getNoteContents = function(noteid, callback){
	Note.findOne({where: {id: noteid} })
	.then(function(note){
		return note.get();
	})
	.then(function(noteData){
		var result = {};
		result.title = noteData.title;
		result.body  = noteData.body;
		callback.call(null, result);
		return User.findOne({where: {id: noteData.userId} });
	})
	.then(function(user){
		user.update({last_note: noteid});
	})
	.catch(function(err) {
		return err;
	});
}
Note.belongsTo(User);
	
module.exports = {
		sequelize: sequelize,
		user : User,
		note : Note
}