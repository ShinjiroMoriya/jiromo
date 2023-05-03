import { mimeTypes } from "https://deno.land/x/drash@v2.7.1/src/dictionaries/mime_types.ts";
import { Drash } from "./deps.ts";

export class FilesResource extends Drash.Resource {
  paths = ["/public/.*.(jpg|png|svg|css|js)"];

  public async GET(request: Drash.Request, response: Drash.Response) {
    const path = new URL(request.url).pathname;
    const extension = path.split(".").at(-1);
    if (!extension) {
      throw new Drash.Errors.HttpError(
        415,
        "`filepath` passed into response.file()` must contain a valid extension."
      );
    }
    const type = mimeTypes.get(extension);
    if (!type) {
      throw new Drash.Errors.HttpError(
        500,
        "Unable to retrieve content type for " +
          path +
          ", please submit an issue."
      );
    }
    response.body = await Deno.readTextFile(`.${path}`);
    response.headers.set("Content-Type", type);
    return response;
  }
}
