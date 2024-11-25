import { useEffect, useState } from 'react';

import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';
import { Link } from 'react-router-dom';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const { loading, error, clearError, getAllComics, _offsetComics, _limitComics } = useMarvelService();
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest();
    }, []);

    const onRequest = (offset) => {
        if (comicsEnded) {
            return;
        }

        clearError();
        getAllComics(offset || _offsetComics + comicsList.length)
            .then(onComicsListLoaded)
    }
    
    const onComicsListLoaded = (newComicsList) => {
        if (newComicsList.length) {
            setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        }

        if (newComicsList?.length < _limitComics) {
            setComicsEnded(true);
        }
    };

    const renderItems = (comicsList) => {
        const items = comicsList.map((item, i) => {
            const style = item.imageNotFound ? { objectFit: "contain" } : null

            return (<li
                key={`${item.id}_${i}`}
                className="comics__item"
            >
                <Link to={`/comics/${item.id}`}>
                    <img style={style} src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{ item.title }</div>
                    <div className="comics__item-price">{ item.price }</div>
                </Link>
            </li>)
        })

        return items;
    }

    const items = renderItems(comicsList);
    const spinner = loading && !comicsList.length? <Spinner/> : null;
    const errorMessage = error ? <ErrorMessage/> : null;

    return (
        <div className="comics__list">
            {spinner}
            {errorMessage}
            <ul className="comics__grid">
                {items}
            </ul>
            <button
                onClick={() => onRequest()}
                disabled={loading}
                className="button button__main button__long"
                >
                <div className="inner">load more</div>
            </button>
        </div>
    )
}

export default ComicsList;