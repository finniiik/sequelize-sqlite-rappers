const sequelize = require('./db');
const Rapper = require('./rapper.model');

async function main() {
  try {
    await sequelize.authenticate();
    console.log('Подключение к SQLite установлено.');

    // Создаём таблицу (force: true — пересоздать при каждом запуске)
    await sequelize.sync({ force: true });
    console.log('Таблица rappers синхронизирована.');

    await Rapper.bulkCreate([
      { stageName: 'Oxxxymiron', realName: 'Мирон Фёдоров', birthYear: 1985, monthlyListeners: 3.1, isActive: true },
      { stageName: 'Баста', realName: 'Василий Вакуленко', birthYear: 1980, monthlyListeners: 4.5, isActive: true },
      { stageName: 'Скриптонит', realName: 'Адиль Жалелов', birthYear: 1990, monthlyListeners: 5.2, isActive: true },
      { stageName: 'Noize MC', realName: 'Иван Алексеев', birthYear: 1985, monthlyListeners: 1.8, isActive: true },
      { stageName: 'Гуф', realName: 'Алексей Долматов', birthYear: 1979, monthlyListeners: 2.0, isActive: false },
    ]);
    console.log('Добавлены записи.\n');

    const rappers = await Rapper.findAll({ order: [['monthlyListeners', 'DESC']] });
    console.table(rappers.map((r) => {
      const { id, stageName, realName, birthYear, monthlyListeners, isActive } = r.toJSON();
      return { id, stageName, realName, birthYear, monthlyListeners, isActive };
    }));
  } catch (err) {
    console.error('Ошибка:', err.message);
  } finally {
    await sequelize.close();
    console.log('Соединение закрыто.');
  }
}

main();
