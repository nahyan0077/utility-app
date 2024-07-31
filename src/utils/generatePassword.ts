export const generatePassword = (
  passwordLength: number,
  includeUppercase: boolean,
  includeLowercase: boolean,
  includeSymbols: boolean,
  includeNumbers: boolean
) => {
  const lowercaseChars = "abcdefghijklmnopqrstuvwxyz";
  const uppercaseChars = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
  const numberChars = "012345679";
  const symbolChars = "!@#$%^&*()_+-=";

  let allowedChars = "";
  let password = "";

  allowedChars += includeUppercase ? uppercaseChars : "";
  allowedChars += includeLowercase ? lowercaseChars : "";
  allowedChars += includeSymbols ? symbolChars : "";
  allowedChars += includeNumbers ? numberChars : "";

    for(let i = 0; i < passwordLength; i++){
        let randomIndex = Math.floor(Math.random() * allowedChars.length)
        password += allowedChars[randomIndex]
    }

    return password

};
