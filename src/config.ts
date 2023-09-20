import type { Site, SocialObjects } from "./types";

export const SITE: Site = {
  website: "https://blog.davidesilva.dev/",
  author: "Davide Silva",
  desc: "A minimal, responsive and SEO-friendly Astro blog theme.",
  title: "Davide Silva",
  ogImage: "astropaper-og.jpg",
  lightAndDarkMode: true,
  postPerPage: 3,
};

export const LOCALE = ["en-UK"]; // set to [] to use the environment default

export const LOGO_IMAGE = {
  enable: false,
  svg: true,
  width: 216,
  height: 46,
};

export const SOCIALS: SocialObjects = [
  {
    name: "Github",
    href: "https://github.com/davidesilva",
    linkTitle: ` ${SITE.title} on Github`,
    active: true,
  },
  {
    name: "Instagram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Instagram`,
    active: false,
  },
  {
    name: "LinkedIn",
    href: "https://linkedin.com/in/davideapsilva/",
    linkTitle: `${SITE.title} on LinkedIn`,
    active: true,
  },
  {
    name: "Mail",
    href: "mailto:yourmail@gmail.com",
    linkTitle: `Send an email to ${SITE.title}`,
    active: false,
  },
  {
    name: "Twitter",
    href: "https://twitter.com/0xdavidesilva",
    linkTitle: `${SITE.title} on Twitter`,
    active: true,
  },
  {
    name: "Telegram",
    href: "https://github.com/satnaing/astro-paper",
    linkTitle: `${SITE.title} on Telegram`,
    active: false,
  },
  {
    name: "RSS",
    href: "https://blog.davidesilva.dev/rss.xml",
    linkTitle: `${SITE.title} RSS Feed`,
    active: true
  }
];
