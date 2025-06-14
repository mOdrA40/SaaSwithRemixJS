import { type RouteConfig } from "@react-router/dev/routes";
import { flatRoutes } from "@react-router/fs-routes";

// Use flat routes convention for backwards compatibility with Remix
// This will automatically discover routes based on file structure in app/routes/
export default flatRoutes() satisfies RouteConfig;
