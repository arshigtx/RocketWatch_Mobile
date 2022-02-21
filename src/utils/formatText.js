const shortenLongText = (title, maxLength, shortenedLength) => {
  return title.length > maxLength ? title.slice(0, shortenedLength ? shortenedLength : maxLength).concat('...') : title
}

export { shortenLongText };