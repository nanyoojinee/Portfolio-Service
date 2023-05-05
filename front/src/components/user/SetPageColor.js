export const setPageColor = (color) => {
  if (color) {
    return (document.body.style.backgroundColor = color,
            document.body.style.backgroundImage = null);
  } else if (window.location.pathname === '/network') {
    return (
      document.body.style.backgroundColor = "#f5f5f5"
     
       );
  } else {
    return (
      document.body.style.backgroundImage = "url(https://images-ext-1.discordapp.net/external/liYmF2yaVMEc8CPPspoH5RtaIVE0RELosbN1EUTtsuE/https/i.pinimg.com/originals/16/64/e8/1664e8bf44b7e8d52db4b24ca0bc401a.png?width=1654&height=930)",
      document.body.style.backgroundSize = "cover"
   );
  }
};
