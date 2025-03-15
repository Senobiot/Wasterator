import { useDispatch, useSelector } from "react-redux";
import {
  getViewVariant,
  selectMoviesCollection,
} from "../../selectors/selectors";
import { ROUTES } from "../../constants/constants";
import { useEffect, useState } from "react";
import { getMoviesCollection, setLoading } from "../../reducers";
import Grid from "@mui/material/Grid2";
import Container from "@mui/material/Container";
import { CollectionCard, EmptyCollectionCard } from "../Card/CollectionCard";
import ViewSwitcher from "../ViewSwitcher/ViewSwitcher";

export default function Films() {
  const dispatch = useDispatch();
  const collection = useSelector(selectMoviesCollection);
  const viewVariant = useSelector(getViewVariant);

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getMoviesCollection());
  }, []);

  return (
    <div>
      <Container maxWidth="lg">
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
            <EmptyCollectionCard
              collectionName="movie"
              imgUrl="/movie-card.svg"
            />
          ) : (
            collection.map((movie) => (
              <CollectionCard
                key={movie.name}
                pathname={ROUTES.CARDS.FILM}
                collectable={movie}
                variant={viewVariant}
              />
            ))
          )}
        </Grid>
      </Container>
    </div>
  );
}
