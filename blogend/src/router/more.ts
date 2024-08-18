import { Route } from "@/types/index";
import { authenticateToken } from "@/middleware/authMiddle";
export const moreRoutes: Route[] = [
  {
    method: "get",
    path: "/more",
    middleware: [authenticateToken],
    handler: async (req, res) => {
      console.log(req.headers.authorization,'header')
      res
        .status(200)
        .json({ code: 200, message: "获取更多成功", data: { number: 123 } });
    },
  },
];
