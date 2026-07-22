export type UserRole = 'admin' | 'owner' | null;

export interface SidebarItem {
  title: string;
  href: string;
  icon?: string;
  role: UserRole[];
  children?: SidebarItem[];
  haveUpdate?: number;
}

export interface SidebarSection {
  sectionName?: string;
  item: SidebarItem[];
}
