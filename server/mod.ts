
addEventListener("fetch", async (event: FetchEvent) => {
  let { pathname } = new URL(event.request.url);

  if (pathname === "/") {
    pathname = "/index.html";
  }

  let contentType: any = {
    html: 'text/html',
    js: 'application/javascript',
    jsm: 'application/javascript',
    css: 'text/css',
  }[pathname.split(/\./g).pop() as any];

  if (contentType) {
    return new Response(await Deno.readFile(`client/build${pathname}`), {
      headers: {
        "Content-Type": contentType
      }
    })
  } else {
    return new Response("", {
      status: 404,
    })
  }
});
