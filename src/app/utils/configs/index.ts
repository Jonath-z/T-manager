type KeyType = {
  CRYPTO_SECRET_KEY: string | undefined;
};

const keys: KeyType = {
  CRYPTO_SECRET_KEY: process.env.REACT_APP_CRYPTO_SECRET_KEY,
};

export default keys;
