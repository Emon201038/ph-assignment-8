"use client";

import Link from "next/link";
import { useState } from "react";
import { MapPin, Mail, Lock, Eye, EyeOff } from "lucide-react";
import LoginForm from "./LoginForm";

export default function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string | undefined }>;
}) {
  const [showPassword, setShowPassword] = useState(false);

  return (
    <div className="flex min-h-screen">
      {/* Left Side: Image Content */}
      <div className="hidden lg:flex lg:w-1/2 relative overflow-hidden bg-primary">
        <div className="absolute inset-0 z-10 bg-linear-to-t from-primary/80 to-transparent"></div>
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: `url('/images/login_banner.png')`,
          }}
        ></div>
        <div className="relative z-20 flex flex-col justify-end p-16 w-full">
          <div className="flex items-center gap-2 mb-8">
            <div className="bg-white p-2 rounded-lg text-primary">
              <MapPin className="w-8 h-8 font-bold" />
            </div>
            <span className="text-white text-2xl font-bold tracking-tight">
              TourBuddy
            </span>
          </div>
          <h1 className="text-white text-5xl font-black leading-tight mb-6">
            Discover the world's <br />
            hidden gems.
          </h1>
          <p className="text-white/80 text-lg max-w-md leading-relaxed">
            Connect with local guides and experience authentic adventures
            tailored just for you.
          </p>
          <div className="mt-12 flex gap-4">
            <div className="flex -space-x-3">
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuB_IklAfahcou2bsGrOP26gpOD59th4E8DPF60cxnWZIewEy2BYugx9EGXWDhoM6gzXsoJqQkI7v75V_K7AF3hKX_plCjxmrSp3pM5ConIOTFNqcyQ33dmhJz8zhf1aRtSpnSZ--ZAuKKwSxUCj_vqshPUi2H1ng2ZrYnJiilHywYDYZZaMx-RtHXhGiBilyIqCyyTPHrmmUjx_MlJajYfhzfszWVB2N1aUZdl9tc3cADCSvbVpRDRlZBGoCzQhbDDV8SnD_5BqoCw"
                alt="User profile picture"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuC7Bul0rOW1kRhXLGT88KyyK1aGSho5jtr9EXevGSilBEUbryaFcS_7t7Y4jMjeejZMO7nNXA0ZLwxBji7jRVv-1qBG2xSkcL2RTYkSs6mYf92yr9D8glZelG54-iuXQTX7kegtkLz5A4uOGHw947gcr2jJ_ACwPpGNEXr5lbl4tZWgoEIhX-GkD04akiwDd8Ntm88bXSS5FlY2_ZeH3xS0cFDMShxkKbaP8SA2cg_4utAx88DqIbT8Hx3GGZc87hQKmUXJteF3VtQ"
                alt="User profile picture"
              />
              <img
                className="w-10 h-10 rounded-full border-2 border-white"
                src="https://lh3.googleusercontent.com/aida-public/AB6AXuDxaK0K8nbGeBARP3JPcA6W4GHlAO7o-wQ9dgWumNySyNLkjVwxLu8yKfD2ewAshaT3v2OciqplnWfW8pKgvcGRwTdsdCVgVcdOguaAbsGkPau7wxqXzsHMJIW7lz6QWVaSRO-1-zV7SRyeSQ4ggpNJnjfcI--Y_vWCbRKjxADmP7rxSTb3GML5vMqn0UfM4ooDTQOTqbEBv740Ndj6lj6W5F6AqeHnhoutpAO6bTMW7dPM6CXLDLzAmqQ20bbGVRQ5Ee-2kqQOVg0"
                alt="User profile picture"
              />
            </div>
            <p className="text-white text-sm self-center">
              Joined by 10,000+ explorers
            </p>
          </div>
        </div>
      </div>

      {/* Right Side: Login Form */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center px-8 py-12 bg-white dark:bg-slate-950">
        <div className="mx-auto max-w-lg w-full">
          <div className="lg:hidden flex items-center gap-2 mb-12">
            <MapPin className="w-8 h-8 text-primary" />
            <span className="text-slate-900 dark:text-slate-100 text-2xl font-bold">
              TourBuddy
            </span>
          </div>

          <div className="mb-10">
            <h2 className="text-3xl font-extrabold text-slate-900 dark:text-slate-100 mb-2">
              Welcome Back
            </h2>
            <p className="text-slate-500 dark:text-slate-400">
              Please enter your details to sign in to your account.
            </p>
          </div>

          <form className="space-y-5">
            <div className="space-y-2">
              <label className="text-sm font-semibold text-slate-700 dark:text-slate-300 ml-1">
                Email Address
              </label>
              <div className="relative group">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  className="w-full pl-12 pr-4 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100"
                  placeholder="name@example.com"
                  type="email"
                />
              </div>
            </div>

            <div className="space-y-2">
              <div className="flex justify-between items-center px-1">
                <label className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                  Password
                </label>
                <Link
                  href="/forgot-password"
                  className="text-xs font-bold text-primary hover:underline"
                >
                  Forgot password?
                </Link>
              </div>
              <div className="relative group">
                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-primary transition-colors w-5 h-5" />
                <input
                  className="w-full pl-12 pr-12 py-3.5 bg-slate-50 dark:bg-slate-800/50 border border-slate-200 dark:border-slate-700 rounded-xl focus:ring-2 focus:ring-primary/20 focus:border-primary outline-none transition-all text-slate-900 dark:text-slate-100"
                  placeholder="••••••••"
                  type={showPassword ? "text" : "password"}
                />
                <button
                  className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 hover:text-slate-600 dark:hover:text-slate-300 transition-colors"
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            <div className="flex items-center space-x-2 py-1">
              <input
                className="w-4 h-4 rounded text-primary focus:ring-primary/20 border border-slate-300 dark:border-slate-600 dark:bg-slate-800"
                id="remember"
                type="checkbox"
              />
              <label
                className="text-sm text-slate-600 dark:text-slate-400"
                htmlFor="remember"
              >
                Keep me logged in
              </label>
            </div>

            <button
              className="w-full bg-primary hover:bg-primary/90 text-white font-bold py-4 rounded-xl shadow-lg shadow-primary/20 transition-all active:scale-[0.98]"
              type="submit"
            >
              Sign In
            </button>
          </form>

          <div className="relative my-8">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-200 dark:border-slate-700"></div>
            </div>
            <div className="relative flex justify-center text-xs uppercase">
              <span className="bg-white dark:bg-slate-950 px-4 text-slate-500 dark:text-slate-400 font-semibold tracking-wider">
                Or continue with
              </span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              type="button"
            >
              <svg className="w-5 h-5" viewBox="0 0 24 24">
                <path
                  d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"
                  fill="#4285F4"
                ></path>
                <path
                  d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"
                  fill="#34A853"
                ></path>
                <path
                  d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"
                  fill="#FBBC05"
                ></path>
                <path
                  d="M12 5.38c1.62 0 3.06.56 4.21 1.66l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"
                  fill="#EA4335"
                ></path>
              </svg>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Google
              </span>
            </button>
            <button
              className="flex items-center justify-center gap-2 px-4 py-3 border border-slate-200 dark:border-slate-700 rounded-xl hover:bg-slate-50 dark:hover:bg-slate-800 transition-colors"
              type="button"
            >
              <svg
                className="w-5 h-5 text-[#1877F2]"
                fill="currentColor"
                viewBox="0 0 24 24"
              >
                <path d="M24 12.073c0-6.627-5.373-12-12-12s-12 5.373-12 12c0 5.99 4.388 10.954 10.125 11.854v-8.385H7.078v-3.47h3.047V9.43c0-3.007 1.792-4.669 4.533-4.669 1.312 0 2.686.235 2.686.235v2.953H15.83c-1.491 0-1.956.925-1.956 1.874v2.25h3.328l-.532 3.47h-2.796v8.385C19.612 23.027 24 18.062 24 12.073z"></path>
              </svg>
              <span className="text-sm font-semibold text-slate-700 dark:text-slate-300">
                Facebook
              </span>
            </button>
          </div>

          <p className="mt-10 text-center text-slate-600 dark:text-slate-400">
            Don't have an account?{" "}
            <Link
              href="/register"
              className="text-primary font-bold hover:underline"
            >
              Create an account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}
