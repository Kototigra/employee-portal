module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Relations', [
      {
        user_id: 1, team_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 2, team_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 3, team_id: 1, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 4, team_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 5, team_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 6, team_id: 2, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 7, team_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 8, team_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 9, team_id: 3, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 10, team_id: 4, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 11, team_id: 4, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 1, team_id: 5, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 2, team_id: 5, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 3, team_id: 5, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 4, team_id: 6, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 5, team_id: 6, createdAt: new Date(), updatedAt: new Date(),
      },
      {
        user_id: 6, team_id: 6, createdAt: new Date(), updatedAt: new Date(),
      },

    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Relations', null, {});
  },
};
