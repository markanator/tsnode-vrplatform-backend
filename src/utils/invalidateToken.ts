import jwt from "jsonwebtoken";

exports.invalidateToken = (): string => {
  const token = jwt.sign(
    { userID: null, userRole: null, isLoggedIn: false },
    process.env.JWT_SECRET as string
  );

  return token;
};
