export interface ServerItemBase {
  isLoading: boolean;
  value: any;
  error?: any;
}

export interface ServerItem<T> extends ServerItemBase {
  value: T;
}

export interface ServerItemWithId<T> extends ServerItem<T> {
  identifier: string;
}