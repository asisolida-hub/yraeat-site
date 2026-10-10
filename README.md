# YRA’EAT

Sito statico per la cucina senegalese, il catering e gli eventi di YRA’EAT.
Il design “Teranga contemporanea” valorizza i piatti, la storia di Yaye, Rama e Anta e i contatti ufficiali.

## Sviluppo locale

Non sono richiesti npm, dipendenze o una compilazione. Dalla cartella del repository:

```sh
python3 -m http.server 8000 --bind 127.0.0.1
```

La pagina è servita localmente sulla porta 8000. Le modifiche a HTML, CSS e JavaScript sono disponibili ricaricando il browser.

## Pubblicazione su Vercel

Il progetto indicato è `asisolida-7080/yraeat-site`. `vercel.json` configura il sito come statico, senza dipendenze da installare. Il comando `sh build.sh` copia in `dist` soltanto HTML, CSS, JavaScript, logo e le due immagini utilizzate dalla pagina. Vercel pubblica `dist`: gli altri file del repository non fanno parte del sito pubblico. `.vercelignore` riduce anche i file caricati quando si usa la CLI.

Se il progetto Vercel è collegato a questo repository GitHub con `main` come ramo di produzione e la cartella principale come Root Directory, un aggiornamento di `main` avvia la pubblicazione. Il collegamento al pannello Vercel non è l'indirizzo pubblico del sito: il dominio va confermato nella sezione Domains dopo un deployment riuscito.

Per verificare localmente l'output da pubblicare:

```sh
sh build.sh
python3 -m http.server 8001 --bind 127.0.0.1 --directory dist
```

## File

- `index.html`: contenuti, metadati, contatti e modulo.
- `styles.css`: grafica, layout responsive e accessibilità.
- `site.js`: menu mobile e preparazione della richiesta di preventivo.
- `assets/cucina-illustrativa.png`: immagini illustrative dei quattro piatti.
- `assets/catering-illustrativo.png`: immagine illustrativa del buffet.
- `assets/logo-originale-yraeat.webp`: logo originale.

Le nuove fotografie sono illustrative, come indicato nelle didascalie. Gli asset precedenti sono conservati ma non sono utilizzati nella nuova pagina.

## Richieste di preventivo

Il visitatore compila il modulo e prepara una bozza da verificare. Il pulsante “Apri l’email” apre la sua app email con destinatario `yraeat@gmail.com`, oggetto e messaggio precompilati. L’invio avviene nella sua app email; il sito non dichiara che una richiesta è già stata inviata.

È disponibile anche la copia del messaggio, con selezione manuale se il browser non consente l’accesso agli appunti. Il sito non conserva i dati del modulo e non usa servizi esterni per inviarli.

## Verifiche

Controllare la pagina e le risorse HTTP, il menu mobile e la sua chiusura con Escape, l’assenza di scorrimento orizzontale, le etichette del modulo e la bozza email. La sintassi JavaScript si verifica con:

```sh
node --check site.js
```

La validazione iniziale usa Chromium su desktop, tablet e mobile. Prima di pubblicare verificare anche il percorso di invio nella propria app email.
