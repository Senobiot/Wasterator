import classes from './SearchItem.module.scss';
import { Link } from 'react-router-dom';

export default function SearchItem({ data }){
    if (!data) return;

    const platformClass = data.platforms?.map(e => e.name.replace(/ .*/,'').toLowerCase());
    const releaseToLocale = _ => {
        if (!data.original_release_date) {
            if (!data.expected_release_year) {
                return 'In Development'; 
            }

            return data.expected_release_year;
        }

        const release = new Date(data.original_release_date);
        const options = {
            year: 'numeric',
            month: 'long',
            day: 'numeric',
        };

        return release.toLocaleDateString('ru-RU', options);
    }

    const release = releaseToLocale();
    
    return(
        <Link to={{
            pathname: '/card',
            search: `?id=${data.id}`,
          }}>
            <div className={classes.searchResults__item}>
                <div className={classes.searchResults__item_poster}>
                    <img src={data.image.icon_url} alt="" />
                </div>
                <div className={classes.searchResults__item_content}>
                    <div className={classes.title}>
                        {data.name} 
                    </div>
                    {platformClass?.map(e => {
                        return <span className={`${classes.platform} ${classes[e]}`}></span>})}
                </div>
                <div className={classes.searchResults__item_released}>{release}</div>
                <div className={classes.searchResults__item_type}>{data.resource_type.toUpperCase()}</div>
            </div>
        </Link>
    )
}
