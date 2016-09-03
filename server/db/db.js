var Sequelize = require('sequelize');
var config = require('../env/config.js')['mysql'];

var sequelize = new Sequelize(
  config.databaseName,
  config.userName,
  config.password, {
    host: config.host,
    port: config.port,
    dialect: congif.dialect
  }
);

sequelize.authenticate()
  .then(function(res) {
    console.log('Connection has been established successfully')
  })
  .catch(function(err) {
    console.log('Unable to connect to database', err)
  });

var User = sequelize.define('User', {
  username: {
    type: Sequelize.STRING,
    allowNull: false,
    unique: true,
    validate: {
      notEmpty: true
    }
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false,
    validate: {
      isEmail: true,
      notEmpty: true
    }
  },
  name: Sequelize.STRING
},
{
  tableName: 'Users',
  timestamps: false
});

var Role = Sequelie.define('Role', {
  role: Sequelie.STRING
},{
  tableName: 'Roles',
  timestamps: false
})

var Pet = sequelize.define('Pet', {
  name: Sequelize.STRING,
  species: Sequelize.STRING,
  specialNeeds: Sequelize.BOOLEAN,
  instructions: Sequelize.TEXT
},{
  tableName: 'Pets',
  timestamps: false
});

var Appointment = sequelize.define('Appointment', {
  date: Sequelize.DATE,
  location: Sequelize.STRING,
  available: Sequelize.BOOLEAN
}, {
  tableName: 'Appointments',
  timestamps: false
});

User.hasMany(Pet, {foreignKey: 'petId'});
User.hasMany(Appointment, {foreignKey: 'sitterId'});
User.hasMany(Role, {foreignKey: 'userId'});

Pet.belongsTo(User, {foreignKey: 'ownerId'});
Pet.hasMany('Appointment', foreignKey: 'appointmentId');

Appointment.hasMany('User', {foreignKey: 'sitterId'});
Appointment.hasMany('Pet', {foreignKey: 'petId'});

Role.hasMany('User', {foreignKey: 'userId'});

exports.User = User;
exports.Role = Role;
exports.Pet = Pet;
exports.Appointment = Appointment;
