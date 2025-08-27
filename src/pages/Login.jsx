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
    <main className="min-h-[100svh] bg-fuchsia-100">
      {/* Contenedor responsivo */}
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Logo pequeño solo en mobile */}
        <div className="md:hidden">
          <div className="mb-6 flex items-center justify-center">
            <img
              className="w-40 select-none"
              src="/logo.png"
              alt="BabyJo"
              loading="eager"
            />
          </div>
        </div>

        {/* Panel visual (logo grande) solo en desktop */}
        <div className="hidden md:flex md:justify-center md:p-8">
          <div className="w-full max-w-xs">
            <img
              className="h-auto w-full transition-transform duration-300 select-none hover:scale-105"
              src="/logo.png"
              alt="BabyJo"
              loading="eager"
            />
            <p className="mt-6 text-center">
              <Link
                to="/register"
                className="text-purple-900 underline-offset-4 hover:font-semibold hover:text-purple-600 hover:underline"
              >
                ¿No tienes una cuenta?
              </Link>
            </p>
          </div>
        </div>

        {/* Tarjeta del formulario */}
        <div className="flex w-full justify-center">
          <div className="w-full max-w-md rounded-3xl bg-fuchsia-200 p-5 shadow-sm sm:p-6">
            <h1 className="mb-5 text-center text-2xl font-bold text-purple-900">
              Iniciar Sesión
            </h1>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Email */}
              <div>
                <label
                  htmlFor="email"
                  className="mb-1 block pl-1 text-sm font-medium text-purple-700"
                >
                  Email
                </label>
                <input
                  id="email"
                  type="email"
                  placeholder="tucorreo@email.com"
                  autoComplete="email"
                  {...register("email")}
                  className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                />
                {errors.email?.message && (
                  <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                    {errors.email.message}
                  </p>
                )}
              </div>

              {/* Password */}
              <div>
                <label
                  htmlFor="password"
                  className="mb-1 block pl-1 text-sm font-medium text-purple-700"
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  autoComplete="current-password"
                  {...register("password")}
                  className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                />
                {errors.password?.message && (
                  <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Error del servidor */}
              {errorMessage && (
                <p className="text-center text-sm font-bold text-fuchsia-700">
                  {errorMessage}
                </p>
              )}

              {/* Botón */}
              <button
                type="submit"
                className="w-full rounded-3xl bg-fuchsia-600 px-4 py-3 font-medium text-white transition hover:bg-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:outline-none"
              >
                Iniciar Sesión
              </button>

              {/* Link a registro (en mobile/tablet) */}
              <p className="mt-2 text-center md:hidden">
                <Link
                  to="/register"
                  className="text-purple-900 underline-offset-4 hover:font-semibold hover:text-purple-600 hover:underline"
                >
                  ¿No tienes una cuenta?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Login;
