import { type RouteConfig, index, layout, route } from "@react-router/dev/routes";

export default [
  layout("routes/_layout.tsx", [
    index("routes/_index.tsx"), // This will be your home page
    route("features", "routes/features.tsx"),
    route("about", "routes/about.tsx"),
    route("login", "routes/login.tsx"),
    route("signup", "routes/signup.tsx"),
    route("forgotpassword", "routes/forgotpassword.tsx"),
    // Add more public routes here. ONLY PUBLIC
  ]),

  // Routes with logged-in nav bar
  layout("routes/loggedin/_layout.tsx" , [
    route("dashboard", "routes/loggedin/dashboard.tsx"),
    route("settings", "routes/loggedin/settings.tsx"),
    route("progressLine", "routes/loggedin/progressLine.tsx"),
    route("editTask/:id", "routes/loggedin/editTask.tsx"),
  ]),
  

] satisfies RouteConfig;