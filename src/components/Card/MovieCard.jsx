import { styled } from "styled-components";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import Detail from "./Detail";
import { getMovieDetails, setLoading } from "../../reducers";
import {
  addItemToCollection,
  deleteItemFromCollection,
} from "../../reducers/collectionReducer";
import { useParams } from "react-router-dom";

const Card = styled.div`
  max-width: 1024px;
  background-color: rgba(32, 48, 71, 0.8);
  box-sizing: border-box;
  padding: 20px;
  overflow: hidden;
  display: flex;
  flex-wrap: wrap;
  text-align: left;
`;
const InfoBlock = styled.div`
  width: 65%;
  margin-bottom: 20px;
`;
const Title = styled.div`
  color: rgb(175, 175, 175);
  font-size: 26px;
  line-height: 32px;
  text-overflow: ellipsis;
  font-family: "Motiva Sans", Sans-serif;
  padding-left: 0px;
  font-weight: 700;
  text-shadow: 3px 3px 1px #000;
  margin: 0 auto 20px;
  width: 100%;
  text-align: center;
  box-shadow: 0px 0px 10px #fff inset;
  padding: 10px;
`;
const Actors = styled.div`
  color: white;
  font-size: 18px;
  border-bottom: 2px solid #fff;
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 1;
  -webkit-box-orient: vertical;
  margin-bottom: 20px;
`;
const Image = styled.img`
  width: 270px;
  height: 400px;
  border: 1px white solid;
  padding: 5px;
  margin-right: 20px;
  position: relative;
`;
const Description = styled.div`
  overflow: hidden;
  text-overflow: ellipsis;
  display: -webkit-box;
  -webkit-line-clamp: 4;
  -webkit-box-orient: vertical;
  text-align: justify;
  font-weight: 500;
  font-size: 24px;
  text-shadow: 2px 2px 1px #000;
  margin-bottom: 20px;
`;
const Genres = styled.div`
  margin-bottom: 20px;
  color: #030a13;
  font-size: 20px;
  font-weight: 500;
  text-shadow: 1px 1px 7px #fff;
`;
const Regular = styled.div`
  color: rgb(184, 184, 141);
  font-weight: 500;
  margin-bottom: 30px;
`;
const RedSpan = styled.span`
  color: red;
`;
const Button = styled.button`
  padding: 10px 20px;
  background: linear-gradient(
    90deg,
    rgba(62, 103, 150, 0.919) 11.38%,
    rgba(58, 120, 177, 0.8) 25.23%,
    rgb(15, 33, 110) 100%
  );
  border-radius: 5px;
  text-shadow: 5px 3px 5px #000;
  margin-right: 20px;
  transition: box-shadow 0.375s;
  user-select: none;
  cursor: pointer;
  border: none;

  &:active {
    transform: translate(2px, 2px);
  }

  &:hover {
    box-shadow: 0 0 8px #fff;
  }
`;
const ButtonRed = styled(Button)`
  background: red;
`;
const SpanYellow = styled.span`
  color: #d5d58a;
  font-size: 18px;
  display: block;
`;

const MovieCard = () => {
  const {
    actors,
    genres,
    year,
    ratingImdb,
    ratingKp,
    countries,
    inCollection,
    name,
    length,
    originalName,
    imageUrl,
    description,
    trailers,
  } = useSelector(selectDetails);
  const dispatch = useDispatch();
  const { id } = useParams();
  const addToCollection = () => {
    dispatch(addItemToCollection({ type: "movie", id }));
  };

  const deleteFromCollection = () => {
    dispatch(deleteItemFromCollection({ type: "movie", id }));
  };

  useEffect(() => {
    dispatch(setLoading(true));
    dispatch(getMovieDetails(id));
  }, []);

  return !name && !originalName ? (
    "No details...("
  ) : (
    <Card>
      <Title>
        {name}
        <SpanYellow>{originalName}</SpanYellow>
      </Title>
      <Image src={imageUrl}></Image>
      <InfoBlock>
        <Description>{description}</Description>
        <Actors>
          {/* <Detail details={actors?.map((e) => e.name)} title={"В ролях"} /> */}
        </Actors>
        <Detail details={genres} title={"ЖАНР"} />
        <Detail details={year} title={"Год"} />
        <Detail details={length} title={"Длительность, мин."} />
        <Detail details={ratingKp} title={"Рейтинг КП"} />
        <Detail details={ratingImdb} title={"Рейтинг IMDB"} />
        <Detail details={countries} title={"Страны"} />
        <div>
          {!inCollection ? (
            <Button onClick={addToCollection}>Смотрел</Button>
          ) : (
            <ButtonRed onClick={deleteFromCollection}>Не смотрел</ButtonRed>
          )}
        </div>
      </InfoBlock>
      {trailers?.map((video, i) => (
        <iframe key={i} src={video} />
      ))}
    </Card>
  );
};

export default MovieCard;
