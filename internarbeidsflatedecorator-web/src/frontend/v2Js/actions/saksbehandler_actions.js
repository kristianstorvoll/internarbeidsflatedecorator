import { HENT_SAKSBEHANDLER_FORESPURT, HENTER_SAKSBEHANDLER, HENT_SAKSBEHANDLER_FEILET, SAKSBEHANDLER_HENTET } from './actiontyper';

export function hentSaksbehandlerFeilet() {
    return {
        type: HENT_SAKSBEHANDLER_FEILET,
    };
}

export function henterSaksbehandler() {
    return {
        type: HENTER_SAKSBEHANDLER,
    };
}

export function hentSaksbehandler() {
    return {
        type: HENT_SAKSBEHANDLER_FORESPURT,
    };
}

export function saksbehandlerHentet(data) {
    return {
        type: SAKSBEHANDLER_HENTET,
        data,
    };
}