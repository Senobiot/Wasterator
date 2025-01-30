import { useDispatch, useSelector } from "react-redux";
import { selectGamesCollection } from "../../selectors/selectors";
import { objectSort, spacesToNumbers } from "../../utils/utils";
import classes from "./StatisticsPage.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";


export default function StatisticsPage() {
const dispatch = useDispatch();
  const [collection, setCollection] = useState([
    ...useSelector(selectGamesCollection),
  ]);

  const handleClick = (data) =>
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });

  const [sortDirection, setSortDirection] = useState(1);
  const sortByTime = () => {
    const sortedCollection = [
      ...collection.sort(objectSort("playedTime", sortDirection)),
    ];
    setSortDirection(-sortDirection);
    setCollection(sortedCollection);
  };
  const sortByTitle = () => {
    const sortedCollection = [
      ...collection.sort(objectSort("name", sortDirection)),
    ];
    setSortDirection(-sortDirection);
    setCollection(sortedCollection);
  };
  console.log(collection);
  const totalPlayedTime = collection.reduce((acc, e) => acc + e.playedTime, 0);
  console.log(totalPlayedTime);
  if (!collection.length) {
    return <>{"StatisticPage... Your Collection still empty"}</>;
  }
  return (
    <div>
      <div className={classes.header}>
        <div className={classes.header_title} onClick={sortByTitle}>
          Sort by title
        </div>
        <div className={classes.header_time} onClick={sortByTime}>
          Sort by played time
        </div>
      </div>
      {collection.map((e, i) => (
        <Link to="/game" onClick={() => handleClick(e)} key={e.name}>
          <div className={classes.game}>
            <div className={classes.game_position}>{i + 1} </div>
            <div className={classes.game_title}>{e.name} </div>
            <div className={classes.game_time}>
              {spacesToNumbers(e.playedTime)}
            </div>
          </div>
        </Link>
      ))}
      <div className={classes.footer}>
        <div className={classes.footer_title}>Total Played time:</div>
        <div className={classes.footer_time}>
          {spacesToNumbers(totalPlayedTime)}
        </div>
      </div>
    </div>
  );
}
