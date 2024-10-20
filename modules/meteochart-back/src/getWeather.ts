import axios from 'axios';

// Интерфейс для данных о погоде
interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

// API ключ OpenWeatherMap
const apiKey = 'YOUR_API_KEY'; // Замените на ваш API ключ

// Функция для получения данных о погоде
async function getWeather(city: string): Promise<WeatherData | undefined> {
  try {
    const response = await axios.get(
      `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${apiKey}&units=metric`
    );

    const data = response.data;

    return {
      temperature: data.main.temp,
      description: data.weather[0].description,
      icon: `http://openweathermap.org/img/wn/${data.weather[0].icon}@2x.png`,
    };
  } catch (error) {
    console.error('Ошибка при получении данных о погоде:', error);
    return undefined;
  }
}

// Пример использования функции
async function main() {
  const city = 'Moscow'; // Введите город, для которого хотите получить данные о погоде

  const weatherData = await getWeather(city);

  if (weatherData) {
    console.log(`Погода в ${city}:`);
    console.log(`Температура: ${weatherData.temperature}°C`);
    console.log(`Описание: ${weatherData.description}`);
    console.log(`Иконка: ${weatherData.icon}`);
  } else {
    console.log('Не удалось получить данные о погоде.');
  }
}

main();