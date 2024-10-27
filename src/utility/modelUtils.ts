export const checkCRC = (frame: Uint16Array) => {
  // ** frame[2] = payload dimension
  // ** + 3 : first three bytes are included in CRC calculation
  let data = new Uint16Array(frame[2] + 3);
  for (let i = 0; i < frame[2] + 3; i++) {
    data[i] = frame[i];
  }
  // ** Decimal representation of calculated CRC
  const calculatedCRC = calculateCRC(data);
  // ** Hexadecimal representation of calculated CRC with inverted bytes
  const hexCRC = parseInt(calculatedCRC.toString(), 10).toString(16);
  // ** Therefore, first byte are the last two characters
  const firstCalculatedByte = Number(parseInt(hexCRC.substring(2), 16));
  // ** And the second one are the first two
  const secondCalculatedByte = Number(parseInt(hexCRC.substring(0, 2), 16));
  // ** We create the array
  const byteArrayCalculatedCRC = new Uint16Array([
    firstCalculatedByte,
    secondCalculatedByte,
  ]);
  // ** The actual CRC is stored in the last two bytes of the frame
  const realCRC = frame.slice(-2);
  // ** We check if numbers match
  return (
    byteArrayCalculatedCRC[0] === realCRC[0] &&
    byteArrayCalculatedCRC[1] === realCRC[1]
  );
};

export const calculateCRC = (data: Uint16Array) => {
  let crc = 0xffff;
  let poly = 0xa001;
  for (let byte of data) {
    crc = crc ^ byte;
    for (let n = 0; n <= 7; n++) {
      const carry = crc & 0x1;
      crc = crc >> 1;
      if (carry === 0x1) crc = crc ^ poly;
    }
  }
  return crc;
};

export const formatDoubleDigit = (value: number) => {
  if (value.toString().length === 1) return `0${value}`;
  return value.toString();
};

export const getDataFromFrame = (frame: Uint16Array | undefined) => {
  if(!frame || frame.length < 3) return new Uint16Array()  
  
  let data = new Uint16Array(frame[2]);
  for (let i = 0; i < frame[2]; i++) data[i] = frame[3 + i];
  return data;
};

// ** Needs string of data hex bytes with no spaces
export const hexStringToBinary = (frame: string) => {
  return frame
    .split("")
    .map((i) => parseInt(i, 16).toString(2).padStart(4, "0"))
    .join("");
};

export const decimalToHex = (d: number, padding: any = null) => {
  var hex = Number(d).toString(16);
  padding =
    typeof padding === "undefined" || padding === null
      ? (padding = 2)
      : padding;

  while (hex.length < padding) {
    hex = "0" + hex;
  }

  return hex;
};

export const uint16ArrayToBinary = (data: Uint16Array) => {
  let dataAsString = "";
  for (let byte of data) dataAsString = dataAsString + decimalToHex(byte);

  return hexStringToBinary(dataAsString);
};

export const stringToUint16Array = (data: string) => {
  const splitData = data.match(/.{2}/g) || []
  let arr = new Uint16Array(splitData.length)
  for(let i = 0; i < splitData.length; i++){
    arr[i] = parseInt(splitData[i], 16)
  }
  return arr
}
