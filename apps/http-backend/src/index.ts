import express from "express";
import { Request } from "express";
import jwt from "jsonwebtoken";
import { JWT_SECRET } from "@repo/backend-common/config";
import { middleware } from "./middleware";
import {
  createRoomSchema,
  createUserSchema,
  signinSchema,
} from "@repo/common/types";
import { prismaClient } from "@repo/db/client";

interface AuthenticatedRequest extends Request {
  userId?: string;
}

const app = express();
app.use(express.json());

app.post("/signup", async (req, res) => {
  const parsedData = createUserSchema.safeParse(req.body);

  if (!parsedData.success) {
    // console.log(parsedData.error);
    return res.json({
      Message: "Incorrect Inputs",
    });
  }
  try {
    const user = await prismaClient.user.create({
      data: {
        email: parsedData.data.username,
        password: parsedData.data.password,
        name: parsedData.data.name,
      },
    });

    res.json({
      userId: user.id,
    });
  } catch (err) {
    res.status(411).json({
      Message: "User already exists with the email provided",
    });
  }
});

app.post("/signin", async (req, res) => {
  const parsedData = signinSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      Message: "Incorrect Inputs",
    });
  }
  const user = await prismaClient.user.findFirst({
    where: {
      email: parsedData.data.username,
      password: parsedData.data.password,
    },
  });

  if (!user) {
    res.status(403).json({
      Message: "Not Authorized",
    });

    return;
  }

  const token = jwt.sign(
    {
      userId: user?.id,
    },
    JWT_SECRET
  );

  res.json({
    token,
  });
});

app.post("/room", middleware, async (req: AuthenticatedRequest, res) => {
  const parsedData = createRoomSchema.safeParse(req.body);

  if (!parsedData.success) {
    return res.json({
      Message: "Incorrect Inputs",
    });
  }

  const userId = req.userId;

  if (!userId) {
    return res.status(403).json({
      Message: "Unauthorized",
    });
  }

  try {
    const room = await prismaClient.room.create({
      data: {
        slug: parsedData.data.name,
        adminId: userId,
      },
    });

    res.json({
      roomId: room.id,
    });
  } catch (err) {
    res.status(411).json({
      Message: "Room Already Exists",
    });
  }
});

app.get("/chats/:roomId", async (req, res) => {
    const roomId = Number(req.params.roomId);
    const messages = await prismaClient.chat.findMany({
        where:{
            roomId: roomId
        }, 
        orderBy: {
            id: "desc"
        },
        take: 50
    });

    res.json({
        messages
    });
});

app.get("/room/:slug", async (req, res) => {
  const slug = req.params.slug;
  const room = await prismaClient.room.findFirst({
    where:{
      slug
    }
  });

  res.json({
    room
  });
});

app.listen(3001, () => {
  console.log("Server started on port 3001");
});
