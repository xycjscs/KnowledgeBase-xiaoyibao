import "core-js/proposals/promise-with-resolvers";

import { packageOf } from "@tech_query/node-toolkit";
import { config } from "dotenv";
import { Window } from "happy-dom";
import { extname, isAbsolute, join } from "path";
import { parse } from "yaml";
import { fs } from "zx";

const window = new Window();

Reflect.set(globalThis, "document", window.document);

// set `package.json`'s foldr as Current Working Directory
const { path = process.cwd() } = packageOf();

config({ path: join(path, ".env") });

export const makeAbsolutePath = (raw: string, cwd = path) =>
  isAbsolute(raw) ? raw : join(cwd, raw);

export const changeExtensionName = (raw: string, extension: string) =>
  `${raw.slice(0, -extname(raw).length)}.${extension}`;

export async function readMeta(filePath: string) {
  filePath = makeAbsolutePath(filePath);

  switch (extname(filePath).toLowerCase()) {
    case ".json":
      return fs.readJSON(filePath);
    case ".yml":
    case ".yaml":
      return parse(filePath);
  }
}
