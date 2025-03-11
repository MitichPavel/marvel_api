import AppBaner from "../appBanner/AppBanner";
import ErrorMessage from "../errorMessage/ErrorMessage";
import Spinner from "../spinner/Spinner";
import useMarvelService from "@services/MarvelService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

const SinglePage = ({ Component, dataType }) => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const { loading, error, clearError, getCharacter, getComic } =
    useMarvelService();

  useEffect(() => {
    onRequest();
  }, [id]);

  const onRequest = () => {
    clearError();

    switch (dataType) {
      case "character":
        getCharacter(id).then(onDataLoaded);
        break;
      case "comic":
        getComic(id).then(onDataLoaded);
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  const spinner = loading ? <Spinner /> : null;
  const errorMessage = error ? <ErrorMessage /> : null;
  const content = !(loading || error || !data) ? (
    <Component data={data} />
  ) : null;

  return (
    <>
      <AppBaner />
      {spinner}
      {errorMessage}
      {content}
    </>
  );
};

export default SinglePage;
