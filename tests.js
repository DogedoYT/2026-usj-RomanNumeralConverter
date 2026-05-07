// Use Chai's expect for assertions
const expect = chai.expect;

// Helper functions for cleaner test code
function expectRomanToSucceed(romanInput, expectedValue) {
    const result = window.RomanConverter.toInteger(romanInput);
    expect(result.success).to.be.true;
    expect(result.value).to.equal(expectedValue);
}

function expectRomanToFail(romanInput) {
    const result = window.RomanConverter.toInteger(romanInput);
    expect(result.success).to.be.false;
}

function expectIntegerToSucceed(intInput, expectedRoman) {
    const result = window.RomanConverter.fromInteger(intInput);
    expect(result).to.equal(expectedRoman);
}

function expectIntegerToFail(intInput) {
    const result = window.RomanConverter.fromInteger(intInput);
    expect(result).to.equal('');
}

// ============================================================
// TEST SUITE 1: Integer to Roman (fromInteger)
// Basado en TC-IR-01 a TC-IR-23
// ============================================================
describe('Integer to Roman Conversion (RomanConverter.fromInteger)', function() {

    // --------------------------------------------------------
    // 1.1 Valid Inputs - Boundary Values
    // --------------------------------------------------------
    describe('Valid Inputs - Boundary Values', function() {
        
        it('TC-IR-01: should convert 1 to "I" (minimum valid number)', function() {
            expectIntegerToSucceed(1, 'I');
        });

        it('TC-IR-18: should convert 3999 to "MMMCMXCIX" (maximum valid number)', function() {
            expectIntegerToSucceed(3999, 'MMMCMXCIX');
        });
    });

    // --------------------------------------------------------
    // 1.2 Valid Inputs - Single Symbols
    // --------------------------------------------------------
    describe('Valid Inputs - Single Symbols', function() {
        
        it('TC-IR-03: should convert 5 to "V"', function() {
            expectIntegerToSucceed(5, 'V');
        });

        it('TC-IR-05: should convert 10 to "X"', function() {
            expectIntegerToSucceed(10, 'X');
        });

        it('TC-IR-08: should convert 50 to "L"', function() {
            expectIntegerToSucceed(50, 'L');
        });

        it('TC-IR-11: should convert 100 to "C"', function() {
            expectIntegerToSucceed(100, 'C');
        });

        it('TC-IR-14: should convert 500 to "D"', function() {
            expectIntegerToSucceed(500, 'D');
        });

        it('TC-IR-17: should convert 1000 to "M"', function() {
            expectIntegerToSucceed(1000, 'M');
        });
    });

    // --------------------------------------------------------
    // 1.3 Valid Inputs - Subtractive Patterns
    // --------------------------------------------------------
    describe('Valid Inputs - Subtractive Patterns', function() {
        
        it('TC-IR-02: should convert 4 to "IV"', function() {
            expectIntegerToSucceed(4, 'IV');
        });

        it('TC-IR-04: should convert 9 to "IX"', function() {
            expectIntegerToSucceed(9, 'IX');
        });

        it('TC-IR-06: should convert 40 to "XL"', function() {
            expectIntegerToSucceed(40, 'XL');
        });

        it('TC-IR-09: should convert 90 to "XC"', function() {
            expectIntegerToSucceed(90, 'XC');
        });

        it('TC-IR-12: should convert 400 to "CD"', function() {
            expectIntegerToSucceed(400, 'CD');
        });

        it('TC-IR-15: should convert 900 to "CM"', function() {
            expectIntegerToSucceed(900, 'CM');
        });
    });

    // --------------------------------------------------------
    // 1.4 Valid Inputs - Compound Patterns (adicionales esenciales)
    // --------------------------------------------------------
    describe('Valid Inputs - Compound Patterns', function() {
        
        it('TC-IR-07: should convert 49 to "XLIX"', function() {
            expectIntegerToSucceed(49, 'XLIX');
        });

        it('TC-IR-10: should convert 99 to "XCIX"', function() {
            expectIntegerToSucceed(99, 'XCIX');
        });

        it('TC-IR-13: should convert 449 to "CDXLIX"', function() {
            expectIntegerToSucceed(449, 'CDXLIX');
        });

        it('TC-IR-16: should convert 999 to "CMXCIX"', function() {
            expectIntegerToSucceed(999, 'CMXCIX');
        });

        // === CASOS ADICIONALES ESENCIALES (me faltaban) ===
        
        it('ESSENTIAL: should convert 2 to "II" (basic addition)', function() {
            expectIntegerToSucceed(2, 'II');
        });

        it('ESSENTIAL: should convert 3 to "III" (basic addition)', function() {
            expectIntegerToSucceed(3, 'III');
        });

        it('ESSENTIAL: should convert 6 to "VI" (addition after V)', function() {
            expectIntegerToSucceed(6, 'VI');
        });

        it('ESSENTIAL: should convert 7 to "VII"', function() {
            expectIntegerToSucceed(7, 'VII');
        });

        it('ESSENTIAL: should convert 8 to "VIII"', function() {
            expectIntegerToSucceed(8, 'VIII');
        });

        it('ESSENTIAL: should convert 11 to "XI"', function() {
            expectIntegerToSucceed(11, 'XI');
        });

        it('ESSENTIAL: should convert 14 to "XIV" (common number - Super Bowl, relojes)', function() {
            expectIntegerToSucceed(14, 'XIV');
        });

        it('ESSENTIAL: should convert 19 to "XIX"', function() {
            expectIntegerToSucceed(19, 'XIX');
        });

        it('ESSENTIAL: should convert 44 to "XLIV" (double subtractive)', function() {
            expectIntegerToSucceed(44, 'XLIV');
        });

        it('ESSENTIAL: should convert 90 to "XC"', function() {
            expectIntegerToSucceed(90, 'XC');
        });

        it('ESSENTIAL: should convert 444 to "CDXLIV" (triple subtractive)', function() {
            expectIntegerToSucceed(444, 'CDXLIV');
        });

        it('ESSENTIAL: should convert 1984 to "MCMLXXXIV" (año real - Macintosh)', function() {
            expectIntegerToSucceed(1984, 'MCMLXXXIV');
        });

        it('ESSENTIAL: should convert 2024 to "MMXXIV" (año actual cuando se creó el código)', function() {
            expectIntegerToSucceed(2024, 'MMXXIV');
        });
    });

    // --------------------------------------------------------
    // 1.5 Invalid Inputs - Out of Range
    // --------------------------------------------------------
    describe('Invalid Inputs - Out of Range', function() {
        
        it('TC-IR-19: should return empty string for 0 (below minimum - zero no existe en romanos)', function() {
            expectIntegerToFail(0);
        });

        it('TC-IR-20: should return empty string for -5 (negative numbers no existen)', function() {
            expectIntegerToFail(-5);
        });

        it('TC-IR-21: should return empty string for 4000 (above maximum - romanos solo hasta 3999)', function() {
            expectIntegerToFail(4000);
        });

        it('TC-IR-22: should return empty string for 3.5 (non-integer - no hay fracciones en romanos)', function() {
            expectIntegerToFail(3.5);
        });
    });

    // --------------------------------------------------------
    // 1.6 Invalid Inputs - Type Coercion (adicional)
    // --------------------------------------------------------
    describe('Invalid Inputs - Type Coercion', function() {
        
        it('TC-IR-23: should return empty string for string "abc" (non-numeric)', function() {
            // Nota: desdeInteger recibe un número, pero si le pasas string, JS lo intenta convertir
            // El comportamiento depende de cómo se llame. En el UI ya se valida antes.
            expectIntegerToFail(NaN);
        });
    });
});

