import jwt from "jsonwebtoken";
import { User } from "../user/user.model.js";

export const validateaAccessToken = async (req, res, next) => {
  // extract token from req.headers

  const authorization = req.headers.authorization;
  const splittedToken = authorization?.split(" ");
  const token = splittedToken?.length === 2 ? splittedToken[1] : null;

  

  if(!token){
    return res.status(401).send({message:"Unauthorized"});
  }

  let payload;

  //decrypt token using signature
  try {
    payload = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET);
  } catch (error) {
    return res.status(401).send({ message: error.message });
  }
  //find user from that email
  const user = await User.findOne({ email: payload.email });
  //if user doesnot exist throw error
  if (!user) {
    return res.status(401).send("Unauthorized");
  }

  req.userDetails = user;

  //pass the flow
  next();
};
