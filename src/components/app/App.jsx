import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { lazy, Suspense } from "react";
import AppHeader from "../appHeader/AppHeader";
import ErrorBoundary from "../errorBoundary/ErrorBoundary";

const MainPage = lazy(() => import("../pages/MainPage"));
const ComicsPage = lazy(() => import("../pages/ComicsPage"));
const Page404 = lazy(() => import("../pages/Page404"));
const SingleComicLayout = lazy(() =>
  import("../pages/singleComicLayout/SingleComicLayout")
);
const SingleCharLayout = lazy(() =>
  import("../pages/singleCharLayout/SingleCharLayout")
);
const SinglePage = lazy(() => import("../pages/SinglePage"));

const App = () => {
  return (
    <ErrorBoundary>
      <Router basename={import.meta.env.PUBLIC_URL}>
        <div className="app">
          <AppHeader />
          <main>
            <Suspense fallback={<div>Loading...</div>}>
              <Routes>
                <Route exact path="/" element={<MainPage />} />

                <Route exact path="/comics" element={<ComicsPage />} />

                <Route
                  exact
                  path="/comics/:id"
                  element={
                    <SinglePage
                      Component={SingleComicLayout}
                      dataType="comic"
                    />
                  }
                />

                <Route
                  exact
                  path="/character/:id"
                  element={
                    <SinglePage
                      Component={SingleCharLayout}
                      dataType="character"
                    />
                  }
                />

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
