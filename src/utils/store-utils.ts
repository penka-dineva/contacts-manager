import { Action, createAction } from '@ngrx/store';
import { ServerItemBase } from 'src/models/server-item.model';

const actionTypeCache: {[actionType: string]: boolean} = {};

export function actionType(actionTypeName: string) {
  if(actionTypeCache[actionTypeName]){
    throw new Error('Action type name: ${actionTypeName} is already registered');
  }

  actionTypeCache[actionTypeName] = true;
  return actionTypeName;
}

export const createUniqueAction = <T extends object>(type: string) => createAction(
  actionType(type),
  (payload?: T | null) => ({payload})
)

export const httpAction = <T extends Object, K extends Object>(actionBase: string) => {
 return {
    init: createUniqueAction<T>(actionBase),
    success: createUniqueAction<T>(`${actionBase} Success` ),
    failed: createUniqueAction<T>(`${actionBase} Fail`),
  }
}

export interface ActionWithPayload extends Action {
  payload?: any;
}

export function serverCallStart(state: any, action: ActionWithPayload, propertyName: string) {
  return {
    ...state,
    [propertyName]: {
      isLoading: false,
      value: null
    } as ServerItemBase
  }
}

export function serverCallSuccess(state: any, action: ActionWithPayload, propertyName: string) {
  return {
    ...state,
    [propertyName]: {
      isLoading: false,
      value: action.payload
    } as ServerItemBase
  }
}

export function serverCallFailure(state: any, action: ActionWithPayload, propertyName: string) {
  return {
    ...state,
    [propertyName]: {
      isLoading: false,
      error: action.payload
    } as ServerItemBase
  }
}

export function serverCallDeletionSuccess(state: any, storeValue: any, propertyName: string) {
  return {
    ...state,
    [propertyName]: {
      isLoading: false,
      value: storeValue
    } as ServerItemBase
  }
}
