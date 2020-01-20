module.exports = {
  printHexDump
};

function isPrintable(keycode) {
  var valid =
    (keycode > 47 && keycode < 58) || // number keys
    keycode == 32 || // spacebar & return key(s) (if you want to allow carriage returns)
    (keycode > 64 && keycode < 91) || // letter keys
    (keycode > 95 && keycode < 112) || // numpad keys
    (keycode > 185 && keycode < 193) || // ;=,-./` (in order)
    (keycode > 218 && keycode < 223); // [\]' (in order)
  return valid;
}

function printHexDump(buffer) {
  const dataView = new DataView(buffer, 0);
  console.log("buffer length", buffer.byteLength);
  let result = "";
  let line = "";
  for (let i = 0; i < buffer.byteLength; i++) {
    if (i % 16 === 0) {
      line = "";
      const address = "0x" + new String(i).padStart(8, 0) + ":";
      result += address;
    }
    const n = dataView.getUint8(i);
    result += n.toString(16).padStart(2, 0) + " ";
    let c = ".";
    if (isPrintable(n)) {
      c = String.fromCharCode(n);
    }
    line += c;
    if (i % 16 === 7) {
      result += " ";
    }
    if (i === buffer.byteLength - 1) {
        const spaces = "   ";
        for (let j = 0; j < 15 - (i % 16); j++) {
            result += spaces;
        }
    }
    if (i % 16 === 15 || i === buffer.byteLength - 1) {
      result += ": " + line + "\n";
      continue;
    }
  }
  return result;

  // DWORD i, count, index;
  // CHAR rgbDigits[] = "0123456789abcdef";
  // CHAR rgbLine[100];
  // char cbLine;
  // for (index = 0; length;
  // 	length -= count, buffer += count, index += count)
  // {
  // 	count = (length > 16) ? 16 : length;
  // 	sprintf_s(rgbLine, 100, "%4.4x  ", index);
  // 	cbLine = 6;
  // 	for (i = 0;i < count;i++)
  // 	{
  // 		rgbLine[cbLine++] = rgbDigits[buffer[i] >> 4];
  // 		rgbLine[cbLine++] = rgbDigits[buffer[i] & 0x0f];
  // 		if (i == 7)
  // 		{
  // 			rgbLine[cbLine++] = ':';
  // 		}
  // 		else
  // 		{
  // 			rgbLine[cbLine++] = ' ';
  // 		}
  // 	}
  // 	for (; i < 16; i++)
  // 	{
  // 		rgbLine[cbLine++] = ' ';
  // 		rgbLine[cbLine++] = ' ';
  // 		rgbLine[cbLine++] = ' ';
  // 	}
  // 	rgbLine[cbLine++] = ' ';
  // 	for (i = 0; i < count; i++)
  // 	{
  // 		if (buffer[i] < 32 || buffer[i] > 126)
  // 		{
  // 			rgbLine[cbLine++] = '.';
  // 		}
  // 		else
  // 		{
  // 			rgbLine[cbLine++] = buffer[i];
  // 		}
  // 	}
  // 	rgbLine[cbLine++] = 0;
  // 	printf("%s\n", rgbLine);
  // }
}
