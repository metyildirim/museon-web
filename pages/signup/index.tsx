import Header from "../../components/common/header";
import AppRegister from "../../components/signup";
import Footer from "../../components/common/footer";

export default function SignUp() {
  return (
    <div className="signup-container">
      <Header />
      <AppRegister />
      <Footer />
    </div>
  );
}