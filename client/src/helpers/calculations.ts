export const makeZero = number => (isNaN(number) ? 0 : number);

export const roundedNumber = number => Math.round(number * 100) / 100;

export const calculateSubTotal = products =>
  products
    .filter(item => item.reference !== '')
    .reduce(
      (accum, curr) =>
        accum +
        curr.price * makeZero(curr.quantity) * (1 - makeZero(curr.discount)),
      0,
    );

export const calculateIva = (settings, subTotal) =>
  settings ? subTotal * settings.value : 0;
export const calculateRe = (settings, subTotal) =>
  settings ? subTotal * settings.value : 0;
export const calculateTransport = settings => settings.transportPrice || 0;
