import GameTile from "../GameTile/GameTile";
import { useSelector } from "react-redux";
import { selectGamesCollection } from "../../selectors/selectors";
import { Link } from "react-router-dom";

export default function Home() {
  const collection = useSelector(selectGamesCollection);
  
  return (
    <div
      className="my-games-wrapper"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: 'left' }}
    >
      {!collection.length
        ? "Your collection is still empty... ("
        : collection.map((game) => {
            return (
              <Link
                key={game.id}
                to={{
                  pathname: "/game",
                  search: `?id=${game.id}`,
                }}
                style={{ display: "flex", width: "25%" }}
              >
                <GameTile
                  data={game}
                  key={game.name}
                ></GameTile>
              </Link>
            );
          })}
    </div>
  );
}
