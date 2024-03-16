const httpStatus = require('http-status');
const catchAsync = require('../utils/catchAsync');
// const { userTypes } = require('../config/tokens');
const { authService, userService, tokenService, emailService } = require('../services');

const register = catchAsync(async (req, res) => {
  const user = await userService.createUser(req.body);
  const tokens = await tokenService.generateAuthTokens(user);
  res.status(httpStatus.CREATED).send({ user, tokens });
});

// // Sansthan register
// const sansthanRegister = catchAsync(async (req, res) => {
//   const sansthan = await sansthanService.createSansthan(req.body);
//   res.status(httpStatus.CREATED).send({ sansthan });
// });

// // TO check userId exist in sansthan
// const checkUserIdExist = catchAsync(async (req, res) => {
//   await sansthanService.checkUserIdExist(req.body.userID);
//   res.send('UserID not exist');
// });
// // Verify  phone number
// const verifyNumber = catchAsync(async (req, res) => {
//   const otp = await otpService.generateOTP();
//   await otpService.sendSMSToVerifyNo(req.body.mobNumber, otp);
//   res.status(httpStatus.CREATED).send();
// });

const login = catchAsync(async (req, res) => {
  const { username, password } = req.body;
  const user = await authService.loginUserWithEmailAndPassword(username, password);
  const tokens = await tokenService.generateAuthTokens(user);
  res.send({ user, tokens });
});
// // Login for Sansthans
// const loginSansthan = catchAsync(async (req, res) => {
//   const { userID, password } = req.body;
//   const sansthan = await authService.loginSansthanWithUserIDAndPassword(userID, password);
//   const tokens = await tokenService.generateAuthTokens(sansthan, userTypes.SANSTHAN);
//   res.send({ sansthan, tokens });
// });

const logout = catchAsync(async (req, res) => {
  await authService.logout(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const refreshTokens = catchAsync(async (req, res) => {
  const tokens = await authService.refreshAuth(req.body.refreshToken);
  res.send({ ...tokens });
});

const forgotPassword = catchAsync(async (req, res) => {
  const resetPasswordToken = await tokenService.generateResetPasswordToken(req.body.username);
  await emailService.sendResetPasswordEmail(req.body.username, resetPasswordToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const resetPassword = catchAsync(async (req, res) => {
  await authService.resetPassword(req.query.token, req.body.password);
  res.status(httpStatus.NO_CONTENT).send();
});

const sendVerificationEmail = catchAsync(async (req, res) => {
  const verifyEmailToken = await tokenService.generateVerifyEmailToken(req.user);
  await emailService.sendVerificationEmail(req.user.email, verifyEmailToken);
  res.status(httpStatus.NO_CONTENT).send();
});

const verifyEmail = catchAsync(async (req, res) => {
  await authService.verifyEmail(req.query.token);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  register,
  login,
  logout,
  refreshTokens,
  forgotPassword,
  resetPassword,
  sendVerificationEmail,
  verifyEmail,
  // sansthanRegister,
  // checkUserIdExist,
  // verifyNumber,
  // loginSansthan,
};
