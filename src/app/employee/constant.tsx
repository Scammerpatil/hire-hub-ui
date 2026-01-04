import { SideNavItem } from "@/Type";
import {
  IconHome,
  IconBriefcase,
  IconUserPlus,
  IconListCheck,
  IconUser,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/employee/dashboard",
    icon: <IconHome size={28} />,
  },
  {
    title: "My Referrals",
    path: "/employee/referrals",
    icon: <IconUserPlus size={28} />,
  },
  {
    title: "Applications",
    path: "/employee/applications",
    icon: <IconListCheck size={28} />,
  },
  {
    title: "Profile",
    path: "/employee/profile",
    icon: <IconUser size={28} />,
  },
];
