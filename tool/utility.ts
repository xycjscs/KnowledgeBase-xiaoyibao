import "core-js/proposals/promise-with-resolvers";

import { packageOf } from "@tech_query/node-toolkit";
import { config } from "dotenv";
import { Window } from "happy-dom";
import { extname, isAbsolute, join } from "path";

// set `package.json`'s foldr as Current Working Directory
const { path = process.cwd() } = packageOf();

config({ path: join(path, ".env") });

export const makeAbsolutePath = (raw: string, cwd = path) =>
  isAbsolute(raw) ? raw : join(cwd, raw);

export const changeExtensionName = (raw: string, extension: string) =>
  `${raw.slice(0, -extname(raw).length)}.${extension}`;

const window = new Window();

Reflect.set(globalThis, "document", window.document);
