import { SidebarSection } from '@/models/navigation.model';

export const dashboardConfig: SidebarSection[] = [
  {
    sectionName: '',
    item: [
      {
        title: 'Overview',
        href: '/dashboard',
        icon: 'pie_chart',
        role: ['admin', 'owner'],
      },

      {
        title: 'Menu',
        href: '/menu',
        icon: 'fork_spoon',
        role: ['owner'],
      },

      {
        title: 'Billing History',
        href: '/billing-history',
        icon: 'description',
        role: ['owner'],
        children: [
          {
            title: 'History 1',
            href: '#',
            role: ['owner'],
          },
        ],
      },

      {
        title: 'Inventory',
        href: '/inventory',
        icon: 'shopping_bag',
        role: ['owner'],
        children: [
          {
            title: 'Inventory level 1 ',
            href: '#',
            role: ['owner'],
          },
        ],
      },

      {
        title: 'Messages',
        href: '/message',
        icon: '3p',
        role: ['admin', 'owner'],
        haveUpdate: 1,
      },

      {
        title: 'Access',
        href: '#',
        icon: 'lock',
        role: ['admin', 'owner'],
        children: [
          {
            title: 'Access Link 1',
            href: '#',
            role: ['admin'],
          },
        ],
      },
    ],
  },
  {
    sectionName: '',
    item: [
      {
        title: 'My Profile',
        href: '#',
        icon: 'account_circle',
        role: ['admin', 'owner'],
      },

      {
        title: 'Gallery',
        href: '#',
        icon: 'photo_library',
        role: ['admin', 'owner'],
      },

      {
        title: 'Help',
        href: '#',
        icon: 'globe',
        role: ['admin', 'owner'],
      },
    ],
  },
];
