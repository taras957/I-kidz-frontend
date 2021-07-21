const localStorageKey = "__auth_provider_token__";

export async function getToken() {
  return window.localStorage.getItem(localStorageKey);
}
