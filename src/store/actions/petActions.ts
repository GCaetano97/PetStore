export const CHANGE_FILTER = 'CHANGE_FILTER';

export const ChangeFilter = (filter: string) => ({
  type: CHANGE_FILTER,
  payload: { filter },
});
