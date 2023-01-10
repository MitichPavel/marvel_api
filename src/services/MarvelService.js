import extractTextContent from '../helpers/extractTextContentFormHTML';
import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _offsetCharacters = 200;
  const _limitCharacters = 9;
  const _offsetComics = 0;
  const _limitComics = 8;


  const { loading, error, clearError, request } = useHttp();

  const getAllCharacters = async (offset = _offsetCharacters) => {
    const res = await request(`${_apiBase}/characters?limit=${_limitCharacters}&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map((char) => _transformCharacter(char));
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
  }

  const getAllComics = async (offset = _offsetComics) => {
    const res = await request(`${_apiBase}/comics?orderBy=issueNumber&limit=${_limitComics}&offset=${offset}&apikey=${_apiKey}`)
    return res.data.results.map((comics) => _transformComics(comics));
  }

  const _transformCharacter = (char) => {
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

  const _transformComics = (comics) => {
    return {
      id: comics.id,
      title: comics.title,
      thumbnail: comics.thumbnail.path + '.' + comics.thumbnail.extension,
      imageNotFound: comics.thumbnail.path.includes('/u/prod/marvel/i/mg/b/40/image_not_available'),
      price: comics.prices?.[0]?.price ? `${comics.prices[0].price}$` : 'NOT AVAILABLE',
      resourceURI: comics.resourceURI,
    }
  }

  return {
    loading,
    error,
    clearError,
    getCharacter,
    getAllCharacters,
    getAllComics,
    _offsetCharacters,
    _limitCharacters,
    _offsetComics,
    _limitComics,
  };
}

export default useMarvelService;