import {
  createRootRoute,
  createRoute,
  createRouter,
  Outlet,
} from "@tanstack/react-router";
import LandingPage from "./pages/LandingPage/LandingPage";
import HeroGrid from "./pages/HeroDatabase/HeroGrid";
import HeroDetail from "./pages/HeroDatabase/HeroDetail";
import AdventTeams from "./pages/HeroDatabase/AdventTeams";
import TeamBuilder from "./pages/HeroDatabase/TeamBuilder";
import GuildWarTeams from "./pages/GuildWarTeams/GuildWarTeams";
import SpeedGearing from "./pages/SpeedGearing/SpeedGearing";
import WishList from "./pages/WishList/WishList";
import PullSimulator from "./pages/PullSimulator/PullSimulator";
import AdminEditor from "./pages/Admin/AdminEditor";
import NotFound from "./pages/NotFound/NotFound";
import Navigation from "./components/Navigation/Navigation";

// Root route with layout
const rootRoute = createRootRoute({
  component: () => (
    <div id="app">
      <Navigation />
      <Outlet />
    </div>
  ),
});

// Index route
const indexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/",
  component: LandingPage,
});

// Hero Database index (grid)
const heroDatabaseIndexRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hero-database",
  component: HeroGrid,
});

// Hero Database detail route
const heroDatabaseDetailRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/hero-database/$heroName",
  component: HeroDetail,
});

// Advent Teams route (standalone)
const adventTeamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/advent",
  component: AdventTeams,
});

// Team Builder route (standalone)
const teamBuilderRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/team-builder",
  component: TeamBuilder,
});

// Guild War Teams route
const guildWarTeamsRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/guild-war-teams",
  component: GuildWarTeams,
});

// Speed Gearing route
const speedGearingRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/speed-gearing",
  component: SpeedGearing,
});

// Wish List route
const wishListRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/wish-list",
  component: WishList,
});

// Pull Simulator route
const pullSimulatorRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/pull-simulator",
  component: PullSimulator,
});

// Admin Editor route (local only)
const adminRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/admin",
  component: AdminEditor,
});

// 404 Not Found route (specific)
const notFoundRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/404",
  component: NotFound,
});

// Catch-all route for unmatched paths
const catchAllRoute = createRoute({
  getParentRoute: () => rootRoute,
  path: "/$",
  component: NotFound,
});

// Route tree
const routeTree = rootRoute.addChildren([
  indexRoute,
  heroDatabaseIndexRoute,
  heroDatabaseDetailRoute,
  adventTeamsRoute,
  teamBuilderRoute,
  guildWarTeamsRoute,
  speedGearingRoute,
  wishListRoute,
  pullSimulatorRoute,
  adminRoute,
  notFoundRoute,
  catchAllRoute,
]);

// Create router
export const router = createRouter({ routeTree });

// Declare module augmentation for router types
declare module "@tanstack/react-router" {
  interface Register {
    router: typeof router;
  }
}
