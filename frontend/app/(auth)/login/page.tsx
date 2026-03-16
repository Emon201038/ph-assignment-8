import Link from "next/link";
import { MapPin } from "lucide-react";
import LoginForm from "@/components/module/auth/LoginForm";

export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ redirect: string | undefined }>;
}) {
  const { redirect } = await searchParams;

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

          <LoginForm redirect={redirect} />

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
