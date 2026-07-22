export interface ErrorPageContent {
  image: string;
  title: string;
  description: string;
}

export interface ErrorPage {
  notFound: ErrorPageContent;
  errorPage: ErrorPageContent;
  [key: string]: ErrorPageContent;
}
