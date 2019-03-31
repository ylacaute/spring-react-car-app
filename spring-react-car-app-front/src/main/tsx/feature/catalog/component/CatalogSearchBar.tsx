import React from "react";
import {PulseLoader} from "halogenium";
import Select from "react-select/lib/Creatable";
import {CatalogFilterModel, CatalogFilterOption} from "../model/CatalogFilterModel";
import "./CatalogSearchBar.scss";
import {BrandModel} from "../model/BrandModel";

const brandsToOptions = (brands: BrandModel[]) => {
    return brands.map(b => {
        return {
            value: b.name.toLowerCase(),
            label: b.name.toUpperCase()
        }
    })
};

interface Props {
    brands: BrandModel[];
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
        const { filter, brands } = this.props;

        return (
            <Select
                className="catalog-search-box"
                classNamePrefix="search-box"
                placeholder="Chercher par marque, modèle, ou tout autre mot clé..."
                formatCreateLabel={(value) => `Chercher avec '${value}' ('Entrer' pour valider)`}
                value={filter.options}
                isMulti
                onChange={this.handleChange}
                options={brandsToOptions(brands)}
            />
        );
    }
}

export default CatalogSearchBar;
