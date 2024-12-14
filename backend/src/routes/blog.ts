import { PrismaClient } from "@prisma/client/edge";
import { withAccelerate } from "@prisma/extension-accelerate";
import { Hono } from "hono";
import { sign, verify } from "hono/jwt";

export const blogRouter = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
  Variables: {
    userId: string;
  };
}>();

// Authorization middleware
blogRouter.use("/*", async (c, next) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const jwt = c.req.header("Authorization") || "";
  if (!jwt) {
    return c.json({ error: "unauthorized" }, 401);
  }
  try {
    const token = jwt.split(" ")[1];
    const payload = await verify(token, c.env.JWT_SECRET);
    if (!payload || !payload.id) {
      throw new Error("Invalid token");
    }
    c.set("userId", payload.id);
    await next();
  } catch (error) {
    return c.json({ error: "unauthorized" }, 401);
  }
});

// post a blog
blogRouter.post("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const userId = c.get("userId");
  const blog = await prisma.post.create({
    data: {
      title: body.title,
      content: body.content,
      authorId: userId,
    },
  });
  return c.json(blog.id, 201);
});

// Get all blogs
blogRouter.get("/all", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  try {
    const blogs = await prisma.post.findMany({});
    return c.json(blogs);
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching ",
    });
  }
});

// Get specific blog
blogRouter.get("/:id", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const id = c.req.param("id");
  console.log(id);
  try {
    const blog = await prisma.post.findFirst({
      where: {
        id: id,
      },
    });
    return c.json(blog);
  } catch (error) {
    c.status(411);
    return c.json({
      message: "Error while fetching ",
    });
  }
});

// Update a blog
blogRouter.put("/", async (c) => {
  const prisma = new PrismaClient({
    datasourceUrl: c.env?.DATABASE_URL,
  }).$extends(withAccelerate());
  const body = await c.req.json();
  const blog = await prisma.post.update({
    where: {
      id: body.id,
    },
    data: {
      title: body.title,
      content: body.content,
    },
  });
  return c.json(blog.id, 201);
});
