// UI/UI/Components/Style/Alert/useAlert.tsx
import { useState } from 'react';

export interface AlertState {
  message: string;
  success: boolean;
}

type SetAlert = (alert?: AlertState) => void;

type UseAlert = [AlertState | undefined, SetAlert];

/**
 * useAlert Hook
 * @example 
 * ```
 * 
 * ```
 */
export function useAlert(): UseAlert {
  const [alertState, setAlertState] = useState<AlertState | undefined>();

  const setAlert: SetAlert = alert => setAlertState(alert);

  return [alertState, setAlert];
}
