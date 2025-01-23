export default function Home(){
    const gamelist = JSON.parse(localStorage.getItem('collection'));
    const gameListNames = Object.keys(gamelist);
    return <>{gameListNames.map(e => <div>{e}</div>)}</>
}