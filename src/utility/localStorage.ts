export const setInLocalStorage = (key, message) => {
  console.log("KEy here is ", key);
  const current = localStorage.getItem(key);
  if (current) {
    const parsed = JSON.parse(current);
    localStorage.setItem(key, JSON.stringify(parsed.concat(message)));
  } else {
    localStorage.setItem(key, JSON.stringify([message]));
  }
};
