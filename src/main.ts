import { Drash } from "./deps.ts";
import { FilesResource } from "./files.resource.ts";

class AppResource extends Drash.Resource {
  public paths = ["/"];

  public async GET(
    request: Drash.Request,
    response: Drash.Response
  ): Promise<void> {
    const html = await Deno.readTextFile("./views/index.html");
    return response.html(html);
  }
}

const server = new Drash.Server({
  hostname: "localhost",
  port: 1447,
  protocol: "http",
  resources: [AppResource, FilesResource],
});

server.run();

console.log(`Server running at ${server.address}.`);
