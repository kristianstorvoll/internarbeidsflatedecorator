import init from './init';
import personsok from './personsok';
import varsel from './varsel';
import { hentEnheter, hentVeileder } from './vis-veileder';

document.addEventListener('DOMContentLoaded', init);
document.addEventListener('DOMContentLoaded', personsok);

document.varsel = varsel;
document.internarbeidsflatedecoratorErLastet = true;
document.hentVeileder = hentVeileder;
document.hentEnheter = hentEnheter;