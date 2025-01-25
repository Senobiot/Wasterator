import GameTile from "../GameTile/GameTile";
import { useSelector } from "react-redux";
import { getGameCollection } from "../../selectors/selectors";
import { Link } from "react-router-dom";

export default function Home() {
  const collection = useSelector(getGameCollection);
console.log(collection)
  return (
    <div
      className="my-games-wrapper"
      style={{ display: "flex", flexWrap: "wrap", justifyContent: 'space-around' }}
    >
      {!collection.length
        ? "Your collection is still empty... ("
        : collection.map((game) => {
            // const gameTitle = game[0];
            // const gameInfo = game[1];
            // const image = gameInfo.image.medium_url;
            // console.log(gameInfo.id);
            return (
              <Link
                key={game.id}
                to={{
                  pathname: "/card",
                  search: `?id=${game.id}`,
                }}
                style={{ display: "flex", width: "25%" }}
              >
                <GameTile
                  key={game.name}
                  image={game.image.medium_url}
                  title={game.name}
                ></GameTile>
              </Link>
            );
          })}
    </div>
  );
}