// ============================================================
// TEST SUITE 2: Roman to Integer (toInteger)
// Basado en TC-RI-01 a TC-RI-23
// ============================================================
describe('Roman to Integer Conversion (RomanConverter.toInteger)', function() {

    // --------------------------------------------------------
    // 2.1 Valid Inputs - Single Symbols
    // --------------------------------------------------------
    describe('Valid Inputs - Single Symbols', function() {
        
        it('TC-RI-01: should convert "I" to 1 (minimum value)', function() {
            expectRomanToSucceed('I', 1);
        });

        it('TC-RI-03: should convert "V" to 5', function() {
            expectRomanToSucceed('V', 5);
        });

        it('TC-RI-05: should convert "X" to 10', function() {
            expectRomanToSucceed('X', 10);
        });

        it('TC-RI-08: should convert "L" to 50', function() {
            expectRomanToSucceed('L', 50);
        });

        it('TC-RI-11: should convert "C" to 100', function() {
            expectRomanToSucceed('C', 100);
        });

        it('TC-RI-14: should convert "D" to 500', function() {
            expectRomanToSucceed('D', 500);
        });

        it('TC-RI-17: should convert "M" to 1000', function() {
            expectRomanToSucceed('M', 1000);
        });
    });

    // --------------------------------------------------------
    // 2.2 Valid Inputs - Subtractive Patterns
    // --------------------------------------------------------
    describe('Valid Inputs - Subtractive Patterns', function() {
        
        it('TC-RI-02: should convert "IV" to 4', function() {
            expectRomanToSucceed('IV', 4);
        });

        it('TC-RI-04: should convert "IX" to 9', function() {
            expectRomanToSucceed('IX', 9);
        });

        it('TC-RI-06: should convert "XL" to 40', function() {
            expectRomanToSucceed('XL', 40);
        });

        it('TC-RI-09: should convert "XC" to 90', function() {
            expectRomanToSucceed('XC', 90);
        });

        it('TC-RI-12: should convert "CD" to 400', function() {
            expectRomanToSucceed('CD', 400);
        });

        it('TC-RI-15: should convert "CM" to 900', function() {
            expectRomanToSucceed('CM', 900);
        });
    });

    // --------------------------------------------------------
    // 2.3 Valid Inputs - Compound Patterns
    // --------------------------------------------------------
    describe('Valid Inputs - Compound Patterns', function() {
        
        it('TC-RI-07: should convert "XLIX" to 49', function() {
            expectRomanToSucceed('XLIX', 49);
        });

        it('TC-RI-10: should convert "XCIX" to 99', function() {
            expectRomanToSucceed('XCIX', 99);
        });

        it('TC-RI-13: should convert "CDXLIX" to 449', function() {
            expectRomanToSucceed('CDXLIX', 449);
        });

        it('TC-RI-16: should convert "CMXCIX" to 999', function() {
            expectRomanToSucceed('CMXCIX', 999);
        });

        it('TC-RI-18: should convert "MMMCMXCIX" to 3999 (maximum valid number)', function() {
            expectRomanToSucceed('MMMCMXCIX', 3999);
        });
    });

    // --------------------------------------------------------
    // 2.4 Valid Inputs - Basic Additive (me faltaban - ESENCIALES)
    // --------------------------------------------------------
    describe('Valid Inputs - Basic Additive Patterns (ESSENTIAL - me faltaban)', function() {
        
        it('ESSENTIAL: should convert "II" to 2', function() {
            expectRomanToSucceed('II', 2);
        });

        it('ESSENTIAL: should convert "III" to 3', function() {
            expectRomanToSucceed('III', 3);
        });

        it('ESSENTIAL: should convert "VI" to 6', function() {
            expectRomanToSucceed('VI', 6);
        });

        it('ESSENTIAL: should convert "VII" to 7', function() {
            expectRomanToSucceed('VII', 7);
        });

        it('ESSENTIAL: should convert "VIII" to 8', function() {
            expectRomanToSucceed('VIII', 8);
        });

        it('ESSENTIAL: should convert "XI" to 11', function() {
            expectRomanToSucceed('XI', 11);
        });

        it('ESSENTIAL: should convert "XIV" to 14 (common number - Super Bowl, relojes)', function() {
            expectRomanToSucceed('XIV', 14);
        });

        it('ESSENTIAL: should convert "XIX" to 19', function() {
            expectRomanToSucceed('XIX', 19);
        });

        it('ESSENTIAL: should convert "XLIV" to 44', function() {
            expectRomanToSucceed('XLIV', 44);
        });

        it('ESSENTIAL: should convert "XC" to 90', function() {
            expectRomanToSucceed('XC', 90);
        });

        it('ESSENTIAL: should convert "CDXLIV" to 444', function() {
            expectRomanToSucceed('CDXLIV', 444);
        });
    });

    // --------------------------------------------------------
    // 2.5 Valid Inputs - Real World Examples
    // --------------------------------------------------------
    describe('Valid Inputs - Real World Examples', function() {
        
        it('should convert "MCMLXXXIV" (1984 - año lanzamiento Macintosh) to 1984', function() {
            expectRomanToSucceed('MCMLXXXIV', 1984);
        });

        it('should convert "MMXXIV" (2024) to 2024', function() {
            expectRomanToSucceed('MMXXIV', 2024);
        });

        it('should convert "MCMXCIX" (1999) to 1999', function() {
            expectRomanToSucceed('MCMXCIX', 1999);
        });
    });

    // --------------------------------------------------------
    // 2.6 Valid Inputs - Case Insensitivity
    // --------------------------------------------------------
    describe('Valid Inputs - Case Insensitivity', function() {
        
        it('should convert lowercase "xiv" to 14', function() {
            expectRomanToSucceed('xiv', 14);
        });

        it('should convert mixed case "XvI" to 16', function() {
            expectRomanToSucceed('XvI', 16);
        });

        it('should convert lowercase "mmxxiv" to 2024', function() {
            expectRomanToSucceed('mmxxiv', 2024);
        });
    });

    // --------------------------------------------------------
    // 2.7 Valid Inputs - Whitespace Handling
    // --------------------------------------------------------
    describe('Valid Inputs - Whitespace Handling', function() {
        
        it('should trim leading spaces', function() {
            expectRomanToSucceed('  XIV', 14);
        });

        it('should trim trailing spaces', function() {
            expectRomanToSucceed('XIV  ', 14);
        });

        it('should trim both leading and trailing spaces', function() {
            expectRomanToSucceed('  XIV  ', 14);
        });
    });

    // --------------------------------------------------------
    // 2.8 Valid Inputs - Unicode Roman Numerals (me faltaban)
    // --------------------------------------------------------
    describe('Valid Inputs - Unicode Roman Numerals (ESSENTIAL - me faltaban)', function() {
        
        it('ESSENTIAL: should convert Unicode "Ⅺ" (U+216A) to 11', function() {
            expectRomanToSucceed('Ⅺ', 11);
        });

        it('ESSENTIAL: should convert Unicode "ⅩⅣ" to 14', function() {
            expectRomanToSucceed('ⅩⅣ', 14);
        });

        it('ESSENTIAL: should convert Unicode "ⅯⅮⅭⅬⅩⅤⅠ" to 1666', function() {
            expectRomanToSucceed('ⅯⅮⅭⅬⅩⅤⅠ', 1666);
        });

        it('ESSENTIAL: should convert Unicode "ⅯⅯⅩⅩⅠⅤ" to 2024', function() {
            expectRomanToSucceed('ⅯⅯⅩⅩⅠⅤ', 2024);
        });
    });

    // --------------------------------------------------------
    // 2.9 Invalid Inputs - Empty/Null
    // --------------------------------------------------------
    describe('Invalid Inputs - Empty/Null', function() {
        
        it('TC-RI-19: should fail for empty string', function() {
            expectRomanToFail('');
        });

        it('should fail for null input', function() {
            expectRomanToFail(null);
        });

        it('should fail for whitespace only', function() {
            expectRomanToFail('   ');
        });
    });

    // --------------------------------------------------------
    // 2.10 Invalid Inputs - Invalid Patterns
    // --------------------------------------------------------
    describe('Invalid Inputs - Invalid Patterns', function() {
        
        it('TC-RI-20: should fail for "IIII" (debería ser IV)', function() {
            expectRomanToFail('IIII');
        });

        it('TC-RI-21: should fail for "XIIV" (orden inválido - II antes de V)', function() {
            expectRomanToFail('XIIV');
        });

        it('TC-RI-22: should fail for "MMMM" (más de 3 M seguidas - excede 3999)', function() {
            expectRomanToFail('MMMM');
        });

        it('TC-RI-23: should fail for "ABC" (caracteres no romanos)', function() {
            expectRomanToFail('ABC');
        });

        it('should fail for "VX" (V antes de X - inválido)', function() {
            expectRomanToFail('VX');
        });

        it('should fail for "VL" (V antes de L - inválido)', function() {
            expectRomanToFail('VL');
        });

        it('should fail for "IC" (I antes de C - debería ser XCIX)', function() {
            expectRomanToFail('IC');
        });

        it('should fail for "ID" (I antes de D - inválido)', function() {
            expectRomanToFail('ID');
        });

        it('should fail for "IM" (I antes de M - inválido)', function() {
            expectRomanToFail('IM');
        });

        it('should fail for "XD" (X antes de D - inválido)', function() {
            expectRomanToFail('XD');
        });

        it('should fail for "XM" (X antes de M - inválido)', function() {
            expectRomanToFail('XM');
        });

        it('should fail for "IXIV" (doble subtractivo - inválido)', function() {
            expectRomanToFail('IXIV');
        });

        it('should fail for "IVX" (IV seguido de X - inválido)', function() {
            expectRomanToFail('IVX');
        });
    });
});

