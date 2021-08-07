import Header from "../../components/common/header";
import AppLogin from "../../components/login";
import Footer from "../../components/common/footer";

export default function Login() {
  return (
    <div className="login-container">
      <Header />
      <AppLogin />
      <Footer />
    </div>
  );
}
