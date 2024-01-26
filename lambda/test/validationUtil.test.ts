// test/validationUtil.test.ts
const { isValidLensData } = require('../../lambda/validationUtil');

describe('Lens Data Validation', () => {
    it('should validate correct lens data', () => {
        const validData = {
            frontRadius: 50,
            backRadius: 50,
            thickness: 10,
            lensTitle: 'Test Lens'
        };
        expect(isValidLensData(validData)).toBe(true);
    });

    it('should invalidate lens data with incorrect types', () => {
        const invalidData = {
            frontRadius: 'incorrect', // Wrong type
            backRadius: 50,
            thickness: 10,
            lensTitle: 'Test Lens'
        };
        expect(isValidLensData(invalidData)).toBe(false);
    });

    // Add more tests within the describe block...

    it('should invalidate lens data with missing fields', () => {
        const incompleteData = {
            frontRadius: 50,
            thickness: 10
            // Missing backRadius and lensTitle
        };
        expect(isValidLensData(incompleteData)).toBe(false);
    });

    it('should invalidate lens data with out-of-range values', () => {
        const outOfRangeData = {
            frontRadius: -3000, // Out of range
            backRadius: 50,
            thickness: 10,
            lensTitle: 'Test Lens'
        };
        expect(isValidLensData(outOfRangeData)).toBe(false);
    });

    // ... more scenarios as needed

    // More test scenarios...
});
