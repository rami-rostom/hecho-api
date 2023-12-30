import { Request, Response } from 'express';
import bcrypt from 'bcrypt';
import slugify from 'slugify';
import token from '../middlewares/jwt';
import { User } from '../models/index';

type ErrorType = {
  error?: string | null;
  message?: string | null;
}

type RegisterType = {
  email: string,
  username: string,
  password: string,
  confirmation: string
}

const controller = {
  handleSignUp: async (
    req: Request<RegisterType>,
    res: Response<ErrorType>
    ) => {
    // Email must have characters before and after @, and 2 to 4 characters after the dot.
    const EMAIL_REGEX = /^[\w.-]+@([\w-]+\.)+[\w-]{2,4}$/gm;

    // Password require at least 8 characters, 1 capital letter and 1 number.
    const PASSWORD_REGEX = /^(?=.*?[A-Z])(?=.*?[a-z])(?=.*?[0-9])(?=.*?[#?!@$ %^&*-]).{8,}$/gm;

    const { email, username, password, confirmation } = req.body;

    if (!email || !username || !password) {
      return res
        .status(400)
        .json({ 'error': 'Missing parameter(s).' });
    }      
      
    if (password !== confirmation) {
      return res
        .status(400)
        .json({ 'error': 'Password and confirmation isn\'t matching.' });
    }

    if (!EMAIL_REGEX.test(email)) {
      return res
        .status(400)
        .json({ 'error': 'Email is not valid.' });
    }

    if (!PASSWORD_REGEX.test(password)) {
      return res
        .status(400)
        .json({ 'error': 'Password invalid (must be at least 8 characters, include one number, one capital letter and one special character).' });
    }

    // Verification for unique email
    const emailCheck = await User.findOne({
      where: { email }
    });

    if (emailCheck) {
      return res
        .status(400)
        .json({ 'error': 'Email already used. Please try with a different email.' });
    }

    // Verification for unique username
    const usernameCheck = await User.findOne({
      where: { username }
    });

    if (usernameCheck) {
      return res
        .status(400)
        .json({ 'error': 'Username already used. Please try with a different one.' });
    }

    // Slugify username
    const usernameSlugified = slugify(username, { lower: true });

    const passwordHashed = await bcrypt.hash(password, 10);

    await User.create({
      email,
      username,
      username_slug: usernameSlugified,
      password: passwordHashed,
      confirmation: passwordHashed,
      is_admin: false
    });

    res
      .status(201)
      .json({ 'message': 'User successfully created, you can now login.' });
  },

  // handleSignIn: async (req, res) => {
  //   const { email, password } = req.body;

  //   if (!email || !password) {
  //     return res
  //       .status(400)
  //       .json({ 'error': 'Missing parameter(s).' });
  //   }

  //   const userFound = await User.findOne({
  //     where: { email }
  //   });

  //   if (!userFound) {
  //     return res
  //       .status(400)
  //       .json({ 'error': 'This user doesn\'t exist.' });
  //   }

  //   // Function is launch if the password match with the decrypted password. It will also generate JWT tokens.
  //   const verificationAuthBcrypt = (errBycrypt, resBycrypt) => {
  //     if (resBycrypt) {
  //       return res
  //         .status(200)
  //         .json({
  //           'userId': userFound.id,
  //           'token': token.generateAccessToken(userFound),
  //           'refreshToken': token.generateRefreshToken(userFound)
  //         });
  //     } else {
  //       return res
  //         .status(400)
  //         .json({ 'error': 'Please verify provided credentials.' });
  //     }
  //   };

  //   bcrypt.compare(password, userFound.password, verificationAuthBcrypt);
  // }
};

export default controller;