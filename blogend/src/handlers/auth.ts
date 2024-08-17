import { Handler } from "~/route";

export const login: Handler = (req, res) => {
  res.status(200).json({
    code: 200,
    message: "登录成功",
    data: {},
  });
};
