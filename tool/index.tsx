#! /usr/bin/env ts-node

import { Command, createCommand } from "commander-jsx";
import { readFile } from "fs/promises";
import { basename, extname, join } from "path";

import { download, transform, upload } from "./core";
import { changeExtensionName, makeAbsolutePath } from "./utility";

Command.execute(
  <Command
    name="knowledge-cook"
    parameters="[command|metaFile] [options|batchFolder]"
    executor={batcher}
  >
    <Command
      name="download"
      parameters="<sourceURL> [targetFile]"
      executor={downloader}
    />
    <Command
      name="transform"
      parameters="<sourceFile> [targetFile]"
      executor={transformer}
    />
    <Command
      name="upload"
      parameters="<sourceFile> [datasetId]"
      executor={uploader}
    />
  </Command>,
  process.argv.slice(2)
);

async function downloader(
  {},
  sourceURL: string,
  targetFile = basename(new URL(sourceURL).pathname)
) {
  console.time(targetFile);

  await download(sourceURL, makeAbsolutePath(targetFile));

  console.timeEnd(targetFile);
}

async function transformer(
  {},
  sourceFile: string,
  targetFile = changeExtensionName(sourceFile, "md")
) {
  console.time(targetFile);

  await transform(makeAbsolutePath(sourceFile), makeAbsolutePath(targetFile));

  console.timeEnd(targetFile);
}

async function uploader({}, sourceFile: string, datasetId?: string) {
  console.time(sourceFile);

  await upload(sourceFile, datasetId);

  console.timeEnd(sourceFile);
}

type ArticleMeta = Record<"name" | "description" | "author" | "link", string>;

async function batcher({}, metaFile: string, batchFolder = "downloads") {
  const rootFolder = makeAbsolutePath(batchFolder),
    meta: ArticleMeta[] = JSON.parse((await readFile(metaFile)) + "");

  for (const { name, link } of meta)
    try {
      const filePath = join(
        rootFolder,
        `${name}${extname(new URL(link).pathname)}`
      );
      const markdownPath = changeExtensionName(filePath, "md");

      await download(link, filePath);

      await transform(filePath, markdownPath);

      await upload(markdownPath);
    } catch (error) {
      console.error(error);
    }
}
