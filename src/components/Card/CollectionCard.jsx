import Card from "@mui/material/Card";
import Box from "@mui/material/Box";
import CardActions from "@mui/material/CardActions";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Button from "@mui/material/Button";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid2";
import CardActionArea from "@mui/material/CardActionArea";
import { Link } from "react-router-dom";
import { minToHour } from "../../utils/utils";
import { ROUTES, VIEW_VARIANTS } from "../../constants/constants";

export const CollectionCard = ({ collectable, pathname, variant }) => {
  const { time } = collectable;
  const formattedTime = pathname === ROUTES.CARDS.FILM ? minToHour(time) : time;
  const props = { ...collectable, pathname, time: formattedTime };

  switch (variant) {
    case VIEW_VARIANTS.thumb:
      return thumbCard(props);
    case VIEW_VARIANTS.list:
      return listCard(props);
    default:
      return defaultCard(props);
  }
};

function thumbCard(props) {
  const { name, imageUrl, pathname, id } = props;

  return (
    <Grid container mt={4} spacing={2}>
      <Card
        sx={{
          width: 176,
          backgroundColor: "#1e1e1e",
          color: "white",
          transition: "transform 0.25s",
          "&:hover": {
            backgroundColor: "#263238",
            boxShadow: `0 0 10px "#78909c"`,
          },
        }}
      >
        <CardActionArea component={Link} to={`${pathname}/${id}`}>
          <CardMedia
            component="img"
            alt={name}
            image={imageUrl}
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
              fontSize={16}
            >
              {name}
            </Typography>
          </CardContent>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

function listCard(props) {
  const { name, imageUrl, description, pathname, id, time } = props;
  return (
    <Grid size={{ xs: 12, sm: 6, md: 12 }}>
      <Card sx={{ display: "flex" }} component={Link} to={`${pathname}/${id}`}>
        <CardMedia
          component="img"
          sx={{ width: 151 }}
          image={imageUrl}
          alt={name}
        />
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
          }}
        >
          <CardContent
            sx={{
              flex: "1 0 auto",
              "&:last-child": { paddingBottom: 1 },
            }}
          >
            <Typography component="div" variant="h5">
              {name}
            </Typography>
            <Typography
              variant="subtitle1"
              component="div"
              sx={{
                textAlign: "justify",
                color: "text.secondary",
                overflow: "hidden",
                textOverflow: "ellipsis",
                display: "-webkit-box",
                WebkitLineClamp: pathname === ROUTES.CARDS.FILM ? 4 : 2,
                minHeight: pathname === ROUTES.CARDS.FILM ? "7em" : "2em",
                WebkitBoxOrient: "vertical",
              }}
            >
              {description}
            </Typography>
            <CardActions>
              <Button size="medium">Time wasted</Button>
              <Button size="large">{time ? time : "-"}</Button>
            </CardActions>
          </CardContent>
        </Box>
      </Card>
    </Grid>
  );
}

function defaultCard(props) {
  const { name, imageUrl, pathname, id, time } = props;

  return (
    <Grid size={{ xs: 12, sm: 6, md: 4 }} mt={4}>
      <Card
        sx={{
          width: 345,
          maxWidth: 345,
          backgroundColor: "#1e1e1e",
          color: "white",
          transition: "transform 0.25s",
          "&:hover": {
            transform: "perspective(75em) rotateX(18deg)",
            backgroundColor: "#263238",
            boxShadow: `0 0 10px "#78909c"`,
          },
        }}
      >
        <CardActionArea component={Link} to={`${pathname}/${id}`}>
          <CardMedia
            component="img"
            alt={name}
            height="140"
            image={imageUrl}
            sx={{
              transition: "transform 0.2s",
            }}
          />
          <CardContent>
            <Typography height="3em" gutterBottom variant="h5" component="div">
              {name}
            </Typography>
            <Typography
              variant="body2"
              sx={{ color: "text.secondary" }}
            ></Typography>
          </CardContent>
          <CardActions>
            <Button size="medium">Time wasted</Button>
            <Button size="large">{time ? time : "-"}</Button>
          </CardActions>
        </CardActionArea>
      </Card>
    </Grid>
  );
}

export const EmptyCollectionCard = ({ collectionName, imgUrl }) => (
  <Card
    sx={{
      maxWidth: 345,
      mt: 8,
      "& img": {
        boxSizing: "border-box",
        backgroundColor: "#263238",
        border: "solid 2px white",
      },
    }}
  >
    <CardMedia
      component="img"
      alt={collectionName}
      height="auto"
      image={imgUrl}
    />
    <CardContent>
      <Typography gutterBottom variant="h5" component="div">
        {`You don't have ${collectionName} collection yet. You can add here something by search in top menu`}
      </Typography>
    </CardContent>
  </Card>
);
