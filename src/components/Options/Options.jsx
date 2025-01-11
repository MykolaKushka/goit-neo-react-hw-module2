import styles from './Options.module.css';

const Options = ({ updateFeedback, resetFeedback, totalFeedback }) => {
  return (
    <div className={styles.options}>
      <button onClick={() => updateFeedback('good')}>Good</button>
      <button onClick={() => updateFeedback('neutral')}>Neutral</button>
      <button onClick={() => updateFeedback('bad')}>Bad</button>
      {/* Кнопка Reset видима, тільки якщо totalFeedback > 0 */}
      {totalFeedback > 0 && (
        <button onClick={resetFeedback} className={styles.reset}>
          Reset
        </button>
      )}
    </div>
  );
};

export default Options;
