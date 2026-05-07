// ========== CONSTANTS ==========
const ROMAN_VALUES = {
    'M': 1000, 'D': 500, 'C': 100, 'L': 50, 'X': 10, 'V': 5, 'I': 1
};

const ROMAN_MAPPINGS = [
    [1000, 'M'], [900, 'CM'], [500, 'D'], [400, 'CD'],
    [100, 'C'], [90, 'XC'], [50, 'L'], [40, 'XL'],
    [10, 'X'], [9, 'IX'], [5, 'V'], [4, 'IV'], [1, 'I']
];

const UNICODE_MAP = {
    'Ⅿ': 'M', 'Ⅾ': 'D', 'Ⅽ': 'C', 'Ⅼ': 'L', 'Ⅹ': 'X',
    'Ⅴ': 'V', 'Ⅰ': 'I', 'Ⅱ': 'II', 'Ⅲ': 'III', 'Ⅳ': 'IV',
    'Ⅵ': 'VI', 'Ⅶ': 'VII', 'Ⅷ': 'VIII', 'Ⅸ': 'IX',
    'Ⅺ': 'XI', 'Ⅻ': 'XII'
};

const VALIDATION = {
    MIN: 1,
    MAX: 3999,
    ROMAN_REGEX: /^M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/
};

// ========== Roman Numeral Converter Service ==========
class RomanConverter {
    static normalizeUnicode(roman) {
        let normalized = roman.normalize().toUpperCase();
        for (const [unicode, ascii] of Object.entries(UNICODE_MAP)) {
            normalized = normalized.replace(new RegExp(unicode, 'g'), ascii);
        }
        return normalized;
    }

    static cleanRomanString(roman) {
        return roman.replace(/[^MDCLXVI]/g, '');
    }

    static validateRomanFormat(roman) {
        return VALIDATION.ROMAN_REGEX.test(roman);
    }

    static calculateValue(roman) {
        let total = 0;
        let i = 0;

        while (i < roman.length) {
            const current = ROMAN_VALUES[roman[i]];
            const next = (i + 1 < roman.length) ? ROMAN_VALUES[roman[i + 1]] : 0;

            if (next > current) {
                total += (next - current);
                i += 2;
            } else {
                total += current;
                i += 1;
            }
        }
        return total;
    }

    static toInteger(roman) {
        if (!roman || roman.length === 0) {
            return { success: false, error: 'Empty input', value: 0 };
        }

        const normalized = this.normalizeUnicode(roman);
        
        // STRICT VALIDATION - ALL characters must be valid Roman numerals
        const validRomanPattern = /^[IVXLCDM]+$/i;
        if (!validRomanPattern.test(normalized)) {
            return { success: false, error: 'Input contains invalid characters', value: 0 };
        }

        const clean = this.cleanRomanString(normalized);

        if (clean.length === 0) {
            return { success: false, error: 'No valid Roman characters', value: 0 };
        }

        if (!this.validateRomanFormat(clean)) {
            return { success: false, error: 'Invalid Roman format', value: 0 };
        }

        const value = this.calculateValue(clean);

        const reconstructed = this.fromInteger(value);
        if (reconstructed !== clean) {
            return { success: false, error: 'Invalid Roman combination', value: 0 };
        }

        return { success: true, value };
    }

    static fromInteger(num) {
        // Reject non-integers (decimals like 3.5)
        if (!Number.isInteger(num)) {
            return '';
        }
        if (num < VALIDATION.MIN || num > VALIDATION.MAX) {
            return '';
        }

        let result = '';
        let remaining = num;

        for (const [value, symbol] of ROMAN_MAPPINGS) {
            while (remaining >= value) {
                result += symbol;
                remaining -= value;
            }
        }
        return result;
    }
}

// ========== Integer Validator Service ==========
class IntegerValidator {
    static validate(input) {
        const raw = input.trim();

        if (raw === '') {
            return { success: false, error: 'Enter a number between 1 and 3999' };
        }

        const num = Number(raw);

        if (!Number.isInteger(num) || isNaN(num) || !Number.isFinite(num)) {
            return { success: false, error: 'Please enter a valid integer' };
        }

        if (num < VALIDATION.MIN || num > VALIDATION.MAX) {
            return { success: false, error: 'Number out of range (1–3999)' };
        }

        return { success: true, value: num };
    }
}

// Expose for both the web page and tests
if (typeof window !== 'undefined') {
    window.RomanConverter = RomanConverter;
    window.IntegerValidator = IntegerValidator;
}

// Export for Node.js testing
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { RomanConverter, IntegerValidator };
}
