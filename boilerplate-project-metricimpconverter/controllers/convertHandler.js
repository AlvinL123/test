function checkNumString(input) {
  // cek apakah input angkanya sudah benar, jika tidak akan return angka 1.
  let number = input.match(/[.\d\/]+/g) || ["1"];
  // cek apakah input string-nya sudah benar.
  let string = input.match(/[a-zA-Z]+/g)[0];

  return [number[0], string];
}

function checkDiv(possibleFraction) {
  let nums = possibleFraction.split("/");
  if (nums.length > 2) {
    return false;
  }
  return nums;
}

function ConvertHandler() {
  
  this.getNum = function(input) {
    let result = checkNumString(input)[0];
    let nums = checkDiv(result);

    if (!nums) {
      return undefined;
    };

    let num0 = nums[0];
    let num1 = nums[1] || "1";
    // cek apakah angka
    if (isNaN(num0) || isNaN(num1)) {
      return undefined;
    };

    result = parseFloat(num0) / parseFloat(num1);
    
    return result;
  };
  
  this.getUnit = function(input) {
    let result = checkNumString(input)[1];
    switch (result) {
      case "km":
        return "km";
      case "gal":
        return "gal";
      case "lbs":
        return "lbs";
      case "mi":
        return "mi";
      case "l":
        return "L";
      case "kg":
        return "kg";
      default:
        return undefined;
    }
  };
  
  this.getReturnUnit = function(initUnit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "mi";
      case "gal":
        return "L";
      case "lbs":
        return "kg";
      case "mi":
        return "km";
      case "l":
        return "gal";
      case "kg":
        return "lbs";
      default:
        return undefined;
    }
  };

  this.spellOutUnit = function(unit) {
    let unit = initUnit.toLowerCase();

    switch (unit) {
      case "km":
        return "kilometers";
      case "gal":
        return "gallons";
      case "lbs":
        return "pounds";
      case "mi":
        return "miles";
      case "l":
        return "liters";
      case "kg":
        return "kilograms";
      default:
        return "don't know";
    }
  };
  
  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let unit = initUnit.toLowerCase();
    let result;

    switch (unit) {
      case "km":
        result = initNum / miToKm;
        break;
      case "gal":
        result = initNum * galToL;
        break;
      case "lbs":
        result = initNum * lbsToKg;
        break;
      case "mi":
        result = initNum * miToKm;
        break;
      case "l":
        result = initNum / galToL;
        break;
      case "kg":
        result = initNum / lbsToKg;
        break;
      default:
        result = undefined;
    }
    // dibulatkan hingga 5 desimal
    return parseFloat(result.toFixed(5));
  };
  
  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    return `${initNum} ${this.spellOutUnit(initUnit)} converts to ${returnNum} ${this.spellOutUnit(returnUnit)}`;
  };
  
}

module.exports = ConvertHandler;
