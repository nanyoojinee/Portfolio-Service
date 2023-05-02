export const setPageColor = (color) => {
  if (color) {
    return (document.body.style.backgroundColor = color);
  } else {
    return (document.body.style.backgroundColor = "white");
  }
};
