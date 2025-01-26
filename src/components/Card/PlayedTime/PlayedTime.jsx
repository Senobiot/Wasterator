import { spacesToNumbers } from "../../../utils/utils";

const PlayedTime = ({ time, className }) => {
  const LIFE_TIME = 68;
  const PAYMENTD_PER_HOUR = 3.3;
  const hours = time;
  const measures = {
    days: (hours / 24).toFixed(1),
    workDays: (hours / 8).toFixed(1),
    years: (hours / 24 / 365 ).toFixed(2),
    lifePercentage: ((hours / (24 * 365 * LIFE_TIME)) * 100).toFixed(3),
    playedCost: (PAYMENTD_PER_HOUR * hours).toFixed(),
  };

  const dividedHours = spacesToNumbers(time);
  const dividedCost = spacesToNumbers(measures.playedCost);

  return (
    <div className={className}>
      <p>Наиграно:</p> 
      <p>{dividedHours} <span>часа(-ов)</span></p>
      <p>{measures.days} <span>рабочих </span></p>
      <p>{measures.workDays} <span>рабочих дней</span></p>
      {measures.years > 0.1 ? <p>{measures.years} <span> лет</span></p> : ''}
      <p>{dividedCost}  <span> рубасов</span></p>
    </div>
  );
};

export default PlayedTime;
