import { Component } from 'react';
import './charList.scss';
import Spinner from '../spinner/Spinner';
import ErrorMessage from '../errorMessage/ErrorMessage';

import MarvelService from '../../services/MarvelService';

class CharList extends Component {
  state = {
    charList: [],
    loading: false,
    error: false,
    selectedChar: null,
    loadingNewCharacters: false,
    charCount: 0,
    charEnded: false,
  }

  marvelService = new MarvelService();
  componentDidMount() {
    this.updateCharList();
  }

  onRequest = (offset) => {
    if (this.state.charEnded) {
      return;
    }

    this.onCharListLoaging();
    this.marvelService
      .getAllCharacters(offset || this.marvelService._offsetCharacters + this.state.charCount)
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onCharListLoaging = () => {
    this.setState({ loadingNewCharacters: true });
  }

  onCharListLoaded = (newCharList) => {
    this.setState(({ charList, charCount }) => ({
      charList: [...charList, ...newCharList],
      loading: false,
      error: false,
      loadingNewCharacters: false,
      charCount: charCount + newCharList.length,
      charEnded: newCharList?.length < this.marvelService._limitCharacters,
    }));
  }

  onError = (error) => {
    console.log({ error });
    this.setState({
      loading: false,
      loadingNewCharacters: false,
      error: true
    });
  }

  updateCharList = () => {
    this.setState({ loading: true });

    this.onRequest();
  }

  onSelectChar = (id) => {
    this.props.onCharSelected(id);
    this.setState({ selectedChar: id });
  }

  renderItems(arr) {
    const items = arr.map(({ thumbnail, name, id, imageNotFound }) => {
      const style = imageNotFound ? { objectFit: "unset" } : {};
  
      return (
        <li
          tabIndex="0"
          key={id}
          className="char__item"
          onClick={() => this.onSelectChar(id)}
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


  render() {
    const { charList, error, loading, loadingNewCharacters, charEnded } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;

    const btnStyle = charEnded ? { display: 'none' } : null;

    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button
          className="button button__main button__long"
          disabled={loadingNewCharacters}
          style={btnStyle}
          onClick={() => this.onRequest()}
          >
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
};


export default CharList;