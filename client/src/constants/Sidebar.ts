import { GoProjectTemplate } from "react-icons/go";
import { MdLogout } from "react-icons/md";
import { IoHomeOutline } from "react-icons/io5";
import { MdOutlineCampaign } from "react-icons/md";
import { MdOutlineAccountTree } from "react-icons/md";
import Home from "../pages/Home";
import Tags from "../pages/Tags";
import Feeds from "../pages/Feeds";
// import Templates from "../pages/Templates";
import Logout from "../pages/Logout";
export const SidebarData = [
  {
    title: "Home",
    path: "/dashboard/home",
    shortPath: "/home",
    Icon: IoHomeOutline,
    Element: Home,
  },
  {
    title: "Tags",
    path: "/dashboard/tags",
    shortPath: "/tags",
    Icon: MdOutlineCampaign,
    Element: Tags,
  },
  {
    title: "Feeds",
    path: "/dashboard/feeds",
    shortPath: "/feeds",
    Icon: MdOutlineAccountTree,
    Element: Feeds,
  },
  // {
  //   title: "Templates",
  //   path: "/dashboard/templates",
  //   shortPath: "/templates",
  //   Icon: GoProjectTemplate,
  //   Element: Templates,
  // },
  {
    title: "Logout",
    path: "/dashboard/logout",
    shortPath: "/logout",
    Icon: MdLogout,
    Element: Logout,
  },
];
