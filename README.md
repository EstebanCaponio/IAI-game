# Esercizio React + TypeScript – IAI Game

## Descrizione del progetto

L’obiettivo dell’esercizio è sviluppare una web application utilizzando React e TypeScript che simuli un sistema di competizione tra squadre all’interno di un contesto aziendale.

L’applicazione rappresenta un gioco in cui più squadre si sfidano tra loro in base a un punteggio complessivo. Ogni squadra è composta da un insieme di membri, e il punteggio totale della squadra è determinato dalla somma dei punti apportati dai singoli membri.

All’avvio dell’applicazione viene generato automaticamente un dataset iniziale composto da:

- un insieme di persone (membri), ciascuna con informazioni come nome, dipartimento, nazione e data di ingresso in azienda;
- un insieme di squadre già esistenti, ciascuna con un certo numero di membri assegnati;
- un punteggio per ogni membro, assegnato in modo casuale tra valori predefiniti.

Sulla base di questi dati viene costruita una classifica globale delle squadre, ordinata in base al punteggio totale.

L’utente dell’applicazione rappresenta un dipendente che, inizialmente, non appartiene a nessuna squadra. Per questo motivo, nella schermata principale gli viene data la possibilità di creare la propria squadra.

Durante la creazione della squadra, l’utente può:

- assegnare un nome alla squadra;
- scegliere un’immagine rappresentativa;
- selezionare i membri da un elenco di persone disponibili;
- visualizzare in tempo reale il contributo in termini di punti dei membri selezionati e il punteggio totale della squadra.

Una volta creata, la squadra viene inserita automaticamente nella classifica globale in base al punteggio raggiunto.

L’utente può inoltre:

- visualizzare il dettaglio di qualsiasi squadra presente in classifica, inclusi i membri e le informazioni principali;
- accedere al dettaglio della propria squadra;
- modificare la propria squadra (ad esempio aggiungendo o rimuovendo membri), con aggiornamento dinamico del punteggio e della posizione in classifica.

L’intera applicazione deve funzionare senza backend: tutti i dati sono gestiti lato frontend e mantenuti in memoria. Le operazioni devono riflettersi immediatamente sull’interfaccia utente senza necessità di ricaricare la pagina.

Questo esercizio ha lo scopo di valutare la capacità di progettare una piccola applicazione completa, gestire lo stato in modo coerente, strutturare correttamente i componenti React e modellare i dati utilizzando TypeScript.

## Obiettivo

Realizzare un'applicazione React (Vite + TypeScript) che simuli una competizione tra squadre aziendali.

## Stack richiesto

- React + TypeScript
- Vite
- Libreria UI: @fluentui/react-components (Fluent UI v9)

### Installazione libreria UI

`npm install @fluentui/react-components`

### Documentazione ufficiale

https://react.fluentui.dev/

## Requisiti funzionali

1. Home

- Sezione 'La tua squadra':
  - Se non hai una squadra → mostra messaggio + bottone 'Crea Squadra'
  - Se hai una squadra → mostra posizione, nome, leader, punti e azioni
- Classifica globale:
  - Lista squadre ordinate per punteggio
  - Dettaglio accessibile per ogni squadra

2. Dettaglio squadra

- Mostrare informazioni squadra
- Lista membri con:
  - Nome
  - Dipartimento
  - Nazione
  - Data ingresso
  - Punti

3. Creazione squadra

- Inserimento nome
- Inserimento immagine
- Aggiunta membri da elenco
- Rimozione membri
- Calcolo punti in tempo reale

4. Modifica squadra

- Stesse funzionalità della creazione

## Modello dati

### Membro:

- Nome
- Dipartimento
- Nazione
- Data ingresso
- Punteggio random tra: 1, 6, 16, 31

### Squadra:

- Nome
- Leader
- Immagine
- Membri
- Punteggio totale
- Data creazione

## Dati iniziali

- Generare un pool di persone (50–100)
- Creare squadre iniziali (6–10)
- Assegnare membri alle squadre
- Calcolare punteggi

## Regole

- Una persona può appartenere a una sola squadra
- Il leader è chi ha creato la squadra
- Il punteggio squadra è la somma dei membri
- La classifica deve aggiornarsi dinamicamente

## Extra (facoltativi)

- Ricerca membri
- Limite membri per squadra
- Avatar con iniziali
- Filtri classifica

## Criteri di valutazione

- Struttura del codice
- Gestione dello stato
- Componentizzazione
- Uso corretto di TypeScript
- Pulizia del codice
