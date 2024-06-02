import { atom } from "recoil";
const backendUrl = import.meta.env.VITE_REACT_APP_BACKEND_URL;

export const userState = atom({
  key: "userState",
  default: JSON.parse(localStorage.getItem("user")) || null,
});

export const apiUrl = atom({
  key: "apiUrl",
  default: backendUrl,
});
