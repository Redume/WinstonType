<p align="center">
  <img width="600" height="314" alt="winston_overwatch 0 0 0" src="https://github.com/user-attachments/assets/6b555ea0-5568-41f9-82d6-9d8ba3f9ca25" />
</p>
<p align="center">
  

> Winston из видеоигры Overwatch

</p>
WinstonType - минималистичный, легковесный учебный вебсайт для тренировки скорости и точности слепого набора текста на клавиатуре

### Возможности
- [ ] Поддержка нескольких иностранных языков
- [ ] Генерация случайных последовательных слов
- [ ] Измерение скорости печати WPM, точности и количества ошибок
- [ ] Графики визуализации скорости набора и ошибок во время теста
- [ ] Локальное сохранение статистики

### Структура проекта
```
WinstonType/
├── public/
│   └── languages/       # JSON-словари для разных языков
├── src/
│   ├── css/
│   │   ├── style.css    # Основные стили
│   │   └── themes.css   # Цветовые темы
│   └── js/
│       ├── main.js      # Инициализация приложения
│       ├── typing.js    # Логика печати
│       ├── stats.js     # Подсчёт WPM и точности
│       ├── chart.js     # Графики на Canvas
│       ├── storage.js   # Сохранение результатов
│       └── languages.js # Загрузка словарей
├── index.html           # Главная страница
├── package.json
└── README.md            # Вы здесь
```

### Стек
- Нативный JavaScript, CSS, HTML
- Vite
- Canvas API
- Web Storage API
