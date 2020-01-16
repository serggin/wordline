function readFile(path) {
  return fetch(path).then(response => response.text());
}

export { readFile };
