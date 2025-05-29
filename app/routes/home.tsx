import type { Route } from "./+types/home";

export function meta({}: Route.MetaArgs) {
  return [
    { title: "Job Application Tracker" },
    { name: "description", content: "Track your job applications easily." },
  ];
}

export default function Home() {
  return <h1>Hello world. This is my first react app.</h1>;
}
