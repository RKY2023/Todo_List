import { Geist, Geist_Mono } from "next/font/google";
import TodoApp from "./todo";
import { TodoProvider } from "@/store/TodoProvider";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export default function Home() {
  return (
    <div
      className={`${geistSans.variable} ${geistMono.variable} grid grid-rows items-center justify-items-center p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]`}
    >
      <TodoProvider>
        <TodoApp />
      </TodoProvider>
    </div>
  );
}
