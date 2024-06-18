import { toggleCompleteFoo, TOGGLE_COMPLETE_FOO } from './foo';

describe('toggleCompleteFoo', () => {
  it('should dispatch an action', () => {
    const result = toggleCompleteFoo('some-id');
    expect(result).toEqual({
      type: TOGGLE_COMPLETE_FOO,
      payload: {
        id: 'some-id'
      },
    });
  })
})