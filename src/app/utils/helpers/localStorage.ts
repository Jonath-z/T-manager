export const localStorageGet = (key: string): string | null => {
  return localStorage.getItem(key);
};

export const localStorageSet = (
  key: string,
  value: unknown,
): unknown => {
  const stringValue = JSON.stringify(value);
  return localStorage.setItem(key, stringValue);
};
