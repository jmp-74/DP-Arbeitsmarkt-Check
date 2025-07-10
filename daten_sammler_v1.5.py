# =============================================================================
# JOB-DATENSAMMLER V1.5 (Finale Backend-Version)
# Ziel: Sammelt ausschließlich Job-Daten.
# Annahme: Die 'karte.svg' wird manuell bereitgestellt.
# =============================================================================

import json
import time
import random

from selenium import webdriver
from selenium.webdriver.chrome.service import Service as ChromeService
from selenium.webdriver.common.by import By
from selenium.webdriver.support.ui import WebDriverWait
from selenium.webdriver.support import expected_conditions as EC
from webdriver_manager.chrome import ChromeDriverManager

# -- Konfiguration --
STANDORTE_ZUM_TESTEN = [
    "Stuttgart", "Berlin", "München", "Hamburg", "Köln"
]
JOBDATEN_DATEINAME = "stellendaten.json"

def daten_sammeln():
    """
    Steuert einen Chrome-Browser, um die Job-Angebote von meinestadt.de zu sammeln.
    """
    print("===================================================")
    print("Starte den zentralen Datensammler V1.5...")
    print("===================================================")
    
    options = webdriver.ChromeOptions()
    options.add_argument("--headless")
    options.add_argument("--disable-gpu")
    options.add_argument("--window-size=1920,1080")
    options.add_argument("user-agent=Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/114.0.0.0 Safari/537.36")

    try:
        service = ChromeService(ChromeDriverManager().install())
        driver = webdriver.Chrome(service=service, options=options)
        print("Browser-Motor erfolgreich im Hintergrund gestartet.\n")
    except Exception as e:
        print(f"[FATALER FEHLER] Der Chrome-Browser konnte nicht gestartet werden: {e}")
        return

    aktuelle_stellenzahlen = {}
    for stadt in STANDORTE_ZUM_TESTEN:
        stadt_fuer_url = stadt.lower().replace('ü', 'ue').replace('ö', 'oe').replace('ä', 'ae')
        url = f"https://www.meinestadt.de/{stadt_fuer_url}/jobs"
        
        try:
            print(f"-> Besuche Seite für: '{stadt}'...")
            driver.get(url)
            wait = WebDriverWait(driver, 15)
            job_element = wait.until(
                EC.presence_of_element_located((By.XPATH, "//*[contains(text(), 'Finde deinen Job in')]"))
            )
            job_anzahl_text = job_element.text
            job_anzahl = ''.join(filter(str.isdigit, job_anzahl_text))
            aktuelle_stellenzahlen[stadt] = job_anzahl
            print(f"   [Erfolg] Gefunden: {job_anzahl} Stellen.")
        except Exception:
            print(f"   [Fehler] Konnte Daten für '{stadt}' nicht auslesen.")
            aktuelle_stellenzahlen[stadt] = "Fehler"

        pause = random.uniform(2, 4)
        print(f"   ...mache eine Pause von {pause:.2f} Sekunden.")
        time.sleep(pause)
        
    print("\nSammlung der Job-Daten abgeschlossen.")
    driver.quit()

    try:
        with open(JOBDATEN_DATEINAME, 'w', encoding='utf-8') as f:
            json.dump(aktuelle_stellenzahlen, f, ensure_ascii=False, indent=4)
        print(f"[Erfolg] Die Datei '{JOBDATEN_DATEINAME}' wurde erfolgreich erstellt/aktualisiert.")
    except Exception as e:
        print(f"\n[FATALER FEHLER] Die Datei '{JOBDATEN_DATEINAME}' konnte nicht geschrieben werden: {e}")

# -- Programmstart --
if __name__ == "__main__":
    daten_sammeln()
    print("\n===================================================")
    print("Backend-Aufgabe abgeschlossen.")
    print("===================================================")