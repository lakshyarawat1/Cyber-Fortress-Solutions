import { describe, it, expect } from 'vitest';
import { cn } from './utils';

describe('cn utility', () => {
  it('should merge basic classes together', () => {
    expect(cn('class1', 'class2')).toBe('class1 class2');
  });

  it('should handle conditional classes using objects', () => {
    expect(cn('class1', { 'class2': true, 'class3': false })).toBe('class1 class2');
  });

  it('should resolve tailwind class conflicts correctly using twMerge', () => {
    // bg-red-500 should be overridden by bg-blue-500
    expect(cn('bg-red-500', 'bg-blue-500')).toBe('bg-blue-500');
    expect(cn('px-2 py-1', 'p-4')).toBe('p-4');
  });

  it('should handle arrays of classes', () => {
    expect(cn(['class1', 'class2'], 'class3')).toBe('class1 class2 class3');
  });

  it('should handle falsy values gracefully', () => {
    expect(cn('class1', null, undefined, false, '', 'class2')).toBe('class1 class2');
  });

  it('should handle complex mixed inputs', () => {
    expect(cn(
      'base-class',
      ['array-class-1', 'array-class-2'],
      { 'conditional-true': true, 'conditional-false': false },
      'p-4 bg-red-500',
      'p-8' // This should override p-4
    )).toBe('base-class array-class-1 array-class-2 conditional-true bg-red-500 p-8');
  });
});
