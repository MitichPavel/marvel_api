import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import useMarvelService from '../../services/MarvelService';

const CharList = (props) => {
  const [charList, setCharlist] = useState([]);
  const { loading, error, getAllCharacters, clearError, _offsetCharacters, _limitCharacters } = useMarvelService();
  const [charCount, setCharCount] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    onRequest(_offsetCharacters)
  }, []);

  const onRequest = (offset) => {
    if (charEnded) {
      return;
    }

    clearError();
    getAllCharacters(offset || _offsetCharacters + charCount)
      .then(onCharListLoaded)
  }

  const onCharListLoaded = (newCharList) => {
    setCharlist((charList) => [...charList, ...newCharList]);
    setCharCount(charCount => charCount + newCharList.length);
    setCharEnded(newCharList?.length < _limitCharacters);
  }

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
  }

  const renderItems = (arr) => {
    const items = arr.map(({ thumbnail, name, id, imageNotFound }, i) => {
      const style = imageNotFound ? { objectFit: "unset" } : null
  
      return (
        <li
          tabIndex="0"
          ref={el => itemRefs.current[i] = el}
          key={id}
          className="char__item"
          onClick={() => {
            props.onCharSelected(id);
            focusOnItem(i);
          }}
          onKeyDown={(e) => {
            if (e.key === ' ' || e.key === 'Enter') {
              props.onCharSelected(id);
              focusOnItem(i);
            }
          }}
        >
          <img style={ style } src={thumbnail} alt={id}/>
          <div className="char__name">{name}</div>
        </li>
      );
    });

    return (
      <ul className="char__grid">
        {items}
      </ul>
    )
  }

  const items = renderItems(charList);

  const errorMessage = error ? <ErrorMessage/> : null;
  const spinner = loading && !charList.length ? <Spinner/> : null;

  const btnStyle = charEnded ? { display: 'none' } : null;

  return (
    <div className="char__list">
      {errorMessage}
      {spinner}
      {items}
      <button
        className="button button__main button__long"
        disabled={loading}
        style={btnStyle}
        onClick={() => onRequest()}
        >
        <div className="inner">load more</div>
      </button>
    </div>
  )
};

CharList.propTypes = {
  onCharSelected: PropTypes.func.isRequired,
};

export default CharList;