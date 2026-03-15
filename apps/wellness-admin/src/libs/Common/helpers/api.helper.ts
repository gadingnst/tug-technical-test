import BaseHttp from "@/libs/BaseHttp";
import { type ApiResponse } from "@wellness/shared-typescript";

/**
 * Common handler for API responses to centralize JSON parsing and error extraction.
 * It now handles the standardized ApiResponse envelope: { success, errors, message, payload }
 */
export async function handleResponse<T>(promise: Promise<Response>): Promise<T> {
  try {
    const res = await promise;
    const data = await res.json() as ApiResponse<T>;

    if (!data.success) {
      const errorMsg = (data.errors || [])[0] || data.message || 'An error occurred';
      throw new Error(errorMsg);
    }

    return data.payload as T;
  } catch (error) {
    if (error instanceof Error && !('response' in error)) {
      // Re-throw if it's already an error from the successful JSON parse but failed success check
      throw error;
    }
    const { message } = await BaseHttp.getErrorResponse(error);
    throw new Error(message);
  }
}
