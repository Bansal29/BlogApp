import { Hono } from "hono";
import { userRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";
import { cors } from "hono/cors";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.use(cors({ origin: "*" }));

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
