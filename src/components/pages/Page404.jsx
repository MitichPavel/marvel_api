import ErrorMessage from "../errorMessage/ErrorMessage";
import { Link } from 'react-router-dom';

const Page404 = () => {
  return (
    <div style={{ 'height': '50vh', 'display': 'flex', 'text-align': 'center' }}>
      <div style={{ 'margin': 'auto' }}>
        <ErrorMessage />
        <h1 style={{ 'margin-top': '20px', 'font-size': '100px' }}>404</h1>
        <p style={{ 'font-size': '40px' }}>Page not found</p>
        <Link to="/" style={{ 'text-decoration': 'underline', 'margin-top': '20px', 'font-size': '20px' }}>Back to main page</Link>
      </div>
    </div>
  )
}

export default Page404;