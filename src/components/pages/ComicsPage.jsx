import ComicsList from "../comicsList/ComicsList";
import AppBanner from "../appBanner/AppBanner";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";
import { Helmet } from "react-helmet";

function ComicsPage() {
  return (
    <>
      <Helmet>
        <meta name="description" content="Marvel COMICS list" />
        <title>Marvel COMICS list</title>
      </Helmet>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  );
}

export default ComicsPage;
