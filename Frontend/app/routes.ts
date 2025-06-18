import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"), // This will be your home page
    route("features", "routes/features.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    // Add more public routes here. ONLY PUBLIC
  ]),

  // Routes WITHOUT navbar (not wrapped in layout)
  route("dashboard", "routes/loggedin/dashboard.tsx"),

] satisfies RouteConfig;