import "../styles/globals.scss";
import "~styles/bigcalendar.scss";
import "weather-icons/css/weather-icons.css";
import 'bootstrap/dist/css/bootstrap.min.css';
import PageHead from "~components/PageHead";
import swal from 'sweetalert';

function MyApp({ Component, pageProps }) {
  return (
    <>
      <PageHead />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
