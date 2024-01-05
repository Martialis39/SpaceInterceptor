import { LS } from "./constants";

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

export const persistLevel = (key: string) => {
  if(localStorage){
    localStorage.setItem(LS.LEVEL_DATA, key);
  }
}

export const getPersistedLevel = () => {
  if(localStorage){
   return localStorage.getItem(LS.LEVEL_DATA);
  }
  return null
}