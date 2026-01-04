import { SideNavItem } from "@/Type";
import { IconHome, IconUsers, IconBriefcase } from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/company/dashboard",
    icon: <IconHome size={28} />,
  },
  {
    title: "Manage Jobs",
    path: "/company/manage-jobs",
    icon: <IconBriefcase size={28} />,
  },
  {
    title: "Applicants",
    path: "/company/applicants",
    icon: <IconUsers size={28} />,
  },
  {
    title: "Manage Employees",
    path: "/company/manage-employees",
    icon: <IconUsers size={28} />,
  },
];
