import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"), // This will be your home page
    route("features", "routes/features.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    // Add other routes here as needed
  ])

] satisfies RouteConfig;