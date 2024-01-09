import jwt from 'jsonwebtoken';

type UserDataType = {
  id: number
}

const token = {
  generateAccessToken: (userData: UserDataType) => {
    return jwt.sign({
      userId: userData.id
    },
    String(process.env.ACCESS_JWT_SECRET),
    {
      expiresIn: '1h'
    });
  },

  generateRefreshToken: (userData: UserDataType) => {
    return jwt.sign({
      userId: userData.id
    },
    String(process.env.REFRESH_JWT_SECRET),
    {
      expiresIn: '30d'
    });
  }
};

export default token;