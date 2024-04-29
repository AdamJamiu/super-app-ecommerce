export function updateQueryParam(paramName, paramValue) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.set(paramName, paramValue);
  const newSearch = searchParams.toString();
  const newUrl = `${window.location.pathname}?${newSearch}${window.location.hash}`;
  window.history.replaceState({ path: newUrl }, "", newUrl);
}

export function removeQueryParam(paramName) {
  const searchParams = new URLSearchParams(window.location.search);
  searchParams.delete(paramName);
  const newSearch = searchParams.toString();
  const newUrl = `${window.location.pathname}${
    newSearch ? `?${newSearch}` : ""
  }${window.location.hash}`;
  window.history.replaceState({ path: newUrl }, "", newUrl);
}
