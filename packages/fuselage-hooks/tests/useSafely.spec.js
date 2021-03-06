import { useState } from 'react';

import { runHooks } from '../.jest/helpers';
import { useSafely } from '../src';

describe('useSafely hook', () => {
  it('returns a new updater that invokes the previous one', () => {
    const state = Symbol();
    const updater = jest.fn();
    runHooks(() => useSafely([state, updater]), [
      ([, updater]) => updater(),
    ]);

    expect(updater).toHaveBeenCalledTimes(1);
  });

  it('returns a new updater that can be called after unmount', () => {
    const state = Symbol();
    const updater = jest.fn();
    const [[, safeUpdater]] = runHooks(() => useSafely([state, updater]));
    safeUpdater();

    expect(updater).toHaveBeenCalledTimes(0);
  });

  it('returns a new updater that mutates the state', () => {
    const initialState = Symbol();
    const newState = Symbol();
    const [[valueA], [valueB]] = runHooks(() => useSafely(useState(initialState)), [
      ([, setState]) => setState(newState),
    ]);

    expect(valueA).toBe(initialState);
    expect(valueB).toBe(newState);
  });
});
