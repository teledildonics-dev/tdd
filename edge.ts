// edge server entry point

addEventListener("fetch", (event) => {
  event.respondWith(
    new Response("nothing here yet", {
      status: 503,
      headers: {
        server: "deploy",
        "content-type": "text/plain",
      },
    }),
  );
});
