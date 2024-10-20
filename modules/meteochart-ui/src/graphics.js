import React, { useState, useEffect } from 'react';
import { Line } from 'react-chartjs-2';
import axios from 'axios';

// Интерфейс для данных о погоде
interface WeatherData {
  temperature: number;
  description: string;
  icon: string;
}

// Компонент для отображения графика погоды
const WeatherChart: React.FC = () => {
  const [weatherData, setWeatherData] = useState<WeatherData[]>([]);

  // Получение данных о погоде с использованием API
  useEffect(() => {
    const fetchWeatherData = async () => {
      try {
        const response = await axios.get('http://localhost:3000/weather'); // Порт сервера
        setWeatherData(response.data);
      } catch (error) {
        console.error('Ошибка при получении данных о погоде:', error);
      }
    };

    fetchWeatherData();
  }, []);

  // Данные для графика
  const chartData = {
    labels: weatherData.map((data, index) => `День ${index + 1}`),
    datasets: [
      {
        label: 'Температура (°C)',
        data: weatherData.map((data) => data.temperature),
        borderColor: 'blue',
        borderWidth: 2,
      },
    ],
  };

  // Параметры графика
  const chartOptions = {
    scales: {
      y: {
        beginAtZero: true,
      },
    },
  };

  return (
    <div>
      <h1>График погоды</h1>
      <Line data={chartData} options={chartOptions} />
    </div>
  );
};

export default WeatherChart;