import GameTile from "../GameTile/GameTile";
import { useSelector } from "react-redux";
import { selectFilmsCollection } from "../../selectors/selectors";
import { Link } from "react-router-dom";
import { SEARCH_TYPE } from "../../constants/constants";

export default function Films() {
 const collection = useSelector(selectFilmsCollection);
console.log(collection)
  return (
    <div
      className="my-games-wrapper"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: 'left' }}
    >
      {!collection.length
        ? "Your collection is still empty... ("
        : collection.map((movie) => {
            return (
              <Link
                key={movie.id}
                to={{
                  pathname: "/movie",
                  search: `?id=${movie.id}`,
                }}
                style={{ display: "flex", width: "25%" }}
              >
                <GameTile
                  data={movie}
                  key={movie.name}
                  type={SEARCH_TYPE.FILMS}
                ></GameTile>
              </Link>
            );
          })}
    </div>
  );
}
