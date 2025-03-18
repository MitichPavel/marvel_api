import Spinner from "@components/spinner/Spinner";
import ErrorMessage from "@components/errorMessage/ErrorMessage";
import Skeleton from "@components/skeleton/Skeleton";

export const setContent = (process, Component, data = {}) => {
  switch (process) {
    case "wating":
      return <Skeleton />;
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "success":
      return <Component {...data} />;
    default:
      throw new Error("Unexpected process state");
  }
};

export const setContentNoSkeleton = (process, Component, data = {}) => {
  switch (process) {
    case "wating":
      return null;
    case "loading":
      return <Spinner />;
    case "error":
      return <ErrorMessage />;
    case "success":
      return <Component {...data} />;
    default:
      throw new Error("Unexpected process state");
  }
};

export const setContentMore = (
  process,
  Component,
  isInitialLoading,
  data = {}
) => {
  switch (process) {
    case "wating":
      return <Spinner />;
    case "loading":
      return isInitialLoading ? <Spinner /> : <Component {...data} />;
    case "error":
      return <ErrorMessage />;
    case "success":
      return <Component {...data} />;
    default:
      throw new Error("Unexpected process state");
  }
};
