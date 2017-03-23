import React, { PropTypes } from 'react';
import Enhet from './Enhet';
import Saksbehandler from './Saksbehandler';
import Sokefelt from './Sokefelt';
import Overskrift from './Overskrift';
import Meny from './Meny';
import Feilmelding from './Feilmelding';
import EnhetVelger from './EnhetVelger';

const Header = ({ applicationName, fnr, toggles = {}, handleChangeEnhet = () => {}, egendefinerteLenker,
    initiellEnhet, visMeny, enheter, saksbehandler, feilmelding, toggleMeny }) =>
    (
        <div className="dekorator">
            <div className="dekorator__hode" role="banner">
                <div className="dekorator__container">
                    <header className="dekorator__banner">
                        <Overskrift applicationName={applicationName} />
                        { toggles.visEnhet && <Enhet enheter={enheter} /> }
                        { toggles.visEnhetVelger && <EnhetVelger enheter={enheter} handleChangeEnhet={handleChangeEnhet} initiellEnhet={initiellEnhet} /> }
                        { toggles.visSokefelt && <Sokefelt /> }
                        { toggles.visSaksbehandler && <Saksbehandler saksbehandler={saksbehandler} /> }
                        <button aria-pressed="false" className={`dekorator__hode__toggleMeny ${visMeny ? 'dekorator__hode__toggleMeny--apen' : ''} `}
                            onClick={() => {toggleMeny();}}>Meny</button>
                    </header>
                </div>
            </div>
            { visMeny && <Meny fnr={fnr} egendefinerteLenker={egendefinerteLenker} /> }
            { feilmelding && <Feilmelding feilmelding={feilmelding} /> }
        </div>
    );

Header.propTypes = {
    applicationName: PropTypes.string,
    toggles: PropTypes.shape({
        visEnhet: PropTypes.bool,
        visEnhetVelger: PropTypes.bool,
        visSokefelt: PropTypes.bool,
        visSaksbehandler: PropTypes.bool,
    }),
    fnr: PropTypes.string,
    visMeny: PropTypes.bool,
    toggleMeny: PropTypes.func,
    handleChangeEnhet: PropTypes.func,
    egendefinerteLenker: PropTypes.shape({
        lenker: PropTypes.arrayOf(PropTypes.array(PropTypes.string)),
    }),
    initiellEnhet: PropTypes.string,
    feilmelding: PropTypes.string,
    enheter: PropTypes.shape({
        data: PropTypes.shape({
            navn: PropTypes.string,
        }),
        henter: PropTypes.bool,
        hentingFeilet: PropTypes.bool,
    }),
    saksbehandler: PropTypes.shape({
        data: PropTypes.shape({
            navn: PropTypes.string,
            ident: PropTypes.string,
        }),
        henter: PropTypes.bool,
        hentingFeilet: PropTypes.bool,
    }),
};

export default Header;