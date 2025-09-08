export const sanitizeInput = (value) => {
  console.log(value);
  return value.replace(/[^a-zA-Z0-9 @._!#$%^&*()-]/g, "");
};

export const validateEmail = (email) => {
  const emailPattern = /^[a-zA-Z0-9._%+-]{6,}@gmail\.com$/;
  return emailPattern.test(email);
};

export const validatePassword = (password) => {
    const passwordPattern = /^(?=.*[A-Z])[A-Za-z0-9!@#$%^&*?]{8,}$/;
  return passwordPattern.test(password);
};

export const numericValidator = (prop)=>{
    const numericPattern = /^[0-9]+$/;
  return numericPattern.test(prop);
}

export const nameValidator = (name)=>{
    const namePattern = /^[A-Za-z ]{9,}$/;
  return namePattern.test(name);
}

export const generalStringValidator = (string)=>{
    const stringPattern = /^[A-Za-z ]{4,}$/;
  return stringPattern.test(string);
}