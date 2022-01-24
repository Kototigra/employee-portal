module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Departments', [
      { title: 'Отдел кадров', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Бухгалтерия', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Отдел разработки программного обеспечения', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Отдел разработки технической документации', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Общий отдел', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Отдел технической поддержки', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Отдел безопасности', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Departments', null, {});
  },
};
