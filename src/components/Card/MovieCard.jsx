import { styled } from "styled-components";
import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { selectDetails } from "../../selectors/selectors";
import { fecthFilmById } from "../../api/api";
import { GAMES, FILMS } from "../../constants/ActionTypes/AtcionTypes";
import { collectionFields } from "../../constants/constants";

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
    background: linear-gradient(90deg, rgba(62, 103, 150, 0.919) 11.38%, rgba(58, 120, 177, 0.8) 25.23%, rgb(15, 33, 110) 100%);
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
`
const SpanYellow = styled.span`
    color: #d5d58a;
    font-size: 18px;
    display: block;
`

const MovieCard = () => {
  const details = useSelector(selectDetails);
  
  const [isImageLoaded, setIsImageLoaded] = useState(null);
  const [fullDetails, setFullDetails] = useState({});
  const dispatch = useDispatch();
  const updateCurrent = (item) => {
    dispatch({ type: FILMS.ADD_DETAILS, payload: item });
  };
  console.log(details);
  const addToCollection = () => {
    const newCollectionItem = {
      ...fullDetails,
      isInCollection: true,
    };
    console.log(newCollectionItem);
    dispatch({ type: FILMS.ADD_TO_COLLECTION, payload: newCollectionItem });
    setFullDetails(newCollectionItem);
    updateCurrent(newCollectionItem);
  };

  const deleteFromCollection = () => {
    dispatch({ type: FILMS.DELETE_FROM_COLLECTION, payload: details.id });
    updateCurrent({ ...fullDetails, isInCollection: false });
  };

  useEffect(() => {
    if (!details.id) return;
    if (details.isInCollection) {
      return setFullDetails(details);
    }
    (async () => {
      const result = await fecthFilmById(details.id);
      setFullDetails(result);
      updateCurrent(result);
      console.log(result);
    })();
  }, []);

  return !details.name ? (
    "No details...("
  ) : (
    <Card>
      <Title>{details.name}<SpanYellow>{details.enName || details.alternativeName}</SpanYellow></Title>
      <Image className={''} src={details.poster?.url}></Image>
      <InfoBlock>
        <Description >{details.description}</Description>
        <Actors>В ролях: {details.persons?.map((e) => e.name + ", ")}</Actors>
        <Genres>
          ЖАНР:
          {details.genres?.map((e) => (
            <span key={e.name}> {e.name + ","}</span>
          ))}
        </Genres>
        <Regular>Год: {details.year}</Regular>
        <Regular>
          Рейтинг КП: <RedSpan>{details.rating?.kp}</RedSpan>
        </Regular>
        <Regular>
          <SpanYellow>Страны:<br></br></SpanYellow>
          {details.countries?.map((e) => (
            <span key={e.name}>{e.name} / </span>
          ))}
        </Regular>
        <div>
          {!details.isInCollection ? (
            <Button onClick={addToCollection}>Смотрел</Button>
          ) : (
            <ButtonRed onClick={deleteFromCollection}>Не смотрел</ButtonRed>
          )}
        </div>
      </InfoBlock>
      {details.videos?.trailers?.map( video => <iframe src={video.url}/>)}
    </Card>
  );
};

export default MovieCard;
