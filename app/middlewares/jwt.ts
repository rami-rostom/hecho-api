import jwt from 'jsonwebtoken';

type UserDataType = {
  id: number
}

// TODO: secrets from dotenv file
const ACCESS_JWT_SECRET = 'hechoaccesstoken';
const REFRESH_JWT_SECRET = 'hechorefreshtoken';

const token = {
  generateAccessToken: (userData: UserDataType) => {
    return jwt.sign({
      userId: userData.id
    },
    ACCESS_JWT_SECRET,
    {
      expiresIn: '1h'
    });
  },

  generateRefreshToken: (userData: UserDataType) => {
    return jwt.sign({
      userId: userData.id
    },
    REFRESH_JWT_SECRET,
    {
      expiresIn: '30d'
    });
  }
};

export default token;