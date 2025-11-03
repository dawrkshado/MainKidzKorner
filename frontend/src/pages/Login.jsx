import Form from "../components/Form";
import Bg from "../assets/loginbg.webp";

function Login() {
  return (
    <div
      className="min-h-screen flex items-center justify-center bg-cover bg-center bg-no-repeat"
      style={{ backgroundImage: `url(${Bg})` }}
    >
     <div className="translate-y-26"> 
    <Form route="/api/token/" method="login" />
  </div>
    </div>
  );
}

export default Login;
