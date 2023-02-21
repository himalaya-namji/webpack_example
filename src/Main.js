export function message(msg) {
  const elem = document.createElement("div");
  elem.innerHTML = msg;
  document.body.append(elem);
}
