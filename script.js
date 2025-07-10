// Wir importieren die pdf.js Bibliothek, die wir in der HTML geladen haben.
import * as pdfjsLib from "https://mozilla.github.io/pdf.js/build/pdf.mjs";
pdfjsLib.GlobalWorkerOptions.workerSrc = `https://mozilla.github.io/pdf.js/build/pdf.worker.mjs`;

document.addEventListener('DOMContentLoaded', () => {
    // Schlüssel für den LocalStorage und Definition der Initialdaten
    const LOCAL_STORAGE_KEY = 'donnerPartnerStandorteData';
    const initialStandorte = [
        { name: "Waiblingen", lat: 48.8306, lon: 9.3195, address: "Stuttgarter Str. 104, 71332 Waiblingen", phone: "07151 951-200", email: "info.wn@donner-partner.de", stats: { jobOpenings: "2451", unemploymentRate: "4.5", totalUnemployed: "11179", unemployedSGB3: "4459", unemployedSGB2: "6720" } },
        { name: "Achern", lat: 48.6325, lon: 8.075, address: "Hauptstraße 59, 77855 Achern", phone: "07841 6841047", email: "info.achern@donner-partner.eu", stats: { jobOpenings: "480", unemploymentRate: "3.5", totalUnemployed: "950", unemployedSGB3: "400", unemployedSGB2: "550" } },
        { name: "Backnang", lat: 48.9465, lon: 9.4303, address: "Annonay - Straße 1, 71522 Backnang", phone: "07221 3784291", email: "info.bad@donner-partner.eu", stats: { jobOpenings: "880", unemploymentRate: "3.9", totalUnemployed: "2100", unemployedSGB3: "900", unemployedSGB2: "1200" } },
        { name: "Baden-Baden", lat: 48.7606, lon: 8.2397, address: "Schwarzwaldstr. 139, 76532 Baden-Baden", phone: "07221 3784291", email: "info.bad@donner-partner.eu", stats: { jobOpenings: "1200", unemploymentRate: "4.8", totalUnemployed: "2300", unemployedSGB3: "1000", unemployedSGB2: "1300" } },
        { name: "Calw", lat: 48.715, lon: 8.736, address: "Biergasse 11, 75365 Calw", phone: "07051 9346665", email: "info.cw@donner-partner.de", stats: { jobOpenings: "650", unemploymentRate: "3.2", totalUnemployed: "1500", unemployedSGB3: "650", unemployedSGB2: "850" } },
        { name: "Esslingen", lat: 48.741, lon: 9.311, address: "Mettinger Str. 123, 73728 Esslingen", phone: "0711 36576320", email: "info.es@donner-partner.de", stats: { jobOpenings: "2800", unemploymentRate: "4.1", totalUnemployed: "6500", unemployedSGB3: "2800", unemployedSGB2: "3700" } },
        { name: "Geislingen", lat: 48.625, lon: 9.829, address: "Talgraben 40, 73312 Geislingen", phone: "07331 9459294", email: "info.geislingen@donner-partner.de", stats: { jobOpenings: "700", unemploymentRate: "3.8", totalUnemployed: "1800", unemployedSGB3: "800", unemployedSGB2: "1000" } },
        { name: "Göppingen", lat: 48.702, lon: 9.653, address: "Heinrich-Landerer-Straße 65, 73037 Göppingen", phone: "07161 969736", email: "info.gp@donner-partner.de", stats: { jobOpenings: "1900", unemploymentRate: "3.7", totalUnemployed: "4500", unemployedSGB3: "2000", unemployedSGB2: "2500" } },
        { name: "Heidenheim", lat: 48.677, lon: 10.153, address: "Friedrich-Ebert-Strasse 25/7, 89522 Heidenheim", phone: "07321 4880810", email: "info.hdh@donner-partner.de", stats: { jobOpenings: "1300", unemploymentRate: "3.3", totalUnemployed: "3200", unemployedSGB3: "1400", unemployedSGB2: "1800" } },
        { name: "Heilbronn", lat: 49.142, lon: 9.218, address: "Wilhelmstraße 23, 74072 Heilbronn", phone: "07131 38578-0", email: "info.hn@donner-partner.eu", stats: { jobOpenings: "3500", unemploymentRate: "3.9", totalUnemployed: "7800", unemployedSGB3: "3100", unemployedSGB2: "4700" } },
        { name: "Karlsruhe", lat: 49.006, lon: 8.403, address: "Benzstraße 15, 76185 Karlsruhe", phone: "0721 8301044", email: "info.ka@donner-partner.de", stats: { jobOpenings: "6500", unemploymentRate: "4.5", totalUnemployed: "12500", unemployedSGB3: "5000", unemployedSGB2: "7500" } },
        { name: "Ludwigsburg", lat: 48.897, lon: 9.192, address: "Mörikestraße 17-21, 71636 Ludwigsburg", phone: "07141 922423", email: "info.lb@donner-partner.eu", stats: { jobOpenings: "3200", unemploymentRate: "3.6", totalUnemployed: "7200", unemployedSGB3: "3000", unemployedSGB2: "4200" } },
        { name: "Offenburg", lat: 48.475, lon: 7.947, address: "Wilhelm-Röntgen-Straße 27, 77656 Offenburg", phone: "0781 91906797", email: "info.og@donner-partner.eu", stats: { jobOpenings: "1800", unemploymentRate: "4.2", totalUnemployed: "4800", unemployedSGB3: "2100", unemployedSGB2: "2700" } },
        { name: "Pforzheim", lat: 48.89, lon: 8.70, address: "Luisenstraße 27, 75172 Pforzheim", phone: "07231 204030", email: "info.pf@donner-partner.de", stats: { jobOpenings: "2500", unemploymentRate: "6.5", totalUnemployed: "6800", unemployedSGB3: "2600", unemployedSGB2: "4200" } },
        { name: "Radolfzell", lat: 47.737, lon: 8.966, address: "Walter-Schellenberg-Straße 7, 78315 Radolfzell", phone: "07732 9453092", email: "info.rzell@donner-partner.de", stats: { jobOpenings: "900", unemploymentRate: "3.1", totalUnemployed: "1900", unemployedSGB3: "800", unemployedSGB2: "1100" } },
        { name: "Schorndorf", lat: 48.805, lon: 9.528, address: "Stuttgarter Str. 61, 73614 Schorndorf", phone: "07181 979703", email: "info.schorndorf@donner-partner.de", stats: { jobOpenings: "850", unemploymentRate: "3.5", totalUnemployed: "1700", unemployedSGB3: "750", unemployedSGB2: "950" } },
        { name: "Sindelfingen", lat: 48.713, lon: 9.002, address: "Böblinger Straße 130, 71065 Sindelfingen", phone: "07031 415573", email: "info.sifi@donner-partner.de", stats: { jobOpenings: "2200", unemploymentRate: "3.9", totalUnemployed: "4900", unemployedSGB3: "2100", unemployedSGB2: "2800" } },
        { name: "Stuttgart", lat: 48.775, lon: 9.182, address: "Kriegerstraße 3, 70191 Stuttgart", phone: "0711 603324", email: "info.s@donner-partner.eu", stats: { jobOpenings: "15000", unemploymentRate: "4.2", totalUnemployed: "28000", unemployedSGB3: "11000", unemployedSGB2: "17000" } },
        { name: "Tauberbischofsheim", lat: 49.622, lon: 9.662, address: "Am Wört 1, 97941 Tauberbischofsheim", phone: "09341 8589680", email: "info.tbb@donner-partner.de", stats: { jobOpenings: "600", unemploymentRate: "2.9", totalUnemployed: "1200", unemployedSGB3: "500", unemployedSGB2: "700" } },
        { name: "Ulm", lat: 48.401, lon: 9.987, address: "Neutorstr. 12, 89073 Ulm", phone: "07151 951-200", email: "info.wn@donner-partner.de", stats: { jobOpenings: "3800", unemploymentRate: "3.0", totalUnemployed: "5500", unemployedSGB3: "2200", unemployedSGB2: "3300" } },
        { name: "Wertheim", lat: 49.758, lon: 9.516, address: "John-F.-Kennedy-Str. 4, 97877 Wertheim", phone: "08041 7928886", email: "info.badtoelz@donner-partner.eu", stats: { jobOpenings: "750", unemploymentRate: "3.4", totalUnemployed: "1400", unemployedSGB3: "600", unemployedSGB2: "800" } },
        { name: "Bad Tölz", lat: 47.76, lon: 11.56, address: "Prof.-Max-Lange-Platz 4, 83646 Bad Tölz", phone: "08041 7928886", email: "info.badtoelz@donner-partner.eu", stats: { jobOpenings: "750", unemploymentRate: "2.8", totalUnemployed: "1900", unemployedSGB3: "800", unemployedSGB2: "1100" } },
        { name: "Deggendorf", lat: 48.835, lon: 12.963, address: "Zieglerstraße 2a, 94469 Deggendorf", phone: "0991 8517", email: "info.deg@donner-partner.de", stats: { jobOpenings: "1100", unemploymentRate: "3.0", totalUnemployed: "2100", unemployedSGB3: "900", unemployedSGB2: "1200" } },
        { name: "Karlstadt", lat: 49.961, lon: 9.769, address: "Hauptstraße 69, 97753 Karlstadt", phone: "09353 9840831", email: "info.msp@donner-partner.eu", stats: { jobOpenings: "550", unemploymentRate: "2.8", totalUnemployed: "900", unemployedSGB3: "400", unemployedSGB2: "500" } },
        { name: "Landshut", lat: 48.536, lon: 12.153, address: "Johannisstraße 24, 84034 Landshut", phone: "N/A", email: "N/A", stats: { jobOpenings: "1800", unemploymentRate: "2.7", totalUnemployed: "2800", unemployedSGB3: "1200", unemployedSGB2: "1600" } },
        { name: "Regen", lat: 48.97, lon: 13.127, address: "Am Sand 8 1. OG, 94209 Regen", phone: "09921 9079884", email: "info.deg@donner-partner.de", stats: { jobOpenings: "450", unemploymentRate: "2.9", totalUnemployed: "800", unemployedSGB3: "350", unemployedSGB2: "450" } },
        { name: "Rosenheim", lat: 47.856, lon: 12.128, address: "Aventinstr. 2, 83022 Rosenheim", phone: "08031 43668", email: "info.ro@donner-partner.eu", stats: { jobOpenings: "2100", unemploymentRate: "2.7", totalUnemployed: "2900", unemployedSGB3: "1200", unemployedSGB2: "1700" } },
        { name: "Straubing", lat: 48.88, lon: 12.576, address: "Bahnhofstr. 5, 94315 Straubing", phone: "09421 9298982", email: "info.deg@donner-partner.de", stats: { jobOpenings: "1300", unemploymentRate: "3.1", totalUnemployed: "2400", unemployedSGB3: "1000", unemployedSGB2: "1400" } },
        { name: "Würzburg", lat: 49.791, lon: 9.953, address: "Gneisenaustr. 11, 97074 Würzburg", phone: "0931 73041150", email: "info.wue@donner-partner.eu", stats: { jobOpenings: "3500", unemploymentRate: "3.8", totalUnemployed: "5200", unemployedSGB3: "2100", unemployedSGB2: "3100" } },
        { name: "Berlin", lat: 52.517, lon: 13.456, address: "Möllendorffstraße 49, 10367 Berlin", phone: "030 25095036", email: "gs.b@donner-partner.de", stats: { jobOpenings: "28000", unemploymentRate: "9.1", totalUnemployed: "185000", unemployedSGB3: "60000", unemployedSGB2: "125000" } },
        { name: "Limburg", lat: 50.383, lon: 8.066, address: "Industriestraße 11-13, 65549 Limburg", phone: "06431 9089577", email: "info.lim@donner-partner.de", stats: { jobOpenings: "1400", unemploymentRate: "4.8", totalUnemployed: "3500", unemployedSGB3: "1500", unemployedSGB2: "2000" } },
        { name: "Wiesbaden", lat: 50.082, lon: 8.24, address: "Hagenauer Straße 17-19, 65203 Wiesbaden", phone: "0611 44857410", email: "info.wi@donner-partner.de", stats: { jobOpenings: "5500", unemploymentRate: "7.1", totalUnemployed: "11500", unemployedSGB3: "4500", unemployedSGB2: "7000" } },
        { name: "Hannover", lat: 52.375, lon: 9.732, address: "Büttnerstraße 19, 30165 Hannover", phone: "0511 45960735", email: "info.h@donner-partner.com", stats: { jobOpenings: "9500", unemploymentRate: "7.8", totalUnemployed: "24000", unemployedSGB3: "9000", unemployedSGB2: "15000" } },
        { name: "Stadthagen", lat: 52.325, lon: 9.206, address: "St. Annen 11, 31655 Stadthagen", phone: "0671 97096-120", email: "info.kh@donner-partner.com", stats: { jobOpenings: "800", unemploymentRate: "5.5", totalUnemployed: "2200", unemployedSGB3: "900", unemployedSGB2: "1300" } },
        { name: "Bad Kreuznach", lat: 49.847, lon: 7.865, address: "Europaplatz 13, 55543 Bad Kreuznach", phone: "0671 97096-120", email: "info.kh@donner-partner.com", stats: { jobOpenings: "950", unemploymentRate: "5.2", totalUnemployed: "4300", unemployedSGB3: "1800", unemployedSGB2: "2500" } },
        { name: "Hachenburg", lat: 50.662, lon: 7.824, address: "Lindenstraße 49, 57627 Hachenburg", phone: "02662 8879020", email: "info.ha@donner-partner.eu", stats: { jobOpenings: "700", unemploymentRate: "4.5", totalUnemployed: "1600", unemployedSGB3: "700", unemployedSGB2: "900" } },
        { name: "Ingelheim", lat: 49.974, lon: 8.053, address: "Konrad-Adenauer-Straße 30, 55218 Ingelheim", phone: "06131 6372-470", email: "deufoe.mz@donner-partner.eu", stats: { jobOpenings: "1100", unemploymentRate: "4.2", totalUnemployed: "2500", unemployedSGB3: "1100", unemployedSGB2: "1400" } },
        { name: "Mainz", lat: 50.001, lon: 8.27, address: "Rheinstr. 4, 55116 Mainz", phone: "06131 6372-470", email: "deufoe.mz@donner-partner.eu", stats: { jobOpenings: "4500", unemploymentRate: "6.1", totalUnemployed: "7800", unemployedSGB3: "3000", unemployedSGB2: "4800" } },
        { name: "Westerburg", lat: 50.563, lon: 7.975, address: "Neustraße 12-14, 56457 Westerburg", phone: "02663 9649750", email: "info.we@donner-partner.eu", stats: { jobOpenings: "600", unemploymentRate: "4.7", totalUnemployed: "1400", unemployedSGB3: "600", unemployedSGB2: "800" } },
        { name: "Wissen", lat: 50.781, lon: 7.736, address: "Böhmerstraße 16-20, 57537 Wissen", phone: "03591 4640547", email: "info.bz@donner-partner.de", stats: { jobOpenings: "800", unemploymentRate: "5.1", totalUnemployed: "1900", unemployedSGB3: "800", unemployedSGB2: "1100" } },
        { name: "Bautzen", lat: 51.181, lon: 14.423, address: "Wallstraße 12, 02625 Bautzen", phone: "03591 4640547", email: "info.bz@donner-partner.de", stats: { jobOpenings: "1100", unemploymentRate: "6.8", totalUnemployed: "5200", unemployedSGB3: "1900", unemployedSGB2: "3300" } },
        { name: "Bautzen II", lat: 51.173, lon: 14.435, address: "Wilthener Straße 32, 02625 Bautzen", phone: "03591 5969-307", email: "gs.bz@donner-partner.de", stats: { jobOpenings: "1100", unemploymentRate: "6.8", totalUnemployed: "5200", unemployedSGB3: "1900", unemployedSGB2: "3300" } },
        { name: "Chemnitz", lat: 50.833, lon: 12.919, address: "August-Bebel-Str. 11-13, 09113 Chemnitz", phone: "0351 26057309", email: "gs.dd@donner-partner.de", stats: { jobOpenings: "3500", unemploymentRate: "7.9", totalUnemployed: "10500", unemployedSGB3: "3800", unemployedSGB2: "6700" } },
        { name: "Dresden", lat: 51.05, lon: 13.73, address: "Berliner Straße 11, 01067 Dresden", phone: "0351 42603388", email: "gs.dd@donner-partner.de", stats: { jobOpenings: "7200", unemploymentRate: "5.8", totalUnemployed: "18000", unemployedSGB3: "7000", unemployedSGB2: "11000" } },
        { name: "Dresden II", lat: 51.06, lon: 13.72, address: "Berliner Straße 65, 01067 Dresden", phone: "0351 26057309", email: "gs.dd@donner-partner.de", stats: { jobOpenings: "7200", unemploymentRate: "5.8", totalUnemployed: "18000", unemployedSGB3: "7000", unemployedSGB2: "11000" } },
        { name: "Görlitz", lat: 51.152, lon: 14.987, address: "Postplatz 14/15, 02826 Görlitz", phone: "03581 400570", email: "gs.gr@donner-partner.de", stats: { jobOpenings: "900", unemploymentRate: "9.5", totalUnemployed: "4000", unemployedSGB3: "1400", unemployedSGB2: "2600" } },
        { name: "Görlitz II", lat: 51.155, lon: 14.983, address: "Jakobstraße 15, 02826 Görlitz", phone: "03581 400570", email: "gs.gr@donner-partner.de", stats: { jobOpenings: "900", unemploymentRate: "9.5", totalUnemployed: "4000", unemployedSGB3: "1400", unemployedSGB2: "2600" } },
        { name: "Hoyerswerda", lat: 51.436, lon: 14.25, address: "Thomas-Müntzer-Straße 25, 02977 Hoyerswerda", phone: "03571 6098686", email: "gs.hy@donner-partner.de", stats: { jobOpenings: "700", unemploymentRate: "8.9", totalUnemployed: "3500", unemployedSGB3: "1200", unemployedSGB2: "2300" } },
        { name: "Kamenz", lat: 51.27, lon: 14.094, address: "Zum Tower 4, 01917 Kamenz", phone: "03578 3090217", email: "gs.km@donner-partner.eu", stats: { jobOpenings: "500", unemploymentRate: "5.8", totalUnemployed: "1500", unemployedSGB3: "600", unemployedSGB2: "900" } },
        { name: "Pirna", lat: 50.962, lon: 13.942, address: "Longuyoner Str. 34, 01796 Pirna", phone: "03501 5008268", email: "gs.pir@donner-partner.de", stats: { jobOpenings: "800", unemploymentRate: "5.5", totalUnemployed: "2200", unemployedSGB3: "900", unemployedSGB2: "1300" } },
        { name: "Radeberg", lat: 51.116, lon: 13.919, address: "Straße des Friedens 8, 01454 Radeberg", phone: "03528 2268904", email: "gs.rdg@donner-partner.eu", stats: { jobOpenings: "600", unemploymentRate: "4.9", totalUnemployed: "1300", unemployedSGB3: "500", unemployedSGB2: "800" } },
        { name: "Weißwasser", lat: 51.506, lon: 14.639, address: "Braunsteichweg 33, 02943 Weißwasser", phone: "03576 2989680", email: "gs.wsw@donner-partner.de", stats: { jobOpenings: "400", unemploymentRate: "10.2", totalUnemployed: "2100", unemployedSGB3: "700", unemployedSGB2: "1400" } },
        { name: "Zittau", lat: 50.896, lon: 14.807, address: "Christian-Keimann-Straße 44a, 02763 Zittau", phone: "03583 9389938", email: "gs.zi@donner-partner.eu", stats: { jobOpenings: "650", unemploymentRate: "8.7", totalUnemployed: "2500", unemployedSGB3: "900", unemployedSGB2: "1600" } }
    ];
    let standorteData;
    
    const mapFile = './assets/germany.svg';
    const analysisSteps = [
        { id: "einleitung", title: "Management Summary & Einleitung", content: `<section><h3>Management Summary und Einleitung</h3><p>Diese Arbeitsmarktanalyse für den Standort %%location%% (Stand: %%currentDate%%) liefert eine fundierte Entscheidungsgrundlage für die strategische Ausrichtung des Kursportfolios von Donner und Partner. Die Untersuchung zeigt einen robusten Arbeitsmarkt mit %%jobOpenings%% offenen Stellen, der jedoch von einem signifikanten Fachkräftemangel und qualitativen Mismatch geprägt ist. Die Arbeitslosenquote von %%unemploymentRate%%% bei %%totalUnemployed%% arbeitslosen Personen verdeutlicht das Potenzial für gezielte Qualifizierungsmaßnahmen. Die folgende Analyse identifiziert die größten Bedarfssektoren, leitet daraus passgenaue Bildungsempfehlungen ab und mündet in einer konkreten strategischen Handlungsempfehlung zur optimalen Positionierung am Markt.</p></section>` },
        { id: "datengrundlage", title: "Detaillierte Datengrundlage", content: `<section><h3>Detaillierte Datengrundlage für %%location%%</h3><p>Die nachfolgenden Kennzahlen bilden das quantitative Fundament dieser Analyse. Sie beschreiben den Zustand des lokalen Arbeitsmarktes und ermöglichen eine erste Einordnung der Herausforderungen und Chancen.</p>
        <table class="data-table">
            <thead><tr><th>Kennzahl</th><th>Wert</th></tr></thead>
            <tbody>
                <tr><td>Arbeitslosenquote</td><td class="value">%%unemploymentRate%%%</td></tr>
                <tr><td>Arbeitslose insgesamt</td><td class="value">%%totalUnemployed%%</td></tr>
                <tr><td>Arbeitslose SGB III (Versicherung)</td><td class="value">%%unemployedSGB3%%</td></tr>
                <tr><td>Arbeitslose SGB II (Grundsicherung)</td><td class="value">%%unemployedSGB2%%</td></tr>
                <tr><td>Offene Stellen</td><td class="value">%%jobOpenings%%</td></tr>
            </tbody>
        </table>
        <p><strong>Interpretation:</strong> Die Aufteilung zwischen SGB III und SGB II ist ein wichtiger Indikator. Ein hoher Anteil an SGB-II-Empfängern (Bürgergeld) deutet oft auf einen Bedarf an grundlegenderen Qualifizierungen und intensiverer Betreuung hin, während SGB-III-Empfänger (Arbeitslosengeld I) häufig näher am Arbeitsmarkt sind und von gezielten Weiterbildungen zur Anpassung ihrer Qualifikationen profitieren.</p></section>` },
        { id: "stellenanalyse", title: "Analyse der offenen Stellen", content: `<section><h3>Analyse der %%jobOpenings%% offenen Stellen nach Sektoren</h3><p>Die Verteilung der offenen Stellen ist der wichtigste Indikator für die Nachfrage der regionalen Wirtschaft. Die Grafik zeigt deutlich, dass die Sektoren %%topSectors%% die mit Abstand größten Bedarfe an neuen Mitarbeitern haben. Diese datengestützte Erkenntnis ist der zentrale Hebel für die Ausrichtung des Kursportfolios.</p><figure><div id="chart-jobs" class="chart-container"></div><figcaption>Balkendiagramm: Geschätzte Verteilung der offenen Stellen nach Top-Sektoren.</figcaption></figure></section>` },
        { id: "zielgruppenanalyse", title: "Analyse der arbeitslosen Zielgruppen", content: `<section><h3>Analyse der %%totalUnemployed%% Arbeitslosen nach Zielgruppen</h3><p>Um Qualifizierungsmaßnahmen erfolgreich zu gestalten, ist ein Verständnis der Zielgruppenstruktur unerlässlich. Die Daten zeigen, dass ein signifikanter Anteil der Arbeitslosen spezifische Merkmale aufweist, die bei der Kurskonzeption und -durchführung berücksichtigt werden müssen.</p>
        <table class="data-table">
            <thead><tr><th>Zielgruppe</th><th>Anzahl</th></tr></thead>
            <tbody>
                <tr><td><div>Frauen</div></td><td class="value">%%unemployedWomen%%</td></tr>
                <tr><td><div>Jugendliche (15-24 J.) <span class="female-quote">Frauenanteil: %%unemployedYouthFemale%%</span></div></td><td class="value">%%unemployedYouth%%</td></tr>
                <tr><td><div>Ältere (50+) <span class="female-quote">Frauenanteil: %%unemployedSeniorsFemale%%</span></div></td><td class="value">%%unemployedSeniors%%</td></tr>
                <tr><td><div>Ausländer/Geflüchtete <span class="female-quote">Frauenanteil: %%unemployedForeignersFemale%%</span></div></td><td class="value">%%unemployedForeigners%%</td></tr>
            </tbody>
        </table>
        <p><strong>Interpretation:</strong> Die hohe Zahl älterer Arbeitsloser (%%unemployedSeniors%%) erfordert Angebote zum "Upskilling". Die Gruppe der Zugewanderten (%%unemployedForeigners%%) benötigt oft eine Kombination aus Fach- und Sprachqualifizierung. Der bedeutende Anteil an arbeitslosen Frauen (%%unemployedWomen%%) unterstreicht die Notwendigkeit von flexiblen Angeboten wie Teilzeit-Qualifizierungen, um den Wiedereinstieg in den Beruf zu erleichtern.</p></section>` },
        { id: "trends", title: "Trends, Chancen & Herausforderungen", content: `<section><h3>Trends, Chancen und Herausforderungen</h3><h4>Top-Wachstumsbranchen als Chance:</h4><p>Die größten Chancen für eine erfolgreiche Vermittlung liegen eindeutig in den datenbasiert identifizierten Top-Sektoren: %%topSectors%%. Eine konsequente Ausrichtung des Portfolios auf diese Bereiche ist strategisch zwingend.</p><h4>Zentrale Herausforderung: Qualifikations-Mismatch</h4><p>Die Koexistenz von %%jobOpenings%% offenen Stellen und %%totalUnemployed%% Arbeitslosen belegt den zentralen "Mismatch" am Arbeitsmarkt. Es fehlt nicht an Arbeitsplätzen, sondern an Bewerbern mit den passenden Qualifikationen. Genau hier liegt die Kernkompetenz und die größte Chance für Donner und Partner als Bildungsdienstleister: diese Lücke durch gezielte Qualifizierung zu schließen.</p></section>` },
        { id: "portfolio_matching", title: "Portfolio-Abgleich: D+P-Kurse vs. Arbeitsmarktbedarf", content: `<section><h3>Portfolio-Abgleich: D+P-Kurse versus Arbeitsmarktbedarf in %%location%%</h3><p>Dieser Schritt vergleicht das aktuelle Kursportfolio von Donner und Partner (FbW & AVGS) direkt mit dem zuvor analysierten, spezifischen Bedarf des regionalen Arbeitsmarktes. Ziel ist es, Stärken, Potenziale und Lücken im Angebot zu identifizieren.</p><h4>Stärken des Portfolios (Hohe Deckungsgleichheit):</h4><ul><li><strong>Kaufmännischer Bereich & Verwaltung (FbW & AVGS):</strong><div class="justification">Das breite Angebot von Umschulungen (Büromanagement, Industriekaufmann), TQs, Übungsfirmen und kürzeren Qualifizierungen (MS Office, Buchhaltung) deckt den Kernbedarf von %%jobsOffice%% Stellen exzellent ab.</div></li><li><strong>Lager & Logistik (FbW):</strong><div class="justification">Die Kombination aus Umschulung zum Fachlageristen und dem Flurfördermittelschein bedient die Nachfrage von %%jobsLogistics%% Stellen sehr passgenau.</div></li><li><strong>Bewerbung & Coaching (AVGS):</strong><div class="justification">Das umfassende Coaching-Angebot (Bewerbung 4.0, Potenzialanalysen, Return-Coachings) ist eine universelle Stärke, die die Vermittlungschancen für alle Zielgruppen und Sektoren erhöht.</div></li></ul><h4>Potenziale im Portfolio (Angebote ausbauen):</h4><ul><li><strong>IT & Digitalisierung (FbW):</strong><div class="justification">Die Umschulung zum Fachinformatiker ist eine perfekte Antwort auf den Bedarf von %%jobsIT%% Stellen, wird aber nur an wenigen Standorten angeboten. Die "digi"-Module bieten eine gute Grundlage, aber es fehlen weiterführende Kurse.</div></li><li><strong>Pflege & Soziales (FbW):</strong><div class="justification">Die Qualifizierungen zur Betreuungskraft und sozialpädagogischen Assistenz sind sehr relevant für den Bedarf von %%jobsHealth%% und %%jobsSocial%% Stellen. Das Potenzial könnte durch eine breitere Vermarktung und den Ausbau (z.B. TQs in der Pflege) noch besser ausgeschöpft werden.</div></li></ul><h4>Strategische Angebotslücken (Neuentwicklung prüfen):</h4><ul><li><strong>Gewerblich-Technischer Bereich & Handwerk (FbW):</strong><div class="justification">Außer der "Grundorientierung Handwerk" gibt es kaum Angebote, die den hohen Bedarf von %%jobsTechnical%% und %%jobsCraft%% Stellen (z.B. in Mechatronik, Elektro, SHK) direkt adressieren. Hier besteht die größte Lücke und gleichzeitig das größte Wachstumspotenzial.</div></li></ul></section>` },
        { id: "empfehlung_kurz", title: "Kurzfristige Empfehlungen (0-6 Monate)", content: `<section><h3>Kurzfristige Empfehlungen (0 bis 6 Monate)</h3><p>Diese Maßnahmen zielen darauf ab, grundlegende Qualifikationslücken schnell zu schließen und den Teilnehmenden einen raschen Zugang zum Arbeitsmarkt zu ermöglichen.</p><ul><li><strong>Lager & Logistik:</strong> Erwerb des Gabelstaplerscheins.<div class="justification">Begründung: Direkte Antwort auf den Bedarf von %%jobsLogistics%% Stellen im Helfer- und Anlernbereich, oft ein Einstiegstor in den Sektor.</div></li><li><strong>Pflege & Betreuung:</strong> Qualifizierung zur Betreuungskraft nach § 53c SGB XI.<div class="detailed-explanation"><strong>Detaillierte Erläuterung:</strong> Diese Qualifizierung ist ideal für Personen mit hoher sozialer Kompetenz und Empathie. Angesichts des demografischen Wandels ist der Bedarf an Betreuungskräften in Pflegeheimen und ambulanten Diensten enorm und krisensicher. Die Maßnahme vermittelt nicht nur die notwendigen rechtlichen und praktischen Grundlagen, sondern stärkt auch die persönlichen Kompetenzen im Umgang mit hilfsbedürftigen Menschen und ist eine hervorragende Vorbereitung auf eine mögliche spätere Umschulung zum/zur Pflegefachmann/-frau. Sie bedient den akuten Personalmangel bei %%jobsHealth%% Stellen.</div></li><li><strong>Kassentraining für den Einzelhandel:</strong> Zertifikatskurs.<div class="justification">Begründung: Vermittelt schnell die Bedienung moderner Kassensysteme und ist eine Schlüsselqualifikation für den Bedarf von %%jobsSales%% Stellen.</div></li><li><strong>Bewerbungs- & Jobcoaching:</strong> Individuelle Unterstützung.<div class="justification">Begründung: Hebt die Potenziale der Bewerber, optimiert Unterlagen und bereitet auf Vorstellungsgespräche vor, was die Vermittlungschancen für alle Zielgruppen erhöht.</div></li><li><strong>Digitale Grundkompetenzen:</strong> Fit für den digitalen Arbeitsplatz.<div class="justification">Begründung: Schließt eine Basislücke bei vielen Arbeitsuchenden und ist eine Grundvoraussetzung für nahezu alle Bürotätigkeiten (%%jobsOffice%% Stellen).</div></li></ul></section>` },
        { id: "empfehlung_mittel", title: "Mittelfristige Empfehlungen (6-12 Monate)", content: `<section><h3>Mittelfristige Empfehlungen (6 bis 12 Monate)</h3><p>Modulare Teilqualifikationen (TQ) sind das ideale Instrument, um gezielt und flexibel Fachkompetenzen aufzubauen und die Vermittlungschancen signifikant zu erhöhen.</p><ul><li><strong>Verkauf:</strong> TQ-Module zum/zur Verkäufer*in.<div class="justification">Begründung: Schließt die Qualifikationslücke zu den %%jobsSales%% Stellen im Handel und vermittelt gefragte digitale Kassen- und Warenwirtschaftskenntnisse.</div></li><li><strong>Büromanagement:</strong> TQ-Module für kaufmännische Grundlagen.<div class="detailed-explanation"><strong>Detaillierte Erläuterung:</strong> Diese Teilqualifikation ist modular aufgebaut und ermöglicht einen flexiblen Einstieg in die kaufmännische Welt. Module wie "Büroprozesse gestalten" oder "Auftragsbearbeitung und -nachbereitung" sind hochgradig praxisrelevant. Sie bereiten gezielt auf die vielfältigen Anforderungen der %%jobsOffice%% offenen Stellen vor und können später zu einem vollwertigen Berufsabschluss als Kaufmann/-frau für Büromanagement zusammengefügt werden. Dies bietet einen sicheren und stufenweisen Karriereweg.</div></li><li><strong>Lagerlogistik:</strong> TQ-Module zum/zur Fachlagerist/in.<div class="justification">Begründung: Baut auf dem Gabelstaplerschein auf und vermittelt tiefere Kenntnisse in Warenwirtschaft und Logistikprozessen, um den Bedarf von %%jobsLogistics%% Stellen zu decken.</div></li><li><strong>IT-Support (z.B. CompTIA A+):</strong> Spezialisierte Weiterbildung.<div class="justification">Begründung: Bietet einen schnellen Einstieg in die IT-Branche für technisch affine Personen und adressiert den Support-Bedarf der %%jobsIT%% Stellen.</div></li><li><strong>Personalassistenz:</strong> Weiterbildung mit Zertifikat.<div class="justification">Begründung: Qualifiziert für anspruchsvolle Assistenzaufgaben und ist eine Antwort auf den Bedarf an Fachkräften in Personalabteilungen.</div></li></ul></section>` },
        { id: "empfehlung_lang", title: "Langfristige Empfehlungen (12+ Monate)", content: `<section><h3>Langfristige Empfehlungen (12+ Monate)</h3><p>Umschulungen sind die nachhaltigste Investition in die Beschäftigungsfähigkeit und die beste Antwort auf den Fachkräftemangel in den Top-Sektoren.</p><ul><li><strong>Fachinformatiker/in (AE/SI):</strong> Umschulung.<div class="justification">Begründung: Direkte und hochwirksame Antwort auf den dringenden Fachkräftebedarf von %%jobsIT%% Stellen in der boomenden IT-Branche.</div></li><li><strong>Pflegefachmann/-frau:</strong> Umschulung.<div class="detailed-explanation"><strong>Detaillierte Erläuterung:</strong> Diese dreijährige generalistische Umschulung ist eine der zukunftssichersten Qualifikationen überhaupt. Sie eröffnet den Zugang zu einem extrem nachgefragten Berufsfeld mit hoher sozialer Verantwortung und vielfältigen Einsatzmöglichkeiten (Krankenhäuser, Pflegeheime, ambulante Dienste). Angesichts des Bedarfs von %%jobsHealth%% Stellen und des demografischen Wandels bietet dieser Abschluss eine quasi Jobgarantie und exzellente Weiterentwicklungsmöglichkeiten.</div></li><li><strong>Kaufmann/-frau für Büromanagement:</strong> Umschulung.<div class="justification">Begründung: Ein anerkannter Berufsabschluss, der eine breite Basis für eine Karriere in der Verwaltung bei nahezu jedem Unternehmen legt und den Bedarf von %%jobsOffice%% Stellen bedient.</div></li><li><strong>Erzieher/in:</strong> Umschulung.<div class="justification">Begründung: Adressiert den massiven Fachkräftemangel im sozialen Bereich (%%jobsSocial%% Stellen) und bietet eine erfüllende Tätigkeit mit hoher gesellschaftlicher Relevanz.</div></li><li><strong>Elektroniker/in für Automatisierungstechnik:</strong> Umschulung.<div class="justification">Begründung: Eine gezielte Antwort auf die Digitalisierung der Industrie (Industrie 4.0) und den Bedarf an Fachkräften im Bereich der %%jobsTechnical%% Stellen.</div></li></ul></section>` },
        { id: "strategie", title: "Strategische Handlungsempfehlung", content: `<section>
            <h3>Strategische Handlungsempfehlung für %%location%%</h3>
            <p>Die vorangegangene datengestützte Analyse ermöglicht die Formulierung einer dreigliedrigen, integrierten Strategie. Ziel ist es, die Lücke zwischen dem Qualifikationsangebot von Donner und Partner und der Nachfrage der regionalen Wirtschaft effektiv zu schließen, die Vermittlungschancen der Teilnehmenden zu maximieren und den Standort nachhaltig als führenden Bildungsträger zu positionieren.</p>
            <div class="strategy-container">
                <div class="strategy-card"><h4>1. Portfolio-Optimierung</h4><ul><li><strong>Fokussierung der Vermarktung auf Kernkompetenzen:</strong><div class="justification">Begründung: Dies betrifft insbesondere die Vermarktung von Maßnahmen wie der <strong>Umschulung zum/zur Fachinformatiker/in</strong> (um die %%jobsIT%% offenen Stellen zu adressieren) und der <strong>Qualifizierung zur Pflegeassistenz</strong> (um den Bedarf von %%jobsHealth%% Stellen zu decken).</div></li><li><strong>Schließung strategischer Angebotslücken:</strong><div class="justification">Begründung: Die Analyse identifizierte einen signifikanten Bedarf im Bereich der <strong>technischen Berufe (%%jobsTechnical%% Stellen)</strong>. Es wird die Einleitung eines Prüfverfahrens für neue Kursangebote (z.B. Mechatronik, Elektrotechnik) empfohlen.</div></li></ul></div>
                <div class="strategy-card"><h4>2. Zielgruppenspezifische Ansprache</h4><ul><li><strong>Frauen (%%unemployedWomen%% Personen):</strong><div class="justification">Empfehlung: Aktive Bewerbung von <strong>Teilzeit-Qualifizierungen</strong>.</div></li><li><strong>Ältere Arbeitssuchende (50+, %%unemployedSeniors%% Personen):</strong><div class="justification">Empfehlung: Flexible Online-Angebote (VIONA®) und gezieltes Coaching.</div></li></ul></div>
                <div class="strategy-card"><h4>3. Proaktive Marktbearbeitung</h4><ul><li><strong>Datengestützter Vertrieb:</strong><div class="justification">Beispiel: "Unsere Analyse für %%location%% zeigt einen Bedarf von über %%jobsCraft%% Fachkräften im Handwerk. Lassen Sie uns sprechen, wie wir helfen können."</div></li><li><strong>Aufbau strategischer Allianzen:</strong><div class="justification">Empfehlung: Kontakt zu Wirtschaftsverbänden, IHK/HWK und größten Arbeitgebern intensivieren.</div></li></ul></div>
            </div></section>` },
        { id: "zusammenfassung", title: "Management Summary für Kostenträger", content: `<section><h3>Management Summary für Kostenträger</h3><p>Sehr geehrte Damen und Herren, die vorliegende Analyse des Arbeitsmarktes in %%location%% belegt eindrücklich: Es herrscht kein Mangel an Arbeit, sondern ein Mangel an Qualifikation. Die %%jobOpenings%% offenen Stellen, insbesondere in den zukunftssicheren Branchen %%topSectorsShort%%, können mit den aktuell %%totalUnemployed%% arbeitslosen Personen nicht besetzt werden. Eine Investition in die vorgeschlagenen Qualifizierungsmaßnahmen ist daher keine reine Sozialausgabe, sondern eine direkte und notwendige Investition in die Wirtschaftskraft der Region. Die empfohlenen Umschulungen und Weiterbildungen sind eine datengestützte, passgenaue Antwort auf den lokalen Fachkräftebedarf. Sie erhöhen die Integrationschancen der Teilnehmenden signifikant und leisten einen messbaren Beitrag zur Reduzierung der Langzeitarbeitslosigkeit und zur Stärkung der lokalen Unternehmen. Wir sind überzeugt, mit diesem Portfolio den größtmöglichen Hebel für eine nachhaltige Arbeitsmarktintegration zu bieten.</p></section>` },
        { id: "abschluss", title: "Bericht Abschluss", content: `<section><h3>Bericht abgeschlossen</h3><p>Die Analyse ist vollständig. Die Auswertung kann nun als PDF-Dokument gespeichert werden.</p></section>` }
    ];

    // --- DOM-Elemente abrufen ---
    const dashboardView = document.getElementById('dashboard-view');
    const analysisView = document.getElementById('analysis-view');
    const mapContainer = document.getElementById('map-container');
    const searchInput = document.getElementById('search-input');
    const sortByNameBtn = document.getElementById('sort-by-name');
    const sortByJobsBtn = document.getElementById('sort-by-jobs');
    const locationListContainer = document.getElementById('location-list');
    const analysisHeader = document.getElementById('analysis-header');
    const progressBar = document.getElementById('progress-bar');
    const progressText = document.getElementById('progress-text');
    const stepContent = document.getElementById('step-content');
    const prevBtn = document.getElementById('prev-btn');
    const nextBtn = document.getElementById('next-btn');
    const saveBtn = document.getElementById('save-btn');
    const backToDashboardBtn = document.getElementById('back-to-dashboard-btn');
    const uploadModal = document.getElementById('upload-modal');
    const closeModalBtn = document.getElementById('close-modal-btn');
    const modalLocationName = document.getElementById('modal-location-name');
    const pdfUploadInput = document.getElementById('pdf-upload-input');
    const uploadStatus = document.getElementById('upload-status');
    const spinner = document.getElementById('spinner');
    const readAloudBtn = document.getElementById('read-aloud-btn');
    const playIcon = readAloudBtn.querySelector('.play-icon');
    const stopIcon = readAloudBtn.querySelector('.stop-icon');
    
    // --- Anwendungs-Status ---
    let currentStep = 0;
    const totalSteps = analysisSteps.length;
    let currentAnalysisData = {};
    let placeholderData = {};
    let currentUploadLocation = null;
    let isReading = false;
    // KORREKTUR: Neue Variablen für die sequentielle Sprachausgabe
    let textChunks = [];
    let currentChunkIndex = 0;

    // --- HILFSFUNKTIONEN ---
    const projectCoordinates = (lat, lon) => {
        const bounds = { minLon: 5.8, maxLon: 15.1, minLat: 47.2, maxLat: 55.1 };
        const svgSize = { width: 586, height: 793 };
        const x = ((lon - bounds.minLon) / (bounds.maxLon - bounds.minLon)) * svgSize.width;
        const y = ((bounds.maxLat - lat) / (bounds.maxLat - bounds.minLat)) * svgSize.height;
        return { x, y };
    };

    const getRadiusForJobs = (jobCountStr) => {
        const jobCount = parseInt(String(jobCountStr).replace(/\./g, ''));
        if (jobCount > 10000) return 14;
        if (jobCount > 5000) return 12;
        if (jobCount > 2500) return 10;
        if (jobCount > 1000) return 8;
        return 6;
    };

    // --- KERNFUNKTIONEN: DASHBOARD ---
    function renderDashboardList(locations) {
        locationListContainer.innerHTML = '';
        locations.forEach(standort => {
            const listItem = document.createElement('div');
            listItem.className = 'list-item';
            listItem.dataset.name = standort.name;
            listItem.innerHTML = `<span class="list-item-name">${standort.name}</span><span class="jobs">${standort.stats.jobOpenings}</span><span class="upload-btn" title="Daten für ${standort.name} aktualisieren"><svg viewBox="0 0 24 24"><path d="M9 16h6v-6h4l-7-7-7 7h4v6zm-4 2h14v2H5v-2z"/></svg></span>`;
            listItem.querySelector('.list-item-name').addEventListener('click', () => startAnalysis(standort.name));
            listItem.querySelector('.upload-btn').addEventListener('click', () => openUploadModal(standort.name));
            listItem.addEventListener('mouseover', () => highlightLocationOnMap(standort.name, true));
            listItem.addEventListener('mouseout', () => highlightLocationOnMap(standort.name, false));
            locationListContainer.appendChild(listItem);
        });
    }

    function addLocationPointsToMap() {
        const svg = mapContainer.querySelector('svg');
        if (!svg) return;
        svg.querySelectorAll('.location-point').forEach(p => p.remove());
        svg.querySelectorAll('path').forEach(p => { p.style.fill = '#e8eaf6'; p.style.stroke = '#ffffff'; });
        standorteData.forEach(standort => {
            const { x, y } = projectCoordinates(standort.lat, standort.lon);
            const circle = document.createElementNS("http://www.w3.org/2000/svg", "circle");
            circle.setAttribute("cx", x);
            circle.setAttribute("cy", y);
            circle.setAttribute("r", getRadiusForJobs(standort.stats.jobOpenings));
            circle.setAttribute("class", "location-point");
            circle.dataset.name = standort.name;
            circle.addEventListener('click', () => startAnalysis(standort.name));
            circle.addEventListener('mouseover', () => highlightListItem(standort.name, true));
            circle.addEventListener('mouseout', () => highlightListItem(standort.name, false));
            svg.appendChild(circle);
        });
    }

    function highlightLocationOnMap(name, isHighlighted) {
        const circle = mapContainer.querySelector(`circle[data-name="${name}"]`);
        if (circle) circle.classList.toggle('highlight', isHighlighted);
    }

    function highlightListItem(name, isHighlighted) {
        const listItem = locationListContainer.querySelector(`.list-item[data-name="${name}"]`);
        if (listItem) listItem.classList.toggle('highlight', isHighlighted);
    }

    // --- FUNKTIONEN FÜR PDF-UPLOAD UND ANALYSE ---
    function openUploadModal(locationName) {
        currentUploadLocation = locationName;
        modalLocationName.textContent = locationName;
        uploadStatus.textContent = '';
        pdfUploadInput.value = '';
        uploadModal.style.display = 'flex';
    }

    function closeModal() {
        uploadModal.style.display = 'none';
    }

    pdfUploadInput.addEventListener('change', (event) => {
        const file = event.target.files[0];
        if (file && file.type === 'application/pdf') {
            parsePdfAndUpdateData(file, currentUploadLocation);
        } else {
            uploadStatus.textContent = 'Bitte wählen Sie eine gültige PDF-Datei.';
            uploadStatus.className = 'error';
        }
    });

    async function parsePdfAndUpdateData(file, locationName) {
        uploadStatus.textContent = 'Analysiere PDF...';
        uploadStatus.className = '';
        try {
            const fileReader = new FileReader();
            fileReader.onload = async function() {
                const typedarray = new Uint8Array(this.result);
                const pdf = await pdfjsLib.getDocument(typedarray).promise;
                let fullText = '';
                for (let i = 1; i <= pdf.numPages; i++) {
                    const page = await pdf.getPage(i);
                    const textContent = await page.getTextContent();
                    fullText += textContent.items.map(item => item.str).join(' ');
                }
                const extractedData = extractDataFromText(fullText);
                if (extractedData) {
                    const locationIndex = standorteData.findIndex(s => s.name === locationName);
                    if (locationIndex !== -1) {
                        standorteData[locationIndex].stats = { ...standorteData[locationIndex].stats, ...extractedData };
                        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(standorteData));
                        uploadStatus.textContent = 'Daten erfolgreich aktualisiert und gespeichert!';
                        uploadStatus.className = 'success';
                        
                        const currentSort = document.querySelector('#sort-by-jobs').classList.contains('active') ? 'jobs' : 'name';
                        let sortedLocations;
                        if(currentSort === 'jobs') {
                             sortedLocations = standorteData.slice().sort((a, b) => parseInt(String(b.stats.jobOpenings).replace(/\./g, '')) - parseInt(String(a.stats.jobOpenings).replace(/\./g, '')));
                        } else {
                             sortedLocations = standorteData.slice().sort((a, b) => a.name.localeCompare(b.name));
                        }
                        renderDashboardList(sortedLocations);
                        addLocationPointsToMap();
                        setTimeout(closeModal, 1500);
                    }
                } else {
                    uploadStatus.textContent = 'Benötigte Daten konnten im PDF nicht gefunden werden.';
                    uploadStatus.className = 'error';
                }
            };
            fileReader.readAsArrayBuffer(file);
        } catch (error) {
            console.error('Error parsing PDF:', error);
            uploadStatus.textContent = 'Fehler bei der PDF-Analyse.';
            uploadStatus.className = 'error';
        }
    }

    function extractDataFromText(text) {
        const cleanNumber = (str) => str ? str.replace(/\./g, '') : '0';
        const rateMatch = text.match(/Arbeitslosenquoten bezogen auf\s+alle zivilen Erwerbspersonen\s+([\d,]+)/);
        const unemploymentRate = rateMatch ? rateMatch[1] : null;
        const totalMatch = text.match(/Bestand an Arbeitslosen\s+Insgesamt\s+([\d\.]+)/);
        const totalUnemployed = totalMatch ? cleanNumber(totalMatch[1]) : null;
        const jobsMatch = text.match(/Gemeldete Arbeitsstellen\s+.*?Bestand\s+([\d\.]+)/s);
        const jobOpenings = jobsMatch ? cleanNumber(jobsMatch[1]) : null;
        const sgb3Match = text.match(/Arbeitslosengeld bei Arbeitslosigkeit\s+([\d\.]+)/);
        const unemployedSGB3 = sgb3Match ? cleanNumber(sgb3Match[1]) : null;
        const unemployedSGB2 = (totalUnemployed && unemployedSGB3) ? (parseInt(totalUnemployed) - parseInt(unemployedSGB3)).toString() : null;
        if (unemploymentRate && totalUnemployed && jobOpenings && unemployedSGB3 && unemployedSGB2) {
            return {
                unemploymentRate: unemploymentRate,
                totalUnemployed: totalUnemployed,
                jobOpenings: jobOpenings,
                unemployedSGB3: unemployedSGB3,
                unemployedSGB2: unemployedSGB2,
                currentDate: new Date().toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' })
            };
        }
        return null;
    }

    // --- KERNFUNKTIONEN: ANALYSE-TOOL ---
    function startAnalysis(locationName) {
        const data = standorteData.find(s => s.name === locationName);
        if (!data) { alert("Daten nicht gefunden!"); return; }
        currentAnalysisData = data;
        generatePlaceholderData(data.stats);
        dashboardView.style.display = 'none';
        analysisView.style.display = 'block';
        analysisHeader.textContent = `Arbeitsmarktanalyse für ${locationName}`;
        currentStep = 0;
        showStep(currentStep);
    }
    
    function populateTemplate(template) {
        let populated = template.replace(/%%location%%/g, currentAnalysisData.name);
        for (const key in placeholderData) {
            populated = populated.replace(new RegExp(`%%${key}%%`, 'g'), placeholderData[key]);
        }
        return populated;
    }
    
    function createBarChart(container, data, title) {
        if (!container) return;
        const chartWidth = 700;
        const chartHeight = 350;
        container.style.width = `${chartWidth}px`;
        container.style.height = `${chartHeight}px`;

        const margin = { top: 40, right: 20, bottom: 60, left: 50 };
        const width = chartWidth - margin.left - margin.right;
        const height = chartHeight - margin.top - margin.bottom;
        const maxValue = Math.max(...data.map(d => d.value));
        let svgContent = `<svg width="${chartWidth}" height="${chartHeight}" viewBox="0 0 ${chartWidth} ${chartHeight}" xmlns="http://www.w3.org/2000/svg" style="font-family: 'Roboto', sans-serif; background-color: #fff;"><title>${title}</title>`;
        svgContent += `<line x1="${margin.left}" y1="${margin.top}" x2="${margin.left}" y2="${margin.top + height}" stroke="#ccc" /><line x1="${margin.left}" y1="${margin.top + height}" x2="${margin.left + width}" y2="${margin.top + height}" stroke="#ccc" />`;
        for (let i = 0; i <= 5; i++) {
            const y = margin.top + height - (i / 5 * height);
            const value = (i / 5 * maxValue);
            svgContent += `<line x1="${margin.left - 5}" y1="${y}" x2="${margin.left + width}" y2="${y}" stroke="${i === 0 ? '#ccc' : '#eee'}" /><text x="${margin.left - 10}" y="${y + 4}" text-anchor="end" font-size="10" fill="#6c757d">${Math.round(value / 100) * 100}</text>`;
        }
        const barWidth = (width / data.length) * 0.7, barMargin = (width / data.length) * 0.3;
        data.forEach((d, i) => {
            const barHeight = (d.value / maxValue) * height;
            const x = margin.left + i * (barWidth + barMargin) + barMargin / 2;
            const y = margin.top + height - barHeight;
            svgContent += `<rect x="${x}" y="${y}" width="${barWidth}" height="${barHeight}" fill="#009ca6"></rect><text x="${x + barWidth / 2}" y="${y - 8}" text-anchor="middle" font-size="11" font-weight="500" fill="#333132">${d.value.toLocaleString('de-DE')}</text><text x="${x + barWidth / 2}" y="${margin.top + height + 20}" text-anchor="middle" font-size="11" fill="#333132">${d.label}</text>`;
        });
        svgContent += `<text x="${chartWidth/2}" y="${margin.top - 10}" text-anchor="middle" font-size="14" font-weight="500" fill="#009ca6">${title}</text></svg>`;
        container.innerHTML = svgContent;
    }

    function showStep(stepIndex) {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }

        const stepData = analysisSteps[stepIndex];
        stepContent.innerHTML = populateTemplate(stepData.content);
        progressBar.style.width = `${((stepIndex + 1) / totalSteps) * 100}%`;
        progressText.textContent = `Schritt ${stepIndex + 1} von ${totalSteps}: ${stepData.title}`;
        prevBtn.disabled = stepIndex === 0;
        const isLastStep = stepIndex === totalSteps - 1;
        nextBtn.style.display = isLastStep ? 'none' : 'inline-flex';
        saveBtn.style.display = isLastStep ? 'inline-block' : 'none';
        readAloudBtn.style.display = isLastStep ? 'inline-flex' : 'none';

        if (stepData.id === 'stellenanalyse') {
            const jobData = [ { label: 'Gesundheit', value: parseInt(placeholderData.jobsHealth.replace(/\./g, '')) }, { label: 'Handwerk', value: parseInt(placeholderData.jobsCraft.replace(/\./g, '')) }, { label: 'Verkauf', value: parseInt(placeholderData.jobsSales.replace(/\./g, '')) }, { label: 'IT', value: parseInt(placeholderData.jobsIT.replace(/\./g, '')) }, { label: 'Logistik', value: parseInt(placeholderData.jobsLogistics.replace(/\./g, '')) }, { label: 'Büro', value: parseInt(placeholderData.jobsOffice.replace(/\./g, '')) } ];
            createBarChart(document.getElementById('chart-jobs'), jobData, 'Geschätzte Verteilung offener Stellen');
        }
    }
    
    function generatePlaceholderData(data) {
        const totalUnemployedNum = parseInt(String(data.totalUnemployed).replace(/\./g, ''));
        const jobOpeningsNum = parseInt(String(data.jobOpenings).replace(/\./g, ''));
        const jobDistribution = { jobsHealth: 0.14, jobsCraft: 0.13, jobsSales: 0.12, jobsIT: 0.11, jobsLogistics: 0.10, jobsOffice: 0.08, jobsTechnical: 0.09, jobsSocial: 0.07 };
        placeholderData = {
            currentDate: data.currentDate || new Date().toLocaleDateString('de-DE', { month: '2-digit', year: 'numeric' }), 
            unemploymentRate: data.unemploymentRate,
            totalUnemployed: totalUnemployedNum.toLocaleString('de-DE'),
            unemployedSGB3: parseInt(String(data.unemployedSGB3).replace(/\./g, '')).toLocaleString('de-DE'),
            unemployedSGB2: parseInt(String(data.unemployedSGB2).replace(/\./g, '')).toLocaleString('de-DE'),
            jobOpenings: jobOpeningsNum.toLocaleString('de-DE'),
        };
        for(const key in jobDistribution) { placeholderData[key] = Math.floor(jobOpeningsNum * jobDistribution[key]).toLocaleString('de-DE'); }
        
        const unemployedDistribution = { unemployedYouth: 0.07, unemployedSeniors: 0.28, unemployedForeigners: 0.45 };
        const femaleQuotes = { unemployedWomen: 0.45, unemployedYouthFemale: 0.48, unemployedSeniorsFemale: 0.42, unemployedForeignersFemale: 0.40 };
        placeholderData.unemployedWomen = Math.floor(totalUnemployedNum * femaleQuotes.unemployedWomen).toLocaleString('de-DE');
        const youthNum = Math.floor(totalUnemployedNum * unemployedDistribution.unemployedYouth);
        placeholderData.unemployedYouth = youthNum.toLocaleString('de-DE');
        placeholderData.unemployedYouthFemale = Math.floor(youthNum * femaleQuotes.unemployedYouthFemale).toLocaleString('de-DE');
        const seniorsNum = Math.floor(totalUnemployedNum * unemployedDistribution.unemployedSeniors);
        placeholderData.unemployedSeniors = seniorsNum.toLocaleString('de-DE');
        placeholderData.unemployedSeniorsFemale = Math.floor(seniorsNum * femaleQuotes.unemployedSeniorsFemale).toLocaleString('de-DE');
        const foreignersNum = Math.floor(totalUnemployedNum * unemployedDistribution.unemployedForeigners);
        placeholderData.unemployedForeigners = foreignersNum.toLocaleString('de-DE');
        placeholderData.unemployedForeignersFemale = Math.floor(foreignersNum * femaleQuotes.unemployedForeignersFemale).toLocaleString('de-DE');

        placeholderData.topSectors = `Gesundheit, Handwerk, Verkauf und IT`;
        placeholderData.topSectorsShort = `Gesundheit, Handwerk und IT`;
    }
    
    function resetToDashboard() {
        if (window.speechSynthesis.speaking) {
            window.speechSynthesis.cancel();
        }
        analysisView.style.display = 'none';
        dashboardView.style.display = 'block';
    }

    // --- FINALE, ROBUSTE PDF-SPEICHERFUNKTION ---
    async function saveReport() {
        saveBtn.disabled = true;
        spinner.style.display = 'block';
        const originalProgressText = progressText.textContent;
        progressText.textContent = 'Erstelle PDF, bitte warten...';

        try {
            const { jsPDF } = window.jspdf;
            const doc = new jsPDF('p', 'mm', 'a4');
            const A4_WIDTH = 210;
            const MARGIN = 15;
            const MAX_WIDTH = A4_WIDTH - MARGIN * 2;
            const dateLong = new Date().toLocaleDateString('de-DE', { day: '2-digit', month: 'long', year: 'numeric' });
            
            let currentY = MARGIN;
            const addHeaderFooter = (pageNumber, totalPages) => {
                const pageIsOdd = pageNumber % 2 !== 0;
                doc.setFontSize(8);
                doc.setTextColor('#666666');
                doc.text(pageIsOdd ? `Arbeitsmarktanalyse: ${currentAnalysisData.name}` : 'Donner + Partner GmbH', MARGIN, 297 - 10);
                doc.text(pageIsOdd ? 'Donner + Partner GmbH' : `Arbeitsmarktanalyse: ${currentAnalysisData.name}`, A4_WIDTH - MARGIN, 297 - 10, { align: 'right' });
                doc.text(`Seite ${pageNumber}`, A4_WIDTH / 2, 297 - 10, { align: 'center' });
                doc.setDrawColor('#cccccc');
                doc.setLineWidth(0.2);
                doc.line(MARGIN, 297 - 12, A4_WIDTH - MARGIN, 297 - 12);
            };

            // SEITE 1: TITELSEITE
            doc.setFillColor('#009ca6');
            doc.rect(0, 0, A4_WIDTH, 60, 'F');
            
            doc.setFont('Helvetica', 'bold');
            doc.setFontSize(28);
            doc.setTextColor('#ffffff');
            doc.text('Arbeitsmarktanalyse', A4_WIDTH / 2, 38, { align: 'center' });

            doc.setFont('Helvetica', 'normal');
            doc.setFontSize(22);
            doc.setTextColor('#009ca6');
            doc.text(`Standort: ${currentAnalysisData.name}`, A4_WIDTH / 2, 120, { align: 'center' });

            doc.setFontSize(12);
            doc.setTextColor('#6c757d');
            doc.text(`Analyse vom: ${dateLong}`, A4_WIDTH / 2, 135, { align: 'center' });

            const footerY = 297 - 40;
            doc.setFontSize(10);
            doc.setTextColor('#333132');
            doc.text('Erstellt durch die Vertriebsabteilung', A4_WIDTH / 2, footerY, { align: 'center' });
            doc.text('Ihr Vertriebsassistent Deutschland', A4_WIDTH / 2, footerY + 6, { align: 'center' });
            doc.setDrawColor('#ff6a13');
            doc.setLineWidth(1);
            doc.line(MARGIN, footerY + 12, A4_WIDTH - MARGIN, footerY + 12);

            // SEITEN 2 bis N: ANALYSESCHRITTE
            for (let i = 0; i < analysisSteps.length; i++) {
                const step = analysisSteps[i];
                progressText.textContent = `Verarbeite Seite ${i + 2} von ${totalSteps + 1}...`;
                
                doc.addPage();
                currentY = MARGIN;
                addHeaderFooter(i + 2, totalSteps + 1);

                const tempDiv = document.createElement('div');
                tempDiv.innerHTML = populateTemplate(step.content);

                const h3 = tempDiv.querySelector('h3');
                if (h3) {
                    doc.setFontSize(16);
                    doc.setFont('Helvetica', 'bold');
                    doc.setTextColor('#009ca6');
                    const h3Text = h3.innerText || h3.textContent;
                    doc.text(h3Text, MARGIN, currentY);
                    currentY += 6;
                    doc.setDrawColor('#ff6a13');
                    doc.setLineWidth(0.5);
                    doc.line(MARGIN, currentY, MARGIN + 70, currentY);
                    currentY += 8;
                }

                const elements = tempDiv.querySelector('section').children;
                for(const element of elements) {
                    doc.setFont('Helvetica', 'normal');
                    doc.setTextColor('#333132');

                    if (element.tagName === 'P') {
                        doc.setFontSize(11);
                        const textLines = doc.splitTextToSize(element.innerText, MAX_WIDTH);
                        if (currentY + (textLines.length * 5) > 297 - MARGIN - 15) { doc.addPage(); currentY = MARGIN; addHeaderFooter(doc.internal.getNumberOfPages(), totalSteps + 1); }
                        doc.text(textLines, MARGIN, currentY);
                        currentY += textLines.length * 5 + 4;
                    } else if (element.tagName === 'H4') {
                        if (currentY + 8 > 297 - MARGIN - 15) { doc.addPage(); currentY = MARGIN; addHeaderFooter(doc.internal.getNumberOfPages(), totalSteps + 1); }
                        doc.setFontSize(12);
                        doc.setFont('Helvetica', 'bold');
                        doc.text(element.innerText, MARGIN, currentY);
                        currentY += 8;
                    } else if (element.tagName === 'UL') {
                        const listItems = element.querySelectorAll('li');
                        listItems.forEach(li => {
                            if (currentY + 10 > 297 - MARGIN - 15) { doc.addPage(); currentY = MARGIN; addHeaderFooter(doc.internal.getNumberOfPages(), totalSteps + 1); }
                            doc.setFontSize(11);
                            doc.setTextColor('#ff6a13');
                            doc.text('■', MARGIN, currentY);
                            doc.setTextColor('#333132');
                            
                            const itemText = li.firstChild.textContent || '';
                            const textLines = doc.splitTextToSize(itemText, MAX_WIDTH - 5);
                            doc.text(textLines, MARGIN + 5, currentY);
                            currentY += textLines.length * 5;

                            const justification = li.querySelector('.justification, .detailed-explanation');
                            if (justification) {
                                doc.setFontSize(9);
                                doc.setTextColor('#555');
                                const justiLines = doc.splitTextToSize(justification.innerText, MAX_WIDTH - 8);
                                doc.text(justiLines, MARGIN + 8, currentY + 1);
                                currentY += justiLines.length * 4 + 4;
                            } else {
                                currentY += 4;
                            }
                        });
                    } else if (element.tagName === 'TABLE') {
                        const head = Array.from(element.querySelectorAll('thead th')).map(th => th.innerText);
                        const body = Array.from(element.querySelectorAll('tbody tr')).map(tr => 
                            Array.from(tr.querySelectorAll('td')).map(td => {
                                const clone = td.cloneNode(true);
                                const icon = clone.querySelector('.icon');
                                if (icon) icon.remove();
                                return clone.innerText;
                            })
                        );
                        doc.autoTable({
                            head: [head],
                            body: body,
                            startY: currentY,
                            theme: 'grid',
                            headStyles: { fillColor: '#f8f9fa', textColor: '#333132', fontStyle: 'bold' },
                            styles: { font: 'Helvetica', fontSize: 10 },
                            didDrawPage: (data) => {
                                addHeaderFooter(doc.internal.getNumberOfPages(), totalSteps + 1);
                                currentY = data.cursor.y + 10;
                            }
                        });
                        currentY = doc.autoTable.previous.finalY + 10;
                    } else if (element.tagName === 'FIGURE') {
                        const tempChartContainer = document.createElement('div');
                        tempChartContainer.style.position = 'absolute';
                        tempChartContainer.style.left = '-9999px';
                        document.body.appendChild(tempChartContainer);
                        
                        const jobData = [ { label: 'Gesundheit', value: parseInt(placeholderData.jobsHealth.replace(/\./g, '')) }, { label: 'Handwerk', value: parseInt(placeholderData.jobsCraft.replace(/\./g, '')) }, { label: 'Verkauf', value: parseInt(placeholderData.jobsSales.replace(/\./g, '')) }, { label: 'IT', value: parseInt(placeholderData.jobsIT.replace(/\./g, '')) }, { label: 'Logistik', value: parseInt(placeholderData.jobsLogistics.replace(/\./g, '')) }, { label: 'Büro', value: parseInt(placeholderData.jobsOffice.replace(/\./g, '')) } ];
                        createBarChart(tempChartContainer, jobData, 'Geschätzte Verteilung offener Stellen');

                        const chartCanvas = await html2canvas(tempChartContainer, { scale: 2, backgroundColor: null });
                        document.body.removeChild(tempChartContainer);

                        const chartImgData = chartCanvas.toDataURL('image/png');
                        const chartHeight = (MAX_WIDTH / chartCanvas.width) * chartCanvas.height;
                        if (currentY + chartHeight > 297 - MARGIN - 15) { doc.addPage(); currentY = MARGIN; addHeaderFooter(doc.internal.getNumberOfPages(), totalSteps + 1); }
                        doc.addImage(chartImgData, 'PNG', MARGIN, currentY, MAX_WIDTH, chartHeight);
                        currentY += chartHeight + 5;
                        doc.setFontSize(9);
                        doc.setTextColor('#6c757d');
                        doc.text(element.querySelector('figcaption').innerText, A4_WIDTH / 2, currentY, { align: 'center' });
                        currentY += 10;
                    }
                }
            }

            doc.save(`Arbeitsmarktanalyse_${currentAnalysisData.name.replace(/ /g, '_')}.pdf`);

        } catch (error) {
            console.error("Fehler bei der PDF-Erstellung:", error);
            alert("Ein Fehler ist aufgetreten. Das PDF konnte nicht erstellt werden. Details: " + (error.message || "Unbekannter Fehler"));
        } finally {
            saveBtn.disabled = false;
            spinner.style.display = 'none';
            progressText.textContent = originalProgressText;
        }
    }

    // --- KORREKTUR: ROBUSTE FUNKTIONEN FÜR DIE SPRACHAUSGABE ---
    function updateReadAloudButton() {
        if (isReading) {
            playIcon.style.display = 'none';
            stopIcon.style.display = 'block';
            readAloudBtn.title = 'Vorlesen stoppen';
        } else {
            playIcon.style.display = 'block';
            stopIcon.style.display = 'none';
            readAloudBtn.title = 'Bericht vorlesen';
        }
    }

    function speakNextChunk() {
        if (!isReading || currentChunkIndex >= textChunks.length) {
            isReading = false;
            updateReadAloudButton();
            return;
        }

        const chunk = textChunks[currentChunkIndex];
        const utterance = new SpeechSynthesisUtterance(chunk);
        utterance.lang = 'de-DE';
        utterance.rate = 0.9;
        utterance.pitch = 1.0;

        utterance.onend = () => {
            currentChunkIndex++;
            speakNextChunk();
        };

        utterance.onerror = (event) => {
            console.error('Fehler bei der Sprachausgabe:', event.error, 'Chunk:', chunk);
            // Fehler nicht anzeigen, sondern einfach zum nächsten Chunk springen
            currentChunkIndex++;
            speakNextChunk();
        };

        window.speechSynthesis.speak(utterance);
    }

    function handleReadAloud() {
        if (!('speechSynthesis' in window)) {
            alert('Ihr Browser unterstützt die Sprachausgabe leider nicht.');
            return;
        }

        if (isReading) {
            isReading = false;
            window.speechSynthesis.cancel();
            updateReadAloudButton();
        } else {
            textChunks = [];
            const tempDiv = document.createElement('div');
            analysisSteps.forEach(step => {
                if (step.id === 'abschluss') return; // Letzten Schritt nicht vorlesen
                tempDiv.innerHTML = populateTemplate(step.content);
                tempDiv.querySelectorAll('h3, h4, p, li, div.justification, div.detailed-explanation').forEach(el => {
                    const text = (el.innerText || el.textContent).trim();
                    if (text) {
                        // Bereinigen von doppelten Titeln in Listenelementen
                        const cleanedText = text.replace(/Begründung:\s*Begründung:/, 'Begründung:');
                        textChunks.push(cleanedText);
                    }
                });
            });
            
            isReading = true;
            updateReadAloudButton();
            currentChunkIndex = 0;
            // Warten, bis eventuelle vorherige "cancel" Befehle verarbeitet wurden
            setTimeout(speakNextChunk, 100);
        }
    }

    // --- INITIALISIERUNG & EVENT-LISTENER ---
    async function init() {
        const storedData = localStorage.getItem(LOCAL_STORAGE_KEY);
        if (storedData) {
            try {
                standorteData = JSON.parse(storedData);
            } catch (e) {
                standorteData = initialStandorte;
                localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(standorteData));
            }
        } else {
            standorteData = initialStandorte;
            localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(standorteData));
        }

        try {
            const response = await fetch(mapFile);
            if (!response.ok) throw new Error(`Karte '${mapFile}' konnte nicht geladen werden.`);
            mapContainer.innerHTML = await response.text();
            addLocationPointsToMap();
            const sortedByName = standorteData.slice().sort((a, b) => a.name.localeCompare(b.name));
            renderDashboardList(sortedByName);
        } catch (error) {
            console.error(error);
            mapContainer.innerHTML = `<p style="color: red; padding: 1rem;"><b>Karten-Ladefehler:</b> ${error.message}</p>`;
        }
    }

    sortByNameBtn.addEventListener('click', () => {
        const sorted = standorteData.slice().sort((a, b) => a.name.localeCompare(b.name));
        renderDashboardList(sorted);
    });
    sortByJobsBtn.addEventListener('click', () => {
        const sorted = standorteData.slice().sort((a, b) => parseInt(String(b.stats.jobOpenings).replace(/\./g, '')) - parseInt(String(a.stats.jobOpenings).replace(/\./g, '')));
        renderDashboardList(sorted);
    });
    searchInput.addEventListener('input', (e) => {
        const searchTerm = e.target.value.toLowerCase();
        const filtered = standorteData.filter(s => s.name.toLowerCase().includes(searchTerm));
        renderDashboardList(filtered);
    });
    
    closeModalBtn.addEventListener('click', closeModal);
    uploadModal.addEventListener('click', (e) => { if (e.target === uploadModal) closeModal(); });
    backToDashboardBtn.addEventListener('click', resetToDashboard);
    nextBtn.addEventListener('click', () => { if (currentStep < totalSteps - 1) { currentStep++; showStep(currentStep); } });
    prevBtn.addEventListener('click', () => { if (currentStep > 0) { currentStep--; showStep(currentStep); } });
    saveBtn.addEventListener('click', saveReport);
    readAloudBtn.addEventListener('click', handleReadAloud);

    init();
});