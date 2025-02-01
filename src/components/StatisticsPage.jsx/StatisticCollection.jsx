import { useDispatch } from "react-redux";
import { objectSort, spacesToNumbers } from "../../utils/utils";
import classes from "./StatisticsPage.module.scss";
import { useState } from "react";
import { Link } from "react-router-dom";
import { GAMES } from "../../constants/ActionTypes/AtcionTypes";
import { INSCRIPTIONS_KEYS } from "../../constants/constants";

export default function StatisticCollection({
  collectionName,
  storedCollection,
  route,
}) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [collection, setCollection] = useState(storedCollection);

  const handleClick = (data) =>
    dispatch({ type: GAMES.ADD_DETAILS, payload: data });

  const [sortDirection, setSortDirection] = useState(1);
  const sortByTime = () => {
    const key = collectionName === INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.GAMES ? 'playedTime' : 'movieLength';
    const sortedCollection = [
      ...collection.sort(objectSort(key, sortDirection)),
    ];
    setSortDirection(-sortDirection);
    setCollection(sortedCollection);
  };
  const collapse = () => setCollapsed(!collapsed);
  const sortByTitle = () => {
    const sortedCollection = [
      ...collection.sort(objectSort("name", sortDirection)),
    ];
    setSortDirection(-sortDirection);
    setCollection(sortedCollection);
  };
  const unifyTime = (element) => {
    if (element.playedTime) {
      return element.playedTime;
    }
    if (element.movieLength || element.totalSeriesLength) {
      return +((element.movieLength || element.totalSeriesLength) / 60).toFixed(
        2
      );
    }
    return 0;
  };
  const totalPlayedTime = collection.reduce((acc, e) => acc + unifyTime(e), 0).toFixed(2);

  if (!collection.length) {
    return <>{"StatisticPage... Your Collection still empty"}</>;
  }
  return (
    <div>
      <div className={classes.category}>
        <div className={classes.title}>{collectionName}</div>
        <div
          className={`${classes.collapse} ${collapsed ? classes.collapsed : ""}`}
          onClick={collapse}
        ></div>
      </div>
      <div
        className={`${classes.collection} ${collapsed ? classes.collapsed : ""}`}
      >
        <div className={classes.header}>
          <div className={classes.header_title} onClick={sortByTitle}>
            {INSCRIPTIONS_KEYS.STATISTIC_PAGE.HEADER_SORT_TILES.BY_TITLE}
          </div>
          <div className={classes.header_time} onClick={sortByTime}>
            {INSCRIPTIONS_KEYS.STATISTIC_PAGE.HEADER_SORT_TILES.BY_TIME}
          </div>
        </div>
        {collection.map((e, i) => (
          <Link to={route} onClick={() => handleClick(e)} key={e.name}>
            <div className={classes.game}>
              <div className={classes.game_position}>{i + 1} </div>
              <div className={classes.game_title}>{e.name} </div>
              <div className={classes.game_time}>
                {spacesToNumbers(unifyTime(e))}
              </div>
            </div>
          </Link>
        ))}
      </div>
      <div className={classes.footer}>
        <div className={classes.footer_title}>
          {INSCRIPTIONS_KEYS.STATISTIC_PAGE.TOTAL_TIME}:
        </div>
        <div className={classes.footer_time}>
          {spacesToNumbers(totalPlayedTime)}
        </div>
      </div>
    </div>
  );
}
