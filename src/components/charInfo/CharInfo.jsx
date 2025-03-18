import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { setContent } from "@utils/setContent";

import "./charInfo.scss";
import useMarvelService from "@services/MarvelService";

const CharInfo = (props) => {
  const [char, setChar] = useState(null);
  const { getCharacter, clearError, process, setProcess } = useMarvelService();

  const prevCharId = useRef(props.selectedId);

  useEffect(() => {
    updateChar();
  }, [props.selectedId]);

  const onCharLoaded = (char) => {
    setChar(char);
    prevCharId.current = char.id;
  };

  const updateChar = () => {
    if (!props.selectedId && prevCharId !== props.selectedId) {
      return;
    }

    clearError();
    getCharacter(props.selectedId)
      .then(onCharLoaded)
      .then(() => setProcess("success"));
  };

  return (
    <div className="char__info">{setContent(process, View, { char })}</div>
  );
};

export const renderComicsList = (arr) => {
  const comicsList = arr.slice(0, 10).map((item, i) => {
    return (
      <li key={i} className="char__comics-item">
        <Link to={`/comics/${item.id}`}>{item.name}</Link>
      </li>
    );
  });

  return arr.length ? comicsList : <li>This character has no comics.</li>;
};

const View = ({ char }) => {
  const {
    name,
    description,
    thumbnail,
    homepage,
    wiki,
    imageNotFound,
    comics,
  } = char;
  const imageStyle = imageNotFound ? { objectFit: "contain" } : {};

  return (
    <>
      <div className="char__basics">
        <img style={imageStyle} src={thumbnail} alt={name} />
        <div>
          <div className="char__info-name">{name}</div>
          <div className="char__btns">
            <a href={homepage} className="button button__main">
              <div className="inner">homepage</div>
            </a>
            <a href={wiki} className="button button__secondary">
              <div className="inner">Wiki</div>
            </a>
          </div>
        </div>
      </div>
      <div className="char__descr">{description}</div>
      <div className="char__comics">Comics:</div>
      <ul className="char__comics-list">{renderComicsList(comics)}</ul>
    </>
  );
};

CharInfo.propTypes = {
  selectedId: PropTypes.number,
};

export default CharInfo;
