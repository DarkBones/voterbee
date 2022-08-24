import { get } from 'lodash'

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

const formatCurrency = (strAmount, currencyCode, reverse = false) => {
  const currency = currencies[currencyCode]
  const subunits = get(currency, 'subunits', 100)
  const decimals = Math.log(subunits) / Math.log(10)
  let amount = parseFloat(strAmount).toFixed(decimals)

  if (!reverse) amount *= subunits

  return {
    cents: parseInt(amount, 10),
    humanReadable: (amount / subunits).toFixed(decimals),
  }
}

export { currencies }
export default formatCurrency
