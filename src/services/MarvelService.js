import extractTextContent from '../helpers/extractTextContentFormHTML';
import { useHttp } from '../hooks/http.hook';

const useMarvelService = () => {
  const _apiBase = 'https://gateway.marvel.com:443/v1/public';
  const _apiKey = process.env.REACT_APP_API_KEY;
  const _offsetCharacters = 200;
  const _limitCharacters = 9;

  const { loading, error, clearError, request } = useHttp();

  const getAllCharacters = async (offset = _offsetCharacters) => {
    const res = await request(`${_apiBase}/characters?limit=${_limitCharacters}&offset=${offset}&apikey=${_apiKey}`);
    return res.data.results.map((char) => _transformCharacter(char));
  }

  const getCharacter = async (id) => {
    const res = await request(`${_apiBase}/characters/${id}?apikey=${_apiKey}`);
    return _transformCharacter(res.data.results[0]);
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

  return {
    loading,
    error,
    clearError,
    getCharacter,
    getAllCharacters,
    _offsetCharacters,
    _limitCharacters
  };
}

export default useMarvelService;