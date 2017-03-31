export function set({ key, value, persist }) {
  const val = JSON.stringify(value);
  this.remove(key);

  if (persist) {
    localStorage.setItem(key, val);
  } else {
    sessionStorage.setItem(key, val);
  }
}

export function update({ key, value }) {
  const val = JSON.stringify(value);

  if (localStorage.getItem(key)) {
    localStorage.setItem(key, val);
  }
  if (sessionStorage.getItem(key)) {
    sessionStorage.setItem(key, val);
  }
}

export function get(key) {
  const value = localStorage.getItem(key) &&
    localStorage.getItem(key) !== "null"
    ? localStorage.getItem(key)
    : sessionStorage.getItem(key);
  return JSON.parse(value);
}

export function remove(key) {
  localStorage.removeItem(key);
  sessionStorage.removeItem(key);
}
