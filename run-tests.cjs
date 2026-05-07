// run-tests.cjs - Simple test runner for CI/CD
const fs = require('fs');

console.log("\n🧪 Roman Numeral Converter - CI/CD Tests\n");
console.log("=".repeat(50));

// Read and execute the converter code
const converterCode = fs.readFileSync('./roman-converter.js', 'utf8');

// Create a module context
const module = { exports: {} };
const exports = module.exports;

// Execute the code
try {
    // Use eval in a context that captures module.exports
    const evalCode = `
        (function(module, exports) {
            ${converterCode}
            return module.exports;
        })
    `;
    
    const moduleFactory = eval(evalCode);
    const result = moduleFactory(module, exports);
    
    let RomanConverter = null;
    
    if (result && result.RomanConverter) {
        RomanConverter = result.RomanConverter;
    } else if (module.exports && module.exports.RomanConverter) {
        RomanConverter = module.exports.RomanConverter;
    }
    
    if (!RomanConverter) {
        console.log("❌ RomanConverter class not found!");
        console.log("Module exports keys:", Object.keys(module.exports));
        process.exit(1);
    }
    
    console.log("✅ RomanConverter loaded successfully");
    
    // Helper functions
    let passed = 0;
    let failed = 0;
    
    function expectRomanToSucceed(roman, expected, testName) {
        const result = RomanConverter.toInteger(roman);
        if (result.success && result.value === expected) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName} - Expected ${expected} but got ${result.value}`);
            failed++;
            return false;
        }
    }
    
    function expectRomanToFail(roman, testName) {
        const result = RomanConverter.toInteger(roman);
        if (!result.success) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName} - Expected failure but got success with value ${result.value}`);
            failed++;
            return false;
        }
    }
    
    function expectIntegerToSucceed(num, expected, testName) {
        const result = RomanConverter.fromInteger(num);
        if (result === expected) {
            console.log(`✅ PASS: ${testName}`);
            passed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName} - Expected "${expected}" but got "${result}"`);
            failed++;
            return false;
        }
    }
    
    function expectIntegerToFail(num, testName) {
        const result = RomanConverter.fromInteger(num);
        if (result === '') {
            console.log(`✅ PASS: ${testName}`);
            passed++;
            return true;
        } else {
            console.log(`❌ FAIL: ${testName} - Expected empty string but got "${result}"`);
            failed++;
            return false;
        }
    }
    
    // ========== RUN TESTS ==========
    console.log("\n📦 Integer to Roman Tests (fromInteger):");
    console.log("-".repeat(40));
    
    expectIntegerToSucceed(1, 'I', 'TC-IR-01: 1 → "I"');
    expectIntegerToSucceed(3999, 'MMMCMXCIX', 'TC-IR-18: 3999 → "MMMCMXCIX"');
    expectIntegerToSucceed(5, 'V', 'TC-IR-03: 5 → "V"');
    expectIntegerToSucceed(10, 'X', 'TC-IR-05: 10 → "X"');
    expectIntegerToSucceed(50, 'L', 'TC-IR-08: 50 → "L"');
    expectIntegerToSucceed(100, 'C', 'TC-IR-11: 100 → "C"');
    expectIntegerToSucceed(500, 'D', 'TC-IR-14: 500 → "D"');
    expectIntegerToSucceed(1000, 'M', 'TC-IR-17: 1000 → "M"');
    expectIntegerToSucceed(4, 'IV', 'TC-IR-02: 4 → "IV"');
    expectIntegerToSucceed(9, 'IX', 'TC-IR-04: 9 → "IX"');
    expectIntegerToSucceed(40, 'XL', 'TC-IR-06: 40 → "XL"');
    expectIntegerToSucceed(90, 'XC', 'TC-IR-09: 90 → "XC"');
    expectIntegerToSucceed(400, 'CD', 'TC-IR-12: 400 → "CD"');
    expectIntegerToSucceed(900, 'CM', 'TC-IR-15: 900 → "CM"');
    expectIntegerToSucceed(49, 'XLIX', 'TC-IR-07: 49 → "XLIX"');
    expectIntegerToSucceed(99, 'XCIX', 'TC-IR-10: 99 → "XCIX"');
    expectIntegerToSucceed(449, 'CDXLIX', 'TC-IR-13: 449 → "CDXLIX"');
    expectIntegerToSucceed(999, 'CMXCIX', 'TC-IR-16: 999 → "CMXCIX"');
    expectIntegerToSucceed(2, 'II', 'ESSENTIAL: 2 → "II"');
    expectIntegerToSucceed(3, 'III', 'ESSENTIAL: 3 → "III"');
    expectIntegerToSucceed(6, 'VI', 'ESSENTIAL: 6 → "VI"');
    expectIntegerToSucceed(14, 'XIV', 'ESSENTIAL: 14 → "XIV"');
    expectIntegerToSucceed(44, 'XLIV', 'ESSENTIAL: 44 → "XLIV"');
    expectIntegerToSucceed(444, 'CDXLIV', 'ESSENTIAL: 444 → "CDXLIV"');
    expectIntegerToSucceed(1984, 'MCMLXXXIV', 'ESSENTIAL: 1984 → "MCMLXXXIV"');
    expectIntegerToSucceed(2024, 'MMXXIV', 'ESSENTIAL: 2024 → "MMXXIV"');
    
    // Invalid inputs
    expectIntegerToFail(0, 'TC-IR-19: 0 → error');
    expectIntegerToFail(-5, 'TC-IR-20: -5 → error');
    expectIntegerToFail(4000, 'TC-IR-21: 4000 → error');
    expectIntegerToFail(3.5, 'TC-IR-22: 3.5 → error');
    
    console.log("\n📜 Roman to Integer Tests (toInteger):");
    console.log("-".repeat(40));
    
    expectRomanToSucceed('I', 1, 'TC-RI-01: "I" → 1');
    expectRomanToSucceed('V', 5, 'TC-RI-03: "V" → 5');
    expectRomanToSucceed('X', 10, 'TC-RI-05: "X" → 10');
    expectRomanToSucceed('L', 50, 'TC-RI-08: "L" → 50');
    expectRomanToSucceed('C', 100, 'TC-RI-11: "C" → 100');
    expectRomanToSucceed('D', 500, 'TC-RI-14: "D" → 500');
    expectRomanToSucceed('M', 1000, 'TC-RI-17: "M" → 1000');
    expectRomanToSucceed('IV', 4, 'TC-RI-02: "IV" → 4');
    expectRomanToSucceed('IX', 9, 'TC-RI-04: "IX" → 9');
    expectRomanToSucceed('XL', 40, 'TC-RI-06: "XL" → 40');
    expectRomanToSucceed('XC', 90, 'TC-RI-09: "XC" → 90');
    expectRomanToSucceed('CD', 400, 'TC-RI-12: "CD" → 400');
    expectRomanToSucceed('CM', 900, 'TC-RI-15: "CM" → 900');
    expectRomanToSucceed('XLIX', 49, 'TC-RI-07: "XLIX" → 49');
    expectRomanToSucceed('XCIX', 99, 'TC-RI-10: "XCIX" → 99');
    expectRomanToSucceed('CDXLIX', 449, 'TC-RI-13: "CDXLIX" → 449');
    expectRomanToSucceed('CMXCIX', 999, 'TC-RI-16: "CMXCIX" → 999');
    expectRomanToSucceed('MMMCMXCIX', 3999, 'TC-RI-18: "MMMCMXCIX" → 3999');
    expectRomanToSucceed('II', 2, 'ESSENTIAL: "II" → 2');
    expectRomanToSucceed('III', 3, 'ESSENTIAL: "III" → 3');
    expectRomanToSucceed('VI', 6, 'ESSENTIAL: "VI" → 6');
    expectRomanToSucceed('XIV', 14, 'ESSENTIAL: "XIV" → 14');
    expectRomanToSucceed('XIX', 19, 'ESSENTIAL: "XIX" → 19');
    expectRomanToSucceed('XLIV', 44, 'ESSENTIAL: "XLIV" → 44');
    expectRomanToSucceed('CDXLIV', 444, 'ESSENTIAL: "CDXLIV" → 444');
    expectRomanToSucceed('xiv', 14, 'CASE: lowercase "xiv" → 14');
    expectRomanToSucceed('XvI', 16, 'CASE: mixed case "XvI" → 16');
    expectRomanToSucceed('  XIV', 14, 'WHITESPACE: leading spaces');
    expectRomanToSucceed('XIV  ', 14, 'WHITESPACE: trailing spaces');
    expectRomanToSucceed('  XIV  ', 14, 'WHITESPACE: both sides');
    expectRomanToSucceed('Ⅺ', 11, 'UNICODE: "Ⅺ" → 11');
    expectRomanToSucceed('ⅩⅣ', 14, 'UNICODE: "ⅩⅣ" → 14');
    
    // Invalid inputs
    expectRomanToFail('', 'TC-RI-19: empty string → error');
    expectRomanToFail(null, 'null input → error');
    expectRomanToFail('   ', 'whitespace only → error');
    expectRomanToFail('IIII', 'TC-RI-20: "IIII" → error');
    expectRomanToFail('XIIV', 'TC-RI-21: "XIIV" → error');
    expectRomanToFail('MMMM', 'TC-RI-22: "MMMM" → error');
    expectRomanToFail('ABC', 'TC-RI-23: "ABC" → error');
    expectRomanToFail('VX', 'invalid pattern: "VX" → error');
    expectRomanToFail('IC', 'invalid pattern: "IC" → error');
    expectRomanToFail('VL', 'invalid pattern: "VL" → error');
    expectRomanToFail('XD', 'invalid pattern: "XD" → error');
    expectRomanToFail('IXIV', 'invalid pattern: "IXIV" → error');
    
    // ========== RESULTS SUMMARY ==========
    console.log("\n" + "=".repeat(50));
    console.log(`\n📊 FINAL RESULTS: ${passed} passed, ${failed} failed, ${passed + failed} total\n`);
    
    if (failed > 0) {
        console.log("❌ Some tests failed. Deployment BLOCKED.\n");
        process.exit(1);
    } else {
        console.log("✅ All tests passed! Ready for deployment.\n");
        process.exit(0);
    }
    
} catch (err) {
    console.log("❌ Failed to load converter:", err.message);
    console.log(err.stack);
    process.exit(1);
}
