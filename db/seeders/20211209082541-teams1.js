module.exports = {
  up: async (queryInterface, Sequelize) => {
    await queryInterface.bulkInsert('Teams', [
      { title: 'Google-карты', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Yandex-лавка', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Yahoo-поиск', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Meta-пространство', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Elbrus-школа жизни', createdAt: new Date(), updatedAt: new Date() },
      { title: 'Аляска Тим', createdAt: new Date(), updatedAt: new Date() },
    ], {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Teams', null, {});
  },
};
