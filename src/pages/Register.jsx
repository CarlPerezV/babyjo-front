import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { useAuth } from "../context/AuthContext";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

const schema = yup.object().shape({
  firstName: yup.string().required("Nombre obligatorio"),
  lastName: yup.string().required("Apellido obligatorio"),
  email: yup
    .string()
    .email("Email inválido")
    .required("Email obligatorio")
    .test("unique-email", "Este email ya está registrado", async (value) => {
      if (!value) return true;
      const users = JSON.parse(localStorage.getItem("users")) || [];
      return !users.some((u) => u.email === value);
    }),
  password: yup
    .string()
    .min(6, "Mínimo 6 caracteres")
    .required("Contraseña requerida"),
  confirmPassword: yup
    .string()
    .oneOf([yup.ref("password"), null], "Las contraseñas no coinciden")
    .required("Confirma tu contraseña"),
});

const Register = () => {
  const { registerUser, user } = useAuth();
  const navigate = useNavigate();
  const [errorMessage, setErrorMessage] = useState("");

  const {
    register,
    handleSubmit,
    formState: { errors },
    setError,
  } = useForm({
    resolver: yupResolver(schema),
  });

  // Redirige si el usuario ya está autenticado
  useEffect(() => {
    if (user) {
      navigate("/profile");
    }
  }, [user, navigate]);

  const onSubmit = async (data) => {
    try {
      console.log(data);
      setErrorMessage("");
      const { ...userData } = data;
      await registerUser(userData);
      navigate("/profile");
    } catch (error) {
      if (error.message === "Este email ya está registrado") {
        // Usamos setError de react-hook-form para marcar el campo email
        setError("email", {
          type: "manual",
          message: error.message,
        });
      } else {
        setErrorMessage(
          error.message || "Error en el registro. Intenta nuevamente.",
        );
      }
    }
  };
  if (user) {
    return null;
  }

  return (
    <main className="min-h-[100svh] bg-fuchsia-100">
      <div className="mx-auto grid max-w-6xl grid-cols-1 items-center gap-8 px-4 py-10 md:grid-cols-2 md:py-16">
        {/* Logo compacto en mobile */}
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
          <div className="w-full max-w-xs text-center">
            <img
              className="h-auto w-full transition-transform duration-300 select-none hover:scale-105"
              src="/logo.png"
              alt="Logo"
              loading="eager"
            />
            <p className="mt-6">
              <Link
                to="/login"
                className="text-purple-900 underline-offset-4 hover:font-semibold hover:text-purple-600 hover:underline"
              >
                ¿Ya tienes una cuenta?
              </Link>
            </p>
          </div>
        </div>

        {/* Tarjeta del formulario */}
        <div className="flex w-full justify-center">
          <div className="w-full max-w-md rounded-3xl bg-fuchsia-200 p-5 shadow-sm sm:p-6">
            <h2 className="mb-5 text-center text-2xl font-bold text-purple-900">
              Registrarse
            </h2>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Nombre y Apellido */}
              <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
                <div>
                  <label
                    htmlFor="firstName"
                    className="mb-1 block pl-1 text-sm font-medium text-purple-700"
                  >
                    Nombre
                  </label>
                  <input
                    id="firstName"
                    type="text"
                    autoComplete="given-name"
                    {...register("firstName")}
                    className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                  />
                  {errors.firstName?.message && (
                    <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                      {errors.firstName.message}
                    </p>
                  )}
                </div>

                <div>
                  <label
                    htmlFor="lastName"
                    className="mb-1 block pl-1 text-sm font-medium text-purple-700"
                  >
                    Apellido
                  </label>
                  <input
                    id="lastName"
                    type="text"
                    autoComplete="family-name"
                    {...register("lastName")}
                    className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                  />
                  {errors.lastName?.message && (
                    <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                      {errors.lastName.message}
                    </p>
                  )}
                </div>
              </div>

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
                  placeholder="tu@email.com"
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
                  Contraseña
                </label>
                <input
                  id="password"
                  type="password"
                  placeholder="••••••"
                  autoComplete="new-password"
                  {...register("password")}
                  className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                />
                {errors.password?.message && (
                  <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                    {errors.password.message}
                  </p>
                )}
              </div>

              {/* Confirmar Password */}
              <div>
                <label
                  htmlFor="confirmPassword"
                  className="mb-1 block pl-1 text-sm font-medium text-purple-700"
                >
                  Confirmar contraseña
                </label>
                <input
                  id="confirmPassword"
                  type="password"
                  placeholder="••••••"
                  autoComplete="new-password"
                  {...register("confirmPassword")}
                  className="block w-full rounded-xl border border-fuchsia-300 bg-fuchsia-100 p-3 shadow-sm transition outline-none focus:border-fuchsia-500"
                />
                {errors.confirmPassword?.message && (
                  <p className="mt-1 text-center text-sm font-semibold text-violet-700">
                    {errors.confirmPassword.message}
                  </p>
                )}
              </div>

              {/* Error general */}
              {errorMessage && (
                <p className="text-center text-sm font-bold text-red-600">
                  {errorMessage}
                </p>
              )}

              {/* Botón */}
              <button
                type="submit"
                className="w-full rounded-3xl bg-fuchsia-600 px-4 py-3 font-medium text-white transition hover:bg-fuchsia-500 focus:ring-2 focus:ring-fuchsia-500 focus:ring-offset-2 focus:outline-none"
              >
                Registrarse
              </button>

              {/* Link a login (mobile) */}
              <p className="mt-2 text-center md:hidden">
                <Link
                  to="/login"
                  className="text-purple-900 underline-offset-4 hover:font-semibold hover:text-purple-600 hover:underline"
                >
                  ¿Ya tienes una cuenta?
                </Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </main>
  );
};

export default Register;
