import jwt from "jsonwebtoken";

export const getTokenData = (request) => {
  try {
    const token = request.cookies.get("token")?.value || "";
    const decoded_token = jwt.verify(token, process.env.JWT_SECRET);
    return decoded_token.id;
  } catch (error) {
    throw new Error(error.message);
  }
};
