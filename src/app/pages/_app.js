import '../styles/globals.css'; // Import global styles
import Navbar from '../app/components/Navbar'; // Import the Navbar component

function MyApp({ Component, pageProps }) {
  return (
    <div>
      {/* Navbar displayed on every page */}
      <Navbar />

      {/* Page-specific content */}
      <Component {...pageProps} />
    </div>
  );
}

export default MyApp;