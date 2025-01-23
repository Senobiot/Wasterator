import classes from './Menu.module.scss';
import Button from '../Button/Button';
import SearchBar from '../SearchBar/SearchBar';
import { Link } from 'react-router-dom';

const menuButtons = [
    {name: 'Мои игры', link: '/'},
    {name: 'Статистика', link: '/stats'},
    {name: 'Добавить игру', link: '/add'}
];

export default function Menu(){
    return (
        <div className={classes.menu}>
            <nav>
                <ul>
                    {menuButtons.map(e =>
                        <Link style={{display: 'flex'}}to={e.link} key={e.link}>
                            <Button title={e.name}></Button>
                        </Link>)}
                    <SearchBar />
                </ul>
            </nav>
        </div>
    )
}