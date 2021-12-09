const {
  Model,
} = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Team extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate({ User, Relation }) {
      // define association here
      this.belongsToMany(User, { through: Relation, foreignKey: 'user_id', anotherKey: 'team_id' });
    }
  }
  Team.init({
    title: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'Team',
  });
  return Team;
};
