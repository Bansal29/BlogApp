// import { Hono } from "hono";
// import { PrismaClient } from "@prisma/client/edge";
// import { withAccelerate } from "@prisma/extension-accelerate";
// import { decode, sign, verify } from "hono/jwt";
// import { User } from "@prisma/client/edge";

// // Create the main Hono app
// const app = new Hono<{
//   Bindings: {
//     DATABASE_URL: string;
//     JWT_SECRET: string;
//   };
// }>();

// //authorizarion middleware for protected routes
// app.use("/api/v1/blog/*", async (c, next) => {
//   //get the header
//   const header = c.req.header("authorization") || " ";
//   //gett he token
//   const token = header.split(" ")[1]; //if token is of form "bearer token"
//   //verify the header
//   const response = await verify(token, c.env.JWT_SECRET);
//   //if header i correct, proceed
//   if (response.id) {
//     next();
//   }
//   //if header is incorrect,return 403 error status code
//   else {
//     c.status(403);
//     return c.json({
//       error: "unauthorized!",
//     });
//   }
// });
// //signup route
// app.post("/api/v1/signup", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());

//   const body = await c.req.json();
//   try {
//     const user = await prisma.user.create({
//       data: {
//         name: body.name,
//         email: body.email,
//         password: body.password,
//       },
//     });
//     const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//     return c.json({ jwt });
//   } catch (e) {
//     c.status(403);
//     return c.json({ error: "error while signing up!" });
//   }
// });

// //signin route
// app.post("/api/v1/signin", async (c) => {
//   const prisma = new PrismaClient({
//     datasourceUrl: c.env?.DATABASE_URL,
//   }).$extends(withAccelerate());
//   const body = await c.req.json();
//   const user = await prisma.user.findUnique({
//     where: {
//       email: body.email,
//       password: body.password,
//     },
//   });
//   if (!user) {
//     c.status(403);
//     return c.json({
//       error: "User not found!!",
//     });
//   }
//   const jwt = await sign({ id: user.id }, c.env.JWT_SECRET);
//   return c.json({ jwt });
// });

// //get blog route
// app.get("/api/v1/blog/:id", (c) => {
//   const id = c.req.param("id");
//   console.log(id);
//   return c.text("get blog route");
// });

// //create or post a blog
// app.post("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });

// //update a blog
// app.put("/api/v1/blog", (c) => {
//   return c.text("signin route");
// });

// export default app;
import { Hono } from "hono";
import { userRouter } from "./routes/auth";
import { blogRouter } from "./routes/blog";

export const app = new Hono<{
  Bindings: {
    DATABASE_URL: string;
    JWT_SECRET: string;
  };
}>();

app.route("/api/v1/user", userRouter);
app.route("/api/v1/blog", blogRouter);

export default app;
