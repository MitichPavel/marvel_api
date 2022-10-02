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
  }

  marvelService = new MarvelService();
  componentDidMount() {
    this.updateCharList();
  }

  onCharListLoaded = (charList) => {
    this.setState({ charList, loading: false, error: false });
  }

  onError = (error) => {
    console.log({ error });
    this.setState({ loading: false, error: true });
  }

  updateCharList = () => {
    this.setState({ loading: true });

    this.marvelService
      .getAllCharacters()
      .then(this.onCharListLoaded)
      .catch(this.onError)
  }

  onSelectChar = (id) => {
    this.props.onCharSelected(id);
    this.setState({ selectedChar: id });
  }

  renderItems(arr) {
    const { selectedChar } = this.state;
    const items = arr.map(({ thumbnail, name, id, imageNotFound }) => {
      const style = imageNotFound ? { objectFit: "unset" } : {};
      let classNames = 'char__item';
      if(id === selectedChar) {
        classNames += ' char__item_selected';
      }
  
      return (
        <li
          key={id}
          className={classNames}
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
    const { charList, error, loading } = this.state;

    const items = this.renderItems(charList);

    const errorMessage = error ? <ErrorMessage/> : null;
    const spinner = loading ? <Spinner/> : null;
    const content = !(loading || error) ? items : null;


    return (
      <div className="char__list">
        {errorMessage}
        {spinner}
        {content}
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
};


export default CharList;