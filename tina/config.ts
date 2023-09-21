import { defineConfig } from "tinacms";

// Your hosting provider likely exposes this as an environment variable
const branch = process.env.HEAD || process.env.VERCEL_GIT_COMMIT_REF || "main";

export default defineConfig({
  branch,
  clientId: process.env.TINA_CLIENT_ID,
  token: process.env.TINA_TOKEN,

  build: {
    outputFolder: "admin",
    publicFolder: "public",
  },
  media: {
    tina: {
      mediaRoot: "",
      publicFolder: "public",
    },
  },
  search: {
    tina: {
      indexerToken: process.env.TINA_SEARCH_TOKEN
    }
  },
  schema: {
    collections: [
      {
        name: "post",
        label: "Posts",
        path: "/src/content/blog",
        format: "md",
        fields: [
          {
            type: "string",
            name: "title",
            label: "Title",
            isTitle: true,
            required: true,
          },
          {
            type: "string",
            name: "description",
            label: "Description",
            required: true
          },
          {
            type: "datetime",
            name: "pubDatetime",
            label: "Published at",
            required: true
          },
          {
            type: "string",
            name: "tags",
            label: "Tags",
            list: true,
            ui: {
              component: 'tags'
            },
            required: false
          },
          {
            type: "string",
            name: "canonicalURL",
            label: "Canonical URL",
            required: false
          },
          {
            type: "rich-text",
            name: "body",
            label: "Body",
            isBody: true,
          },
        ],
      },
    ],
  },
});
