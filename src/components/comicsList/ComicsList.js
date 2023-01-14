import { useEffect, useState } from 'react';

import './comicsList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const ComicsList = () => {
    const [comicsList, setComicsList] = useState([]);
    const { loading, error, clearError, getAllComics, _offsetComics, _limitComics } = useMarvelService();
    const [comicsCount, setComicsCount] = useState(0);
    const [comicsEnded, setComicsEnded] = useState(false);

    useEffect(() => {
        onRequest(_offsetComics);
    }, []);

    const onRequest = (offset) => {
        if (comicsEnded) {
            return;
        }

        clearError();
        getAllComics(offset || _offsetComics + comicsCount)
            .then(onComicsListLoaded)
    }
    
    const onComicsListLoaded = (newComicsList) => {
        setComicsList((comicsList) => [...comicsList, ...newComicsList]);
        setComicsCount(comicsCount => comicsCount + newComicsList.length);
        setComicsEnded(newComicsList?.length < _limitComics);
    }

    const renderItems = (comicsList) => {
        const items = comicsList.map((item, i) => {
            const style = item.imageNotFound ? { objectFit: "contain" } : null

            return (<li
                key={`${item.id}_${i}`}
                className="comics__item"
            >
                <a href={item.resourceURI}>
                    <img style={style} src={item.thumbnail} alt="ultimate war" className="comics__item-img"/>
                    <div className="comics__item-name">{ item.title }</div>
                    <div className="comics__item-price">{ item.price }</div>
                </a>
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
                {/* <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={uw} alt="ultimate war" className="comics__item-img"/>
                        <div className="comics__item-name">ULTIMATE X-MEN VOL. 5: ULTIMATE WAR TPB</div>
                        <div className="comics__item-price">9.99$</div>
                    </a>
                </li>
                <li className="comics__item">
                    <a href="#">
                        <img src={xMen} alt="x-men" className="comics__item-img"/>
                        <div className="comics__item-name">X-Men: Days of Future Past</div>
                        <div className="comics__item-price">NOT AVAILABLE</div>
                    </a>
                </li> */}
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