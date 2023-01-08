import { useState, useEffect, useRef } from 'react';
import PropTypes from 'prop-types';

import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

const marvelService = new MarvelService();

const CharList = (props) => {
  const [charList, setCharlist] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [loadingNewCharacters, setLoadingNewCharacters] = useState(false);
  const [charCount, setCharCount] = useState(0);
  const [charEnded, setCharEnded] = useState(false);

  useEffect(() => {
    function initChatList () {
      setLoading(true);

      marvelService
      .getAllCharacters(marvelService._offsetCharacters)
      .then(onCharListLoaded)
      .catch(onError)
    }

    initChatList();
  }, []);

  const onRequest = (offset) => {
    if (charEnded) {
      return;
    }

    setLoadingNewCharacters(true);
    marvelService
      .getAllCharacters(offset || marvelService._offsetCharacters + charCount)
      .then(onCharListLoaded)
      .catch(onError)
  }

  const onCharListLoaded = (newCharList) => {
    setCharlist((charList) => [...charList, ...newCharList]);
    setLoading(false);
    setError(false);
    setLoadingNewCharacters(false);
    setCharCount(charCount => charCount + newCharList.length);
    setCharEnded(newCharList?.length < marvelService._limitCharacters);
  }

  const onError = (error) => {
    console.log({ error });

    setError(true);
    setLoading(false);
    setLoadingNewCharacters(false);
  }

  const itemRefs = useRef([]);

  const focusOnItem = (id) => {
    itemRefs.current[id].focus();
  }


  const renderItems = (arr) => {
    const items = arr.map(({ thumbnail, name, id, imageNotFound }, i) => {
      const style = imageNotFound ? { objectFit: "unset" } : {};
  
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
  const spinner = loading || loadingNewCharacters ? <Spinner/> : null;
  const content = !(loading || error) ? items : null;

  const btnStyle = charEnded ? { display: 'none' } : null;

  return (
    <div className="char__list">
      {errorMessage}
      {content}
      {spinner}
      <button
        className="button button__main button__long"
        disabled={loading || loadingNewCharacters}
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