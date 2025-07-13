import { AxiosError } from 'axios';

type SerializedAxiosError = {
  message: string;
  code?: string;
  status?: number;
  data?: unknown;
};

export function serializeAxiosError(error: unknown): SerializedAxiosError {
  if (error instanceof AxiosError) {
    return {
      message: error.message,
      code: error.code,
      status: error.response?.status,
      data: error.response?.data,
    };
  }
  return { message: 'Unknown error' };
}
