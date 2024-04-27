import { authCaller, signUpHttpClient } from "../interceptors";

export const LoginUser = async ({ userName, password }) => {
  const res = await authCaller.post("Authentication/Login", {
    userName,
    password,
  });
  return res.data;
};

export const GeneratePasswordResetToken = async ({ email }) => {
  const res = await authCaller.post(
    `Authentication/GeneratePasswordResetToken/${email}`
  );
  return res.data;
};

export const ResetPasswordToken = async ({
  email,
  oldPassword,
  newPassword,
}) => {
  const res = await authCaller.post(`Authentication/ChangePassword`, {
    email,
    oldPassword,
    newPassword,
  });
  return res.data;
};

export const RegisterUser = async ({
  FirstName,
  LastName,
  PhoneNumber,
  UserName,
  Email,
  Street,
  CompanyName,
  AddressLine,
  State,
  City,
  CAC_File,
  Utility_File,
  Password,
}) => {
  const res = await signUpHttpClient.post("Authentication/RegisterUser", {
    FirstName,
    LastName,
    PhoneNumber,
    UserName,
    Email,
    Street,
    CompanyName,
    AddressLine,
    State,
    City,
    CAC_File,
    Utility_File,
    Password,
  });
  return res.data;
};
