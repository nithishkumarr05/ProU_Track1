import CommonForm from "@/components/common/form";
import { useToast } from "@/components/ui/use-toast";
import { loginFormControls } from "@/config";
import { loginUser } from "@/store/auth-slice";
import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { FaSignInAlt, FaUserPlus } from "react-icons/fa";

const initialState = {
  email: "",
  password: "",
};

function AuthLogin() {
  const [formData, setFormData] = useState(initialState);
  const dispatch = useDispatch();
  const { toast } = useToast();

  function onSubmit(event) {
    event.preventDefault();

    dispatch(loginUser(formData)).then((data) => {
      if (data?.payload?.success) {
        toast({
          title: data?.payload?.message,
        });
      } else {
        toast({
          title: data?.payload?.message,
          variant: "destructive",
        });
      }
    });
  }

  return (
    <div className="mx-auto w-full max-w-md space-y-6 bg-white p-8 rounded-lg shadow-lg">
      <div className="text-center">
        <h1 className="text-3xl font-bold tracking-tight text-teal-800 mb-2">
          Welcome Back
        </h1>
        <p className="text-gray-600 mb-6">
          Sign in to access your account and explore our premium cold-pressed oils
        </p>
      </div>
      
      <CommonForm
        formControls={loginFormControls}
        buttonText={
          <div className="flex items-center justify-center gap-2">
            <FaSignInAlt />
            <span>Sign In</span>
          </div>
        }
        formData={formData}
        setFormData={setFormData}
        onSubmit={onSubmit}
      />
      
      <div className="mt-6 text-center">
        <p className="text-gray-600">
          Don't have an account?{" "}
          <Link
            className="font-medium text-teal-600 hover:text-teal-700 hover:underline transition-colors"
            to="/auth/register"
          >
            <span className="flex items-center justify-center gap-1 mt-2">
              <FaUserPlus />
              <span>Create an account</span>
            </span>
          </Link>
        </p>
      </div>
    </div>
  );
}

export default AuthLogin;
