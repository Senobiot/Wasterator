import CollectionTile from "../CollectionTile/CollectionTile";
import { useDispatch, useSelector } from "react-redux";
import { selectGamesCollection } from "../../selectors/selectors";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";
import {
  COLLECTION_TYPES,
  ROUTES,
  VIEW_TYPES,
} from "../../constants/constants";
import { useState, useEffect } from "react";
import { getGamesCollection } from "../../reducers/collectionReducer";

export default function Home() {
  const collection = useSelector(selectGamesCollection);
  const dispatch = useDispatch();
  // TODO Perhaps it needs to be moved to the store
  const [currentViewVariant, setCurrentViewVariant] = useState(
    VIEW_TYPES.DEFAULT
  );

  useEffect(() => {
    dispatch(getGamesCollection());
  }, []);

  return (
    <div className="collection-wrapper">
      <ViewSwitcher changeVariant={(e) => setCurrentViewVariant(e)} />
      {!collection?.length
        ? "Your collection is still empty... ("
        : collection.map((game) => {
            return (
              <CollectionTile
                data={game}
                key={game.name}
                pathname={ROUTES.CARDS.GAME}
                type={COLLECTION_TYPES.GAMES}
                viewVariant={currentViewVariant}
              ></CollectionTile>
            );
          })}
    </div>
  );
}
