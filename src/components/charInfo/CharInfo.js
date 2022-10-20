import { Component } from 'react';
import PropTypes from 'prop-types';

import './charInfo.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';
import MarvelService from '../../services/MarvelService';
import Skeleton from '../skeleton/Skeleton';

class CharInfo extends Component {
  state = {
    char: null,
    loading: false,
    error: false,
  }

  marvelService = new MarvelService();

  componentDidUpdate(prevProps) {
    if (this.props.selectedId !== prevProps.selectedId) {
      this.updateChar(this.props.selectedId);
    }
  }

  onCharLoaded = (char) => {
    this.setState({ char, loading: false });
  }

  onError = (error) => {
    console.log({ error });
    this.setState({ loading: false, error: true });
  }

  updateChar = (id) => {
    this.setState({ loading: true, error: false });

    this.marvelService
      .getCharacter(id)
      .then(this.onCharLoaded)
      .catch(this.onError)
  }

  render() {
    const { char, loading, error } = this.state;

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error || !char) ? <View char={char}/> : null;
    const skeleton = (loading || error || char) ? null : <Skeleton/>;

    return (
      <div className="char__info">
        {spinner}
        {errorMessage}
        {content}
        {skeleton}
      </div>
    );
  }
}

const View = ({ char }) => {
  const { name, description, thumbnail, homepage, wiki, imageNotFound, comics } = char;
  const imageStyle = imageNotFound ? { objectFit: "contain" } : {};
  
  const renderComicsList = (arr) => {
    const comicsList = arr.slice(0,10).map((item, i) => {
      return (
        <li key={i} className="char__comics-item">
          {item.name}
        </li>
      );
    });

    return arr.length ? comicsList : (<li>This character has no comics.</li>);
  }
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
      <ul className="char__comics-list">
        {renderComicsList(comics)}
      </ul>
    </>
  )
}

CharInfo.propTypes = {
  selectedId: PropTypes.number,
};

export default CharInfo;