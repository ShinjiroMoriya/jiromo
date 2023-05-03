import { Drash } from "./deps.ts";

export class FilesResource extends Drash.Resource {
  // This resource will handle the following paths:
  //
  //   1. /favicon.ico
  //   2. /public/<anything>.<extension>
  //
  // With the power of URLPattern, which is what Drash uses internally
  // to create paths based on a resources paths, you can use regex to
  // define your own paths.
  //
  // Here, your resource will be able to handle requests like:
  //
  // /public/js/app.js
  // /public/app.js
  // /public/css/one/two/three/app.css
  // /public/images/users/52/profile_picture.png
  // /public/images/logos/logo.svg
  //
  // Due to the regex below: "/public/.*\.(jpg|png|svg|css|js)"
  //
  //   .* - This means it will match anything, such as /public/hello, /public/very/deep/path
  //   \. - A literal ".", because as this is a files resource, the request url should have an extension: ".css"
  //   (jpg|png|svg|css|js) - Following the ".", the path should end in ONE of these values
  paths = ["/public/.*.(jpg|png|svg|css|js)"];

  public GET(request: Drash.Request, response: Drash.Response) {
    const path = new URL(request.url).pathname;
    // The path will now be something that matches the `paths` property,
    // for example: "/favicon.ico"

    // With any request, we need to set a response, so what we will do is
    // find the file using the path, with Drash's `file()` method.
    // For more information on this method, see https://drash.land/drash/v2.x/tutorials/responses/setting-the-body#file,
    // but it will read the content of the parameter passed in, and set that as the body
    //
    // Be aware that this can be insecure if you haven't limited your `paths` property, for example,
    // say you have confidential images in `./private`, and your path looks like `paths = [..., "/private/\."],
    // a user CAN make a request to `https://.../private/my_invoice_2021.pdf
    return response.file(`.${path}`); // response.file("./favicon.ico")
  }
}
