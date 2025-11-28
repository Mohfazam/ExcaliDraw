"use client"

import { useRouter } from "next/navigation";
export default function Home() {
  const Router = useRouter();
  return (
    <div className="flex min-h-screen items-center gap-12 justify-center bg-zinc-50 font-sans dark:bg-black">
      <button
      onClick={() => Router.push("/signup")}
      >Signup</button>

      <button
      onClick={() => Router.push("/signin")}
      >signin</button>
    </div>
  );
}
