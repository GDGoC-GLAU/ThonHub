// Token utilities for managing authentication state in the browser.
// Notes for maintainers:
// - Access tokens are stored in localStorage under a stable key.
// - Consider migrating refresh tokens to httpOnly cookies server-side for stronger security.

const ACCESS_TOKEN_KEY = "thonhub.accessToken";
const REFRESH_TOKEN_KEY = "thonhub.refreshToken";

export function getAccessToken() {
  return window.localStorage.getItem(ACCESS_TOKEN_KEY) || null;
}

export function setAccessToken(token) {
  if (typeof token !== "string" || token.length === 0) {
    window.localStorage.removeItem(ACCESS_TOKEN_KEY);
    return;
  }
  window.localStorage.setItem(ACCESS_TOKEN_KEY, token);
}

export function getRefreshToken() {
  return window.localStorage.getItem(REFRESH_TOKEN_KEY) || null;
}

export function setRefreshToken(token) {
  if (typeof token !== "string" || token.length === 0) {
    window.localStorage.removeItem(REFRESH_TOKEN_KEY);
    return;
  }
  window.localStorage.setItem(REFRESH_TOKEN_KEY, token);
}

export function clearTokens() {
  window.localStorage.removeItem(ACCESS_TOKEN_KEY);
  window.localStorage.removeItem(REFRESH_TOKEN_KEY);
}

export function isAuthenticated() {
  return Boolean(getAccessToken());
}

export function getAuthHeader() {
  const token = getAccessToken();
  return token ? { Authorization: `Bearer ${token}` } : {};
}

export default {
  getAccessToken,
  setAccessToken,
  getRefreshToken,
  setRefreshToken,
  clearTokens,
  isAuthenticated,
  getAuthHeader
};


