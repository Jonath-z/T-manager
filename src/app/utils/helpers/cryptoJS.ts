import CryptoJS from 'crypto-js';
import keys from '../configs';

export const crypt = (value: string) => {
  return CryptoJS.AES.encrypt(
    value,
    keys.CRYPTO_SECRET_KEY as string,
  ).toString();
};

export const decrypt = (value: string) => {
  return CryptoJS.AES.decrypt(
    value.replace('"', ''),
    keys.CRYPTO_SECRET_KEY as string,
  ).toString(CryptoJS.enc.Utf8);
};
