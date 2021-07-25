const chai = require("chai");
let assert = chai.assert;
const ConvertHandler = require("../controllers/convertHandler.js");

let convertHandler = new ConvertHandler();

suite("Unit Tests", function() {
  suite("function convertHandler.getNum(input)", () => {
    test("whole number input", done => {
      var input = "32L";
      assert.equal(convertHandler.getNum(input), 32);
      done();
    });

    test("decimal number input", done => {
      var input = "6.23L";
      assert.equal(convertHandler.getNum(input), 6.23);
      done();
    });

    test("fractional input", done => {
      var input = "6/2mi";
      assert.equal(convertHandler.getNum(input), 6 / 2);
      done();
    });

    test("fractional input with a decimal", done => {
      var input = "6.2/7km";
      assert.equal(convertHandler.getNum(input), 6.2 / 7);
      done();
    });

    test("error on a double-fraction", done => {
      var input = "6/2/3L";
      assert.equal(convertHandler.getNum(input), "invalid number");
      done();
    });

    test("default to a numerical input of 1", done => {
      var input = "kg";
      assert.equal(convertHandler.getNum(input), 1);
      done();
    });
  });
  suite("function convertHandler.getUnit(input)", () => {
    test("valid input unit", done => {
      var input = [
        "gal",
        "GAL",
        "l",
        "L",
        "mi",
        "MI",
        "km",
        "KM",
        "kg",
        "KG",
        "lbs",
        "LBS"
      ];
      var output = [
        "gal",
        "gal",
        "L",
        "L",
        "mi",
        "mi",
        "km",
        "km",
        "kg",
        "kg",
        "lbs",
        "lbs"
      ];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getUnit(ele), output[i]);
      });
      done();
    });

    test("return an error for an invalid input unit", done => {
      var input = ["20", "21.5kilograms"];
      input.forEach(ele => {
        assert.equal(convertHandler.getUnit(ele), "invalid unit");
      });
      done();
    });
  });
  suite("function convertHandler.getReturnUnit(initUnit)", () => {
    test("return the correct return unit for each valid input unit", done => {
      var input = ["gal", "L", "mi", "km", "kg", "lbs"];
      var returnUnit = ["L", "gal", "km", "mi", "lbs", "kg"];
      input.forEach((ele, i) => {
        assert.equal(convertHandler.getReturnUnit(ele), returnUnit[i]);
      });
      done();
    });
  });

  suite("function convertHandler.spellOutUnit(unit)", () => {
    test("return the spelled-out string unit for each valid input unit", done => {
      var shortUnit = ["gal", "L", "km", "mi", "lbs", "kg"];
      var fullUnit = [
        "gallons",
        "litres",
        "kilometers",
        "miles",
        "pounds",
        "kilograms"
      ];
      shortUnit.forEach((ele, i) => {
        assert.equal(convertHandler.spellOutUnit(ele), fullUnit[i]);
      });
      done();
    });
  });

  suite("function convertHandler.convert(initNum, initUnit)", () => {
    test("convert gal to L", done => {
      var input = [5, "gal"];
      var expected = 18.92705;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("convert L to gal", done => {
      var input = [6, "L"];
      var expected = 1.58503;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("convert mi to km", done => {
      var input = [3.2, "mi"];
      var expected = 5.14989;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("convert km to mi", done => {
      var input = [4.1, "km"];
      var expected = 2.54763;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("convert lbs to kg", done => {
      var input = [2, "lbs"];
      var expected = 0.90718;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });

    test("convert kg to lbs", done => {
      var input = [2.1, "kg"];
      var expected = 4.62971;
      assert.approximately(
        convertHandler.convert(input[0], input[1]),
        expected,
        0.1
      );
      done();
    });
  });
});