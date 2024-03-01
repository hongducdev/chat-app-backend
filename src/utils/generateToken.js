import jwt from 'jsonwebtoken';

const generateToken = async (userId, res) => {
   return (token = jwt.sign({ userId }, process.env.JWT_SECRET_KEY, {
      expiresIn: '30d',
   }));
};

export default generateToken;
