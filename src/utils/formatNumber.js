const percentStringToNum = (string) => {
  return parseFloat(string.slice(0,-1))
}

const formatPrice = (number) => {
  const numZeros = parseInt(Math.log10(number));
  if (numZeros < 2 ) {
    return `$${number.toFixed(-numZeros + 4)}`;
  } else {
    if (numZeros > 3) {
      const numCommas = parseInt(parseInt(Math.log10(number))/3)
      let newNum = parseInt(number).toString();
      let decimalNum = number.toFixed(2).toString().slice(number.toString().indexOf('.'));
      for (i=1;i<=numCommas;i++) {
        newNum = newNum.slice(0,(-i*3)-i+1) + ',' + newNum.slice((-i*3)-i+1)
      }
      return `$${newNum}${decimalNum}`    
    } else {
      return `$${number.toFixed(2)}`;
    }
  }
}

const formatPercent = (percentage) => {
  const newPercent = Math.abs(percentage).toFixed(2);
  const directionSign = percentage > 0 ? '+' : '-';
  return `${directionSign}${newPercent}%`;
}

export { percentStringToNum, formatPrice, formatPercent };

