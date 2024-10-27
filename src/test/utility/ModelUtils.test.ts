import { calculateCRC, checkCRC, decimalToHex, formatDoubleDigit, getDataFromFrame, hexStringToBinary, uint16ArrayToBinary } from "src/utility/modelUtils";

describe("ModelUtils", () => {
    const validFrame = new Uint16Array([
        0x01, 0x03, 0x10, 0x00, 0x08, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0x00, 0xe9, 0x9c,
      ]);

      const invalidFrame = new Uint16Array([
        0x01, 0x03, 0x10, 0x00, 0x08, 0x00, 0x03, 0x00, 0x00, 0x00, 0x00, 0x00,
        0x00, 0x00, 0x00, 0x00, 0x0F, 0x00, 0x00, 0xe9, 0x9c,
      ]);

    test("checkCRC() returns true if valid frame is provided", () => {
        const result = checkCRC(validFrame)
        expect(result).toBeTruthy()
    })

    test("checkCRC() returns false if invalid frame is provided", () => {
        const result = checkCRC(invalidFrame)
        expect(result).toBeFalsy()
    })

    test("calculateCRC() should return 0 if valid frame is provided", () => {
        const result = calculateCRC(validFrame)
        expect(result).toBe(0)
    })

    test("formatDoubleDigit() should return a two-digit value", () => {
        const oneDigit = formatDoubleDigit(0);
        const twoDigit = formatDoubleDigit(12);
    
        expect(oneDigit).toHaveLength(2);
        expect(twoDigit).toHaveLength(2);
      });
    
      test("formatDoubleDigit() should return a 0 as first character if one digit is provided and the provided one as second", () => {
        const oneDigit = formatDoubleDigit(2);
        const firstChar = oneDigit.charAt(0);
        const secondChar = oneDigit.charAt(1);
    
        expect(firstChar).toEqual("0");
        expect(secondChar).toEqual("2");
      });

    test("calculateCRC() should not return 0 if invalid frame is provided", () => {
        const result = calculateCRC(invalidFrame)
        expect(result).not.toBe(0)
    })

    test("getDataFromFrame() should return an empty array if an undefined argument is provided", () => {
        const data = getDataFromFrame(undefined)
        expect(data).toHaveLength(0)
    })

    test("getDataFromFrame() should return the same number of bytes as indicated in the third position of the given array", () => {
        const data = getDataFromFrame(validFrame)
        expect(data).toHaveLength(validFrame[2])
    })

    test("getDataFromFrame() should return the exact bytes as the frame payload", () => {
        const data = getDataFromFrame(validFrame)
        for(let i = 0; i < data.length; i++){
            expect(data[i]).toEqual(validFrame[3+i])
        }
    })

    test("hexStringToBinary() should convert a hexadecimal string with no spaces to a binary string", () => {
        const givenHexadecimalString = "F0AA"
        const binaryString = hexStringToBinary(givenHexadecimalString)
        expect(binaryString).toEqual("1111000010101010")
    })

    test("hexStringToBinary() should not convert a hexadecimal string with spaces to a binary string", () => {
        const givenHexadecimalString = "F0 AA"
        const binaryString = hexStringToBinary(givenHexadecimalString)
        expect(binaryString).not.toEqual("1111000010101010")
    })

    test("decimalToHex() should convert a decimal value to a hex value with padding if necessary", () => {
        const firstGivenDecimal = 151
        const secondGivenDecimal = 1
        
        const hexStringWithNoPadding = decimalToHex(firstGivenDecimal)
        const hexStringWithPadding = decimalToHex(secondGivenDecimal)

        expect(hexStringWithNoPadding).toBe("97")
        expect(hexStringWithPadding).toBe("01")
    })

    test("uint16ArrayToBinary() should return an empty string if an empty array is provided", () => {
        const binaryFrame = uint16ArrayToBinary(new Uint16Array())
        expect(binaryFrame).toHaveLength(0)
    })

    test("uint16ArrayToBinary() should convert a Uint16Array to a binary string", () => {
        const binaryFrame = uint16ArrayToBinary(validFrame)
        expect(binaryFrame).toEqual("000000010000001100010000000000000000100000000000000000110000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000000001110100110011100")
    })
})