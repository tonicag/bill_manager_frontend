export type ResponseDTO<T> =
  | {
      isSuccess: false;
      message: string;
    }
  | {
      isSuccess: true;
      result: T;
    };
