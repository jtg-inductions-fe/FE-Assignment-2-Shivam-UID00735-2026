import { ErrorPage } from '@/models/error-page.model';

export const errorPageData: ErrorPage = {
  notFound: {
    image: 'assets/images/not-found.webp',
    title: 'Page not found',
    description:
      'Oops! Looks like you followed a bad link. If you think this is a problem with us, please tell us.',
  },

  errorPage: {
    image: '',
    title: 'Something has gone seriously wrong',
    description:
      'It’s always time for a coffee break We should be back by the time you finish your coffee.',
  },
};
