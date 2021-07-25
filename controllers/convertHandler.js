let inputRegex = /[a-z]+|[^a-z]+/gi;
let numberRegex = /\d/;

function ConvertHandler() {
  this.getNum = function(input) {
    let result;

    const separatedInput = input.match(inputRegex);

    if (separatedInput.length === 1) {
      result = 1;
    } else {
      result = separatedInput[0];

      if (result.match(/[a-z]+|\s/g)) {
        result = "invalid number";
      }

      if (result.match(/\.+\d*\.+|\/\.|\.\/|^\/$/gi)) {
        result = "invalid number";
      } else if (result.match(/^\./g)) {
        result = 0 + result;
      } else if (result.match(/\.$/g)) {
        result = result.replace(/\.$/, "");
      } //

      if (result.includes("/")) {
        const value = result.split("/");
        //const decimalsOrder = /^\d+\.\d$/g;
        //const decimalError = /\d*\.+\d*\.+\d*/g;

        if (value.length !== 2) {
          result = "invalid number";
        } else {
          result = value[0] / value[1];
        }
      }
    }
    result = Number(result);

    if (result == 0) {
      result = "invalid number";
    }

    if (isNaN(result)) {
      result = "invalid number";
    }

    return result;
  };

  this.getUnit = function(input) {
    let result;
    //result = input.match(/gal|L|lbs|kg|km|mi/);
    let separatedInput = input.match(inputRegex);
    const inputUnit = [
      "gal",
      "GAL",
      "l",
      "L",
      "lbs",
      "LBS",
      "kg",
      "KG",
      "km",
      "KM",
      "mi",
      "MI"
    ];
    const liter = ["l", "L"];

    if (separatedInput.length === 1) {
      result = separatedInput[0];
    } else {
      result = separatedInput[1];
    }

    if (!inputUnit.includes(result)) {
      result = "invalid unit";
    } else if (liter.includes(result)) {
      result = "L";
    } else {
      result = result.toLowerCase();
    } //

    return result;
  };

  this.getReturnUnit = function(initUnit) {
    let result;
    const inputUnit = ["gal", "L", "km", "mi", "lbs", "kg"];
    const returnUnit = ["L", "gal", "mi", "km", "kg", "lbs"];

    if (inputUnit.includes(initUnit)) {
      let index = inputUnit.indexOf(initUnit);
      result = returnUnit[index];
    }

    return result;
  };

  this.spellOutUnit = function(unit) {
    let result;
    const shortUnit = ["gal", "L", "km", "mi", "lbs", "kg"];
    const fullUnit = [
      "gallons",
      "litres",
      "kilometers",
      "miles",
      "pounds",
      "kilograms"
    ];

    if (shortUnit.includes(unit)) {
      let fullUnitIndex = shortUnit.indexOf(unit);
      result = fullUnit[fullUnitIndex];
    }
    return result;
  };

  this.convert = function(initNum, initUnit) {
    const galToL = 3.78541;
    const lbsToKg = 0.453592;
    const miToKm = 1.60934;
    let result;

    /*if (initUnit === "gal"){
      result = (initNum * galToL).toFixed(5);
    } else if (initUnit === "L"){
      result = (initNum / galToL).toFixed(5);
    }*/

    switch (initUnit) {
      case "gal":
        result = (initNum * galToL).toFixed(5);
        break;
      case "L":
        result = (initNum / galToL).toFixed(5);
        break;
      case "lbs":
        result = (initNum * lbsToKg).toFixed(5);
        break;
      case "kg":
        result = (initNum / lbsToKg).toFixed(5);
        break;
      case "mi":
        result = (initNum * miToKm).toFixed(5);
        break;
      case "km":
        result = (initNum / miToKm).toFixed(5);
    }

    result = Number(result);
    return result;
  };

  this.getString = function(initNum, initUnit, returnNum, returnUnit) {
    let result;

    result =
      initNum +
      " " +
      this.spellOutUnit(initUnit) +
      " converts to " +
      returnNum +
      " " +
      this.spellOutUnit(returnUnit);

    return result;
  };
}

module.exports = ConvertHandler;