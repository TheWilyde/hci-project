import { createBrowserRouter } from "react-router";
import { RootLayout } from "./layouts/RootLayout";
import { AppLayout } from "./layouts/AppLayout";
import { Home } from "./pages/Home";
import { FeaturesPage } from "./pages/FeaturesPage";
import { MethodologyPage } from "./pages/MethodologyPage";
import { SignInPage } from "./pages/SignInPage";
import { LibraryPage } from "./pages/LibraryPage";
import { ReaderPage } from "./pages/ReaderPage";
import { PrivacyPage } from "./pages/PrivacyPage";
import { TermsPage } from "./pages/TermsPage";
import { EarlyAccessPage } from "./pages/EarlyAccessPage";
import { DashboardPage } from "./pages/DashboardPage";
import { SettingsPage } from "./pages/SettingsPage";
import { NotFound } from "./pages/NotFound";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: RootLayout,
    children: [
      { index: true, Component: Home },
      { path: "features", Component: FeaturesPage },
      { path: "methodology", Component: MethodologyPage },
      { path: "signin", Component: SignInPage },
      { path: "privacy", Component: PrivacyPage },
      { path: "terms", Component: TermsPage },
      { path: "early-access", Component: EarlyAccessPage },
      { path: "dashboard", Component: DashboardPage },
      { path: "settings", Component: SettingsPage },
    ],
  },
  {
    path: "/library",
    Component: AppLayout,
    children: [
      { index: true, Component: LibraryPage },
      { path: ":textId", Component: ReaderPage },
    ],
  },
  { path: "*", Component: NotFound },
]);
