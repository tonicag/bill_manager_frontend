export const isValidEmail = (email: string) => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (emailRegex.test(email)) {
    return "";
  } else {
    return "The email must be in the form example@example.com!";
  }
};
export const isValidPassword = (password: string) => {
  // Regular expression for a strong password
  const passwordRegex =
    /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
  if (passwordRegex.test(password)) {
    return "";
  } else {
    return "The password must contain at least one uppercase letter (A-Z), one lowercase letter (a-z), one digit (0-9), and one special character (e.g., !, @, #, $, %, ^, &).";
  }
};
