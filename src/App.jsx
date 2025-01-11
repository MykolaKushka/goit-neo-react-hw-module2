import { useState, useEffect } from 'react';
import Feedback from './components/Feedback/Feedback';
import Options from './components/Options/Options';
import Notification from './components/Notification/Notification';
import styles from './App.module.css';

const App = () => {
  // Ініціалізація стану з localStorage або з нулями
  const [feedback, setFeedback] = useState(() => {
    const savedFeedback = localStorage.getItem('feedback');
    return savedFeedback ? JSON.parse(savedFeedback) : { good: 0, neutral: 0, bad: 0 };
  });

  // Оновлення стану при натисканні на кнопки
  const updateFeedback = (feedbackType) => {
    setFeedback((prevFeedback) => ({
      ...prevFeedback,
      [feedbackType]: prevFeedback[feedbackType] + 1,
    }));
  };

  // Скидання стану
  const resetFeedback = () => {
    setFeedback({
      good: 0,
      neutral: 0,
      bad: 0,
    });
  };

  // Обчислення загальної кількості фідбеків
  const totalFeedback = feedback.good + feedback.neutral + feedback.bad;

  // Обчислення відсотка позитивних відгуків
  const positivePercentage =
    totalFeedback > 0 ? Math.round((feedback.good / totalFeedback) * 100) : 0;

  // Використовуємо useEffect для збереження стану у localStorage
  useEffect(() => {
    localStorage.setItem('feedback', JSON.stringify(feedback));
  }, [feedback]);

  return (
    <div className={styles.app}>
      <h1>Sip Happens Café</h1>
      <p>
        Please leave your feedback about our service by selecting one of the
        options below.
      </p>
      <Options
        updateFeedback={updateFeedback}
        resetFeedback={resetFeedback}
        totalFeedback={totalFeedback}
      />
      {totalFeedback > 0 ? (
        <Feedback
          feedback={feedback}
          totalFeedback={totalFeedback}
          positivePercentage={positivePercentage}
        />
      ) : (
        <Notification message="No feedback given yet" />
      )}
    </div>
  );
};

export default App;
