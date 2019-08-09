import {AktivBruker, AktivEnhet, Saksbehandler} from './domain';
import {finnMiljoStreng} from "./utils/url-utils";
import {UseFetchHook} from "./hooks/use-fetch";

export enum ContextApiType {
    NY_AKTIV_ENHET = 'NY_AKTIV_ENHET',
    NY_AKTIV_BRUKER = 'NY_AKTIV_BRUKER'
}

async function doFetch(url: string, options?: RequestInit): Promise<Response> {
    return await fetch(url, { ...options, credentials: 'include' });
}

async function getJson<T>(url: string, options?: RequestInit): Promise<T> {
    try {
        const resp = await doFetch(url, options);
        return await resp.json();
    } catch (e) {
        return Promise.reject(e);
    }
}

async function postJson<T>(url: string, body: T, options?: RequestInit): Promise<T> {
    try {
        await doFetch(url, {
            ...options,
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(body)
        });
        return body;
    } catch (e) {
        return Promise.reject(e);
    }
}

export async function oppdaterAktivBruker(fnr: string | null | undefined) {
    return await postJson('/modiacontextholder/api/context', {
        verdi: fnr,
        eventType: ContextApiType.NY_AKTIV_BRUKER
    });
}

export async function oppdaterAktivEnhet(enhet: string | null | undefined) {
    return await postJson('/modiacontextholder/api/context', {
        verdi: enhet,
        eventType: ContextApiType.NY_AKTIV_ENHET
    });
}

export async function nullstillAktivBruker() {
    return await fetch(AKTIV_ENHET_URL, { method: 'DELETE', credentials: 'include' });
}

export const AKTIV_ENHET_URL = '/modiacontextholder/api/context/aktivenhet';
export const AKTIV_BRUKER_URL = '/modiacontextholder/api/context/aktivbruker';
export const SAKSBEHANDLER_URL = '/modiacontextholder/api/decorator';

export async function hentAktivBruker(): Promise<AktivBruker> {
    return await getJson<AktivBruker>(AKTIV_BRUKER_URL);
}

export async function hentAktivEnhet(): Promise<AktivEnhet> {
    return await getJson<AktivEnhet>(AKTIV_ENHET_URL);
}

export function getWebSocketUrl(saksbehandler: UseFetchHook<Saksbehandler>) {
    if (process.env.NODE_ENV === 'development') {
        return 'ws://localhost:2999/hereIsWS';
    }
    return saksbehandler
        .data
        .map((saksbehandler) => saksbehandler.ident)
        .map((ident) => `wss://veilederflatehendelser${finnMiljoStreng()}.adeo.no/modiaeventdistribution/ws/${ident}`)
        .withDefault(undefined);
}