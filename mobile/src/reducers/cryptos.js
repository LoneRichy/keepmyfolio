// @flow

import { Record, Map, fromJS } from 'immutable';

/**
 * TYPES
 */
import type { Action, CryptosState, HoldingData } from '../types';

export const StateRecord = Record({
  entities: new Map(),
  transactionId: 0,
});

function addNewHolding(state, action) {
  const _transactionId: number = state.get('transactionId') + 1;

  const _newTransaction: Map<string, HoldingData> = Map({
    [state.get('transactionId')]: fromJS(action.coin),
  });

  const _entities = state
    .get('entities')
    .mergeDeepIn([action.coin.cryptoId], _newTransaction);

  return state.set('transactionId', _transactionId).set('entities', _entities);
}

export default function cryptos(
  state: CryptosState = new StateRecord(),
  action: Action,
): CryptosState {
  switch (action.type) {
    case 'cryptos/ADD_NEW_HOLDING':
      return addNewHolding(state, action);
    default:
      return state;
  }
}
