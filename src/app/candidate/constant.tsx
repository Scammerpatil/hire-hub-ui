import { SideNavItem } from "@/Type";
import {
  IconHome,
  IconBriefcase,
  IconListCheck,
  IconFileCertificate,
  IconUser,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/candidate/dashboard",
    icon: <IconHome size={28} />,
  },
  {
    title: "Job Listings",
    path: "/candidate/jobs",
    icon: <IconBriefcase size={28} />,
  },
  {
    title: "My Applications",
    path: "/candidate/applications",
    icon: <IconListCheck size={28} />,
  },
  {
    title: "Profile",
    path: "/candidate/profile",
    icon: <IconUser size={28} />,
  },
];
