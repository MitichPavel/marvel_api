import error from '../errorMessage/error.gif';

const ErrorMessage = () => {
  return (
    <img src={error} style={{display:'block',margin:'0 auto'}} alt="Error"/>
  )
};

export default ErrorMessage;
