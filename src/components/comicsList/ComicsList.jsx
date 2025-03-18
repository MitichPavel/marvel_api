import { useEffect, useState } from "react";
import useMarvelService from "../../services/MarvelService";
import { Link } from "react-router-dom";
import { setContentMore } from "@utils/setContent";

import "./comicsList.scss";

const ComicsList = () => {
  const [comicsList, setComicsList] = useState([]);
  const {
    clearError,
    getAllComics,
    _offsetComics,
    _limitComics,
    process,
    setProcess,
  } = useMarvelService();
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
      .then(() => setProcess("success"));
  };

  const onComicsListLoaded = (newComicsList) => {
    if (newComicsList.length) {
      setComicsList((comicsList) => [...comicsList, ...newComicsList]);
    }

    if (newComicsList?.length < _limitComics) {
      setComicsEnded(true);
    }
  };

  const renderItems = (comicsList) => {
    if (comicsList.length === 0) {
      return null;
    }

    const items = comicsList.map((item, i) => {
      const style = item.imageNotFound ? { objectFit: "contain" } : null;

      return (
        <li key={`${item.id}_${i}`} className="comics__item">
          <Link to={`/comics/${item.id}`}>
            <img
              style={style}
              src={item.thumbnail}
              alt="ultimate war"
              className="comics__item-img"
            />
            <div className="comics__item-name">{item.title}</div>
            <div className="comics__item-price">{item.price}</div>
          </Link>
        </li>
      );
    });

    return <ul className="comics__grid">{items}</ul>;
  };

  return (
    <div className="comics__list">
      {setContentMore(
        process,
        () => renderItems(comicsList),
        comicsList.length === 0
      )}
      <button
        onClick={() => onRequest()}
        disabled={process === "loading"}
        className="button button__main button__long"
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

export default ComicsList;
