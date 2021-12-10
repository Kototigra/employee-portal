const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({
      Role, Department, Team, Relation,
    }) {
      // define association here
      this.belongsTo(Role, { foreignKey: 'role_id' });
      this.belongsTo(Department, { foreignKey: 'department_id' });
      this.belongsToMany(Team, { through: Relation, foreignKey: 'user_id'});
    }
  }
  User.init({
    first_name: DataTypes.STRING,
    last_name: DataTypes.STRING,
    email: DataTypes.STRING,
    password: DataTypes.STRING,
    photo: DataTypes.STRING,
    role_id: DataTypes.INTEGER,
    department_id: DataTypes.INTEGER,
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
