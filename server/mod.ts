addEventListener("fetch", (event: FetchEvent) => {
  event.respondWith((async () => {
    let { pathname } = new URL(event.request.url);

    if (pathname === "/") {
      pathname = "/index.html";
    }

    let contentType: any = {
      html: "text/html",
      js: "application/javascript",
      jsm: "application/javascript",
      css: "text/css",
    }[pathname.split(/\./g).filter(Boolean).pop() as any] ?? "application/javascript";

    try {
      if (contentType) {
        return new Response(await Deno.readFile(`client/build${pathname}`), {
          headers: {
            "Content-Type": contentType,
          },
        });
      }
    } catch (error) {
      console.error(error);
    }

    return new Response(`file not found: ${pathname}`, {
      status: 404,
    });
  })());
});
