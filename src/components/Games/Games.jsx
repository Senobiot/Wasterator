import { useSelector, useDispatch } from "react-redux";
import {
  getViewVariant,
  selectGamesCollection,
} from "../../selectors/selectors";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";
import { ROUTES } from "../../constants/constants";
import { useEffect } from "react";
import { getGamesCollection } from "../../reducers/collectionReducer";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { CollectionCard, EmptyCollectionCard } from "../Card/CollectionCard";

export default function Home() {
  const collection = useSelector(selectGamesCollection);
  const viewVariant = useSelector(getViewVariant);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getGamesCollection());
  }, []);

  return (
    <Container maxWidth="lg" sx={{ marginTop: 1 }}>
      <ViewSwitcher />
      <Grid
        container
        spacing={2}
        sx={{
          justifyContent: {
            xs: "center",
            lg: !collection?.length ? "center" : "flex-start",
          },
        }}
      >
        {!collection?.length ? (
          <EmptyCollectionCard collectionName="game" />
        ) : (
          collection.map((game) => (
            <CollectionCard
              key={game.id}
              pathname={ROUTES.CARDS.GAME}
              collectable={game}
              variant={viewVariant}
            />
          ))
        )}
      </Grid>
    </Container>
  );
}
