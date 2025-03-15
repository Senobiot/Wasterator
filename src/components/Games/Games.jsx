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
import Card from "@mui/material/Card";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CardActionArea from "@mui/material/CardActionArea";
import Container from "@mui/material/Container";
import { main } from "../../themes/palettes";

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
    <div>
      <Container maxWidth="lg">
        <Grid
          container
          spacing={2}
          sx={{
            justifyContent: {
              xs: "center",
              lg: "flex-start",
            },
          }}
        >
          {/* <ViewSwitcher changeVariant={(e) => setCurrentViewVariant(e)} /> */}
          {!collection?.length
            ? "Your collection is still empty... ("
            : collection.map((game) => {
                return (
                  <Grid key={game.name} item xs={12} sm={6} md={4} mt={4}>
                    <Card
                      sx={{
                        width: 345,
                        maxWidth: 345,
                        backgroundColor: "#1e1e1e",
                        color: "white",
                        transition: "transform 0.25s",
                        "&:hover": {
                          transform: "perspective(75em) rotateX(18deg)",
                          backgroundColor: main.dark,
                          boxShadow: `0 0 10px ${main.light}`,
                        },
                      }}
                    >
                      <CardActionArea>
                        <CardMedia
                          component="img"
                          alt={game.name}
                          height="140"
                          image={game.imageUrl}
                          sx={{
                            transition: "transform 0.2s",
                          }}
                        />
                        <CardContent>
                          <Typography
                            height="3em"
                            gutterBottom
                            variant="h5"
                            component="div"
                          >
                            {game.name}
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{ color: "text.secondary" }}
                          ></Typography>
                        </CardContent>
                        <CardActions>
                          <Button size="small">Share</Button>
                          <Button size="small">Learn More</Button>
                        </CardActions>
                      </CardActionArea>
                    </Card>
                  </Grid>
                );
              })}
        </Grid>
      </Container>
    </div>
  );
}
