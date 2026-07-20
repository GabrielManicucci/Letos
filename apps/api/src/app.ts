import { Hono } from "hono";

const app = new Hono();

const helloWorld = Bun.env.helloWorld;

app.get("/", (c) => {
  return c.text(`${helloWorld}`);
});

export default app;
