import '@/styles/globals.css'
import "bootstrap/dist/css/bootstrap.min.css";
import Header from "../../component/navbar/Header";
import { AuthProvider } from "../../context/auth";
import "react-toastify/dist/ReactToastify.css";
import { ToastContainer } from "react-toastify";

export default function App({ Component, pageProps, router }) {
  const hideHeaderRoutes = ["/", "/sign-up"];
  const showHeader = !hideHeaderRoutes.includes(router.pathname);
  return (
    <>
      <ToastContainer autoClose={1500} />
      <AuthProvider>
        {showHeader && <Header />}
        <Component {...pageProps} />
      </AuthProvider>
    </>
  );
}
