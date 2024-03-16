const Joi = require('joi');
const { password } = require('./custom.validation');

const register = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required().custom(password),
    name: Joi.string().required(),
  }),
};
// Sansthan register
const sansthanRegister = {
  body: Joi.object().keys({
    userID: Joi.string().required(),
    password: Joi.string().required().custom(password),
    sansthanName: Joi.string().required(),
    state: Joi.string().required(),
    registrationDist: Joi.string().required(),
    mobNumber: Joi.number().required(),
    otp: Joi.number().required(),
  }),
};
// Sansthan login
const sansthanLogin = {
  body: Joi.object().keys({
    userID: Joi.string().required(),
    password: Joi.string().required(),
  }),
};
const checkUserIdExist = {
  body: Joi.object().keys({
    userID: Joi.string(),
  }),
};
const verifyMobNumber = {
  body: Joi.object().keys({
    mobNumber: Joi.string().required(),
  }),
};

const login = {
  body: Joi.object().keys({
    username: Joi.string().required(),
    password: Joi.string().required(),
  }),
};

const logout = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const refreshTokens = {
  body: Joi.object().keys({
    refreshToken: Joi.string().required(),
  }),
};

const forgotPassword = {
  body: Joi.object().keys({
    username: Joi.string().required(),
  }),
};

const resetPassword = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
  body: Joi.object().keys({
    password: Joi.string().required().custom(password),
  }),
};

const verifyEmail = {
  query: Joi.object().keys({
    token: Joi.string().required(),
  }),
};

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  verifyEmail,
  sansthanRegister,
  sansthanLogin,
  checkUserIdExist,
  verifyMobNumber,
};
