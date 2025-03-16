import { Link } from "react-router-dom";
import { renderComicsList } from "../../charInfo/CharInfo";
import { Helmet } from "react-helmet";

import "./singleCharLayout.scss";

const SingleCharLayout = ({ data: char }) => {
  const { title, name, description, thumbnail, pageCount, price, comics } =
    char;

  return (
    <div className="single-char">
      <Helmet>
        <meta name="description" content={`${title} | character page`} />
        <title>{title}</title>
      </Helmet>
      <img src={thumbnail} alt={name} className="single-char__img" />
      <div className="single-char__info">
        <h2 className="single-char__name">{name}</h2>
        <p className="single-char__descr">{description}</p>
        {pageCount ? (
          <p className="single-char__descr">{pageCount} pages</p>
        ) : null}
        <p className="single-char__descr">Comics:</p>
        <ul className="single-char__comics">{renderComicsList(comics)}</ul>
        <div className="single-char__price">{price}</div>
      </div>
      <Link to="/" className="single-char__back">
        Back to all
      </Link>
    </div>
  );
};

export default SingleCharLayout;
