module.exports = function toReadable(number) {
  const NUM = {
    0: 'zero',
    1: 'one',
    2: 'two',
    3: 'three',
    4: 'four',
    5: 'five',
    6: 'six',
    7: 'seven',
    8: 'eight',
    9: 'nine',
    10: 'ten',
    11: 'eleven',
    12: 'twelve',
    13: 'thirteen',
    14: 'fourteen',
    15: 'fifteen',
    16: 'sixteen',
    17: 'seventeen',
    18: 'eighteen',
    19: 'nineteen',
    20: 'twenty',
    30: 'thirty',
    40: 'forty',
    50: 'fifty',
    60: 'sixty',
    70: 'seventy',
    80: 'eighty',
    90: 'ninety',
  };

  const DIGITS = {
    0: 'hundred',
    1: 'thousand',
    2: 'million',
    3: 'billion',
  };

  const decade = (number) => {
    if (number <= 20) {
      return NUM[number];
    } else if (number / 100 < 1) {
      return (number % 10)
        ? `${NUM[Math.floor(number / 10) * 10]} ${NUM[number % 10]}`
        : NUM[Math.floor(number / 10) * 10];
    }
  };

  const hundred = (number) => {
    const value = Math.floor(number / 100);
    return (number % 100)
      ? `${NUM[value]} ${DIGITS[0]} ${decade(number % 100)}`
      : `${NUM[value]} ${DIGITS[0]}`;
  };

  const bigDig = (number, digit) => {
    const value = Math.floor(number / 1000 ** Number(digit));
    return value <= 99
      ? `${decade(value)} ${DIGITS[digit]}`
      : `${hundred(value)} ${DIGITS[digit]}`;
  };

  if (number <= 99) {
    return decade(number);
  } else if (number <= 999) {
    return hundred(number);
  } else if (number <= 999999) {
    const digit = 1;
    return `${bigDig(number, digit)} ${hundred(number % (1000 ** Number(digit)))}`;
  } else if (number <= 999999999) {
    const digit = 2;
    return `${bigDig(number, digit)} ${bigDig(number % (1000 ** Number(digit)), digit - 1)} ${hundred(number % 1000)}`;
  } else if (number <= 999999999999) {
    const digit = 3;
    return `${bigDig(number, digit)} ${bigDig(number % (1000 ** Number(digit)), digit - 1)} ${bigDig(number % (1000 ** Number(digit - 1)), digit - 2)} ${hundred(number % 1000)}`;
  }
}
