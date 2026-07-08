import { createBrowserRouter } from "react-router";
import { Root } from "./Root";
import { SplashScreen } from "./components/SplashScreen";
import { LanguageSelection } from "./components/LanguageSelection";
import { Onboarding } from "./components/Onboarding";
import { Login } from "./components/Login";
import { AppLayout } from "./components/AppLayout";
import { HomeDashboard } from "./components/HomeDashboard";
import { CameraScreen } from "./components/CameraScreen";
import { AIProcessing } from "./components/AIProcessing";
import { DiagnosisResult } from "./components/DiagnosisResult";
import { KisanDost } from "./components/KisanDost";
import { GovernmentAlerts } from "./components/GovernmentAlerts";
import { Profile } from "./components/Profile";
import { RSKLayout } from "./components/rsk/RSKLayout";
import { RSKDashboard } from "./components/rsk/RSKDashboard";
import { EscalatedCases } from "./components/rsk/EscalatedCases";
import { CaseDetails } from "./components/rsk/CaseDetails";
import { Analytics } from "./components/rsk/Analytics";
import { FarmerDirectory } from "./components/rsk/FarmerDirectory";
import { RSKAlerts } from "./components/rsk/RSKAlerts";
import { RSKProfile } from "./components/rsk/RSKProfile";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Root,
    children: [
      { index: true, Component: SplashScreen },
      { path: "language", Component: LanguageSelection },
      { path: "onboarding", Component: Onboarding },
      { path: "login", Component: Login },
      {
        path: "app",
        Component: AppLayout,
        children: [
          { index: true, Component: HomeDashboard },
          { path: "scan", Component: CameraScreen },
          { path: "chat", Component: KisanDost },
          { path: "alerts", Component: GovernmentAlerts },
          { path: "profile", Component: Profile },
        ],
      },
      { path: "processing", Component: AIProcessing },
      { path: "result", Component: DiagnosisResult },
      {
        path: "rsk/app",
        Component: RSKLayout,
        children: [
          { index: true, Component: RSKDashboard },
          { path: "cases", Component: EscalatedCases },
          { path: "case/:id", Component: CaseDetails },
          { path: "analytics", Component: Analytics },
          { path: "farmers", Component: FarmerDirectory },
          { path: "alerts", Component: RSKAlerts },
          { path: "disease", Component: Analytics },
          { path: "profile", Component: RSKProfile },
        ],
      },
    ],
  },
]);
