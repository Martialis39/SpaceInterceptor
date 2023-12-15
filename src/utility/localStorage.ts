export const setInLocalStorage = (key, message) => {
  const current = localStorage.getItem(key);
  if (current) {
    const parsed = JSON.parse(current);
    console.log("New value is ", parsed);
    localStorage.setItem(key, JSON.stringify(parsed.concat(message)));
  } else {
    localStorage.setItem(key, JSON.stringify([message]));
  }
};
