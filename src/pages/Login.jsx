import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import { useState } from "react";

const schema = yup.object().shape({
  email: yup.string().email("Email inválido").required("Email es obligatorio"),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña requerida"),
});

const Login = () => {
  const { loginUser } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const location = useLocation();

  const onSubmit = async (data) => {
    console.log(data);
    try {
      setErrorMessage("");
      const result = await loginUser(data.email, data.password);
      if (result.success) {
        const redirectTo = location.state?.from || "/profile";
        navigate(redirectTo, { replace: true });
      } else {
        setErrorMessage(result.message || "Usuario o contraseña incorrectos");
      }
    } catch (error) {
      setErrorMessage("Error al iniciar sesión", error);
    }
  };
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: yupResolver(schema),
  });

  return (
    <div className="flex h-screen items-center justify-center overflow-hidden bg-fuchsia-100 md:flex-row">
      {/* image */}
      <div className="order-2 flex flex-col justify-center p-8 text-center md:w-1/3">
        <div className="mx-auto w-full max-w-xs">
          <img
            className="h-auto w-full hover:scale-105"
            src="/logo.png"
            alt="Logo"
          />

          <div>
            <p>
              <Link
                to="/register"
                className="scale-50 text-purple-900 hover:font-semibold hover:text-purple-500 hover:underline"
              >
                ¿No tienes una cuenta?
              </Link>
            </p>
          </div>
        </div>
      </div>
      <div className="order-2 m-5 space-y-6 md:w-1/3">
        <div className="w-auto sm:mx-auto sm:w-full sm:max-w-md">
          <h2 className="text-center text-2xl font-bold text-purple-900">
            Iniciar Sesión
          </h2>
        </div>
        <form
          onSubmit={handleSubmit(onSubmit)}
          className="w-full max-w-md space-y-6 rounded-4xl bg-fuchsia-200 p-4 shadow-sm"
        >
          <div className="gap-y-4 rounded-xl">
            <div>
              {/* email */}
              <div>
                <label
                  htmlFor="email"
                  className="block pl-5 font-medium text-purple-700"
                >
                  Email
                </label>
                <div>
                  <input
                    type="email"
                    placeholder="Email"
                    {...register("email")}
                    className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:ring-fuchsia-500 focus:outline-none"
                  />
                  <p className="flex justify-center text-sm font-bold text-violet-600">
                    {errors.email?.message}
                  </p>
                </div>
              </div>
              {/* pass */}
              <div>
                <label
                  htmlFor="password"
                  className="block pl-5 font-medium text-purple-700"
                >
                  Password
                </label>
                <div className="mt-1">
                  <input
                    type="password"
                    {...register("password")}
                    className="mt-1 block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-2 shadow-sm focus:border-fuchsia-500 focus:outline-none"
                  />
                  <p className="flex justify-center text-sm font-bold text-violet-600">
                    {errors.password?.message}
                  </p>
                </div>
              </div>
              <p className="flex justify-center text-sm font-bold text-violet-600">
                {errorMessage}
              </p>
              {/* button */}
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="w-full rounded-3xl border border-transparent bg-fuchsia-600 px-4 py-2 font-medium text-white shadow-sm hover:bg-fuchsia-400 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:outline-none"
            >
              Iniciar Sesión
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
