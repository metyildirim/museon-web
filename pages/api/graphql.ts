import type { NextApiRequest, NextApiResponse } from "next";
import axios from "axios";
import cookie from "cookie";

const GRAPHQL_ENDPOINT = process.env.GRAPHQL_ENDPOINT || "";
const NODE_ENV = process.env.NODE_ENV;

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<any>
) {
  const token = req.cookies["auth"];

  const headers = {
    "x-auth-token": token || "",
  };

  const result = await axios.post(GRAPHQL_ENDPOINT, req.body, { headers });
  const authToken = result.headers["x-auth-token"];
  if (
    result.data.data?.login ||
    result.data.data?.register ||
    result.data.data?.logout
  ) {
    const days = result.data.data?.logout ? 0 : 7;
    if (!result.data.errors) {
      res.setHeader(
        "Set-Cookie",
        cookie.serialize("auth", authToken, {
          httpOnly: true,
          maxAge: 60 * 60 * 24 * days,
          sameSite: "lax",
          secure: NODE_ENV === "development" ? false : true,
        })
      );
    }
  }
  res.status(200).send(result.data);
}
