import React from "react";
import {PulseLoader} from "halogenium";
import Select from "react-select/lib/Creatable";
import {CatalogFilterModel, CatalogFilterOption} from "../model/CatalogFilterModel";
import "./ProductCard.scss";

/**
 * Default option to display for the user
 */
const options = [
    { value: 'NOREV', label: 'NOREV' },
    { value: 'UNIVERSAL HOBBIES', label: 'UNIVERSAL HOBBIES' },
    { value: 'ALTAYA', label: 'ALTAYA' },
    { value: 'DIECAST', label: 'DIECAST' },
    { value: 'IXO', label: 'IXO' },
    { value: 'SOLIDO', label: 'SOLIDO' },
    { value: 'DELPRADO', label: 'DELPRADO' },
    { value: 'ELIGOR', label: 'ELIGOR' },
];

interface Props {
    filter: CatalogFilterModel;
    changeFilter: (filter: CatalogFilterModel, pushHistory:boolean) => void;
}

class CatalogSearchBar extends React.Component<Props> {

    constructor(props) {
        super(props);
        this.handleChange = this.handleChange.bind(this);
    }

    handleChange(selectedOption: CatalogFilterOption[]) {
        this.setState({ selectedOption });
        this.props.changeFilter({ options: selectedOption }, true);
    }

    render() {
        const { filter } = this.props;

        return (
            <Select
                value={filter.options}
                isMulti
                onChange={this.handleChange}
                options={options}
            />
        );
    }
}

export default CatalogSearchBar;
