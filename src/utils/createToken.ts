import jwt from "jsonwebtoken";

interface User {
  id: number;
  userRole: string;
}

const createToken = (user: User): string => {
  const token = jwt.sign(
    { userID: user.id, userRole: user.userRole, isLoggedIn: true },
    process.env.JWT_SECRET as string
  );
  return token;
};

export default createToken;
// module.exports = createToken;
