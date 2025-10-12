import Home from "./pages/Home";
import Hackathons from "./pages/Hackathons";
import Teammates from "./pages/Teammates";
import Chat from "./pages/Chat";
import OrgPanel from "./pages/OrgPanel";
import Profile from "./pages/Profile";
import ProjectNotes from "./pages/ProjectNotes";

const routes = [
  {
    path: "/",
    element: Home,
  },
  {
    path: "/hackathons",
    element: Hackathons,
  },
  {
    path: "/teammates",
    element: Teammates,
  },
  {
    path: "/chat",
    element: Chat,
  },
  {
    path: "/org-panel",
    element: OrgPanel,
  },
  {
    path: "/profile",
    element: Profile,
  },
  {
    path: "/notes",
    element: ProjectNotes,
  },
];

export default routes;
