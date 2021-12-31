const shortenLongText = (title, maxLength) => {
  return title.length > maxLength ? title.slice(0, maxLength).concat('...') : title
}

export { shortenLongText };