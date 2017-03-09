import React, { PropTypes } from 'react';

const Meny = ({ fnr }) => {
    return (
        <div id="js-dekorator-nav-container" className="dekorator__nav dekorator__nav--apen" aria-controlledby="js-dekorator-toggle-meny">
            <nav id="js-dekorator-nav" className="dekorator__container dekorator__meny">
                <h2>Lenker</h2>
                <ul>
                    <li>
                        <a href={`/sykefravaer/${fnr}`}>Sykefravær</a>
                    </li>
                    <li>
                        <a href="/moteoversikt">Mine dialogmøter</a>
                    </li>
                    <li>
                        <a href="/modiabrukerdialog">Modia</a>
                    </li>
                    <li>
                        <a href="/mia">Muligheter i Arbeidslivet</a>
                    </li>
                </ul>
            </nav>
        </div>
    );
};

Meny.propTypes = {
    fnr: PropTypes.string,
};

export default Meny;
