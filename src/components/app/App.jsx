import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const SingleComicPage = lazy(() => import("../pages/SingleComicPage"));
const Page404 = lazy(() => import("../pages/Page404"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.PUBLIC_URL}>
        <div className="app">
          <AppHeader />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route path="/" element={<MainPage />} />
                <Route path="/comics" element={<ComicsPage />} />
                <Route path="/comics/:comicId" element={<SingleComicPage />} />
                <Route path="*" element={<Page404 />} />
              </Routes>
            </Suspense>
          </main>
        </div>
      </Router>
    </ErrorBoundary>
  );
};

export default App;
