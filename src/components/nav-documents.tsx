"use client";

import { type Icon } from "@tabler/icons-react";

import {
  SidebarGroup,
  SidebarGroupLabel,
  SidebarMenu,
  SidebarMenuButton,
  useSidebar,
} from "@/components/ui/sidebar";

export function NavDocuments({
  items,
}: {
  items: {
    name: string;
    url: string;
    icon: Icon;
  }[];
}) {
  return (
    <SidebarGroup className="group-data-[collapsible=icon]:hidden">
      <SidebarGroupLabel>Documents</SidebarGroupLabel>
      <SidebarMenu>
        {items.map((item) => (
          <SidebarMenu key={item.name}>
            <SidebarMenuButton tooltip={item.name}>
              {item.icon && <item.icon />}
              <span>{item.name}</span>
            </SidebarMenuButton>
          </SidebarMenu>
        ))}
      </SidebarMenu>
    </SidebarGroup>
  );
}
