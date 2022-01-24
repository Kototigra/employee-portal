module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Roles', [
      { title: 'Генеральный директор', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Технический директор', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Менеджер', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Руководитель отдела', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Разработчик', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Аналитик', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Технический писатель', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Системный программист', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Бухгалтер', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Секретарь', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Roles', null, {});
  },
};
