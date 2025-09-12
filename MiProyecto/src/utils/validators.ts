export const isEmailValid = (email: string) =>
  /\S+@\S+\.\S+/.test(email);

export const isPhoneValid = (phone: string) =>
  /^[0-9]{8,15}$/.test(phone);
