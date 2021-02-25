export const DISPLAY = 'DISPLAY';

export const DISPLAY_NONE = 'DISPLAY_NONE';

export const Display = (message: string) => ({
  type: DISPLAY,
  payload: { modal: true, modalMessage: message },
});

export const DisplayNone = () => ({
  type: DISPLAY_NONE,
  payload: { modal: false, modalMessage: '' },
});
