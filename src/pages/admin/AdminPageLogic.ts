import { useState } from "react";
import { useLabels, useStyles } from "../../hooks/contextHooks";
import { typeOfOptionCreateCompany } from "../../utils/utilsTypes";

/**
 * Represents the logic for the AdminPage component.
 * @returns An object containing the labels, styles, option, and onChange function.
 */
export const AdminPageLogic = () => {
    const labels = useLabels();
    const styles = useStyles();
    const [option, setOption] = useState<typeOfOptionCreateCompany>('add');

    /**
     * Handles the change event for the option.
     * @param option - The new option value.
     */
    const onChange = (option: typeOfOptionCreateCompany) => {
        setOption(option);
    }

    return {
        labels,
        styles,
        option,
        onChange
    }
}