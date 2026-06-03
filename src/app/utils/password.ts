export const STRONG_PASSWORD_REGEX =
  /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&#^()[\]{}_\-+=~`|\\:;"'<>,./]).{8,}$/;

export const PASSWORD_VALIDATION_MESSAGE =
  "Password must be at least 8 characters and include uppercase, lowercase, a number, and a special character.";

export const validatePassword = (
  password: string,
): { valid: boolean; message: string } => {
  if (!password || typeof password !== "string") {
    return { valid: false, message: "Password is required" };
  }

  if (!STRONG_PASSWORD_REGEX.test(password)) {
    return { valid: false, message: PASSWORD_VALIDATION_MESSAGE };
  }

  return { valid: true, message: "" };
};
