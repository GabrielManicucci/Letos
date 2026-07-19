import { Hono } from "hono";

const app = new Hono();

const helloWorld = process.env.helloWorld;

app.get("/", (c) => {
  return c.text(`${helloWorld}`);
});

export default app;
