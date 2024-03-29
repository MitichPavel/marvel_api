import { useState, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

import './singleComicPage.scss';

const SimpleComicPage = () => {
    let { comicId } = useParams();
    const [comic, setComic] = useState(null);
    const { loading, error, clearError, getComic } = useMarvelService();

    useEffect(() => {
        onRequest();
    }, [comicId]);

    const onRequest = () => {
        clearError();
        getComic(comicId)
            .then(onComicLoaded)
    }
    
    const onComicLoaded = (comic) => {
        setComic(comic);
    };

    const View = ({ comic }) => {
        const { title, description, thumbnail, pageCount, language, price } = comic;
        return (
            <div className="single-comic">
                <img src={thumbnail} alt={comic.title} className="single-comic__img"/>
                <div className="single-comic__info">
                    <h2 className="single-comic__name">{title}</h2>
                    <p className="single-comic__descr">{description}</p>
                    {pageCount ? <p className="single-comic__descr">{pageCount} pages</p> : null}
                    <p className="single-comic__descr">Language: {language}</p>
                    <div className="single-comic__price">{price}</div>
                </div>
                <Link to="/comics" className="single-comic__back">Back to all</Link>
            </div>
        );
    };

    const spinner = loading ? <Spinner /> : null;
    const errorMessage = error ? <ErrorMessage /> : null;
    const content = !(loading || error || !comic) ? <View comic={comic} /> : null;

    return (
        <>
            {spinner}
            {errorMessage}
            {content}
        </>
    )
}

export default SimpleComicPage;
