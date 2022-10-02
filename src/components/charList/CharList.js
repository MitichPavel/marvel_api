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
    nameSelectedChar: '',
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

  onSelectChar(name) {
    this.setState({ nameSelectedChar: name });
  }

  render() {
    const { charList, error, loading, nameSelectedChar } = this.state;

    if (loading) {
      return <Spinner/>;
    }
  
    if (error) {
      return <ErrorMessage/>;
    }

    return (
      <div className="char__list">
        <ul className="char__grid">
          <ListItems
            charList={ charList }
            onSelectChar={this.onSelectChar.bind(this)}
            nameSelectedChar={nameSelectedChar}
          />
        </ul>
        <button className="button button__main button__long">
          <div className="inner">load more</div>
        </button>
      </div>
    )
  }
};

const ListItems = ({ charList, onSelectChar, nameSelectedChar }) => {
  return charList.map(({ thumbnail, name, imageNotFound }) => {
    const style = imageNotFound ? { objectFit: "contain" } : {};
    let classNames = 'char__item';
    if(name === nameSelectedChar) {
      classNames += ' char__item_selected';
    }

    return (
      <li
        key={name}
        className={classNames}
        onClick={() => onSelectChar(name)}
      >
        <img style={ style } src={thumbnail} alt={name}/>
        <div className="char__name">{name}</div>
      </li>
    );
  });
};

export default CharList;