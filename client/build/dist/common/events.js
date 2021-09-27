export const withEventStream = async (target, eventName, eventMapper, handler) => {
  let listener;
  const stream = new ReadableStream({
    start(controller) {
      target.addEventListener(eventName, listener = (event) => {
        controller.enqueue(eventMapper(event));
      });
    },
    cancel() {
      target.removeEventListener(eventName, listener);
    }
  });
  const reader = stream.getReader();
  try {
    return await handler(reader);
  } finally {
    reader.releaseLock();
    stream.cancel();
  }
};
