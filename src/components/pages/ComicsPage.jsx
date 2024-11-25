import ComicsList from '../comicsList/ComicsList';
import AppBanner from '../appBanner/AppBanner';
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

function ComicsPage() {
  return (
    <>
      <AppBanner />
      <ErrorBoundary>
        <ComicsList />
      </ErrorBoundary>
    </>
  )
}

export default ComicsPage;
