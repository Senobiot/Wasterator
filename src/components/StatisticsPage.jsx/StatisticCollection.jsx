import { useDispatch } from "react-redux";
import { objectSort, spacesToNumbers } from "../../utils/utils";
import classes from "./StatisticsPage.module.scss";
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { INSCRIPTIONS_KEYS } from "../../constants/constants";
import { setItemDetails } from "../../actions";

export default function StatisticCollection({
  collectionName,
  storedCollection,
  route,
}) {
  const dispatch = useDispatch();
  const [collapsed, setCollapsed] = useState(false);
  const [sortDirection, setSortDirection] = useState({});
  const [collection, setCollection] = useState(storedCollection);

  useEffect(() => {
    setCollection(storedCollection);
  }, [storedCollection]);

  const handleClick = (data) => {
    dispatch(setItemDetails(data));
  };

  const handleSort = (column) => {
    const newDirection = sortDirection[column] ? -sortDirection[column] : 1;
    setSortDirection({ [column]: newDirection });

    const sortedCollection = [...collection].sort(
      objectSort(column, newDirection)
    );
    setCollection(sortedCollection);
  };

  const collapse = () => setCollapsed(!collapsed);

  const unifyTime = (element) => {
    if (
      collectionName === INSCRIPTIONS_KEYS.STATISTIC_PAGE.COLLECTION_NAMES.GAMES
    ) {
      return element.time;
    }

    return +(element.time / 60).toFixed(2);
  };
  const totalPlayedTime = collection
    .reduce((acc, e) => acc + unifyTime(e), 0)
    .toFixed(2);

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
          <div
            className={classes.header_title}
            onClick={() => handleSort("name")}
          >
            {INSCRIPTIONS_KEYS.STATISTIC_PAGE.HEADER_SORT_TILES.BY_TITLE}
          </div>
          <div
            className={classes.header_time}
            onClick={() => handleSort("time")}
          >
            {INSCRIPTIONS_KEYS.STATISTIC_PAGE.HEADER_SORT_TILES.BY_TIME}
          </div>
        </div>
        {collection.map((e, i) => (
          <Link
            to={route + "/" + e.id}
            onClick={() => handleClick(e)}
            key={e.id}
          >
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
