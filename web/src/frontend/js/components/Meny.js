import React, { PropTypes } from 'react';
import { finnMiljoStreng } from '../sagas/util';

const modappDomain = `https://modapp${finnMiljoStreng()}.adeo.no`;
const wasappDomain = `https://wasapp${finnMiljoStreng()}.adeo.no`;
const appDomain = `https://app${finnMiljoStreng()}.adeo.no`;
const funksjonsomradeLenker = (fnr, enhet) => [
    {
        tittel: 'Oppfølging',
        lenker: [
            {
                tittel: 'Arbeidsmarkedet',
                url: `${appDomain}/mia/ledigestillinger`,
            },
            {
                tittel: 'Enhetens oversikt',
                url: `${appDomain}/veilarbportefoljeflatefs/enhet?${enhet.enhetId}&clean`,
            },
            {
                tittel: 'Min oversikt',
                url: `${appDomain}/veilarbportefoljeflatefs/portefolje?enhet=${enhet.enhetId}&clean`,
            },
            {
                tittel: 'Aktivitetsplan',
                url: `${appDomain}/veilarbpersonflatefs/${fnr}`,
            },
            {
                tittel: 'Sykefraværshendelser',
                url: `${appDomain}/sykefravaersoppfoelging`,
            },
            {
                tittel: 'Dialogmøter',
                url: `${appDomain}/moteoversikt`,
            },
            {
                tittel: 'Finn fastlege',
                url: `${appDomain}/fastlege`,
            },
        ],
    },
    {
        tittel: 'Personoversikt',
        lenker: [
            {
                tittel: 'Avansert søk',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}` : ''}`,
            },
            {
                tittel: 'Saksoversikt',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!saksoversikt` : ''}`,
            },
            {
                tittel: 'Meldinger',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!meldinger` : ''}`,
            },
            {
                tittel: 'Varslinger',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!varsling` : ''}`,
            },
            {
                tittel: 'Utbetalinger',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!utbetalinger` : ''}`,
            },
            {
                tittel: 'Oppfolging',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!kontrakter` : ''}`,
            },
            {
                tittel: 'Brukerprofil',
                url: `${modappDomain}/modiabrukerdialog/${fnr ? `person/${fnr}#!brukerprofil` : ''}`,
            },
        ],
    },
];
const arenaLink = `http://arena${finnMiljoStreng()}.adeo.no/forms/arenaMod${finnMiljoStreng().replace('-', '_')}.html`;
const andreSystemerLenker = (fnr, enhet) => ({ // eslint-disable-line no-unused-vars
    tittel: 'Andre systemer',
    lenker: [
        { tittel: 'Arena personmappen', url: `${arenaLink}?oppstart_skj=AS_REGPERSONALIA&fodselsnr=${fnr}` },
        { tittel: 'AA register', url: `${modappDomain}/aareg-web/?rolle=arbeidstaker&ident=${fnr}` },
        { tittel: 'Pesys', url: `${wasappDomain}/psak/brukeroversikt/fnr=${fnr}` },
        { tittel: 'Gosys', url: `${wasappDomain}/gosys/personoversikt/fnr=${fnr}` },
    ],
});

export function FunksjonsomradeLenker({ fnr, enhet }) {
    const config = funksjonsomradeLenker(fnr, enhet);
    const kolonner = config.map((topniva) => {
        const lenker = topniva.lenker.map((lenke) => (
            <li>
                <a href={lenke.url} className="typo-normal dekorator__menylenke">{lenke.tittel}</a>
            </li>
        ));

        return (
            <section className="dekorator__kolonne">
                <h2 className="dekorator__lenkeheader">{topniva.tittel}</h2>
                <ul className="dekorator__menyliste">{lenker}</ul>
            </section>
        );
    });

    return (
        <div className="dekorator__kolonner">{kolonner}</div>
    );
}

FunksjonsomradeLenker.propTypes = {
    fnr: PropTypes.string.isRequired,
    enhet: PropTypes.string.isRequired,
};

export function AndreSystemerLenker({ fnr, enhet }) {
    const config = andreSystemerLenker(fnr, enhet);

    const lenker = config.lenker.map((lenke) => (
        <li>
            <a href={lenke.url} className="typo-normal dekorator__menylenke">{lenke.tittel}</a>
        </li>
    ));

    return (
        <section className="dekorator__rad">
            <h2 className="dekorator__lenkeheader">{config.tittel}</h2>
            <ul className="dekorator__menyliste">{lenker}</ul>
        </section>
    );
}

AndreSystemerLenker.propTypes = {
    fnr: PropTypes.string.isRequired,
    enhet: PropTypes.string.isRequired,
};

function Meny({ fnr, enhet, apen }) {
    if (!apen) {
        return null;
    }

    return (
        <div className="dekorator__nav dekorator__nav--apen">
            <nav className="dekorator__container dekorator__meny">
                <FunksjonsomradeLenker fnr={fnr} enhet={enhet} />
                <AndreSystemerLenker fnr={fnr} enhet={enhet} />
            </nav>
        </div>
    );
}

Meny.propTypes = {
    fnr: PropTypes.string.isRequired,
    enhet: PropTypes.string.isRequired,
    apen: PropTypes.bool.isRequired,
};

export default Meny;
