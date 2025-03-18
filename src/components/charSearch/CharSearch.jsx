import { useState } from "react";
import { Form, Formik, Field, ErrorMessage } from "formik";
import useMarvelService from "@services/MarvelService";
import { setContentNoSkeleton } from "@utils/setContent";
import { Link } from "react-router-dom";
import * as Yup from "yup";
import "./charSearch.scss";

const CharSearch = () => {
  const { clearError, getCharacterByName, process, setProcess } =
    useMarvelService();
  const [result, setResult] = useState(null);

  const updateChar = (name) => {
    clearError();

    return getCharacterByName(name)
      .then(setResult)
      .then(() => setProcess("success"));
  };

  return (
    <div className="char__search">
      <p className="char__search-title">Or find a character by name:</p>
      <Formik
        initialValues={{
          search: "",
        }}
        validationSchema={Yup.object({
          search: Yup.string().min(2, "Minimum 2 symbols").required("Required"),
        })}
        onSubmit={async ({ search }, { setSubmitting }) => {
          setSubmitting(true);
          await updateChar(search);
          setSubmitting(false);
        }}
      >
        {({ values, isSubmitting }) => (
          <>
            <Form className="char__search-form">
              <div className="char__search-group">
                <Field
                  name="search"
                  type="search"
                  role="search"
                  className="char__search-input"
                  placeholder="Type character name"
                />
                <ErrorMessage name="search" component="div" className="error" />
              </div>

              <button
                type="submit"
                className="button button__main"
                disabled={process === "loading" || isSubmitting}
              >
                <div className="inner">Search</div>
              </button>
            </Form>
            {setContentNoSkeleton(process, SearchResult, { result })}
          </>
        )}
      </Formik>
    </div>
  );
};

const SearchResult = ({ result }) => {
  const items = result.map((char) => {
    const { id, name, description, thumbnail, imageNotFound } = char;
    const imageStyle = imageNotFound ? { objectFit: "contain" } : {};

    return (
      <div key={char.id} className="char__search-item">
        <div className="char__search-content">
          <p className="char__search-name">{name}</p>
          <div className="char__search-baseinfo">
            <img
              style={imageStyle}
              src={thumbnail}
              alt={name}
              className="char__search-img"
            />
            <p className="char__search-descr">{description}</p>
          </div>
        </div>
        <Link to={`/character/${id}`} className="button button__secondary">
          <div className="inner">To Page</div>
        </Link>
      </div>
    );
  });

  const noResults = result.length === 0 ? "No results" : null;

  return (
    <div className="char__search-result">
      {items.length ? (
        <p className="char__search-result-label">Search result</p>
      ) : null}
      {items}
      {noResults}
    </div>
  );
};

export default CharSearch;
