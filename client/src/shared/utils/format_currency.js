const currencies = {
  CAD: {
    symbol: '$',
    subunits: 100,
  },
  USD: {
    symbol: '$',
    subunits: 100,
  },
  EUR: {
    symbol: '€',
    subunits: 100,
  },
  JPY: {
    symbol: '¥',
    subunits: 1,
  },
}

const formatCurrency = (strAmount, currencyCode) => {
  const currency = currencies[currencyCode]
  const decimals = Math.log(currency.subunits) / Math.log(10)
  let amount = parseFloat(strAmount).toFixed(decimals)
  amount *= currency.subunits

  return {
    cents: parseInt(amount, 10),
    humanReadable: (amount / currency.subunits).toFixed(decimals),
  }
}

export { currencies }
export default formatCurrency
