const Sequelize = require("sequelize");
const crypto = require("crypto");

const sequelize = new Sequelize("notepad", "root", "password", {
  host: "localhost",
  port: "3306",
  dialect: "mysql",
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  },
  operatorsAliases: false,
  logging: false
});

const User = sequelize.define("user", {
  id: {
    type: Sequelize.INTEGER,
    unique: true,
    autoIncrement: true,
    primaryKey: true
  },
  nickname: Sequelize.STRING,
  email   : Sequelize.STRING,
  password: Sequelize.STRING,
  salt    : Sequelize.STRING,
  last_note: {
    type: Sequelize.STRING,
    allowNull: true
  }
});
User.verifyPass = async (name, pass) => {
  try {
    const foundUser = await User.findOne({ where: { nickname: name } });
    let result = false;
    if (foundUser) {
      const answer = foundUser.get("password");
      const key = crypto
        .pbkdf2Sync(pass, foundUser.get("salt"), 100000, 64, "sha512")
        .toString("hex");
      if (answer === key && name === foundUser.get("nickname")) {
        result = foundUser;
      }
    }
    return result;
  } catch (err) {
    console.log(err);
  }
};

User.verifyEmail = async (name, email) => {
  try {
    const foundUser = await User.findOne({ where: { email: email } });
    let result = false;
    if (foundUser && foundUser.get("nickname") === name) {
        result = foundUser;
        return result;
    } else {
      return false;
    }
  } catch (err) {
    console.log(err);
  }
};
User.addGoogleUser = async(googleUser) => {
  try {
    const newUser = await User.build({ 
        nickname: googleUser.name, 
        email: googleUser.email
      }).save();
    return newUser;
  } catch (err) {
    console.log(err);
  }
}
const Note = sequelize.define("note", {
  id: {
    type         : Sequelize.INTEGER,
    unique       : true,
    autoIncrement: true,
    primaryKey   : true
  },
  title: Sequelize.STRING,
  body : Sequelize.TEXT
});
Note.getAllUserTitles = async user => {
  try {
    const data = await Note.findAll({ where: { userId: user }, raw: true });
    const tabs = [];
    data.forEach(note => {
      tabs.push({
        id: note.id,
        title: note.title
      });
    });
    return tabs;
  } catch (err) {
    console.log(err);
  }
};

Note.getNoteContents = async noteid => {
  try {
    const data = await Note.findOne({ where: { id: noteid }, raw: true });
    const user = await User.findOne({ where: { id: data.userId } });
    let result = {};
    result.title = data.title;
    result.body = data.body;

    user.update({ last_note: noteid });
    return result;
  } catch (err) {
    console.log(err);
  }
};

Note.belongsTo(User);

module.exports = {
  sequelize: sequelize,
  user: User,
  note: Note
};
