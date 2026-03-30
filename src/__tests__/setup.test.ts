import fc from 'fast-check';

describe('Testing Framework Setup', () => {
  it('should have Jest configured correctly', () => {
    expect(true).toBe(true);
  });

  it('should have fast-check configured correctly', () => {
    fc.assert(
      fc.property(fc.integer(), n => {
        expect(typeof n).toBe('number');
        return true;
      })
    );
  });

  it('should have testing utilities available', () => {
    expect(jest).toBeDefined();
    expect(expect).toBeDefined();
  });

  it('should support property-based testing with custom configuration', () => {
    fc.assert(
      fc.property(
        fc.array(fc.integer(), { minLength: 0, maxLength: 10 }),
        arr => {
          expect(Array.isArray(arr)).toBe(true);
          expect(arr.length).toBeLessThanOrEqual(10);
          return true;
        }
      ),
      { numRuns: 50 } // Custom configuration for this test
    );
  });
});
