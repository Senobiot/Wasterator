import { styled } from 'styled-components';
import { useRef } from "react";
import { getGamesByTitle } from '../../api/api';
import { useDispatch } from 'react-redux';
import { Link } from 'react-router-dom';

const SearchStyled = styled.input`
    visibility: visible;
    padding: 0;
    margin: 0;
    border: none;
    background-color: transparent;
    margin-left: 8px;
    width: calc( 100% - 25px - 8px );
    outline: none;
    line-height: 26px;
    font-size: 14px;
    margin-top: 1px;
    text-shadow: 1px 1px 0px rgba( 255, 255, 255, 0.1);
    font-family: "Motiva Sans", Sans-serif;
    font-weight: 300;

    &::placeholder {
    color: white;
    font-style: italic;
    }

    &::-webkit-search-cancel-button{
        display: none;
}
`
const SearchBox = styled.div`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    visibility: visible;
    margin: 0;
    width: auto;
    position: relative;
    z-index: 150;
    cursor: text;
    background-image: none;
    background-color: #316282;
    border-radius: 3px;
    border: 1px solid rgba( 0, 0, 0, 0.3);
    box-shadow: 1px 1px 0px rgba( 255, 255, 255, 0.2);
    color: #fff;
    margin-bottom: 0px;
    outline: none;
    height: 27px;
    padding: 0px 6px;

    &:hover {
        border: 1px solid #4c9acc;
        box-shadow: 1px 1px 0px rgba(255, 255, 255, 0.0);}
`
const SearchLense = styled.span`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    visibility: visible;
    padding: 0;
    margin: 0;
    text-decoration: none;
    color: #ffffff;
    position: absolute;
    right: 2px;
    top: 0;
    cursor: pointer;

    &:active {
        transform: translate(2px, 2px);
    }
`
const SearchImage = styled.img`
    font-family: Arial, Helvetica, sans-serif;
    font-size: 12px;
    visibility: visible;
    color: #ffffff;
    padding: 0;
    margin: 0;
    border: none;
    -webkit-user-drag: none;
    width: 25px;
    height: 25px;
    position: absolute;
    top: 1px;
    right: -1px;
    background: 50% / contain url('/public/lense.png') no-repeat;
`

export default function SearchBar(){
    const dispatch = useDispatch();
    const addCurrentGameList = (data) => {
        dispatch({type: 'CURRENT_SEARCH', payload: data})
    }

    const inputRef = useRef(null);
    const handleKeyDown = (event) => {
        if (event.keyCode == 13) handleSubmit();
    }

    const handleSubmit = async e => {
        const searchItem = inputRef.current.value;
        if (!searchItem) return;
        if (searchItem in localStorage) {
            const result = JSON.parse(localStorage.getItem(searchItem));
            console.log(result);

            addCurrentGameList(result);
        }

        inputRef.current.disabled = true;

        const fetchedResults = await getGamesByTitle(searchItem);
        addCurrentGameList(fetchedResults);
        localStorage.setItem(searchItem, JSON.stringify(fetchedResults));
        inputRef.current.disabled = false;
    }

    return (
        <SearchBox>
        <SearchStyled
            onKeyDown={handleKeyDown}
            ref={inputRef}
            type="search"
            id="gamesSearch"
            placeholder="Search the game" />
        <Link to='/results'>
            <SearchLense onClick={handleSubmit}>
                <SearchImage/>
            </SearchLense>
        </Link>
        </SearchBox>
    )
}