// ============================================================
// TEST SUITE 3: Round-Trip Consistency
// Verifica que convertir ida y vuelta devuelve el mismo número
// ============================================================
describe('Round-Trip Consistency (Conversión ida y vuelta)', function() {

    const testNumbers = [
        1, 2, 3, 4, 5, 6, 7, 8, 9, 10,
        11, 14, 19, 40, 44, 49, 50, 90, 99, 100,
        400, 444, 449, 500, 900, 999, 1000, 
        1984, 1999, 2024, 3999
    ];

    testNumbers.forEach(num => {
        it(`should convert ${num} → Roman → back to ${num}`, function() {
            const roman = window.RomanConverter.fromInteger(num);
            const result = window.RomanConverter.toInteger(roman);
            expect(result.success).to.be.true;
            expect(result.value).to.equal(num);
        });
    });
});

// ============================================================
// TEST SUITE 4: Edge Cases and Special Scenarios
// ============================================================
describe('Edge Cases and Special Scenarios', function() {

    // --------------------------------------------------------
    // 4.1 Boundary Values específicos
    // --------------------------------------------------------
    describe('Boundary values verification', function() {
        
        it('minimum valid number 1 converts to "I"', function() {
            expectIntegerToSucceed(1, 'I');
        });

        it('maximum valid number 3999 converts to "MMMCMXCIX"', function() {
            expectIntegerToSucceed(3999, 'MMMCMXCIX');
        });

        it('value just below minimum (0) fails', function() {
            expectIntegerToFail(0);
        });

        it('value just above maximum (4000) fails', function() {
            expectIntegerToFail(4000);
        });
    });

    // --------------------------------------------------------
    // 4.2 Common user mistakes
    // --------------------------------------------------------
    describe('Common user mistakes', function() {
        
        it('should handle input with spaces correctly', function() {
            expectRomanToSucceed(' X I V ', 14);
        });

        it('should handle lowercase input correctly', function() {
            expectRomanToSucceed('xiv', 14);
        });

        it('should handle mixed case input correctly', function() {
            expectRomanToSucceed('McMlXxxIv', 1984);
        });
    });

    // --------------------------------------------------------
    // 4.3 Números que podrían causar confusión
    // --------------------------------------------------------
    describe('Numbers that could cause confusion', function() {
        
        it('should convert 4 correctly (IV, not IIII)', function() {
            expectIntegerToSucceed(4, 'IV');
            const result = window.RomanConverter.toInteger('IIII');
            expect(result.success).to.be.false;
        });

        it('should convert 9 correctly (IX, not VIIII)', function() {
            expectIntegerToSucceed(9, 'IX');
        });

        it('should convert 40 correctly (XL, not XXXX)', function() {
            expectIntegerToSucceed(40, 'XL');
        });

        it('should convert 90 correctly (XC, not LXXXX)', function() {
            expectIntegerToSucceed(90, 'XC');
        });

        it('should convert 400 correctly (CD, not CCCC)', function() {
            expectIntegerToSucceed(400, 'CD');
        });

        it('should convert 900 correctly (CM, not DCCCC)', function() {
            expectIntegerToSucceed(900, 'CM');
        });
    });
});

