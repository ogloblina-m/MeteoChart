import express from 'express';
import { getWeather } from './weatherService'; // Подключение функции getWeather

const app = express();
const port = 3000; // Порт для сервера

// Обработчик запросов GET для получения данных о погоде
app.get('/weather', async (req, res) => {
  try {
    const city = 'Moscow'; // Введите город, для которого хотите получить данные о погоде
    const weatherData = await getWeather(city);
    if (weatherData) {
      res.json(weatherData);
    } else {
      res.status(500).json({ error: 'Не удалось получить данные о погоде.' });
    }
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Запуск сервера
app.listen(port, () => {
  console.log(`Сервер запущен на порту ${port}`);
});
