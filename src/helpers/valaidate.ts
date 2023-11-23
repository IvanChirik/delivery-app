export const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]{3,}\.[^\s@]{2,}/;
    return emailRegex.test(email);
};
export const validatePassword = (password: string) => {
    const passwordRegex = /^(?=.*[A-Z])(?=.*[!@#$%^&*])(.{10,})$/;
    return passwordRegex.test(password);
};
export const validateName = (name: string) => {
    return name;
};