export const setPageColor = (color) => {
  if (color) {
    return (document.body.style.backgroundColor = color,
            document.body.style.backgroundImage = null);
  } else if (window.location.pathname === '/network') {
    return (
      document.body.style.backgroundColor = "white"
   );
  } else {
    return (
      document.body.style.backgroundImage = "url(https://img.freepik.com/free-vector/hand-painted-watercolor-pastel-sky-background_23-2148902028.jpg?w=1380&t=st=1683120202~exp=1683120802~hmac=6eb4c7d2555d0570021751481f6cc7a5cdcc3cc9d95add25b3de917fc9359d54)",
      document.body.style.backgroundSize = "cover"
   );
  }
};
