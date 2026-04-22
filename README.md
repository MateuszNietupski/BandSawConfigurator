# Konfigurator Pił Taśmowych

Aplikacja w React + Vite służąca do dobierania pił taśmowych na podstawie parametrów technicznych lub konkretnego modelu maszyny. 

## (UX)

### 1. Widok Pił (Główny)
* **MUI Data Grid:** Produkty wyświetlane w tabeli z natywnym sortowaniem po każdej kolumnie (szerokość, grubość, podziałka itp.).
* **Dynamiczne filtry:** Suwaki i selektory reagują na siebie. Jeśli wybierzesz typ piły, który nie występuje w danej długości, suwak długości automatycznie zawęzi zakres do realnie dostępnych wartości.
* **Liczniki dopasowań:** Przy każdym filtrze (np. checkboxie czy opcji w dropdownie) widać liczbę produktów, które zostaną na liście po jego zaznaczeniu.

### 2. Widok Maszyn (Wybór pod urządzenie)
* Osobny ekran z drugą tabelą (Data Grid), zawierający listę maszyn.
* Maszyny mają własny zestaw filtrów (producent, model), również działający dynamicznie.
* **Logika powiązań:** Wybranie maszyny z tabeli cofa użytkownika do widoku pił, automatycznie ustawiając filtry tak, aby pasowały do parametrów technicznych tej konkretnej maszyny. 
* Wybór maszyny można w każdej chwili wyczyścić, wracając do pełnej bazy pił.

## Background Techniczny

* **React + Vite:** Szybki build i brak zbędnego narzutu.
* **MUI Data Grid:** Wykorzystany do obsługi tabel (sortowanie, renderowanie danych).
* **Stan aplikacji (Logic):** Filtrowanie odbywa się w całości po stronie klienta (Client-side). Logika oblicza przecięcia zbiorów danych przy każdej zmianie filtra, żeby na bieżąco aktualizować opcje w pozostałych selektorach (tzw. zależne filtry).
* **Data Source:** Statyczne pliki JSON. Dane są importowane jako moduły, co pozwala na ich łatwą podmianę bez ruszania logiki aplikacji.
