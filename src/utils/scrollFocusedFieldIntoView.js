export function scrollFocusedFieldIntoView(event) {
  const input = event.target;

  if (!(input instanceof Element) || !input.matches("input, textarea")) {
    return;
  }

  setTimeout(() => {
    input.scrollIntoView({
      behavior: "smooth",
      block: "center",
    });
  }, 350);
}
