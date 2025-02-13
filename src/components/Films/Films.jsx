import CollectionTile from "../CollectionTile/CollectionTile";
import { useSelector } from "react-redux";
import { selectFilmsCollection } from "../../selectors/selectors";
import { COLLECTION_TYPES, VIEW_TYPES } from "../../constants/constants";
import { useState } from "react";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";

export default function Films() {
  const collection = useSelector(selectFilmsCollection);
  // TODO Perhaps it needs to be moved to the store
  const [currentViewVariant, setCurrentViewVariant] = useState(
    VIEW_TYPES.DEFAULT
  );

  return (
    <div className="collection-wrapper">
      <ViewSwitcher changeVariant={(e) => setCurrentViewVariant(e)} />
      {!collection.length
        ? "Your collection is still empty... ("
        : collection.map((movie) => {
            return (
              <CollectionTile
                data={movie}
                key={movie.name}
                pathname="/movie"
                type={COLLECTION_TYPES.FILMS}
                viewVariant={currentViewVariant}
              ></CollectionTile>
            );
          })}
    </div>
  );
}
