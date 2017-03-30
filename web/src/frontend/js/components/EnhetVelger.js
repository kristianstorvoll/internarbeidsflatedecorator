import React, { PropTypes } from 'react';
import Select from 'react-select';

const hentEnhetListeInnerHTML = (enhetliste, valgtEnhet, enhetValgt, handleChangeEnhet) => {
    if (enhetliste.length === 1) {
        return (
            <section className="dekorator-enhet">
                <h1 className="typo-avsnitt">{`${enhetliste[0].enhetId} ${enhetliste[0].navn}`}</h1>
            </section>
        );
    }
    const options = enhetliste.map((enhet) => ({ value: enhet.enhetId, label: `${enhet.enhetId} ${enhet.navn}` }));
    return (
        <section className="dekorator-enhet">
            <Select
                value={valgtEnhet}
                onChange={(event) => {
                    handleChangeEnhet(event.value);
                    enhetValgt(event.value);
                }}
                options={options}
                clearable={false}
                searchable={false}
            />
        </section>
    );
};

const EnhetVelger = ({ enheter, enhetValgt, handleChangeEnhet }) => {
    if (enheter.henter) {
        return <span aria-pressed="false" className="dekorator__hode__enhet">Henter...</span>;
    } else if (enheter.hentingFeilet) {
        return <span aria-pressed="false" className="dekorator__hode__enhet">Kunne ikke hente enheter</span>;
    }
    return hentEnhetListeInnerHTML(enheter.data.enhetliste, enheter.valgtEnhet, enhetValgt, handleChangeEnhet);
};

EnhetVelger.propTypes = {
    enheter: PropTypes.arrayOf({
        henter: PropTypes.bool,
        hentingFeilet: PropTypes.bool,
        data: PropTypes.shape({
            enhetListe: PropTypes.arrayOf({
                enhetId: PropTypes.string,
                navn: PropTypes.string,
            }),
        }),
    }),
    valgtEnhet: PropTypes.string,
    handleChangeEnhet: PropTypes.func,
    enhetValgt: PropTypes.func,
};

export default EnhetVelger;