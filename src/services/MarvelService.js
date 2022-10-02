

class MarvelService {
  _apiBase = 'https://gateway.marvel.com:443/v1/public';
  _apiKey = process.env.REACT_APP_API_KEY;

  getResource = async (url) => {
    const res = await fetch(url);

    if (!res.ok) {
      throw new Error(`Could'nt fetch ${url}, status: ${res.status}`);
    }

    return await res.json();
  }

  getAllCharacters = async () => {
    const res = await this.getResource(`${this._apiBase}/characters?limit=9&offset=200&${this._apiKey}`);
    return res.data.results.map((char) => this._transformCharacter(char));
  }

  getCharacter = async (id) => {
    const res = await this.getResource(`${this._apiBase}/characters/${id}?${this._apiKey}`);
    return this._transformCharacter(res.data.results[0]);
  }

  _transformCharacter = (char) => {
    return {
      name: char.name,
      description: char.description || 'There is no any description.',
      thumbnail: char.thumbnail.path + '.' + char.thumbnail.extension,
      imageNotFound: char.thumbnail.path.includes('/u/prod/marvel/i/mg/b/40/image_not_available'),
      homepage: char.urls[0].url,
      wiki: char.urls[0].url,
    }
  }
}

export default MarvelService;