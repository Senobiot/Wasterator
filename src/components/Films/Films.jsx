import CollectionTile from "../CollectionTile/CollectionTile";
import { useDispatch, useSelector } from "react-redux";
import { selectMoviesCollection } from "../../selectors/selectors";
import { COLLECTION_TYPES, VIEW_TYPES } from "../../constants/constants";
import { useEffect, useState } from "react";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";
import { getMoviesCollection, setLoading } from "../../reducers";

export default function Films() {
  const dispatch = useDispatch();
  const collection = useSelector(selectMoviesCollection);
  // TODO Perhaps it needs to be moved to the store
  const [currentViewVariant, setCurrentViewVariant] = useState(
    VIEW_TYPES.DEFAULT
  );

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getMoviesCollection());
  }, []);

  return (
    <div className="collection-wrapper">
      <ViewSwitcher changeVariant={(e) => setCurrentViewVariant(e)} />
      {!collection?.length
        ? "Your collection is still empty... ("
        : collection.map((movie, i) => {
            return (
              <CollectionTile
                data={movie}
                key={movie.id}
                pathname="/movie"
                type={COLLECTION_TYPES.FILMS}
                viewVariant={currentViewVariant}
              ></CollectionTile>
            );
          })}
    </div>
  );
}
