import extractTextContent from '../helpers/extractTextContentFormHTML';

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';
  _apiKey = process.env.REACT_APP_API_KEY;
  _offsetCharacters = 200;
  _limitCharacters = 9;

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could'nt fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async (offset = this._offsetCharacters) => {
    const res = await this.getResource(`${this._apiBase}/characters?limit=${this._limitCharacters}&offset=${offset}&apikey=${this._apiKey}`);
    return res.data.results.map((char) => this._transformCharacter(char));
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?apikey=${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      id: char.id,
      name: char.name,
      description: extractTextContent(char.description) || 'There is no any description.',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      imageNotFound: char.thumbnail.path.includes('/u/prod/marvel/i/mg/b/40/image_not_available'),
      homepage: char.urls[0].url,
      wiki: char.urls[0].url,
      comics: char.comics.items,
    }
  }
}

export default MarvelService;