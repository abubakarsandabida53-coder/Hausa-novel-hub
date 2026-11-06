"use client";

import { useEffect, useState } from "react";
import type { FormEvent } from "react";
import { useRouter } from "next/navigation";
import { supabase } from "@/lib/supabase";

export default function AccountPage() {
  const router = useRouter();
  const [mode, setMode] = useState<"login" | "signup">("login");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [signedInEmail, setSignedInEmail] = useState<string | null>(null);

  useEffect(() => {
    if (!supabase) return;

    supabase.auth.getSession().then(({ data }) => {
      setSignedInEmail(data.session?.user.email ?? null);
    });

    const { data } = supabase.auth.onAuthStateChange((_event, session) => {
      setSignedInEmail(session?.user.email ?? null);
    });

    return () => data.subscription.unsubscribe();
  }, []);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setMessage("");

    if (!supabase) {
      setMessage("Supabase is not configured. Check your Vercel environment variables.");
      return;
    }

    setLoading(true);

    try {
      if (mode === "signup") {
        const { data, error } = await supabase.auth.signUp({ email, password });
        if (error) throw error;

        if (data.session) {
          router.push("/");
          router.refresh();
        } else {
          setMessage("Registration successful! Check your email to confirm your account.");
        }
      } else {
        const { error } = await supabase.auth.signInWithPassword({ email, password });
        if (error) throw error;

        router.push("/");
        router.refresh();
      }
    } catch (error) {
      setMessage(error instanceof Error ? error.message : "Something went wrong.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSignOut() {
    if (!supabase) return;
    const { error } = await supabase.auth.signOut();

    if (error) {
      setMessage(error.message);
      return;
    }

    setMessage("You have signed out successfully.");
  }

  return (
    <main className="min-h-screen bg-[#09090d] text-white flex items-center justify-center p-5">
      <section className="w-full max-w-md rounded-2xl border border-yellow-700/30 bg-[#15151c] p-7 shadow-2xl">
        <a href="/" className="text-yellow-400 text-sm">← Back to Home</a>
        <h1 className="mt-7 text-3xl font-bold text-yellow-400">Hausa Novels Hub</h1>

        {signedInEmail ? (
          <div className="mt-8 space-y-5">
            <h2 className="text-xl font-semibold">Welcome back!</h2>
            <p className="text-gray-300">{signedInEmail}</p>
            <button onClick={handleSignOut} className="w-full rounded-lg bg-red-600 p-3 font-semibold">
              Sign Out
            </button>
          </div>
        ) : (
          <>
            <h2 className="mt-5 text-xl font-semibold">
              {mode === "login" ? "Sign in to your account" : "Create your account"}
            </h2>
            <p className="mt-2 text-sm text-gray-400">
              Read novels and enjoy audiobooks in your favourite language.
            </p>

            <form onSubmit={handleSubmit} className="mt-7 space-y-4">
              <div>
                <label className="mb-2 block text-sm">Email address</label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  placeholder="Enter your email"
                  className="w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              <div>
                <label className="mb-2 block text-sm">Password</label>
                <input
                  type="password"
                  required
                  minLength={6}
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  placeholder="At least 6 characters"
                  className="w-full rounded-lg border border-gray-700 bg-black p-3 text-white outline-none focus:border-yellow-400"
                />
              </div>

              {message && (
                <p role="status" className="rounded-lg bg-yellow-900/30 p-3 text-sm text-yellow-300">
                  {message}
                </p>
              )}

              <button
                type="submit"
                disabled={loading}
                className="w-full rounded-lg bg-yellow-500 p-3 font-bold text-black disabled:opacity-50"
              >
                {loading ? "Please wait..." : mode === "login" ? "Sign In" : "Create Account"}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-gray-400">
              {mode === "login" ? "Don't have an account?" : "Already have an account?"}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === "login" ? "signup" : "login");
                  setMessage("");
                }}
                className="ml-2 font-semibold text-yellow-400"
              >
                {mode === "login" ? "Register" : "Sign In"}
              </button>
            </p>
          </>
        )}
      </section>
    </main>
  );
}
