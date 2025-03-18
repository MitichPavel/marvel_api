import AppBaner from "../appBanner/AppBanner";
import useMarvelService from "@services/MarvelService";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { setContent } from "@utils/setContent";

const SinglePage = ({ Component, dataType }) => {
  let { id } = useParams();
  const [data, setData] = useState(null);
  const { clearError, getCharacter, getComic, process, setProcess } =
    useMarvelService();

  useEffect(() => {
    onRequest();
  }, [id]);

  const onRequest = () => {
    clearError();

    switch (dataType) {
      case "character":
        getCharacter(id)
          .then(onDataLoaded)
          .then(() => setProcess("success"));
        break;
      case "comic":
        getComic(id)
          .then(onDataLoaded)
          .then(() => setProcess("success"));
        break;
    }
  };

  const onDataLoaded = (data) => {
    setData(data);
  };

  return (
    <>
      <AppBaner />
      {setContent(process, Component, { data })}
    </>
  );
};

export default SinglePage;
