export const MAIN_COLUMNS = [
  { name: 'CUSIP', value: 'cusip', hide: false },
  { name: 'Face Amount', value: 'originalFace', hide: false },
  { name: 'Remaining Face', value: 'remainingFace', hide: false },
  { name: 'Market Price', value: 'marketPrice', hide: false },
  { name: 'Book Price', value: 'bookPrice', hide: false },
];

export const OPTIONAL_COLUMNS = [
  { name: 'Book Value', value: 'bookValue', hide: true },
  { name: 'Maturity Date', value: 'maturityDate', hide: true },
  { name: 'Coupon Rate', value: 'couponRate', hide: true },
  { name: 'Par Value', value: 'parValue', hide: true },
  { name: 'Market Value', value: 'marketValue', hide: true },
  { name: 'Ave Life', value: 'aveLife', hide: true },
  { name: 'Effective Duration', value: 'effectiveDuration', hide: true },
  { name: 'Next Call Date And Call Price', value: 'nextCallDateAndCallPrice', hide: true },
  { name: 'Settlement Dates', value: 'settlementDate', hide: true },
  { name: 'CUSIP Description', value: 'cusipDescription', hide: true },
];
