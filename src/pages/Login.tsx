import { supabase } from "@/services/supabase";
import { GoogleOutlined } from "@ant-design/icons";

const Login = () => {
  const handleLoginWithGoogle = async () => {
    const { data, error } = await supabase.auth.signInWithOAuth({
      provider: "google",
      options: {
        redirectTo: "https://dashboard-react-virid-eight.vercel.app/",
        queryParams: {
          prompt: "select_account",
        },
      },
    });
    console.log(data);
    if (error) {
      alert("Error: " + error.message);
    } else {
      setTimeout(() => {
        window.location.href = "/";
      }, 2000);
    }
  };

  return (
    <div
      className="min-h-screen flex items-center justify-center bg-gradient-to-r from-gray-900 via-gray-800 to-black text-white"
      style={{ fontFamily: "Arial, sans-serif" }}
    >
      <div className="p-8 rounded-lg shadow-lg bg-gray-800 bg-opacity-90 backdrop-blur-md w-full max-w-md">
        {" "}
        {/* Thêm width responsive */}
        <h1 className="text-3xl font-bold mb-8 text-center text-white">
          LOGIN TO YOUR ACCOUNT
        </h1>
        <button
          onClick={handleLoginWithGoogle}
          className="w-full flex items-center justify-center bg-white text-gray-800 hover:bg-gray-200 px-6 py-3 rounded-lg font-semibold transition duration-300 mb-4 space-x-2"
        >
          <GoogleOutlined
            style={{
              fontSize: "20px",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              marginRight: "8px",
            }}
          />
          <span>Login with Google</span>
        </button>
        <div className="mt-6 flex justify-between">
          <span>
            <a
              href="/"
              className="items-center text-sm text-gray-400 hover:text-white"
            >
              Go to Home page
            </a>
          </span>
          <span>
            <a
              href="#"
              className="items-center text-sm text-gray-400 hover:text-white"
            >
              Contact with Dev
            </a>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Login;
