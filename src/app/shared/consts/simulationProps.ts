export const MAIN_COLUMNS = [
  { name: 'CUSIP', value: 'CUSIP', hide: false },
  { name: 'Face Amount', value: 'OriginalFace', hide: false },
  { name: 'Market Price', value: 'MarketPrice', hide: false },
  { name: 'Book Price', value: 'BookPrice', hide: false },
];

export const OPTIONAL_COLUMNS = [
  { name: 'Settlement Dates', value: 'SettlementDates', hide: true },
  { name: 'CUSIP Description', value: 'CUSIPDescription', hide: true },
  { name: 'Book Value', value: 'BookValue', hide: true },
  { name: 'Maturity Date', value: 'MaturityDate', hide: true },
  { name: 'Coupon Rate', value: 'CouponRate', hide: true },
  { name: 'Par Value', value: 'ParValue', hide: true },
  { name: 'Market Value', value: 'MarketValue', hide: true },
  { name: 'Ave Life', value: 'AveLife', hide: true },
  { name: 'Effective Duration', value: 'EffectiveDuration', hide: true },
  { name: 'Next Call Date', value: 'CallDate', hide: true },
  { name: 'Call Price', value: 'CallPrice', hide: true },
];
