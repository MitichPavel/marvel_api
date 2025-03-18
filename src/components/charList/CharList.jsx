import { useState, useEffect, useRef } from "react";
import PropTypes from "prop-types";
import { CSSTransition, TransitionGroup } from "react-transition-group";
import useMarvelService from "../../services/MarvelService";
import { setContentMore } from "@utils/setContent";
import "./charList.scss";

const CharList = (props) => {
  const [charList, setCharlist] = useState([]);
  const {
    getAllCharacters,
    clearError,
    _offsetCharacters,
    _limitCharacters,
    process,
    setProcess,
  } = useMarvelService();
  const [charEnded, setCharEnded] = useState(false);
  const duration = 500;

  useEffect(() => {
    onRequest(_offsetCharacters);
  }, []);

  const onRequest = (offset) => {
    if (charEnded) {
      return;
    }

    clearError();
    getAllCharacters(offset || _offsetCharacters + charList.length)
      .then(onCharListLoaded)
      .then(() => setProcess("success"));
  };

  const onCharListLoaded = (newCharList) => {
    if (newCharList.length) {
      setCharlist((charList) => [...charList, ...newCharList]);
    }

    if (newCharList?.length < _limitCharacters) {
      setCharEnded(true);
    }
  };

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
  };

  const renderItems = (arr) => {
    if (arr.length === 0) {
      return null;
    }

    const items = arr.map(({ thumbnail, name, id, imageNotFound }, i) => {
      const style = imageNotFound ? { objectFit: "unset" } : null;

      return (
        <CSSTransition key={`${id}_${i}`} timeout={500} classNames="char__item">
          {() => (
            <li
              tabIndex="0"
              ref={(el) => (itemRefs.current[i] = el)}
              key={`${id}_${i}`}
              className="char__item"
              style={{ "--animation-duration": `${duration}ms` }}
              onClick={() => {
                props.onCharSelected(id);
                focusOnItem(i);
              }}
              onKeyDown={(e) => {
                if (e.key === " " || e.key === "Enter") {
                  props.onCharSelected(id);
                  focusOnItem(i);
                }
              }}
            >
              <img style={style} src={thumbnail} alt={id} />
              <div className="char__name">{name}</div>
            </li>
          )}
        </CSSTransition>
      );
    });

    return (
      <ul className="char__grid">
        <TransitionGroup component={null}>{items}</TransitionGroup>
      </ul>
    );
  };

  const btnStyle = charEnded ? { display: "none" } : null;

  return (
    <div className="char__list">
      {setContentMore(
        process,
        () => renderItems(charList),
        charList.length === 0
      )}
      <button
        className="button button__main button__long"
        disabled={process === "loading"}
        style={btnStyle}
        onClick={() => onRequest()}
      >
        <div className="inner">load more</div>
      </button>
    </div>
  );
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;
