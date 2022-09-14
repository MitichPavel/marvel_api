import error from '../errorMessage/error.gif';

const ErrorMessage = () => {
  return (
    <img src={error} style={{display:'block',margin:'auto'}} alt="Error"/>
  )
};

export default ErrorMessage;