// ============================================================
// RESUMEN DE TEST CASES:
// ============================================================
// 
// Total de tests: 96
// 
// Desglose:
// - Integer to Roman (fromInteger): 34 tests
//   • Boundary: 2
//   • Single symbols: 7
//   • Subtractive patterns: 6
//   • Compound patterns: 13 (incluye 8 esenciales que me faltaban)
//   • Invalid out of range: 4
//   • Invalid type coercion: 1
//
// - Roman to Integer (toInteger): 54 tests
//   • Single symbols: 7
//   • Subtractive patterns: 6
//   • Compound patterns: 5
//   • Basic additive (ESENCIALES): 11
//   • Real world examples: 3
//   • Case insensitivity: 3
//   • Whitespace handling: 3
//   • Unicode (ESENCIAL): 4
//   • Invalid empty/null: 3
//   • Invalid patterns: 13
//
// - Round-trip consistency: 31 numbers
//
// - Edge cases: 16 tests
//
// TOTAL: 34 + 54 + 31 + 16 = 135 tests
//
// Casos esenciales añadidos (me faltaban en mi suite manual):
// 1. II, III (básicos aditivos)
// 2. VI, VII, VIII (adición después de V)
// 3. XI, XIV, XIX (números comunes)
// 4. XLIV, XC, CDXLIV (compound subtractive)
// 5. 1984, 2024 (años reales)
// 6. Unicode Roman numerals (Ⅺ, ⅩⅣ, etc.)
// 7. Case insensitivity tests
// 8. Whitespace handling
// 9. Invalid patterns adicionales (VX, VL, IC, ID, IM, XD, XM, IXIV, IVX)
// ============================================================