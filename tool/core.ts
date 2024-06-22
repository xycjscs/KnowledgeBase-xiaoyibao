import { mkdir, open, readFile, writeFile } from "fs/promises";
import { basename, dirname, extname } from "path";

// for JS & DOM API Polyfill
import "./utility";

import pdf2md from "@opendocsg/pdf2md";
import { SingleBar } from "cli-progress";
import { turndown } from "edkit";
import { HTTPClient } from "koajax";
import { getTextExtractor } from "office-text-extractor";

const { FASTGPT_API_HOST, FASTGPT_API_TOKEN, FASTGPT_DATASET_ID } = process.env;

const downloader = new HTTPClient({ responseType: "arraybuffer" }),
  extractor = getTextExtractor();

const uploader = new HTTPClient({
  baseURI: new URL("api/", FASTGPT_API_HOST) + "",
  responseType: "json",
}).use(({ request }, next) => {
  request.headers = {
    ...request.headers,
    Authorization: `Bearer ${FASTGPT_API_TOKEN}`,
  };
  return next();
});

export async function download(source: string, target: string) {
  await mkdir(dirname(target), { recursive: true });

  const stream = downloader.download(source),
    file = await open(target, "a+"),
    progressBar = new SingleBar({});

  progressBar.start(100, 0);

  try {
    for await (const { buffer, loaded, percent } of stream) {
      await file.write(Buffer.from(buffer), 0, buffer.byteLength, loaded);

      progressBar.update(percent);
    }
  } finally {
    await file.close();
    progressBar.stop();
    console.clear();
  }
}

export async function transform(source: string, target: string) {
  const type = extname(source).slice(1),
    input = await readFile(source);
  var text = "";

  switch (type) {
    case "html":
      text = turndown.turndown(input.toString("utf-8"));
      break;
    case "pdf":
      text = await pdf2md(input.buffer);
      break;
    case "docx":
    case "xlsx":
      text = await extractor.extractText({ type: "buffer", input });
      break;
    default:
      throw new Error(`Transformer unsupported file type: ${type}`);
  }
  await writeFile(target, text);
}

/**
 * @see {@link https://doc.fastgpt.in/docs/development/openapi/dataset/#%E5%88%9B%E5%BB%BA%E4%B8%80%E4%B8%AA%E6%96%87%E4%BB%B6%E9%9B%86%E5%90%88}
 */
export async function upload(source: string, datasetId = FASTGPT_DATASET_ID) {
  const form = new FormData(),
    { buffer } = await readFile(source);

  form.append(
    "data",
    JSON.stringify({
      datasetId,
      parentId: null,
      trainingType: "chunk",
      chunkSize: buffer.byteLength,
      chunkSplitter: "",
      qaPrompt: "",
      metadata: {},
    })
  );
  form.append("file", new Blob([buffer]), basename(source));

  const { body } = await uploader.post(
    "core/dataset/collection/create/localFile",
    form
  );
  return body;
}
