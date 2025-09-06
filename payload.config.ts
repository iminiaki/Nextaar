// storage-adapter-import-placeholder
import { postgresAdapter } from "@payloadcms/db-postgres";
import { payloadCloudPlugin } from "@payloadcms/payload-cloud";
import { lexicalEditor } from "@payloadcms/richtext-lexical";
import path from "path";
import { buildConfig } from "payload";
import { fileURLToPath } from "url";
import sharp from "sharp";

import { Users } from "./collections/Users";
import { Media } from "./collections/Media";
import { Services } from "./collections/Services";
import { Posts } from "./collections/Posts";
import { Categories } from "./collections/PostCat";
import { PortfolioCategories } from "./collections/PortfolioCat";
import { Portfolio } from "./collections/Portfolio";

const filename = fileURLToPath(import.meta.url);
const dirname = path.dirname(filename);

export default buildConfig({
  admin: {
    user: Users.slug,
    importMap: {
      baseDir: path.resolve(dirname),
    },
    components: {
      views: {
        // Replace the default login view with our custom component
        login: {
          path: '/login',
          exact: true,
          Component: {
            path: '/components/ui/sign-in-card-2',
            exportName: 'Component',
          },
        },
      },
    },
  },
  collections: [Users, Media, Services, Posts, Categories, Portfolio, PortfolioCategories],
  editor: lexicalEditor(),
  secret: process.env.PAYLOAD_SECRET || "",
  typescript: {
    outputFile: path.resolve(dirname, "payload-types.ts"),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URI || "",
    },
  }),
  sharp: sharp as any,
  plugins: [
    payloadCloudPlugin(),
    // storage-adapter-placeholder
  ],
  localization: {
    locales: [
      {
        label: "English",
        code: "en",
      },
      {
        label: "Persian",
        code: "fa",
        rtl: true,
      },
      {
        label: "Arabic",
        code: "ar",
        rtl: true,
      },
    ],
    defaultLocale: "en",
  },
});
