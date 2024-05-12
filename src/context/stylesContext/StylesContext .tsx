import { createContext } from 'react';
import { STYLES } from '../../styles/styles';

/**
 * Context object for managing styles.
 * @remarks
 * This context provides a way to manage styles throughout the application.
 * It is created using the `createContext` function from the React library.
 * The initial value of the context is provided by the `STYLES` constant imported from the styles module.
 */
export const StylesContext = createContext(STYLES);
