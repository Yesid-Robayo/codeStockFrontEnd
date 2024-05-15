
// Función para cargar el estado
/**
 * Loads the state from the local storage.
 * @returns The parsed state object, or undefined if the state is not found or cannot be parsed.
 */
export const loadState = () => {
    try {
      const serializedState = localStorage.getItem('state');
      if (serializedState === null) {
        return undefined;
      }
      return JSON.parse(serializedState);
    } catch (err) {
      return undefined;
    }
  };
  
  export const saveState = (state:any) => {
    try {
      const serializedState = JSON.stringify(state);
      localStorage.setItem('state', serializedState);
    } catch {
      // ignora los errores de escritura
    }
  };
