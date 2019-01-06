# warsawjs-workshop-28-project

Aplikacja PWA stworzona na potrzeby WarsawJS Workshop #28, grupa "Vanilla JS".
W dużym skrócie służy ona do zarządzania personalnymi projektami oraz zadaniami,
a z wyglądu nieco przypomina serwis Trello.

## Założenia organizacyjne

Podczas warsztatów skupiamy się na zagadnieniach związanych
stricte z tematem PWA, czyli:

- responsywnym UI
- optymistycznym UI
- możliwości dodawania aplikacji do Home Screen na urządzeniach mobilnych
- możliwości używania aplikacji w trybie offline
- optymalizacjach wydajności
- SEO

W grupie "Vanilla JS" skupiamy się na natywnych API oraz technikach implementacji
aplikacji PWA bez używania większych frameworków lub bibliotek.

Również jest bardzo zalecana integracja tego projektu z Heroku, ponieważ umożliwia
ona uczestnikom warsztatów wejście na swoje aplikacje z urządzeń mobilnych.

## Założenia/wymagania funkcyjne

- jeden użytkownik o znanym login-ie (zmiana hasła jest opcjonalna)
- wiele projektów (plansz w oryginalnej terminologii)
- wiele zadań w ramach projektu
- dostajemy 100% w testach Lighthouse

## Lista ekranów

- Login - formularz logowania
- Home - widok domyślny, wyświetla sprioretyzowaną listę zadań
- ProjectList - lista projektów
- Project - edycja projektu
- TaskList - lista zadań w ramach pojedynczego projektu
- Settings - edycja ustawień użytkownika

## Używane technologie

- JS
- Materialize CSS
- Webpack
- Sass
