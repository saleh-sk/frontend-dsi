export const sanitizeInput = (value) => {
  console.log(value);
  return value.replace(/[^a-zA-Z0-9@._!#$%^&*()-]/g, "");
};

export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]{6,}@gmail\.com$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
  console.log(password)
    const passwordPattern = /^(?=.*[A-Z])[A-Za-z0-9!@#$%^&*?]{8,}$/;
  
  return passwordPattern.test(password);
};