import { SideNavItem } from "@/Type";
import {
  IconHome,
  IconBuilding,
  IconUsers,
  IconBriefcase,
  IconWorldQuestion,
} from "@tabler/icons-react";

export const SIDENAV_ITEMS: SideNavItem[] = [
  {
    title: "Dashboard",
    path: "/admin/dashboard",
    icon: <IconHome size={28} />,
  },
  {
    title: "Manage Companies",
    path: "/admin/manage-companies",
    icon: <IconBuilding size={28} />,
  },
  {
    title: "Manage Applicants",
    path: "/admin/applicants",
    icon: <IconUsers size={28} />,
  },
  {
    title: "Manage MCQ Questions",
    path: "/admin/manage-questions",
    icon: <IconWorldQuestion size={28} />,
  },
  {
    title: "Job Overview",
    path: "/admin/jobs",
    icon: <IconBriefcase size={28} />,
  },
];
