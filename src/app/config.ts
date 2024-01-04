const apiUrl = process.env.REACT_APP_API_URL;

if (!apiUrl) {
  throw new Error("Could not load API url");
}
export const API_URL = apiUrl;
