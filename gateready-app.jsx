import { useState, useRef, useEffect } from "react";

const VERSION={
  number:"1.2.0",
  date:"10 giugno 2026",
  sources:{
    visti:"MAECI viaggiaresicuri.it — aggiornato 10/06/2026",
    diritti:"Reg. CE 261/2004 + sentenze CJUE aggiornate 2025",
    bagagli:"Siti ufficiali compagnie — aggiornato 10/06/2026",
    transito:"IATA Timatic — aggiornato 10/06/2026",
    sanitario:"Ministero Salute + OMS — aggiornato 10/06/2026",
  },
  nextReview:"10 settembre 2026",
  officialLinks:[
    {label:"MAECI Viaggiaresicuri",url:"https://www.viaggiaresicuri.it"},
    {label:"IATA Timatic",url:"https://www.timaticweb2.com"},
    {label:"ENAC Diritti Passeggeri",url:"https://www.enac.gov.it"},
    {label:"EUR-Lex Reg. CE 261/2004",url:"https://eur-lex.europa.eu"},
  ]
};

const AP=[["FCO","Roma Fiumicino","IT"],["MXP","Milano Malpensa","IT"],["LIN","Milano Linate","IT"],["VCE","Venezia","IT"],["NAP","Napoli","IT"],["BGY","Bergamo","IT"],["BLQ","Bologna","IT"],["PMO","Palermo","IT"],["CTA","Catania","IT"],["TRN","Torino","IT"],["FLR","Firenze","IT"],["PSA","Pisa","IT"],["BRI","Bari","IT"],["CAG","Cagliari","IT"],["OLB","Olbia","IT"],["CIA","Roma Ciampino","IT"],["TSF","Treviso","IT"],["VRN","Verona","IT"],["TRS","Trieste","IT"],["LHR","Londra Heathrow","GB"],["LGW","Londra Gatwick","GB"],["STN","Londra Stansted","GB"],["LTN","Londra Luton","GB"],["LCY","Londra City","GB"],["MAN","Manchester","GB"],["BHX","Birmingham","GB"],["EDI","Edimburgo","GB"],["GLA","Glasgow","GB"],["CDG","Parigi CDG","FR"],["ORY","Parigi Orly","FR"],["NCE","Nizza","FR"],["LYS","Lione","FR"],["MRS","Marsiglia","FR"],["TLS","Tolosa","FR"],["BOD","Bordeaux","FR"],["AJA","Ajaccio","FR"],["MAD","Madrid","ES"],["BCN","Barcellona","ES"],["AGP","Malaga","ES"],["PMI","Palma","ES"],["ALC","Alicante","ES"],["VLC","Valencia","ES"],["SVQ","Siviglia","ES"],["TFS","Tenerife Sud","ES"],["LPA","Gran Canaria","ES"],["IBZ","Ibiza","ES"],["ACE","Lanzarote","ES"],["FUE","Fuerteventura","ES"],["LIS","Lisbona","PT"],["OPO","Porto","PT"],["FAO","Faro","PT"],["FNC","Funchal","PT"],["FRA","Francoforte","DE"],["MUC","Monaco","DE"],["BER","Berlino","DE"],["HAM","Amburgo","DE"],["DUS","Dusseldorf","DE"],["STR","Stoccarda","DE"],["CGN","Colonia","DE"],["AMS","Amsterdam","NL"],["BRU","Bruxelles","BE"],["ZRH","Zurigo","CH"],["GVA","Ginevra","CH"],["VIE","Vienna","AT"],["SZG","Salisburgo","AT"],["ATH","Atene","GR"],["SKG","Salonicco","GR"],["HER","Heraklion","GR"],["RHO","Rodi","GR"],["JTR","Santorini","GR"],["JMK","Mykonos","GR"],["CFU","Corfu","GR"],["KGS","Kos","GR"],["ZTH","Zante","GR"],["IST","Istanbul","TR"],["SAW","Istanbul Sabiha","TR"],["AYT","Antalya","TR"],["ADB","Izmir","TR"],["OSL","Oslo","NO"],["ARN","Stoccolma","SE"],["CPH","Copenhagen","DK"],["HEL","Helsinki","FI"],["KEF","Reykjavik","IS"],["WAW","Varsavia","PL"],["KRK","Cracovia","PL"],["PRG","Praga","CZ"],["BUD","Budapest","HU"],["BTS","Bratislava","SK"],["ZAG","Zagabria","HR"],["DBV","Dubrovnik","HR"],["SPU","Spalato","HR"],["BEG","Belgrado","RS"],["TIA","Tirana","AL"],["SOF","Sofia","BG"],["OTP","Bucarest","RO"],["TGD","Podgorica","ME"],["TIV","Tivat","ME"],["SKP","Skopje","MK"],["SJJ","Sarajevo","BA"],["LJU","Lubiana","SI"],["SVO","Mosca SVO","RU"],["LED","San Pietroburgo","RU"],["GYD","Baku","AZ"],["TBS","Tbilisi","GE"],["EVN","Yerevan","AM"],["DXB","Dubai","AE"],["AUH","Abu Dhabi","AE"],["DOH","Doha","QA"],["tempo minimo di connessione","Muscat","OM"],["RUH","Riyadh","SA"],["JED","Jeddah","SA"],["AMM","Amman","JO"],["TLV","Tel Aviv","IL"],["IKA","Teheran","IR"],["CAI","Il Cairo","EG"],["HRG","Hurghada","EG"],["SSH","Sharm el-Sheikh","EG"],["CMN","Casablanca","MA"],["RAK","Marrakech","MA"],["TUN","Tunisi","TN"],["DJE","Djerba","TN"],["ALG","Algeri","DZ"],["JNB","Johannesburg","ZA"],["CPT","Citta del Capo","ZA"],["NBO","Nairobi","KE"],["MBA","Mombasa","KE"],["DAR","Dar es Salaam","TZ"],["ZNZ","Zanzibar","TZ"],["ADD","Addis Abeba","ET"],["LOS","Lagos","NG"],["ACC","Accra","GH"],["DKR","Dakar","SN"],["MRU","Mauritius","MU"],["SEZ","Seychelles","SC"],["DEL","Nuova Delhi","IN"],["BOM","Mumbai","IN"],["BLR","Bangalore","IN"],["MAA","Chennai","IN"],["HYD","Hyderabad","IN"],["GOI","Goa","IN"],["COK","Kochi","IN"],["KTM","Kathmandu","NP"],["CMB","Colombo","LK"],["DAC","Dhaka","BD"],["KHI","Karachi","PK"],["ISB","Islamabad","PK"],["MLE","Male","MV"],["PEK","Pechino","CN"],["PVG","Shanghai","CN"],["CAN","Guangzhou","CN"],["CTU","Chengdu","CN"],["HKG","Hong Kong","HK"],["TPE","Taipei","TW"],["NRT","Tokyo Narita","JP"],["HND","Tokyo Haneda","JP"],["KIX","Osaka","JP"],["FUK","Fukuoka","JP"],["ICN","Seoul Incheon","KR"],["SIN","Singapore","SG"],["BKK","Bangkok","TH"],["DMK","Bangkok Don Mueang","TH"],["HKT","Phuket","TH"],["CNX","Chiang Mai","TH"],["KBV","Krabi","TH"],["USM","Koh Samui","TH"],["KUL","Kuala Lumpur","MY"],["PEN","Penang","MY"],["CGK","Jakarta","ID"],["DPS","Bali","ID"],["MNL","Manila","PH"],["HAN","Hanoi","VN"],["SGN","Ho Chi Minh","VN"],["DAD","Da Nang","VN"],["RGN","Yangon","MM"],["PNH","Phnom Penh","KH"],["REP","Siem Reap","KH"],["SYD","Sydney","AU"],["MEL","Melbourne","AU"],["BNE","Brisbane","AU"],["PER","Perth","AU"],["AKL","Auckland","NZ"],["NAN","Fiji Nadi","FJ"],["JFK","New York JFK","US"],["EWR","New York Newark","US"],["LAX","Los Angeles","US"],["ORD","Chicago","US"],["ATL","Atlanta","US"],["DFW","Dallas","US"],["MIA","Miami","US"],["SFO","San Francisco","US"],["SEA","Seattle","US"],["DEN","Denver","US"],["BOS","Boston","US"],["IAD","Washington","US"],["LAS","Las Vegas","US"],["MCO","Orlando","US"],["HNL","Honolulu","US"],["YVR","Vancouver","CA"],["YYZ","Toronto","CA"],["MEX","Citta del Messico","MX"],["CUN","Cancun","MX"],["GDL","Guadalajara","MX"],["PUJ","Punta Cana","DO"],["GRU","Sao Paulo","BR"],["GIG","Rio de Janeiro","BR"],["BSB","Brasilia","BR"],["EZE","Buenos Aires","AR"],["SCL","Santiago","CL"],["LIM","Lima","PE"],["BOG","Bogota","CO"]];
const AIRPORTS=AP.map(a=>({c:a[0],n:a[1],co:a[2]}));

const COORDS={FCO:[41.8,12.2],MXP:[45.6,8.7],LIN:[45.4,9.3],VCE:[45.5,12.4],NAP:[40.9,14.3],BGY:[45.7,9.7],BLQ:[44.5,11.3],FLR:[43.8,11.2],PSA:[43.7,10.4],LHR:[51.5,-0.5],LGW:[51.2,-0.2],STN:[51.9,0.2],CDG:[49.0,2.5],ORY:[48.7,2.4],MAD:[40.5,-3.6],BCN:[41.3,2.1],AMS:[52.3,4.8],BRU:[50.9,4.5],ZRH:[47.5,8.5],VIE:[48.1,16.6],FRA:[50.0,8.6],MUC:[48.4,11.8],BER:[52.4,13.5],ATH:[37.9,23.9],IST:[41.3,28.7],AYT:[36.9,30.8],DXB:[25.3,55.4],DOH:[25.3,51.6],AUH:[24.4,54.7],TLV:[32.0,34.9],CAI:[30.1,31.4],NBO:[1.3,37.0],JNB:[-26.1,28.2],DEL:[28.6,77.1],BOM:[19.1,72.9],BLR:[13.2,77.7],MAA:[12.9,80.2],HYD:[17.2,78.4],KTM:[27.7,85.4],CMB:[7.2,79.9],PEK:[40.1,116.6],PVG:[31.1,121.8],HKG:[22.3,113.9],NRT:[35.8,140.4],HND:[35.6,139.8],KIX:[34.4,135.2],ICN:[37.5,126.4],SIN:[1.4,103.9],BKK:[13.7,100.7],HKT:[8.1,98.3],KUL:[2.7,101.7],CGK:[-6.1,106.7],DPS:[-8.7,115.2],MNL:[14.5,121.0],SYD:[-33.9,151.2],MEL:[-37.7,144.8],BNE:[-27.4,153.1],AKL:[-37.0,174.8],JFK:[40.6,-73.8],LAX:[33.9,-118.4],ORD:[42.0,-87.9],ATL:[33.6,-84.4],MIA:[25.8,-80.3],SFO:[37.6,-122.4],DEN:[39.9,-104.7],BOS:[42.4,-71.0],YVR:[49.2,-123.2],YYZ:[43.7,-79.6],GRU:[-23.4,-46.5],EZE:[-34.8,-58.5],SCL:[-33.4,-70.8],LIM:[-12.0,-77.1],BOG:[4.7,-74.1],MEX:[19.4,-99.1],CUN:[21.0,-86.9]};

function haversine(c1,c2){
  if(!c1||!c2)return null;
  const R=6371,d2r=Math.PI/180;
  const dLat=(c2[0]-c1[0])*d2r,dLon=(c2[1]-c1[1])*d2r;
  const a=Math.sin(dLat/2)**2+Math.cos(c1[0]*d2r)*Math.cos(c2[0]*d2r)*Math.sin(dLon/2)**2;
  return Math.round(R*2*Math.atan2(Math.sqrt(a),Math.sqrt(1-a)));
}

function getComp(fCode,tCode){
  const d=haversine(COORDS[fCode],COORDS[tCode]);
  if(!d)return{comp:250,half:125,dist:"n/d",label:"< 1500km (stimato)"};
  if(d<1500)return{comp:250,half:125,dist:d,label:d+"km"};
  if(d<3500)return{comp:400,half:200,dist:d,label:d+"km"};
  return{comp:600,half:300,dist:d,label:d+"km"};
}

const EU=new Set(["IT","FR","DE","ES","PT","NL","BE","AT","GR","SE","DK","FI","PL","CZ","HU","RO","BG","HR","SI","SK","EE","LV","LT","LU","MT","CY","IE"]);

const AIRLINE_GUIDES={
  "ryanair":"RYANAIR - Procedura specifica:\n- Reclamo SOLO online: customerservice.ryanair.com\n- NON risponde a email dirette\n- Risposta attesa: 10-28 giorni\n- Se rifiuta: ENAC o ADR RisolviOnline (gratuito)\n- Tip: menziona sempre 'Reg CE 261/2004' nel modulo",
  "easyjet":"EASYJET - Procedura specifica:\n- Form online: easyjet.com/en/help/refunds\n- Risposta attesa: 28 giorni\n- ADR: Aviation ADR (UK) o ENAC (voli da IT)\n- Tip: conserva tutti i messaggi dell'app",
  "ita":"ITA AIRWAYS - Procedura specifica:\n- Email: customercare@ita-airways.com\n- Risposta attesa: 30 giorni\n- Poi: ENAC o Giudice di Pace Roma\n- Tip: invia raccomandata A/R per maggiore efficacia",
  "wizz":"WIZZ AIR - Procedura specifica:\n- App o sito: wizzair.com > Assistenza\n- Risposta attesa: 30 giorni\n- ADR: CAA UK o ENAC per voli da IT\n- Tip: possono offrire credito Wizz - hai diritto a rimborso in denaro",
  "vueling":"VUELING - Procedura specifica:\n- Form: vueling.com/it/informazioni/contattaci\n- Risposta attesa: 21 giorni\n- ADR: AESA (Spagna) o ENAC (voli da IT)",
  "lufthansa":"LUFTHANSA - Procedura specifica:\n- Form: lufthansa.com/it/it/feedback\n- Risposta attesa: 20 giorni\n- ADR: Schlichtungsstelle Luftverkehr (Germania)",
  "alitalia":"ITA Airways (ex Alitalia): vedi guida ITA Airways sopra",
};

function getAirlineGuide(airline){
  if(!airline)return null;
  const al=airline.toLowerCase();
  for(const[k,v]of Object.entries(AIRLINE_GUIDES)){
    if(al.includes(k))return v;
  }
  return null;
}

function deadlineInfo(flightDate){
  if(!flightDate)return null;
  const fd=new Date(flightDate);
  const now=new Date();
  const days=Math.round((now-fd)/(1000*60*60*24));
  const deadline2y=new Date(fd); deadline2y.setFullYear(deadline2y.getFullYear()+2);
  const daysLeft=Math.round((deadline2y-now)/(1000*60*60*24));
  if(daysLeft<0)return "ATTENZIONE: I 2 anni per il reclamo sono SCADUTI il "+deadline2y.toLocaleDateString("it-IT")+". Verifica con un legale se ci sono eccezioni.";
  if(daysLeft<30)return "URGENTE: scadenza reclamo tra "+daysLeft+" giorni ("+deadline2y.toLocaleDateString("it-IT")+")!";
  if(daysLeft<90)return "Scadenza reclamo: "+deadline2y.toLocaleDateString("it-IT")+" ("+daysLeft+" giorni). Agisci presto.";
  return "Hai tempo fino al "+deadline2y.toLocaleDateString("it-IT")+" ("+daysLeft+" giorni) per presentare reclamo.";
}

function getRights(issue,fCode,tCode,airline,date,ticketPrice){
  const fa=AIRPORTS.find(a=>a.c===fCode),ta=AIRPORTS.find(a=>a.c===tCode);
  const fromEU=fa?EU.has(fa.co):true;
  const euC=["ITA","Ryanair","easyJet","Vueling","Wizz","Iberia","Air France","Lufthansa","KLM","British","TAP","Austrian","LOT","Finnair","Alitalia","Volotea"];
  const isEUC=euC.some(c=>airline&&airline.toLowerCase().includes(c.toLowerCase().split(" ")[0]));
  const ok=fromEU||isEUC;
  const {comp,half,dist,label}=getComp(fCode||"FCO",tCode||"LHR");
  const rotta=(fa&&ta)?fa.c+"->"+ta.c:"rotta n/d";
  const v=airline||"compagnia n/d";
  const d=date||"data n/d";
  const iss=issue.toLowerCase();
  const airGuide=getAirlineGuide(airline);
  const deadline=deadlineInfo(date);
  const refund=ticketPrice?"\n\nCALCOLATORE RIMBORSO:\n- Biglietto: EUR "+ticketPrice+"\n- Compensazione EU 261: EUR "+comp+"\n- Rimborso biglietto: EUR "+ticketPrice+"\n- TOTALE potenziale: EUR "+(comp+parseInt(ticketPrice)):"";

  let extra="";
  if(deadline)extra+="\n\nSCADENZA: "+deadline;
  if(airGuide)extra+="\n\n"+airGuide;
  extra+=refund;

  if(!ok&&!iss.includes("bagagl"))return "Reg. CE 261/2004 potrebbe non applicarsi (volo extra-UE con vettore non-UE).\nContatta la compagnia per iscritto e verifica le condizioni di trasporto."+extra;

  if(iss.includes("cancellat"))return "BASE LEGALE: Reg. CE 261/2004 Art.5\n\nDISTANZA ROTTA: "+label+"\nCOMPENSAZIONE: EUR "+comp+"/passeggero\n\nCIRCOSTANZE STRAORDINARIE (esonero pagamento ma NON rimborso):\n- Maltempo estremo certificato\n- Scioperi controllori del traffico aereo\n- Emergenze sicurezza imprevedibili\n- Instabilita' politica improvvisa\nNON sono straordinarie: scioperi della compagnia, problemi tecnici evitabili, mancanza equipaggio\n\nHAI DIRITTO ANCHE A:\n- Rimborso biglietto entro 7gg O riprotezione\n- Pasti durante attesa proporzionali\n- Hotel se pernottamento necessario + trasferimento\n\nTESTO RECLAMO:\n---\nOgg: Reclamo cancellazione - Reg CE 261/2004\nSpett.le "+v+", il/la sottoscritto/a [NOME] aveva prenotato volo [N.] del "+d+" rotta "+rotta+". Il volo e' stato cancellato.\nAi sensi art.5 Reg CE 261/2004 richiedo: compensazione EUR "+comp+" per passeggero + rimborso biglietto EUR [IMPORTO] entro 7gg.\nIn assenza di riscontro entro 30gg provvedero' a reclamo ENAC e azioni legali.\n[NOME] - [EMAIL] - [TEL]\n---\nESCALATION: ENAC (enac.gov.it) -> ADR -> Giudice di Pace"+extra;

  if(iss.includes("ritardo"))return "BASE LEGALE: Reg CE 261/2004 Art.6+7 + CJUE C-402/07\nRitardo >= 3h ALL'ARRIVO = compensazione\n\nDISTANZA ROTTA: "+label+"\nCOMPENSAZIONE: EUR "+comp+" (ridotta a EUR "+half+" se riprotezione con arrivo nella soglia)\n\nCOME MISURARE IL RITARDO:\n- Si conta all'ARRIVO (apertura porte), non alla partenza\n- Documentare con screenshot app compagnia o ATC\n\nASSISTENZA DURANTE ATTESA:\n- >= 2h: pasti e bevande\n- >= 5h: puoi rinunciare al volo e rimborso integrale\n- Pernottamento se necessario\n\nTESTO RECLAMO:\n---\nOgg: Reclamo ritardo - Reg CE 261/2004\nSpett.le "+v+", volo [N.] del "+d+" rotta "+rotta+" ha subito ritardo arrivo >3h (prev [ORA] eff [ORA]).\nRichiedo EUR "+comp+"/passeggero ex art.7 Reg CE 261/2004.\n[NOME] - [EMAIL] - [TEL]\n---"+extra;

  if(iss.includes("bagagl")&&(iss.includes("perd")||iss.includes("smarr")))return "BASE LEGALE: Conv. Montreal 1999 Art.17\n(Valida per TUTTI i voli internazionali)\n\nRISARCIMENTO MAX: ~EUR 1.600/passeggero\n\nAZIONE URGENTE - PRIMA DI USCIRE:\n1. Compila modulo di segnalazione bagaglio (PIR) al Lost & Found (OBBLIGATORIO)\n2. Chiedi riferimento pratica scritto\n3. Chiedi rimborso spese immediate (vestiario ecc.)\n\nSPESE RIMBORSABILI DURANTE ATTESA:\n- Vestiario di prima necessita'\n- Prodotti igienici\n- Conserva TUTTI gli scontrini\n\nTESTO RECLAMO:\n---\nOgg: Smarrimento bagaglio - Conv Montreal 1999\nSpett.le "+v+", in data "+d+" volo [N.] rotta "+rotta+" non ho ricevuto bagaglio (modulo di segnalazione bagaglio (PIR): [NUM]).\nRichiedo risarcimento EUR [IMPORTO] ex artt.17-22 Conv Montreal.\nAllego: modulo di segnalazione bagaglio (PIR), lista contenuto, ricevute spese.\n[NOME] - [EMAIL] - [TEL]\n---\n\nSCADENZE TASSATIVE:\n- Bagaglio in ritardo: reclamo entro 21gg\n- Bagaglio perso definitivo: azione entro 2 anni"+extra;

  if(iss.includes("overbooking")||iss.includes("negato"))return "BASE LEGALE: Reg CE 261/2004 Art.4\nTutela PIU' FORTE del regolamento\n\nDISTANZA ROTTA: "+label+"\nCOMPENSAZIONE IMMEDIATA: EUR "+comp+"/passeggero\n\nNON FIRMARE rinunce ai diritti!\nHai diritto a DENARO CONTANTE, non solo voucher (salvo tua scelta)\n\nVOLONTARI vs INVOLONTARI:\n- Se chiedi volontariamente di scendere: negozi condizioni (volo+voucher)\n- Se e' involontario: compensazione piena obbligatoria\n\nTESTO RECLAMO:\n---\nOgg: Negato imbarco - Reg CE 261/2004 Art.4\nSpett.le "+v+", in data "+d+" volo [N.] rotta "+rotta+" mi e' stato negato l'imbarco pur con prenotazione confermata e check-in nei termini.\nRichiedo EUR "+comp+" e rimborso/riprotezione a mia scelta.\n[NOME] - [EMAIL] - [TEL]\n---\n\nENAC ha poteri sanzionatori diretti per questa violazione"+extra;

  if(iss.includes("connessione")||iss.includes("coincidenz"))return "BASE LEGALE: Reg CE 261/2004 + CJUE\nSolo se voli su UNICO BIGLIETTO\n\nDISTANZA ROTTA: "+label+"\nCOMPENSAZIONE: EUR "+comp+" se ritardo >3h alla destinazione finale\n\nBIGLIETTI SEPARATI:\n- Nessun obbligo per la compagnia del primo volo\n- Assicurazione viaggio puo' coprire\n\nCOSA FARE SUBITO:\n1. NON uscire dall'aeroporto\n2. Banco compagnia: chiedi riprotezione scritta\n3. Conserva entrambe le carte imbarco\n4. Documenta orario arrivo primo volo\n\nTESTO RECLAMO:\n---\nOgg: Connessione persa - Reg CE 261/2004\nSpett.le "+v+", in data "+d+" ho perso coincidenza (prenotazione unica [RIF.]) rotta "+rotta+" per ritardo volo vostro. Destinazione finale con >3h ritardo.\nRichiedo EUR "+comp+" ex Reg CE 261/2004.\n[NOME] - [EMAIL] - [TEL]\n---"+extra;

  if(iss.includes("dannegg"))return "BASE LEGALE: Conv Montreal 1999 Art.17\n\nRISARCIMENTO MAX: ~EUR 1.600\n\nSCADENZA TASSATIVA: 7 GIORNI dalla ricezione!\n\nPROCEDURA:\n1. Prima di uscire: Lost & Found, compila modulo di segnalazione bagaglio (PIR)\n2. Fotografa i danni immediatamente\n3. Entro 7 giorni: reclamo scritto con foto\n4. Ottieni preventivo riparazione\n\nTESTO RECLAMO:\n---\nOgg: Danno bagaglio - Conv Montreal Art.17\nSpett.le "+v+", in data "+d+" volo [N.] rotta "+rotta+" ho ricevuto bagaglio (tag [N.]) con danni: [DESCR.].\nRichiedo EUR [IMPORTO] documentato allegato.\nAllego: modulo di segnalazione bagaglio (PIR), foto, preventivo riparazione.\n[NOME] - [EMAIL] - [TEL]\n---"+extra;

  if(iss.includes("rimborso"))return "STRUMENTO PIU' RAPIDO: CHARGEBACK\nSe hai pagato con carta chiedi storno alla banca.\nTermini: 120gg Visa/MC - 540gg Amex\n\nTESTO SOLLECITO:\n---\nOgg: Sollecito rimborso - rif [NUM]\nSpett.le "+v+", rimborso EUR [IMPORTO] richiesto il [DATA] non e' stato accreditato.\nDiffido entro 14 giorni, poi: chargeback + ENAC.\n[NOME] - [EMAIL] - [TEL]\n---"+extra;

  if(iss.includes("downgrade")||iss.includes("classe"))return "BASE LEGALE: Reg CE 261/2004 Art.10\n\nRIMBORSO OBBLIGATORIO (% del biglietto):\n- Voli <= 1500km: 30%\n- Voli 1500-3500km: 50%\n- Voli > 3500km: 75%\nEntro 7 giorni - aggiuntivo al viaggio\n\nTESTO RECLAMO:\n---\nOgg: Declassamento - Reg CE 261/2004 Art.10\nSpett.le "+v+", in data "+d+" volo [N.] rotta "+rotta+" sono stato declassato da [CLASSE] a [CLASSE] senza consenso.\nRichiedo [30/50/75]% biglietto EUR [IMPORTO] entro 7gg.\n[NOME] - [EMAIL] - [TEL]\n---"+extra;

  return "Reg. CE 261/2004 "+(ok?"si applica":"potrebbe non applicarsi")+".\nConvenzione Montreal per bagagli.\nSeleziona problema specifico sopra o descrivi in dettaglio.\n\nContatti: enac.gov.it - ecc-net.it"+extra;
}

function getPrep(fCode,tCode,passport,purpose,date,stopCode){
  const fa=AIRPORTS.find(a=>a.c===fCode),ta=AIRPORTS.find(a=>a.c===tCode);
  const dest=ta?ta.co:tCode;
  const noV=new Set(["FR","DE","ES","PT","NL","BE","AT","GR","SE","DK","FI","PL","CZ","HU","RO","BG","HR","SI","SK","EE","LV","LT","LU","MT","CY","IE","GB","CH","NO","IS","US","CA","AU","NZ","JP","KR","SG","BR","AR","CL","MX","MA","TN","TR","AL","RS","ME","MK","BA","GE","AM","AZ","IL","JO","AE","QA","BH","MY","PH","TW","HK"]);
  const eV=new Set(["IN","LK","KH","MM","TZ","KE","ET"]);
  const vR=new Set(["CN","VN","BD","PK","NG","EG","DZ","RU","IR"]);

  // Visti per transito (paesi che richiedono visto anche solo per scalo)
  // Paesi con regole speciali per transito (anche solo scalo)
  const transitRules={
    "US":"USA: ESTA obbligatoria anche per transito (scalo) se si passa per controllo passaporti.\n- Se rimani nell'area internazionale airside senza uscire: verifica con la compagnia.\n- Per lavoro: ESTA non valida, serve visto B-1.",
    "CA":"CANADA: eTA obbligatoria anche per transito aereo.\n- Registrati su canada.ca/eta prima di partire (EUR 7 ca.).",
    "AU":"AUSTRALIA: ETA o visto richiesti anche per transito.\n- Transit visa (subclass 771) se scendi dall'aereo.\n- Se rimani airside: verifica con compagnia.",
    "GB":"UK: ETA richiesta anche per transito post-Brexit.\n- Direct Airside Transit Visa (DATV) se esci dall'area internazionale.\n- Verifica: gov.uk/transit-visa",
    "US_work":"USA LAVORO: ESTA NON valida per scopi lavorativi.\n- Serve visto B-1 (business) o H-1B (lavoro dipendente).\n- Ambasciata USA Roma: usembassy.gov/it\n- Tempi: 4-12 settimane.",
    "CN":"CINA: Visto obbligatorio. Eccezione Transito Senza Visto (TWOV) (72h/144h) in alcuni aeroporti con volo confermato.",
    "IN":"INDIA: Visto di transito richiesto se si esce dall'area internazionale.",
    "NG":"NIGERIA: Visto di transito generalmente richiesto.",
    "PK":"PAKISTAN: Visto di transito richiesto per la maggior parte delle nazionalita'.",
  };
  const simpleTransitVisa=new Set(["US","CA","AU","GB","CN","IN","NG","PK"]);
  const transitNote=purpose==="transito"&&simpleTransitVisa.has(dest)?
    "ATTENZIONE SCALO/TRANSITO:\n"+(transitRules[dest]||"Visto o autorizzazione potrebbe essere richiesta anche per semplice scalo.")+"\nFonte sempre aggiornata: timaticweb2.iata.org":"";

  // Logica visto per lavoro - ESTA/ETA validi SOLO per turismo
  const workVisaRequired=new Set(["US","CA","AU","GB","JP","KR","SG","AE","QA","CH"]);
  const isWork=purpose==="lavoro";

  let visa="";
  if(passport==="italiana"){
    if(noV.has(dest)){
      if(isWork&&workVisaRequired.has(dest)){
        // Lavoro: ESTA non basta, serve visto specifico
        const workVisaMap={
          "US":"VISTO OBBLIGATORIO per scopi lavorativi - passaporto italiano\n\nATTENZIONE: L'ESTA NON e' valida per lavoro!\n- ESTA = solo turismo, visita familiare, affari brevi NON retribuiti (max 90gg)\n- Per trasferte lavorative con compenso/contratto: serve VISTO B-1\n- Per lavoro dipendente in USA: Visto H-1B (sponsorizzato dall'azienda USA)\n- Per trasferimento aziendale: Visto L-1\n- Per meeting/conferenze/fiere (senza retribuzione USA): ESTA sufficiente\n\nCome ottenere il Visto B-1:\n- Prenota colloquio: it.usembassy.gov\n- Ambasciata USA Roma o Consolato Milano\n- Documenti: lettera datore lavoro IT, lettera invito azienda USA, estratto conto\n- Tempi: 4-12 settimane (prenota per tempo!)\n- Costo: USD 185 (non rimborsabile)\n- Fonte ufficiale: travel.state.gov",
          "CA":"VISTO OBBLIGATORIO per lavoro - passaporto italiano\n- eTA valida SOLO per turismo\n- Work Permit o LMIA richiesti per lavoro\n- Richiedi presso Ambasciata Canada\n- Fonte: canada.ca/immigration",
          "GB":"VISTO OBBLIGATORIO per lavoro - passaporto italiano\n- ETA valida SOLO per turismo\n- Skilled Worker Visa o Business Visitor Visa (per meeting/conferenze brevi)\n- Richiedi presso UK Visas and Immigration\n- Fonte: gov.uk/work-in-uk",
          "AU":"VISTO OBBLIGATORIO per lavoro - passaporto italiano\n- ETA valida SOLO per turismo\n- Temporary Skill Shortage visa (TSS/482) o Business Visitor\n- Fonte: immi.homeaffairs.gov.au",
          "JP":"VISTO CONSIGLIATO per lavoro - passaporto italiano\n- 90gg senza visto per turismo, ma per lavoro/contratto serve visto\n- Work Visa: richiedi presso Ambasciata giapponese\n- Per meeting/fiere brevi: ingresso senza visto generalmente accettato",
          "AE":"VISTO LAVORO - passaporto italiano\n- Ingresso senza visto per turismo 90gg\n- Per lavoro con contratto: Employment Visa sponsorizzata dall'azienda UAE\n- Per meeting/conferenze brevi: ingresso libero sufficiente",
        };
        visa=(workVisaMap[dest]||"VISTO PROBABILMENTE RICHIESTO per scopi lavorativi\n- Il visto turistico/ESTA non copre attivita' lavorative retribuite\n- Verifica con ambasciata di destinazione o legale specializzato\n- Fonte: timaticweb2.iata.org");
      } else {
        visa="NESSUN VISTO richiesto per turismo/visita - passaporto italiano\n- Validita' passaporto: min 3-6 mesi oltre partenza"+(dest==="US"?"\n- ESTA obbligatoria: esta.cbp.dhs.gov (USD 21, online)\n- ESTA valida SOLO per turismo, affari brevi, transito (max 90gg)":"")+(dest==="GB"?"\n- ETA (Electronic Travel Authorisation) richiesta: apply.visas.homeoffice.gov.uk":"")+(dest==="CA"?"\n- eTA Canada obbligatoria: canada.ca/eta":"")+(dest==="AU"?"\n- ETA Australia: immi.homeaffairs.gov.au":"");
      }
    } else if(eV.has(dest)){
      visa=(isWork?"ATTENZIONE: e-Visa standard valida per turismo. Per lavoro verifica se serve visto specifico.\n":"")+
        "E-VISA disponibile online\n- Portale ufficiale governo di destinazione\n- Costo: EUR 20-80 ca. | Tempi: 24-72h\n- Richiedi almeno 2 settimane prima\n- Passaporto: min 6 mesi oltre il rientro";
    } else if(vR.has(dest)){
      visa="VISTO OBBLIGATORIO per cittadini italiani\n- Ambasciata/Consolato in Italia\n- Tempi: 2-8 settimane - inizia subito!\n- Documenti: passaporto, foto, modulo, estratto conto, prenotazioni A/R"+(isWork?"\n- Per lavoro: specifica visto lavorativo, non turistico":"");
    } else {
      visa="Verifica requisiti: viaggiaresicuri.it (MAECI) e timaticweb2.iata.org";
    }
    if(transitNote)visa=transitNote+"\n\n"+visa;
  } else {
    visa="Verifica per passaporto "+passport+": timaticweb2.iata.org"+(purpose==="transito"?"\n\nATTENZIONE TRANSITO: molti paesi richiedono visto anche per scalo. Verifica sempre.":"");
  }

  const health={"TH":"Consigliati: Epatite A/B, Tifo, Tetano. Malaria in zone rurali. Dengue: protezione anti-zanzare.","IN":"Consigliati: Epatite A/B, Tifo, Tetano, Encefalite Giapponese (rurali). Malaria profilassi. Solo acqua bottiglia.","JP":"Aggiornamento vaccini routine. Nessun obbligo per arrivo da Italia. Standard sanitari ottimi.","US":"Nessun obbligo vaccinale. ASSICURAZIONE SANITARIA fondamentale (costi medici altissimi).","AU":"Nessun obbligo. Controlli doganali severissimi: dichiara assolutamente tutto.","EG":"Consigliati: Epatite A, Tifo. Evita acqua rubinetto e verdure crude non sbucciate.","TN":"Consigliati: Epatite A, Tifo. Standard sanitari variabili fuori dai resort.","MA":"Consigliati: Epatite A, Tifo. Acqua in bottiglia consigliata."};
  const h=health[dest]||"Verifica vaccini: viaggiaresicuri.it. Consulta medico 6-8 settimane prima.";

  const practical={"US":"USD (1EUR=1.08USD) | Adapter Tipo A/B | Fuso -6/9h | Mance 15-20% obbligatorie | Guida a destra","GB":"GBP (1EUR=0.85GBP) | Adapter Tipo G | Fuso UTC+0 o +1 (BST) | Guida a sinistra","JP":"JPY (1EUR=160JPY, molti posti solo contanti) | Adapter Tipo A | Fuso +8h | Molto rispettoso delle norme locali","AE":"AED (1EUR=3.9AED) | Adapter Tipo G | Fuso +3h | Dress code rigoroso in luoghi pubblici","TH":"THB (1EUR=38THB) | Fuso +6h | Coprirsi per templi | Non toccare la testa di nessuno","AU":"AUD (1EUR=1.65AUD) | Adapter Tipo I | Fuso +9-11h | Guida a sinistra","EG":"EGP (1EUR=33EGP) | Adapter Tipo C/F | Fuso +2h | Contrattare nei mercati e' normale","MA":"MAD (1EUR=10.8MAD) | Adapter Tipo C/E | Fuso +0/+1h | Contrattare nei souk e' normale"};
  const pr=practical[dest]||"Verifica valuta: xe.com | Adapter: worldstandards.eu/electricity";

  const tl=date?`
TIMELINE PREPARAZIONE (volo: ${date}):
- Ora: verifica validita' passaporto${vR.has(dest)?" e avvia pratica visto":""}
- 8 settimane prima: visita medico per vaccini e profilassi
- 4 settimane prima: richiedi visto${eV.has(dest)?" (e-visa)":vR.has(dest)?" presso ambasciata":""}, assicurazione viaggio
- 2 settimane prima: online check-in apre, conferma prenotazioni
- 48h prima: riconferma volo, prepara documenti
- Giorno partenza: ${["US","CA","AU","NZ"].includes(dest)?"arriva 3h prima":"arriva 2h prima per voli internazionali"}`:"";

  const checklist=`
CHECKLIST PARTENZA:
Documenti:
[ ] Passaporto valido${dest==="US"?" + ESTA stampata":eV.has(dest)?" + e-Visa stampata":vR.has(dest)?" + Visto sul passaporto":""}
[ ] Assicurazione viaggio (con numero di emergenza)
[ ] Prenotazioni hotel stampate o salvate offline
[ ] Biglietti aerei (app o stampa)${purpose==="lavoro"?"\n[ ] Lettera di invito/contratto":""}
Salute:
[ ] Farmaci personali con ricetta originale
[ ] Certificato vaccinale internazionale${["IN","TH","EG","TN","MA"].includes(dest)?"\n[ ] Profilassi malaria (se prescritta)":""}
Bagaglio:
[ ] Liquidi in sacchetto trasparente 1L (max 100ml)
[ ] Adapter elettrico${["US","GB","JP","AU"].includes(dest)?" (obbligatorio)":""}
[ ] Valuta locale (min. piccola scorta)`;

  // Analisi aeroporto di transito
  let transitSection="";
  if(stopCode){
    const sa=AIRPORTS.find(a=>a.c===stopCode);
    const stopDest=sa?sa.co:stopCode;
    const stopName=sa?sa.n:stopCode;

    // Visto di transito per paese di scalo
    const tvMap={
      "US":"USA: ESTA obbligatoria anche per semplice scalo (USD 21, esta.cbp.dhs.gov).\n- Se sei in transito senza uscire dall'area airside: contatta la compagnia per verifica Transito Senza Visto (TWOV).\n- Per lavoro: serve visto B-1, non ESTA.",
      "CA":"CANADA: eTA obbligatoria anche per transito aereo (EUR 7 ca., canada.ca/eta).\n- Se esci dall'aeroporto: serve visto visitatore.",
      "AU":"AUSTRALIA: ETA o visto richiesti anche per transito.\n- Transit Visa (subclass 771) se esci dall'area internazionale.\n- Verifica: immi.homeaffairs.gov.au",
      "GB":"UK: ETA richiesta anche per transito post-Brexit.\n- Direct Airside Transit Visa (DATV) se esci dall'area internazionale.\n- Verifica: gov.uk/transit-visa",
      "CN":"CINA: Visto obbligatorio. Eccezione Transito Senza Visto (TWOV) (72h/144h) in aeroporti selezionati (PEK, PVG, CAN...) con volo confermato in uscita.\n- Verifica disponibilita' Transito Senza Visto (TWOV): timaticweb2.iata.org",
      "IN":"INDIA: Visto di transito richiesto se esci dall'area internazionale.\n- Transit e-Visa disponibile online: indianvisaonline.gov.in",
      "NG":"NIGERIA: Visto di transito generalmente richiesto per la maggior parte delle nazionalita'.",
      "PK":"PAKISTAN: Visto di transito richiesto. Verifica con ambasciata pakistana.",
      "RU":"RUSSIA: Visto di transito richiesto per la maggior parte delle nazionalita'.\n- Verifica attuale situazione politica prima di pianificare scali in Russia.",
      "TR":"TURCHIA: Nessun visto richiesto per transito per passaporto italiano.\n- Soggiorno max senza visto: 90 giorni.",
      "AE":"UAE: Nessun visto richiesto per transito per passaporto italiano.\n- Scalo a Dubai/Abu Dhabi: libero accesso alle aree duty-free.",
      "QA":"QATAR: Nessun visto richiesto per transito per passaporto italiano.\n- Scalo a Doha: accesso libero, Qatar Airways offre hotel gratuito per scali lunghi.",
    };

    const tvInfo=tvMap[stopDest]||"Nessun visto di transito generalmente richiesto per passaporto italiano.\n- Verifica sempre su timaticweb2.iata.org prima di partire.";

    // Check if transit country same as destination passport restrictions
    const sameAsWork=purpose==="lavoro"&&stopDest==="US";

    transitSection="\n\nAEROPORTO DI TRANSITO: "+stopName+" ("+stopCode+")\n"+(sameAsWork?"ATTENZIONE: scalo in USA per motivi lavorativi richiede visto B-1, non ESTA!\n":"")+tvInfo+"\n\nCONSIGLI PRATICI PER IL TRANSITO:\n- Verifica tempo minimo di connessione (tempo minimo di connessione) per "+stopCode+": di solito 60-90 min internazionale\n- Bagaglio: se in check-through non ritiri le valigie allo scalo\n- Dogana: se esci dall'area internazionale potresti dover sdoganare e ri-imbarcare\n- Fonte aggiornata: timaticweb2.iata.org";
  }

    return `VIAGGIO: ${fa?fa.n:fCode} ->${stopCode?(` scalo ${stopCode} ->`):""}${ta?ta.n:tCode}
Passaporto: ${passport} | Scopo: ${purpose}${date?" | "+date:""}

VISTO E INGRESSO
${visa}

SALUTE E VACCINI
${h}

DOGANA
- Liquidi cabina: max 100ml/contenitore in sacchetto 1L
- Valuta: dichiarare >= EUR 10.000 in uscita UE
- Farmaci: sempre con ricetta medica${["US","CA","AU","NZ"].includes(dest)?"\n- CONTROLLI SEVERI: dichiara TUTTO in dogana":""}

INFORMAZIONI PRATICHE
${pr}

EMERGENZE
- Numero emergenze UE: 112
- Ambasciata italiana: esteri.it -> Trova sede diplomatica
- App: Dove siamo nel mondo (Farnesina)
${tl}
${checklist}

Fonte: viaggiaresicuri.it (MAECI). Verifica sempre prima di partire.`;
}

const BAGGAGE={
  "Ryanair":"RYANAIR\nBagaglio piccolo (sotto sedile): GRATIS 40x20x25cm\nBagaglio cabina prioritario: da EUR 6 | 55x40x20cm | 10kg\nStiva 20kg: da EUR 10 (online) | EUR 25 (aeroporto)\nStiva 20kg oversize/sport: da EUR 30\nConsigli: prenota bagaglio online, molto piu' economico",
  "easyJet":"EASYJET\nBagaglio piccolo: GRATIS 45x36x20cm (sotto sedile)\nBagaglio cabina grande: da EUR 7 | 56x45x25cm\nStiva 15kg: da EUR 8 | Stiva 23kg: da EUR 12\nUPFRONT/EXTRA LEGROOM: bagaglio cabina grande incluso\nConsigli: taglia 23kg molto conveniente vs 15kg",
  "Wizz Air":"WIZZ AIR\nBagaglio piccolo: GRATIS 40x30x20cm (sotto sedile)\nBagaglio cabina: da EUR 6 | 55x40x23cm | 10kg\nStiva 20kg: da EUR 14 | Stiva 26kg: da EUR 22\nWIZZ GO: cabina + 1 stiva inclusa\nWIZZ PLUS: cabina + 2 stive incluse",
  "ITA Airways":"ITA AIRWAYS (Manuale Rev.6 Jan 2026)\nBagaglio a mano: 1 trolley (55x35x25cm, max 8kg) + 1 accessorio sotto sedile\nLIGHT: 0 bagagli stiva | ECONOMY: 1x23kg | PREMIUM: 2x23kg\nBUSINESS domestico: 2x23kg | BUSINESS internazionale: 2x32kg\nINFANTE: 1x10kg + passeggino gratis (no con Light) | Dim. max: 158cm, max 32kg",
  "Vueling":"VUELING\nCabina: GRATIS 55x40x20cm fino a 10kg\nStiva 23kg: da EUR 9 (online)\nBASIC: solo bagaglio cabina\nOPTIMA: 1 stiva 23kg inclusa\nOPTIMAL PLUS: 2 stive incluse",
  "Air France":"AIR FRANCE\nCabina: GRATIS 55x35x25cm + borsa | 12kg\nEconomy Light: NO stiva inclusa\nEconomy Standard: 1x23kg inclusa\nEconomy Flex: 1x23kg + cambio/rimborso\nBusiness: 2x32kg + priority + lounge",
  "Lufthansa":"LUFTHANSA\nCabina: GRATIS 55x40x23cm + borsa | 8kg Light / 23kg altre tariffe\nEconomy Light: NO stiva\nEconomy Classic: 1x23kg inclusa\nEconomy Flex: 1x23kg + piena flessibilita'\nBusiness: 2x32kg + lounge + priority",
  "British Airways":"BRITISH AIRWAYS\nCabina: GRATIS 56x45x25cm + borsa | 23kg\nHand Baggage Only: solo cabina\nEconomy: 1x23kg inclusa\nBusiness (Club): 2x32kg + lounge\nFirst: 3x32kg + lounge premium",
  "KLM":"KLM\nCabina: GRATIS 55x35x25cm + borsa | 12kg\nEconomy Light: NO stiva\nEconomy Standard: 1x23kg inclusa\nBusiness World: 2x23kg + lounge\nConsigli: app KLM molto utile per check-in",
  "Swiss":"SWISS\nCabina: GRATIS 55x40x23cm | 8kg (Light) / 25kg (altre)\nEconomy Light: NO stiva\nEconomy Standard: 1x23kg\nBusiness: 2x32kg + lounge Zurich\nConsigli: famosa per puntualita'",
  "Turkish Airlines":"TURKISH AIRLINES\nCabina: GRATIS 55x40x23cm | 8kg (Economy) / 18kg (Business)\nEconomy: 1x20kg stiva inclusa\nEconomy Flex: 1x25kg inclusa\nBusiness: 2x32kg + lounge Istanbul\nConsigli: ottimo hub per connessioni Asia/Africa",
  "Iberia":"IBERIA\nCabina: GRATIS 56x45x25cm + borsa\nEconomy Basic: NO stiva\nEconomy Classic: 1x23kg\nBusiness Flat: 2x32kg + lounge\nConsigli: puntuale su Madrid, connessioni Sud America",
  "TAP Air Portugal":"TAP AIR PORTUGAL\nCabina: GRATIS 55x40x20cm + borsa | 8kg\nDiscount: NO stiva\nBasic: NO stiva\nClassic: 1x23kg inclusa\nBusiness: 2x32kg + lounge Lisbona",
  "Transavia":"TRANSAVIA\nCabina piccola: GRATIS 45x40x25cm\nCabina grande: da EUR 9 | 55x35x25cm | 10kg\nStiva 15kg: da EUR 20 | Stiva 23kg: da EUR 25\nBASE: solo bagaglio piccolo gratis\nConsigli: low cost del gruppo Air France-KLM",
  "Volotea":"VOLOTEA (Manuale Rev.7 Jan 2026)\nAccessorio personale: GRATIS sotto sedile (tutti) | Bagaglio a mano 10kg: solo con Priority/Megavolotea\nStiva: 10kg/20kg/32kg a pagamento | Max 50kg a persona | Extra: EUR 12/kg\nPOOLING ammesso tra stessa prenotazione | INFANTE: solo passeggino gratis",
  "Norwegian":"NORWEGIAN\nCabina piccola: GRATIS 45x36x20cm\nBagaglio cabina: da EUR 8 | 55x45x23cm | 10kg\nStiva 20kg: da EUR 15\nPREMIUM: 2x20kg stiva + cabina incluse\nConsigli: puntuale, buona app",
  "Aegean Airlines":"AEGEAN AIRLINES\nCabina: GRATIS 56x45x25cm + borsa | 8kg\nEconomy Light: NO stiva\nEconomy: 1x23kg inclusa\nBusiness: 2x32kg + lounge Atene\nConsigli: ottima per isole greche, alleanza Star Alliance",
  "SAS":"SAS\nCabina: GRATIS 55x40x23cm | 8kg (SAS Go Light) / illimitato altre\nGo Light: NO stiva\nGo Smart: 1x23kg\nBusiness Pro: 2x32kg + lounge\nConsigli: ottima frequenza su Scandinavia",
  "Lufthansa Group":"LUFTHANSA GROUP (LH/LX/OS/EN/SN) — Manuale Rev.4 Mar 2026\nBagaglio a mano: First/Business: 2 trolley 8kg + accessorio | Economy: 1 trolley + accessorio = 8kg\nLIGHT: 0 stiva | ECONOMY: 1x23kg | PREMIUM: 2x23kg | BUSINESS: 2x32kg | FIRST: 3x32kg\nPower bank: max 2 per pax fino a 160Wh (solo in cabina, mai in stiva)\nBagaglio a mano stivato al gate: EUR 70 (voli UE) | EUR 110 (intercontinentali)\nSci: incluso allowance | Golf: gratis per HON/SEN (non per USA/Canada)\nPasseggino: gratuito, si puo ritirare sottobordo con etichetta speciale\nINFANTE: 1x23kg + passeggino gratis (tranne con tariffa Light)",
  "Finnair":"FINNAIR\nCabina: GRATIS 55x40x23cm + borsa | 8kg (Light) / 23kg (altre)\nLight: NO stiva\nClassic: 1x23kg\nBusiness: 2x32kg + lounge Helsinki\nConsigli: ottimo hub per Far East",
};

// ── ASSISTENZE SPECIALI per compagnia (verificate sui siti ufficiali) ─────
const SPECIAL_ASSIST={
  "Ryanair":"RYANAIR — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nLivelli IATA disponibili:\n- WCHR: accompagnamento in sedia a rotelle in aeroporto, salita scale autonoma\n- WCHS: non puo' fare le scale, necessita elevatore al gate\n- WCHC: non deambulante, assistenza totale inclusa a bordo\nCome richiedere: al momento della prenotazione o in 'Gestisci prenotazione'\nMax 2 sedie a rotelle elettriche per volo — prenota subito\nDimensioni max sedia elettrica: 81x119x119cm | Peso max: 150kg (oltre: pre-autorizzazione)\nBatterie litio fisse: ammesse senza limite Wh | Batterie rimovibili: max 1x300Wh o 2x160Wh in cabina\nTrasporto gratuito: 2 ausili mobilita' + attrezzatura medica necessaria\nPosto emergenza: VIETATO per passeggeri con assistenza speciale\n\nGESSO E INGESSATURE\nArto superiore ingessato (vita e oltre): 1 solo posto\nGamba intera ingessata: acquisto 3 posti obbligatorio (per sollevare la gamba)\nGamba ingessata solo sotto il ginocchio: 1 solo posto\nGesso applicato da MENO di 48h: deve essere diviso sull'intera lunghezza\nGesso applicato da PIU' di 48h: non necessita divisione\nCertificato medico: richiesto su richiesta della compagnia\n\nALTRE DISABILITA'\nNon vedente/ipovedente (BLND): accompagnamento aeroporto-sedile, briefing sicurezza separato\nSordo (DEAF): informazioni sicurezza fornite separatamente a bordo\nDisabilita' cognitiva/non visibile (DPNA): contattare team assistenza speciale\nCane guida (BDGR/SVAN): ammesso, documentazione richiesta\nSunflower Lanyard (disabilita' nascoste): riconosciuto\n\nNULLA OSTA SANITARIO (nulla osta sanitario (MEDIF)): richiesto solo per: malattia recente, ricovero, intervento, ossigeno terapeutico\nOSSIGENO TERAPEUTICO: prenotare almeno 7 giorni prima — contattare linea assistenza speciale\n\nContatto: help.ryanair.com > Assistenza speciale",

  "easyJet":"EASYJET — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nLivelli disponibili: WCHR / WCHS / WCHC\nCome richiedere: al momento della prenotazione oppure in 'Gestisci prenotazioni'\nAlternativa: email con oggetto 'Richiesta di assistenza speciale' almeno 14 giorni prima\nTelefono: contattare team assistenza speciale con riferimento prenotazione\nScelta posto: gratuita in base alle esigenze — no uscite emergenza\nAusili mobilita': fino a 2 gratuiti (es. sedia a rotelle + deambulatore)\nBatterie non sigillate/a liquido: NON ammesse\nSedia a rotelle manuale: trasportata in stiva, restituita all'uscita aeromobile\nSedia a bordo: disponibile su tutti gli aeromobili\n\nGESSO\nGesso recente (meno 48h): deve essere diviso\nGesso oltre 48h: nessun requisito aggiuntivo\nCertificato medico: consigliato per voli internazionali\n\nALTRE DISABILITA'\nNon vedente, sordo, disabilita' cognitive: servizi disponibili su richiesta\nCane guida: ammesso — solo cani guida certificati, NO cani supporto emotivo\nAccompagnatore: posto adiacente prioritario\n\nContatto: easyjet.com/it/aiuto/imbarco-e-volo/assistenza-speciale",

  "ITA Airways":"ITA AIRWAYS — ASSISTENZA SPECIALE\n(Fonte: Manuale operativo ITA Airways Rev.6, Jan 2026)\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nCome richiedere: al momento della prenotazione oppure contatta il Customer Center almeno 48h prima della partenza\nTelefono: +39 06 85960020 (lun-ven 9-20, sab-dom 9-17)\n\nTipologie disponibili (scegli quella che ti descrive meglio):\n- WCHR: hai difficolta' a percorrere lunghe distanze ma puoi fare le scale\n- WCHS: non puoi fare le scale, hai bisogno di un mezzo elevatore\n- WCHC: non deambuli, hai bisogno di assistenza completa\n- BLND: sei non vedente o ipovedente\n- DEAF: sei non udente\n- DPNA: hai una disabilita' cognitiva o non visibile\n\nSedia a rotelle al seguito:\n- Manuale (WCMP): trasportata gratuitamente\n- Elettrica batteria litio non removibile (WCLB): gratuita, nessun limite Wh\n- Elettrica batteria removibile (WCLX): gratuita, batteria va in cabina (max 300Wh o 2x160Wh)\n- Fino a 2 ausili per la mobilita' gratuiti per passeggero\n- Attrezzatura medica: +1 bagaglio gratuito\n\nGESSO O ARTO INGESSATO\n- Gesso applicato da MENO di 48h: deve essere diviso/bivalvato dal medico\n- Gesso da PIU' di 48h: nessun requisito aggiuntivo\n- Gamba intera ingessata: potrebbe essere necessario acquistare posti extra\n- Certificato medico: consigliato, a volte obbligatorio (valuta con la compagnia)\n\nALTRE DISABILITA' E CASI SPECIALI\n- Non vedenti/ipovedenti: Safety Briefing Card in Braille disponibile su tutti gli Airbus ITA\n- Gravidanza avanzata: richiesto modulo MEDIF firmato dal medico\n- Ossigeno terapeutico: prenota con anticipo (AOXYG/OXYG)\n- Barellato (STCR): occupa 9 posti in fondo all'aereo + accompagnatore\n- Posto uscita emergenza: MAI assegnato a passeggeri con assistenza speciale\n\nIMPORTANTE: Comunicare sempre le proprie esigenze almeno 48h prima.\nContatto: ita-airways.com > Supporto > Assistenza o tel +39 06 85960020",

  "Lufthansa":"LUFTHANSA — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nCome richiedere: durante prenotazione — indicare dimensioni, peso, tipo sedia (pieghevole/elettrica/sportiva)\nMax 2 ausili mobilita' gratuiti (stiva o cabina)\nAttenzione portellone: aeromobili piccoli larghezza min 71cm — verifica compatibilita'\nBatterie litio FISSE non rimovibili: dal 01/10/2025 max 2 batterie x 160Wh ciascuna\nSe prenotazione prima del 01/10/2025: regole precedenti applicabili\nSedia fino al gate: ammessa, poi stivata\n\nGESSO\nGesso meno 48h: divisione obbligatoria\nGesso oltre 48h: no requisiti aggiuntivi\nCertificato medico (nulla osta sanitario (MEDIF)): per condizioni che richiedono servizi speciali\n\nALTRE DISABILITA'\nIpovedenti: accompagnamento aeroporto-sedile, sala attesa dedicata a FRA/MUC\nNessun nulla osta sanitario per non vedenti\n2 ausili mobilita' gratuiti in cabina o stiva\nOssigeno: prenotare con anticipo\n\nContatto: lufthansa.com/it/it/passengers-using-wheelchairs",

  "Wizz Air":"WIZZ AIR — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nCome richiedere: prenotazione online o app\nAusili mobilita': trasportati gratuitamente\nSedia elettrica: comunicare specifiche batteria in anticipo\nBatterie non sigillate: non ammesse\nPosto uscita emergenza: NON assegnabile\n\nGESSO\nGesso meno 48h: divisione obbligatoria\nGesso oltre 48h: certificato medico consigliato\n\nALTRE DISABILITA'\nCane guida: ammesso gratuitamente su voli intra-UE e extra-UE\nDocumenti cane guida (entro 48h dal volo): certificato addestramento + documenti ingresso paese destinazione\nUn solo cane guida per volo — collocato sul pavimento, non sul sedile\nContatto: wizzair.com > Assistenza speciale",

  "Vueling":"VUELING — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nCome richiedere: al momento della prenotazione online\nAusili mobilita': trasportati gratuitamente\nSedia elettrica: verificare compatibilita' dimensioni con la compagnia\n\nGESSO\nGesso meno 48h: divisione obbligatoria\nCertificato medico: consigliato per gessi recenti\n\nALTRE DISABILITA'\nCane guida certificato: ammesso in cabina con guinzaglio\nCertificato richiesto: documento ufficiale che attesti addestramento come cane guida\nNota: certificato medico NON sufficiente — serve certificato ufficiale di addestramento\n\nContatto: vueling.com > Assistenza",

  "Volotea":"VOLOTEA — ASSISTENZA SPECIALE\n(Fonte: Manuale operativo Volotea Rev.7, Jan 2026)\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nLivelli disponibili: WCHR / WCHS / WCHC / BLND / DEAF / DPNA\nCome richiedere: al momento della prenotazione oppure in aeroporto — check-in gratuito in aeroporto\nPosto: finestrino (es. fila A o F), no file 1 / 9-12 / 26\n- Se viaggi con accompagnatore: l'accompagnatore riceve un posto adiacente (stesso PNR)\n- Se viaggi da solo: max 2 passeggeri con mobilita' ridotta per volo\n\nGESSO\n- Gesso da meno 48h: divisione obbligatoria\n- Gesso da piu' di 48h: nessun requisito aggiuntivo\n- Certificato medico: consigliato\n\nPasseggeri in gravidanza:\n- Check-in in aeroporto obbligatorio (non online)\n- Rispettare le 3 file di distanza dall'uscita di emergenza\n\nCane di servizio (SVAN): ammesso, max 2 per volo nei posti 1A e 1F\nCane guida per non vedenti (BDGR): ammesso\nCani da supporto emotivo: NON accettati su Volotea\n\nContatto: volotea.com > Servizi speciali",

  "KLM":"KLM — ASSISTENZA SPECIALE\n\nSEDIA A ROTELLE E MOBILITA' RIDOTTA\nCome richiedere: sezione 'Il mio viaggio' sul sito KLM\nPriority boarding: imbarco anticipato\nSbarco: ultimo a scendere per sicurezza\nSedia a bordo: disponibile su tutti i velivoli KLM e KLM Cityhopper (pieghevole per corridoio)\nTransiti a Schiphol: calcolare almeno 2.5h — contattare KLM Cares per pianificazione\nAccompagnatore o assistente sicurezza: potrebbe essere necessario in base al livello\n\nGESSO\nGesso meno 48h: divisione obbligatoria\nCertificato medico: richiesto in alcuni casi\n\nALTRE DISABILITA'\nAusili mobilita': gratuiti (bastone, stampelle, deambulatore, sedia a rotelle)\nContatto KLM Cares: per esigenze complesse — contattare prima del viaggio\n\nContatto: klm.it/information/assistance-health",

  "Lufthansa Group":"LUFTHANSA GROUP (LH/LX/OS/EN/SN) — ASSISTENZA SPECIALE\n(Fonte: Manuale operativo LHG Rev.4, Mar 2026)\nVale per: Lufthansa (LH), Swiss (LX), Austrian (OS), AirDolomiti (EN), Brussels Airlines (SN)\n\nSEDIA A ROTELLE — livelli disponibili (scegli quello che ti descrive):\n- WCHR: difficolta' a percorrere lunghe distanze in aeroporto, puoi fare le scale\n- WCHS: non puoi fare le scale, hai bisogno di elevatore al gate\n- WCHC: non deambuli, assistenza totale dall'aeroporto fino al posto a bordo\n\nCome richiedere: durante la prenotazione oppure contatta la compagnia con anticipo\nAeroporto: presenta al banco check-in e avvisa del tuo arrivo\n\nSedia a rotelle al seguito — gratuita (max 2 ausili per passeggero):\n- Manuale (WCMP): sempre gratuita, etichetta speciale in aeroporto\n- Elettrica batteria litio non removibile (WCLB): gratuita, nessun limite Wh\n- Elettrica batteria removibile (WCLX): gratuita, batteria in cabina (max 300Wh o 2x160Wh)\n  Attenzione: dal 01/10/2025 max 2 batterie x 160Wh ciascuna per batterie fisse\n- Elettrica batteria dry (WCBD): puo' restare attaccata, isolare i poli\n- Portellone aeromobile: dimensioni variano per tipo aereo — comunicare dimensioni sedia\n\nGESSO O ARTO INGESSATO\n- Gesso da MENO di 48h: divisione obbligatoria (su tutta la lunghezza)\n- Gesso da PIU' di 48h: nessun requisito aggiuntivo\n- Gamba intera ingessata (Ryanair/LHG): acquisto posti aggiuntivi necessario\n- Arto superiore ingessato (vita e oltre): 1 posto normale\n- Certificato medico (MEDIF): richiesto per condizioni che necessitano servizi speciali\n\nALTRE CATEGORIE SPECIALI\n- Non vedente (BLND): accompagnamento aeroporto-sedile, briefing sicurezza separato\n  Sala d'attesa dedicata a Francoforte e Monaco per soste piu' lunghe\n- Sordo (DEAF): informazioni sicurezza separate a bordo\n- Disabilita' cognitiva/non visibile (DPNA): contattare assistenza speciale\n- Ossigeno (OXYG): prenotare almeno 7 giorni prima — a pagamento\n- Barellato (STCR): occupa piu' posti in fondo all'aereo\n- Posto uscita emergenza: MAI assegnato a passeggeri con assistenza speciale\n\nCANE DI SERVIZIO (SVAN): gratuito con certificato + targhetta funzione di servizio\nCanada: i cani da supporto emotivo (ESD) sono trattati come SVAN o PETC\nUSA: obbligatoria registrazione cartacea CDC per qualsiasi cane\n\nContatto LHG Italia: Ufficio LHG in aeroporto o sito compagnia",
};

// ── ANIMALI A BORDO per compagnia (verificate sui siti ufficiali 2025) ───
const ANIMALS={
  "Ryanair":"RYANAIR — ANIMALI A BORDO\n\nANIMALI DOMESTICI IN CABINA: NON AMMESSI\n(cani, gatti e altri animali NON sono accettati a bordo)\n\nCANI GUIDA: SI' — gratuiti, tutti i voli\nDocumentazione: certificato ufficiale di addestramento come cane guida\nCollocazione: sul pavimento, mai sul sedile\nInformare la compagnia in anticipo\n\nCONSIGLIO: Se viaggi con un animale domestico, scegli una compagnia alternativa (Vueling, Lufthansa, KLM, Air France, Volotea)",

  "easyJet":"EASYJET — ANIMALI A BORDO\n\nANIMALI DOMESTICI IN CABINA: NON AMMESSI\n\nCANI GUIDA: SI' — solo cani guida certificati\nNO cani di supporto emotivo (ESA)\nDocumentazione: certificato legale che accerti l'animale come cane guida\nInformare easyJet almeno 48h prima\n\nCONSIGLIO: Per animali domestici scegli Vueling, Lufthansa, KLM o Air France",

  "Wizz Air":"WIZZ AIR — ANIMALI A BORDO\n\nANIMALI DOMESTICI IN CABINA: NON AMMESSI\n\nCANI GUIDA: SI' — gratuiti\nDocumenti (entro 48h dal volo):\n- Certificato ufficiale di addestramento come cane guida/assistenza\n- Documenti per ingresso nel paese di destinazione\nMax 1 cane guida per volo | Collocazione: pavimento\nInformare Special Assistance Call Centre o email dedicata",

  "ITA Airways":"ITA AIRWAYS — ANIMALI A BORDO\n(Fonte: Manuale operativo ITA Airways Rev.6, Jan 2026)\n\nIN CABINA (PETC) — cani e gatti:\n- Eta' minima animale: 3 mesi (max 5 della stessa specie nello stesso trasportino)\n- Voli nazionali: trasportino + animale = max 12kg | Dimensioni: 40x30x24cm\n- Voli internazionali: trasportino + animale = max 10kg | Dimensioni: 40x20x24cm\n- Trasportino: rigido, semi-rigido o morbido con materiale assorbente sul fondo\n- Costo: supplemento a pagamento (verifica tariffa su ita-airways.com)\n- Prenotazione obbligatoria in anticipo\n- No uscite di emergenza, no fila 1\n\nIN STIVA (AVIH) — solo cani da 10kg fino a max 75kg con gabbia:\n- Razze non accettate: brachicefale (boxer, bulldog, carlino, persiano...)\n- Connessione con transito >12h o giorno successivo: bagaglio fermato al primo scalo\n- Gabbia: rigida con griglie metalliche su 4 lati, serratura multipla, no ruote\n\nCANE DI SERVIZIO (SVAN) — gratuito:\n- Nessun trasportino necessario\n- Guinzaglio e museruola obbligatori\n- Pettorina di servizio\n- Attestato SVAN + vaccinazioni\n- Posto: prima fila davanti alla paratia, MAI uscita emergenza\n- USA: obbligatoria registrazione cartacea/elettronica CDC\n\nDocumentazione base per tutti gli animali:\n- Microchip obbligatorio\n- Vaccinazione antirabbica aggiornata\n- Passaporto europeo per animali (voli UE)\n- Verifica requisiti paese destinazione: timatic (sistema usato dalla compagnia)",

  "Vueling":"VUELING — ANIMALI A BORDO\n\nANIMALI AMMESSI IN CABINA: cani, gatti, uccelli (no rapaci), tartarughe\nPeso massimo: 10kg (animale + trasportino) — 8kg su voli Iberia\nTrasportino: morbido, max 45x39x21cm | Max 2 animali stesso trasportino (stessa specie/cucciolata)\nCosto: da EUR 40-50 a tratta\nMax per volo: 5 animali (2 su voli Iberia, GetJet, AirHub)\nPrenotazione: online selezionando tariffa o tramite assistenza clienti\nSTIVA: NON ammessi animali in stiva\n\nDocumentazione (cani e gatti):\n- Microchip obbligatorio\n- Passaporto UE con vaccini aggiornati\n- Vaccinazione antirabbica: effettuata almeno 21 giorni prima, non oltre 12 mesi\n\nCANI GUIDA: certificato ufficiale addestramento obbligatorio (NON basta certificato medico)\n\nNON ammessi: roditori, conigli, animali da fattoria, animali con odori molesti",

  "Lufthansa":"LUFTHANSA — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani e gatti di piccola taglia\nPeso massimo: 8kg (animale + trasportino)\nRegistrazione: almeno 72 ore prima della partenza (obbligatorio)\nTrasportino: omologato IATA\nDisponibilita' limitata per volo\n\nDocumentazione:\n- Passaporto europeo per animali\n- Vaccinazioni aggiornate inclusa antirabbica\n- Microchip\n- Certificato sanitario per destinazioni extra-UE\n\nCANI GUIDA: ammessi, documentazione ufficiale richiesta\nAnimali in stiva: solo su voli specifici — verificare disponibilita'",

  "KLM":"KLM — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani e gatti\nClassi: Economy e Business (voli europei)\nPeso massimo: 8kg (animale + trasportino)\nPrenotazione: in anticipo — disponibilita' limitata\n\nDocumentazione:\n- Passaporto europeo per animali\n- Vaccinazioni aggiornate\n- Microchip\n\nCANI GUIDA: ammessi su tutti i voli\nAnimali in stiva: disponibile su alcuni voli — verificare con KLM",

  "Lufthansa Group":"LUFTHANSA GROUP (LH/LX/OS/EN/SN) — ANIMALI A BORDO\n(Fonte: Manuale operativo LHG Rev.4, Mar 2026)\nVale per: Lufthansa, Swiss, Austrian, AirDolomiti, Brussels Airlines\n\nIN CABINA (PETC) — cani e gatti:\n- Eta' minima: 15 settimane (Swiss/LX: 12 settimane)\n- Peso massimo: trasportino + animale = max 8kg\n- Trasportino: morbido che si adatta sotto il sedile\n- Prenotazione: obbligatoria in anticipo, a pagamento\n- EN (AirDolomiti): accettato anche trasportino rigido se sta sotto il sedile\n- No uscite emergenza\n\nIN STIVA (AVIH) — cani e gatti in gabbia rigida:\n- Gabbia: rigida con griglie metalliche su 4 lati, senza ruote (o removibili), serratura multipla\n  Distributori cibo/acqua obbligatori, materiale assorbente sul fondo\n- Razze NON accettate: snub-nosed (boxer, pechinese, carlino, bulldog, gatti persiani)\n- EN (AirDolomiti): AVIH NON accettati in transito via Monaco (MUC)\n- Canada con Air Canada: fermare il bagaglio al primo scalo\n\nCANE DI SERVIZIO (SVAN) — gratuito:\n- Nessun trasportino, nessuna museruola necessaria\n- Certificato o targhetta che attesti la funzione di servizio\n- Attestato della Training School obbligatorio\n- EN: compilare modulo per trasporto animali\n- Canada: cani da supporto emotivo (ESD) trattati come SVAN (gratis)\n- USA: registrazione CDC obbligatoria per qualsiasi cane\n\nDocumentazione base:\n- Microchip obbligatorio\n- Vaccinazione antirabbica aggiornata\n- Passaporto europeo per animali\n- Per extra-UE: verifica sempre requisiti paese destinazione",

  "Air France":"AIR FRANCE — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani e gatti\nPeso max in cabina: 8kg (animale + trasportino)\nPeso max in stiva: fino a 75kg (animale + gabbia rigida IATA)\nCosto cabina: da EUR 35 (Europa)\nPrenotazione: obbligatoria in anticipo\n\nDocumentazione:\n- Passaporto europeo per animali\n- Vaccinazione antirabbica aggiornata\n- Microchip\n- Certificato sanitario per extra-UE\n\nRazze brachicefale (carlini, bulldog...): possono essere soggette a restrizioni",

  "Volotea":"VOLOTEA — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani di piccola taglia e gatti (min 8 settimane)\nPeso massimo: 10kg (animale + trasportino)\nTrasportino: 50x40x20cm\nMax per volo: 5 animali | 1 per passeggero\nCosto: da EUR 40 a tratta\nCheck-in: SOLO in aeroporto (non online) — con controllo peso e documenti\nPrenotazione: al momento acquisto biglietto\n\nCANI GUIDA e ESA: ammessi, massimo 2 per volo\n\nDocumentazione:\n- Libretto sanitario aggiornato\n- Vaccinazione antirabbica\n- Microchip",

  "Norwegian":"NORWEGIAN — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani e gatti di piccola taglia\nDove: voli nazionali Norvegia/Svezia/Danimarca/Finlandia/Spagna (no Svalbard)\nEta' minima animale: 8 settimane\nTrasportino rigido: max 43x31x20cm | Morbido: leggermente piu' grande se comprimibile\nMax per volo: 2 animali (o 3 cuccioli piccoli stesso trasportino = 1 prenotazione)\nCheck-in: almeno 1 ora prima del volo\n\nDocumentazione:\n- Passaporto europeo per animali\n- Vaccinazioni aggiornate",

  "Transavia":"TRANSAVIA — ANIMALI A BORDO\n\nANIMALI IN CABINA: cani e gatti\nPeso max: 10kg (animale + trasportino)\nPrenotazione: obbligatoria in anticipo tramite sito o assistenza\nDisponibilita' limitata\n\nDocumentazione:\n- Passaporto europeo\n- Vaccinazioni aggiornate inclusa antirabbica\n- Microchip",
};

// ── MINORI NON ACCOMPAGNATI per compagnia ────────────────────────────────
const UNACCOMPANIED={
  "Ryanair":"RYANAIR — MINORI NON ACCOMPAGNATI\n\nETA' MINIMA: 16 anni per volare da soli senza servizio UM\nServizio UM (Unaccompanied Minor): NON disponibile su Ryanair\n\nIMPORTANTE: I minori sotto i 16 anni NON possono volare da soli con Ryanair.\nSoluzione: accompagnatore adulto (18+) obbligatorio per under 16",

  "easyJet":"EASYJET — MINORI NON ACCOMPAGNATI\n\nServizio UM: NON disponibile su easyJet\nEta' minima per volare da soli: 16 anni\nUnder 16: devono essere accompagnati da adulto 16+\n\nNota: easyJet non offre assistenza dedicata per minori non accompagnati",

  "ITA Airways":"ITA AIRWAYS — MINORI NON ACCOMPAGNATI (UMNR)\n(Fonte: Manuale operativo ITA Airways Rev.6, Jan 2026)\n\nETA' OBBLIGATORIE:\n- Voli NAZIONALI: obbligatorio 5-13 anni | facoltativo 14-17 anni\n- Voli INTERNAZIONALI: obbligatorio 5-14 anni | facoltativo 15-17 anni\n\nCome prenotare:\nContatta ITA Airways prima dell'acquisto — +39 06 85960020 (lun-ven 9-20, sab-dom 9-17)\nNON prenotabile autonomamente online — richiede telefonata\n\nDocumentazione obbligatoria:\n- Modulo UMNR compilato e firmato (copia per lo scalo di partenza, copia per il minore)\n- Documento di identita' del minore\n- Dati completi + telefono di chi accompagna il minore in aeroporto\n- Dati completi + telefono di chi ritira il minore all'arrivo\n- Per minori ITALIANI: Dichiarazione Sostitutiva di Accompagno emessa dalla Questura\n  (serve per affidare il minore alla compagnia aerea)\n- Se l'accompagnatore non e' un genitore: Dichiarazione di accompagno dalla Questura\n\nCosa succede in aeroporto:\n- Il minore si presenta al banco check-in con chi lo accompagna\n- Riceve una pochette con carta d'imbarco, copia modulo e documenti\n- Un addetto lo accompagna fino al gate\n- A bordo e' seguito dalla crew\n- All'arrivo viene consegnato SOLO alla persona autorizzata, con documento d'identita'\n\nNota speciale: se l'accompagnatore viaggia in Business e il minore in Economy, il servizio UMNR e' sempre obbligatorio\n\nCosto: supplemento a pagamento — verifica tariffa attuale su ita-airways.com",

  "Lufthansa":"LUFTHANSA — MINORI NON ACCOMPAGNATI\n\nETA' 5-11 ANNI: Servizio UM obbligatorio\nETA' 12-14 ANNI: Servizio UM consigliato, opzionale\nETA' 15-17 ANNI: Possono volare da soli\n\nCome prenotare: non prenotabile solo online — contattare call center\n\nDocumentazione richiesta:\n- Modulo UM compilato e firmato da entrambi i genitori\n- Copia documento identita' genitore/tutore\n- Dati completi chi porta e chi ritira\n- Documento d'identita' del minore\n\nServizio include: assistenza in aeroporto, sorveglianza a bordo, consegna al destinatario\nConsegna: SOLO alla persona autorizzata con documento d'identita'\nCosto: supplemento — verificare sul sito Lufthansa",

  "Lufthansa Group":"LUFTHANSA GROUP (LH/LX/OS/EN/SN) — MINORI NON ACCOMPAGNATI\n(Fonte: Manuale operativo LHG Rev.4, Mar 2026)\nVale per: Lufthansa, Swiss, Austrian, AirDolomiti, Brussels Airlines\n\nLIMITI DI ETA':\n- 5-11 anni: servizio UMNR obbligatorio\n- 12-17 anni: servizio UMNR facoltativo\n- Sotto i 5 anni: NON possono volare non accompagnati\n\nREGOLE PER BAMBINI CHE VIAGGIANO CON ACCOMPAGNATORE NON GENITORE:\n- Minori italiani fino a 14 anni: l'accompagnatore deve avere il nome dei genitori sul retro\n  del documento del bambino, oppure la Dichiarazione di Accompagno della Questura\n- Minori non italiani < 5 anni: possono viaggiare con fratello/sorella >=16 anni o qualsiasi maggiorenne\n- Minori non italiani 5-11 anni: possono viaggiare con chiunque abbia almeno 12 anni\n\nDOCUMENTAZIONE UMNR:\n- Modulo UMNR compilato e firmato dall'accompagnatore in aeroporto\n- Una copia al check-in, una nella pochette del minore\n- Dati e telefono di chi porta il bambino all'aeroporto\n- Dati e telefono di chi ritira il bambino all'arrivo\n- Per UMNR italiani < 14 anni: Dichiarazione di Accompagno emessa dalla Questura\n  (il minore viene affidato ufficialmente alla compagnia aerea)\n- SN (Brussels): ogni addetto compila un talloncino Release Form + braccialetto per il bambino\n\nCOSA SUCCEDE IN AEROPORTO:\n- Il bambino arriva al check-in con chi lo accompagna\n- Riceve pochette con carta d'imbarco, copia modulo, documenti e etichette bagaglio\n- Un addetto lo accompagna fino al gate e lo consegna all'imbarchista\n- L'adulto che lo ha accompagnato deve restare in aeroporto almeno 30 minuti dopo la partenza\n- Il bambino NON deve mai essere lasciato solo\n- All'arrivo: consegnato SOLO alla persona autorizzata, con documento d'identita'\n\nNota: il servizio e' sempre a pagamento. Verifica tariffa sul sito della compagnia.",

  "KLM":"KLM — MINORI NON ACCOMPAGNATI\n\nETA' 5-11 ANNI: Servizio UM obbligatorio\nETA' 12-14 ANNI: UM opzionale\nETA' 15-17 ANNI: Possono volare da soli\n\nDocumentazione richiesta:\n- Modulo UM firmato dai genitori\n- Documento identita' minore\n- Contatti completi chi porta e chi ritira\n\nVoli con scalo: ammessi ma con limitazioni — verificare con KLM\nCosto: supplemento applicato\nContatto: klm.it > Servizi > Minori non accompagnati",

  "British Airways":"BRITISH AIRWAYS — MINORI NON ACCOMPAGNATI\n\nETA' 5-11 ANNI: Servizio UM obbligatorio su tutti i voli\nETA' 12-15 ANNI: UM obbligatorio su voli con scalo\nETA' 16-17 ANNI: Possono volare da soli\n\nDocumentazione:\n- Modulo UM compilato\n- Documento identita' minore e genitore\n- Contatti chi porta e chi ritira con documento identita'\n\nCosto: supplemento fisso per tratta — verificare tariffe attuali su ba.com",

  "Air France":"AIR FRANCE — MINORI NON ACCOMPAGNATI\n\nETA' 4-11 ANNI: Servizio UM obbligatorio (Min. Service Jeune Voyageur)\nETA' 12-14 ANNI: UM opzionale\nETA' 15+ ANNI: Possono volare da soli\n\nDocumentazione:\n- Modulo autorizzazione firmato\n- Documento identita' minore\n- Dati e documento di chi porta e ritira\n\nCosto: da EUR 35-60 per tratta — verificare su airfrance.it",
};

const KB=[
  [["sedia rotelle","wchr","wchs","wchc","mobilita ridotta","disabile","disabilita","carrozzina","wheelchair"],"🔄 Ti porto direttamente alla sezione Assistenza speciale → clicca su '🎯 Speciali' in cima, poi scegli '♿ Mobilità e disabilità'.\n\nREGOLE GENERALI (tutte le compagnie europee):\n- Prenota l\'assistenza al momento dell\'acquisto del biglietto O almeno 48h prima\n- I livelli sono: WCHR (lunga distanza), WCHS (no scale), WCHC (assistenza totale)\n- Fino a 2 ausili per la mobilità trasportati SEMPRE gratis\n- Non puoi sedere vicino alle uscite di emergenza\n- Imbarchi in anticipo rispetto agli altri passeggeri\n- Sedia elettrica: comunica le specifiche della batteria alla compagnia"],
  [["gesso","ingessato","frattura","ortesi","tutore"],"🦴 VIAGGIARE CON GESSO:\n- Gesso applicato da MENO di 48h: deve essere diviso/bivalvato dal medico prima di volare\n- Gesso da PIU' di 48h: di solito nessun requisito aggiuntivo\n- Gamba intera ingessata (su alcune compagnie es. Ryanair): devi acquistare posti aggiuntivi\n- Arto superiore ingessato: 1 posto normale\n- Porta sempre un certificato medico aggiornato\n- Avvisa la compagnia in anticipo → clicca '🎯 Speciali' per dettagli per compagnia"],
  [["animale","cane","gatto","pet","petc","avih","svan","cane guida","trasportino"],"🐾 Ti porto alla sezione animali → clicca '🎯 Speciali' poi '🐾 Animali a bordo'.\n\nRISPOSTA RAPIDA:\n- Ryanair, easyJet, Wizz Air: NO animali domestici (solo cani guida certificati)\n- Accettano: ITA, Vueling, Lufthansa Group, KLM, Air France, Volotea, Norwegian\n- Peso max in cabina: 8-10kg (animale + trasportino)\n- Documenti sempre richiesti: microchip + passaporto UE + vaccino antirabbica (min 21gg prima)\n- Prenota sempre in anticipo: posti limitati per volo"],
  [["minore","bambino","figlio","umnr","non accompagnato","da solo","bimbo","ragazzo"],"👦 Ti porto alla sezione minori → clicca '🎯 Speciali' poi '👦 Minori non accompagnati'.\n\nRISPOSTA RAPIDA:\n- Ryanair ed easyJet: NON offrono il servizio (minimo 16 anni per volare da soli)\n- ITA Airways nazionale: obbligatorio 5-13 anni | ITA internazionale: 5-14 anni\n- LHG (LH/LX/OS/EN/SN): obbligatorio 5-11 anni\n- Prenota SEMPRE per telefono, non online\n- Documenti: modulo UMNR + per italiani under 14 la Dichiarazione Questura\n- Il bambino viene consegnato SOLO alla persona autorizzata con documento d\'identità"],
  [["incinta","gravidanza","gestante","settimane","parto","mese gravidanza"],"🤰 Ti porto alla sezione gravidanza → clicca '🎯 Speciali' poi '🤰 Gravidanza'.\n\nRISPOSTA RAPIDA:\n- Fino a 28 settimane: nessun documento di solito\n- 28-36 settimane: certificato medico del ginecologo obbligatorio\n- Dopo 36 settimane: la maggior parte delle compagnie NON accetta (LHG: fino alla 36ª)\n- Gemelli: limite anticipato alla 32ª settimana su molte compagnie\n- Sempre: check-in al banco (non self service), evita uscite di emergenza"],
  [["ossigeno","cpap","farmaci","medicina","insulina","ricetta","medico","barella","stcr","medif"],"🏥 Ti porto alla sezione casi medici → clicca '🎯 Speciali' poi '🏥 Casi medici'.\n\nRISPOSTA RAPIDA:\n- Farmaci in cabina: sempre ammessi con ricetta medica\n- Ossigeno personale (bombola): NON ammesso a bordo — prenota ossigeno della compagnia (OXYG) 7-10gg prima\n- CPAP: ammesso come bagaglio medico aggiuntivo (non conta nel bagaglio a mano)\n- Gesso recente (<48h): deve essere diviso dal medico prima di volare\n- MEDIF (certificato medico): richiesto per gravidanza avanzata, ossigeno, condizioni speciali"],
  [["assicurazione","assicurazione viaggio","copertura","rimborso","bagaglio perso"],"🛡️ ASSICURAZIONE VIAGGIO — cosa coprire:\n- Cancellazione volo per motivi personali (malattia, lutto...)\n- Bagaglio smarrito o danneggiato (oltre i limiti della compagnia)\n- Spese mediche all\'estero (obbligatoria per USA, utile ovunque)\n- Rimpatrio sanitario d\'urgenza\n- Ritardo bagaglio (indennizzo spese vestiario/necessità)\n\nAttenzione: il Reg. CE 261/2004 copre i disservizi della compagnia (ritardi, cancellazioni).\nL\'assicurazione copre invece i tuoi imprevisti personali. Sono complementari.\nConsigli: Allianz, AXA, Europ Assistance sono tra le più diffuse in Italia."],
  [["liquid","ml","shampoo"],"LIQUIDI IN CABINA\n- Max 100ml per contenitore\n- Sacchetto trasparente 1L, 1 per passeggero\n- Inclusi: acqua, profumi, gel, dentifricio\n- Esentati: medicinali con ricetta, latte neonati\n- Acquistati dopo sicurezza: senza limiti\n- Controlli: toglierli dallo zaino e metterli nel vassoio"],
  [["check-in","ore prima","quando arriv"],"TEMPI CHECK-IN\n- Nazionali/Schengen: 1.5-2h prima\n- Internazionali: 2.5-3h prima\n- Intercontinentali (USA/Asia): 3h prima\n- Online check-in: 24-48h prima\n- Chiusura gate: 20-30min prima\n- Ryanair/easyJet: chiusura gate puntuale!"],
  [["bagagl","mano","cabina","kg","peso","misur"],"BAGAGLIO A MANO\n- Dimensioni standard: 55x40x20cm\n- Peso: 7-10kg low cost / 12kg full service\n- Ryanair: 40x20x25cm gratis, 55x40x20cm solo prioritario\n- easyJet: 45x36x20cm gratis, 56x45x25cm con extra\n- Vietati: batterie spare in stiva (solo cabina)"],
  [["visto","esta","passapor","ingresso"],"VISTO ITALIA -> MONDO\n- Schengen: libera circolazione\n- USA: ESTA online USD21 (esta.cbp.dhs.gov)\n- UK: ETA richiesta\n- Canada: eTA obbligatoria\n- Australia: ETA online\n- Giappone: nessun visto 90gg\n- Cina: visto obbligatorio\n- India: e-Visa online\n- Fonte: viaggiaresicuri.it"],
  [["261","diritti","compensaz","ritardo","cancel"],"REG CE 261/2004 - SINTESI\n- Voli da aeroporti UE + vettori UE\n- Cancellazione: EUR 250/400/600 + rimborso/riprotezione\n- Ritardo >3h arrivo: stessa compensazione\n- Negato imbarco: compensazione immediata\n- Reclamo: entro 2 anni alla compagnia, poi ENAC\n- Bagagli: Convenzione Montreal (~EUR 1600)"],
  [["connessione","coincidenz","perso il volo"],"CONNESSIONE PERSA\n- Biglietto unico: compagnia deve riprotecarti gratis\n- Biglietti separati: sei a rischio, valuta assicurazione\n- Ritardo >3h destinazione: EUR 250/400/600\n- Subito: non uscire dall'aeroporto, banco compagnia\n- Conserva entrambe le carte imbarco"],
  [["assicuraz"],"ASSICURAZIONE VIAGGIO\n- Medica: fondamentale fuori UE\n- In UE: TEAM (Tessera Europea Ass. Malattia) gratis\n- Annullamento: utile per viaggi costosi\n- Bagagli: copre furto e smarrimento\n- Prezzi: da EUR 15 (viaggi brevi)\n- Consigliata: allianz, axa, generali travel"],
  [["animali","pet","cane","gatto"],"ANIMALI IN AEREO\n- Cabina: solo piccoli (max ~8kg con trasportino)\n- Stiva: animali grandi con kennel IATA\n- Ogni compagnia ha regole diverse - prenota prima\n- Voli internazionali: certificati vet, microchip, passaporto\n- Australia/UK/Giappone/NZ: quarantena possibile\n- Costi: EUR 30-100 cabina, EUR 100-200 stiva"],
  [["cosa significa","codice","wchr","wchs","wchc","iata","sigla","termine"],"GLOSSARIO TERMINI AVIATION\n- WCHR: passeggero in sedia a rotelle che puo' fare le scale da solo\n- WCHS: sedia a rotelle, non puo' fare le scale\n- WCHC: assistenza totale, non deambula\n- BLND: passeggero non vedente\n- DEAF: passeggero non udente\n- DPNA: disabilita' cognitiva o non visibile\n- UM: minore non accompagnato\n- PRM: passeggero a mobilita' ridotta\n- MCT: tempo minimo di connessione tra voli\n- PIR: modulo segnalazione bagaglio smarrito/danneggiato\n- ESTA: autorizzazione elettronica ingresso USA (turismo)\n- ETA: autorizzazione elettronica ingresso UK/Canada/Australia\n- TWOV: transito senza visto in aeroporti selezionati"],
  [["imbarco","gate","boarding"],"PROCEDURA IMBARCO\n- Apre: 45-60min prima della partenza\n- Chiude: 15-30min prima (LOW COST MOLTO PUNTUALE)\n- Documenti: carta imbarco + documento identita'\n- Boarding pass: app o stampa (verifica compagnia)\n- Priority boarding: consigliato con bagaglio cabina\n- Sedile non assegnato: imbarca prima per scegliere"],
  [["compagn","baggage","politica"],"Uso il tab 'Confronto compagnie' per vedere le politiche bagagli di Ryanair, easyJet, Wizz Air, ITA, Vueling e Air France a confronto."],
  [["sedia rotelle","disabil","mobilita","wchr","wchs","wchc","prm","carrozzina"],"Per assistenza con sedia a rotelle o mobilita' ridotta:\n\n1. Vai nel tab SPECIALI dell'app\n2. Seleziona 'Mobilita e disabilita'\n3. Scegli la tua compagnia aerea\n\nTrovi le procedure precise, i livelli di assistenza e i contatti.\n\nREGOLA FONDAMENTALE: contatta sempre la compagnia almeno 48h prima della partenza.\n\nLivelli disponibili:\n- WCHR: difficolta' a camminare a lungo, puoi fare le scale\n- WCHS: non puoi fare le scale\n- WCHC: non deambuli, assistenza completa"],
  [["gesso","ingessa","frattura","arto rotto"],"VIAGGIARE CON IL GESSO\n\nRegola universale:\n- Gesso applicato da MENO di 48h: deve essere diviso/bivalvato dal medico prima di volare\n- Gesso applicato da PIU' di 48h: puoi volare normalmente\n\nGamba intera ingessata:\n- Ryanair: devi acquistare 3 posti (per sollevare la gamba)\n- Altre compagnie: potrebbe essere richiesto un posto extra\n\nArto superiore ingessato:\n- Generalmente basta 1 posto normale\n\nCertificato medico: consigliato sempre, obbligatorio su richiesta della compagnia."],
  [["cane","gatto","animale","pet","trasportino","avih","petc"],"Per portare un animale a bordo:\n\n1. Vai nel tab SPECIALI dell'app\n2. Seleziona 'Animali a bordo'\n3. Scegli la tua compagnia aerea\n\nINFO RAPIDE:\n- Ryanair, easyJet, Wizz Air: NON accettano animali (solo cani guida)\n- ITA, Vueling, Lufthansa, KLM, Air France: SI'\n- Peso max in cabina: 8-10kg (animale + trasportino)\n- Documentazione: microchip + passaporto UE + vaccinazione antirabbica (min 21 giorni prima del volo)"],
  [["minore","bambino","figlio","umnr","accompagnato","solo","senza genitori"],"Per far viaggiare un bambino non accompagnato:\n\n1. Vai nel tab SPECIALI dell'app\n2. Seleziona 'Minori non accompagnati'\n3. Scegli la compagnia aerea\n\nINFO RAPIDE:\n- Ryanair ed easyJet NON offrono il servizio\n- ITA: obbligatorio 5-13 anni (nazionale) / 5-14 anni (internazionale)\n- LHG: obbligatorio 5-11 anni\n- Prenotazione SOLO per telefono, non online\n- Il bambino viene consegnato SOLO alla persona autorizzata con documento"],
  [["incinta","gravidanza","settimane","parto","gestante"],"VIAGGIARE IN GRAVIDANZA\n\n1. Vai nel tab SPECIALI dell'app\n2. Seleziona 'Gravidanza'\n\nRIEPILOGO RAPIDO:\n- Fino a 28 settimane: vola liberamente, nessun documento\n- 28-36 settimane: certificato medico consigliato/obbligatorio\n- Oltre 36 settimane: la maggior parte delle compagnie non accetta\n\nPorta SEMPRE il certificato medico durante il viaggio, anche se non obbligatorio."],
  [["ossigeno","cpap","respiratore","medicale","medico","dispos"],"APPARECCHIATURE MEDICHE E OSSIGENO\n\nVai nel tab SPECIALI > Casi medici per informazioni dettagliate.\n\nREGOLE GENERALI:\n- Farmaci liquidi: esenti dalla regola 100ml con ricetta medica\n- CPAP/apparecchiature: generalmente ammesse, comunicare in anticipo\n- Ossigeno terapeutico: prenotare almeno 7-10 giorni prima, a pagamento\n- Batterie >100Wh: richiede approvazione compagnia\n\nContattta la compagnia almeno 48-72h prima con la documentazione medica."],
];

function chatAns(q){
  const ql=q.toLowerCase();
  for(const[k,a]of KB){if(k.some(x=>ql.includes(x)))return a;}
  return "Prova a chiedermi di:\n- Visti e documenti di viaggio\n- Diritti passeggero e rimborsi\n- Regole bagagli e liquidi\n- Tempi di check-in\n- Assicurazioni viaggio\n- Animali in aereo\n\nOppure usa le altre sezioni dell'app per analisi complete.";
}

function Apt({value,onChange,ph}){
  const[q,setQ]=useState(""),[ open,setO]=useState(false),ref=useRef(null);
  const f=q.length<1?[]:AIRPORTS.filter(a=>a.c.toLowerCase().includes(q.toLowerCase())||a.n.toLowerCase().includes(q.toLowerCase())||a.co.toLowerCase().includes(q.toLowerCase())).slice(0,8);
  useEffect(()=>{const h=e=>{if(ref.current&&!ref.current.contains(e.target))setO(false);};document.addEventListener("mousedown",h);return()=>document.removeEventListener("mousedown",h);},[]);
  const s=AIRPORTS.find(a=>a.c===value);
  return(
    <div ref={ref} style={{position:"relative"}}>
      <input value={open?q:s?s.c+" - "+s.n:""} onChange={e=>{setQ(e.target.value);setO(true);onChange("");}} onFocus={()=>{setQ("");setO(true);}} placeholder={ph}
        style={{width:"100%",padding:"10px 12px",boxSizing:"border-box",border:"1.5px solid "+(value?"#1A6FB4":"#E8EEF5"),borderRadius:10,fontSize:14,fontFamily:"inherit",outline:"none",background:value?"#EEF6FF":"white"}}/>
      {open&&f.length>0&&<div style={{position:"absolute",top:"100%",left:0,right:0,zIndex:999,background:"white",border:"1.5px solid #E8EEF5",borderRadius:10,boxShadow:"0 8px 24px rgba(0,0,0,0.12)",marginTop:4,maxHeight:260,overflowY:"auto"}}>
        {f.map(a=><div key={a.c} onMouseDown={()=>{onChange(a.c);setO(false);setQ("");}} style={{padding:"9px 14px",cursor:"pointer",display:"flex",alignItems:"center",gap:10,borderBottom:"1px solid #E8EEF5"}} onMouseEnter={e=>e.currentTarget.style.background="#F5F8FC"} onMouseLeave={e=>e.currentTarget.style.background="white"}>
          <span style={{fontWeight:800,fontSize:12,color:"white",background:"#1A6FB4",borderRadius:6,padding:"2px 7px",minWidth:36,textAlign:"center"}}>{a.c}</span>
          <div><div style={{fontSize:13,fontWeight:600,color:"#0A1628"}}>{a.n}</div><div style={{fontSize:11,color:"#4A5568"}}>{a.co}</div></div>
        </div>)}
      </div>}
    </div>
  );
}

function Section({title,icon,children,defaultOpen=true}){
  const[open,setOpen]=useState(defaultOpen);
  return(
    <div style={{borderBottom:"1px solid #E8EEF5",marginBottom:4}}>
      <button onClick={()=>setOpen(!open)} style={{width:"100%",display:"flex",alignItems:"center",gap:8,padding:"10px 0",background:"none",border:"none",cursor:"pointer",textAlign:"left"}}>
        <span style={{fontSize:16}}>{icon}</span>
        <span style={{fontSize:13,fontWeight:700,color:"#0A1628",flex:1}}>{title}</span>
        <span style={{fontSize:12,color:"#4A5568"}}>{open?"▲":"▼"}</span>
      </button>
      {open&&<div style={{fontSize:13,lineHeight:1.8,color:"#2d3748",whiteSpace:"pre-wrap",paddingBottom:12,paddingLeft:24}}>{children}</div>}
    </div>
  );
}

const PI=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M17.8 19.2L16 11l3.5-3.5C21 6 21 4 19 4s-2 1-3.5 2.5L11 8 2.8 6.2c-.5-.1-.9.1-1.1.5l-.3.5c-.2.5-.1 1 .3 1.3L9 12l-2 3H4l-1 1 3 2 2 3 1-1v-3l3-2 3.5 5.3c.3.4.8.5 1.3.3l.5-.3c.3-.2.6-.7.5-1.1z"/></svg>;
const SI=()=><svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"/></svg>;
const SE=()=><svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="22" y1="2" x2="11" y2="13"/><polygon points="22 2 15 22 11 13 2 9 22 2"/></svg>;

const ii={width:"100%",padding:"10px 12px",border:"1.5px solid #E8EEF5",borderRadius:10,fontSize:14,boxSizing:"border-box",outline:"none"};
const pp=a=>({padding:"6px 12px",borderRadius:20,border:"none",cursor:"pointer",fontSize:12,fontWeight:600,background:a?"#1A6FB4":"#E8EEF5",color:a?"white":"#4A5568"});

function parseAndRenderResult(text,tab){
  if(tab==="rights"){
    const sections=[
      {key:"BASE LEGALE",icon:"⚖️"},
      {key:"DISTANZA",icon:"📍"},
      {key:"COMPENSAZIONE",icon:"💶"},
      {key:"CIRCOSTANZE",icon:"⚠️"},
      {key:"HAI DIRITTO",icon:"✅"},
      {key:"COSA FARE",icon:"📋"},
      {key:"PROCEDURA",icon:"📋"},
      {key:"AZIONE URGENTE",icon:"🚨"},
      {key:"TESTO RECLAMO",icon:"✉️"},
      {key:"ESCALATION",icon:"🏛️"},
      {key:"SCADENZA",icon:"⏱️"},
      {key:"CALCOLATORE",icon:"🧮"},
      {key:"RYANAIR",icon:"✈️"},
      {key:"EASYJET",icon:"✈️"},
      {key:"ITA AIRWAYS",icon:"✈️"},
      {key:"WIZZ",icon:"✈️"},
      {key:"VUELING",icon:"✈️"},
      {key:"LUFTHANSA",icon:"✈️"},
    ];
    const lines=text.split("\n");
    const blocks=[];
    let cur=null;
    for(const line of lines){
      const sec=sections.find(s=>line.toUpperCase().startsWith(s.key));
      if(sec){
        if(cur)blocks.push(cur);
        cur={title:line,icon:sec.icon,content:[]};
      } else if(cur){
        cur.content.push(line);
      } else {
        blocks.push({title:null,icon:null,content:[line]});
      }
    }
    if(cur)blocks.push(cur);
    return blocks.map((b,i)=>b.title?
      <Section key={i} title={b.title} icon={b.icon} defaultOpen={i<3}>{b.content.join("\n")}</Section>:
      <div key={i} style={{fontSize:13,color:"#2d3748",marginBottom:8}}>{b.content.join("\n")}</div>
    );
  }
  const prepSections=[
    {key:"VISTO",icon:"🛂"},{key:"SALUTE",icon:"💉"},{key:"DOGANA",icon:"🧳"},
    {key:"INFORMAZIONI",icon:"💱"},{key:"EMERGENZE",icon:"🆘"},
    {key:"TIMELINE",icon:"📅"},{key:"CHECKLIST",icon:"☑️"},
  ];
  const lines=text.split("\n");
  const blocks=[];
  let cur=null;
  let header=[];
  for(const line of lines){
    const sec=prepSections.find(s=>line.toUpperCase().includes(s.key));
    if(sec){
      if(cur)blocks.push(cur);
      cur={title:line,icon:sec.icon,content:[]};
    } else if(cur){
      cur.content.push(line);
    } else {
      header.push(line);
    }
  }
  if(cur)blocks.push(cur);
  return[
    <div key="h" style={{fontSize:13,fontWeight:600,color:"#0A1628",marginBottom:12,padding:"8px 12px",background:"#EEF6FF",borderRadius:8}}>{header.join("\n")}</div>,
    ...blocks.map((b,i)=><Section key={i} title={b.title} icon={b.icon} defaultOpen={i<2}>{b.content.join("\n")}</Section>)
  ];
}

export default function App(){
  const[tab,setTab]=useState("prep");
  const[from,setFrom]=useState(""),[ to,setTo]=useState(""),[ pass,setPass]=useState("italiana"),[ dt,setDt]=useState(""),[ purp,setPurp]=useState("turismo"),[ stop,setStop]=useState(""),[ prepR,setPrepR]=useState("");
  const[iss,setIss]=useState(""),[ rf,setRf]=useState(""),[ rt,setRt]=useState(""),[ air,setAir]=useState(""),[ fd,setFd]=useState(""),[ price,setPrice]=useState(""),[ righR,setRighR]=useState("");
  const[ci,setCi]=useState(""),[ msgs,setMsgs]=useState([{r:"a",t:"Ciao! Chiedimi di visti, diritti, bagagli, check-in, assicurazioni e regole di viaggio."}]);
  const[bagComp,setBagComp]=useState("");
  const[specialComp,setSpecialComp]=useState("");const[specialSub,setSpecialSub]=useState("");
  const[animalComp,setAnimalComp]=useState("");
  const[unaccompComp,setUnaccompComp]=useState("");
  const[specialSubTab,setSpecialSubTab]=useState("assist");
  const eRef=useRef(null);
  useEffect(()=>{eRef.current?.scrollIntoView({behavior:"smooth"});},[msgs]);

  const TABS=[["prep","✈️","Viaggio"],["rights","⚖️","Diritti"],["bags","🧳","Bagagli"],["special","🎯","Speciali"],["sos","🆘","SOS"],["chat","💬","Assistente"]];

  return(
    <div style={{fontFamily:"'Segoe UI',system-ui,sans-serif",background:"#F5F8FC",minHeight:"100vh"}}>
      <style>{"@keyframes fadeIn{from{opacity:0;transform:translateY(6px)}to{opacity:1;transform:translateY(0)}}input:focus,select:focus,textarea:focus{border-color:#1A6FB4!important;box-shadow:0 0 0 3px rgba(26,111,180,0.1)!important}"}</style>

      <div style={{background:"linear-gradient(135deg,#0A1628,#1A6FB4)",padding:"20px 16px 0",color:"white"}}>
        <div style={{maxWidth:700,margin:"0 auto"}}>
          <div style={{display:"flex",alignItems:"center",gap:12,marginBottom:16}}>
            <div style={{background:"#F0A500",borderRadius:10,padding:"7px 8px",display:"flex",color:"#0A1628"}}><PI/></div>
            <div>
              <div style={{display:"flex",alignItems:"center",gap:8}}>
                <div style={{fontSize:20,fontWeight:800}}>GateReady</div>
                <div style={{fontSize:10,background:"rgba(255,255,255,0.2)",padding:"2px 7px",borderRadius:10,fontWeight:600}}>v{VERSION.number}</div>
              </div>
              <div style={{fontSize:11,opacity:.7}}>{AIRPORTS.length} aeroporti · Aggiornato {VERSION.date}</div>
            </div>
          </div>
          <div style={{display:"flex",gap:2,overflowX:"auto"}}>
            {TABS.map(([id,ic,l])=><button key={id} onClick={()=>setTab(id)} style={{padding:"8px 14px",borderRadius:"10px 10px 0 0",border:"none",cursor:"pointer",fontSize:12,fontWeight:600,whiteSpace:"nowrap",background:tab===id?"white":"rgba(255,255,255,0.12)",color:tab===id?"#0A1628":"white"}}>{ic} {l}</button>)}
          </div>
        </div>
      </div>

      <div style={{maxWidth:700,margin:"0 auto",padding:"20px 16px 48px"}}>

        {tab==="prep"&&<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"white",borderRadius:"0 16px 16px 16px",padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#0A1628",marginBottom:4}}>Analisi completa del viaggio</div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:18}}>Visto, vaccini, dogana, checklist e timeline di preparazione.</div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:14}}>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>✈️ Partenza</label><Apt value={from} onChange={setFrom} ph="FCO, Roma..."/></div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🛬 Destinazione</label><Apt value={to} onChange={setTo} ph="BKK, Tokyo..."/></div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🛂 Passaporto</label>
                <select value={pass} onChange={e=>setPass(e.target.value)} style={{...ii,background:"white"}}>
                  <option value="italiana">🇮🇹 Italiano</option><option value="europea">🇪🇺 UE (non IT)</option>
                  <option value="americana">🇺🇸 USA</option><option value="britannica">🇬🇧 UK</option><option value="altra">🌍 Altro</option>
                </select>
              </div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>📅 Data partenza</label><input type="date" value={dt} onChange={e=>setDt(e.target.value)} style={ii}/></div>
              <div style={{gridColumn:"1 / -1"}}>
                <label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🔄 Aeroporto di transito (opzionale)</label>
                <Apt value={stop} onChange={setStop} ph="es. IST, DXB, AMS..."/>
                {stop&&<div style={{marginTop:6,fontSize:11,color:"#1A6FB4",padding:"6px 10px",background:"#EEF6FF",borderRadius:8}}>Scalo: {AIRPORTS.find(a=>a.c===stop)?.n||stop} — le informazioni sul transito saranno incluse nell'analisi</div>}
              </div>
              <div style={{gridColumn:"1 / -1"}}>
                <label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:8}}>🎯 Scopo</label>
                <div style={{display:"flex",gap:8,flexWrap:"wrap"}}>
                  {[["turismo","🏖️ Turismo"],["lavoro","💼 Lavoro"],["studio","📚 Studio"],["transito","🔄 Transito"],["famiglia","👨‍👩‍👧 Famiglia"]].map(([v,l])=><button key={v} onClick={()=>setPurp(v)} style={pp(purp===v)}>{l}</button>)}
                </div>
              </div>
            </div>
            <button onClick={()=>{if(from&&to)setPrepR(getPrep(from,to,pass,purp,dt,stop));}} disabled={!from||!to}
              style={{width:"100%",marginTop:18,padding:"13px",background:(!from||!to)?"#CBD5E0":"#1A6FB4",color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:(!from||!to)?"not-allowed":"pointer"}}>
              🔍 Analizza il mio viaggio
            </button>
          </div>
          {prepR&&<div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)",animation:"fadeIn 0.4s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,paddingBottom:12,borderBottom:"1px solid #E8EEF5"}}>
              <div style={{background:"#1A8C5B",borderRadius:8,padding:"5px 6px",display:"flex",color:"white"}}><PI/></div>
              <div style={{fontSize:14,fontWeight:700,color:"#0A1628"}}>Guida al tuo viaggio</div>
              <div style={{marginLeft:"auto",fontSize:11,color:"#4A5568",background:"#E8EEF5",padding:"3px 9px",borderRadius:20}}>{from}→{to}</div>
            </div>
            {parseAndRenderResult(prepR,"prep")}
            <div style={{marginTop:12,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>Verifica sempre su viaggiaresicuri.it (MAECI) prima di partire.</div>
          </div>}
        </div>}

        {tab==="rights"&&<div style={{display:"flex",flexDirection:"column",gap:16}}>
          <div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#0A1628",marginBottom:4}}>Diritti del passeggero</div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:16}}>Calcolo compensazione preciso + testo reclamo + guida specifica per compagnia.</div>
            <div style={{marginBottom:14}}>
              <div style={{fontSize:12,fontWeight:700,color:"#4A5568",marginBottom:8}}>Problema:</div>
              <div style={{display:"flex",flexWrap:"wrap",gap:7}}>
                {["Volo cancellato","Ritardo oltre 3 ore","Bagaglio perso","Overbooking","Connessione persa","Bagaglio danneggiato","Rimborso non ricevuto","Downgrade"].map(q=><button key={q} onClick={()=>setIss(q)} style={pp(iss===q)}>{q}</button>)}
              </div>
            </div>
            <div style={{marginBottom:12}}>
              <label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>✏️ Descrivi la situazione</label>
              <textarea value={iss} onChange={e=>setIss(e.target.value)} placeholder="es. Volo FCO-LHR cancellato 2h prima con Ryanair..." rows={3} style={{...ii,resize:"vertical",fontFamily:"inherit"}}/>
            </div>
            <div style={{display:"grid",gridTemplateColumns:"1fr 1fr",gap:12}}>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>✈️ Partenza</label><Apt value={rf} onChange={setRf} ph="FCO..."/></div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🛬 Arrivo</label><Apt value={rt} onChange={setRt} ph="LHR..."/></div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🏢 Compagnia</label><input value={air} onChange={e=>setAir(e.target.value)} placeholder="Ryanair, ITA, easyJet..." style={ii}/></div>
              <div><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>📅 Data volo</label><input type="date" value={fd} onChange={e=>setFd(e.target.value)} style={ii}/></div>
              <div style={{gridColumn:"1 / -1"}}><label style={{fontSize:12,fontWeight:700,color:"#4A5568",display:"block",marginBottom:5}}>🧮 Prezzo biglietto EUR (opzionale — calcolo rimborso totale)</label><input type="number" value={price} onChange={e=>setPrice(e.target.value)} placeholder="es. 150" style={ii}/></div>
            </div>
            <button onClick={()=>{if(iss)setRighR(getRights(iss,rf,rt,air,fd,price));}} disabled={!iss}
              style={{width:"100%",marginTop:18,padding:"13px",background:!iss?"#CBD5E0":"#1A6FB4",color:"white",border:"none",borderRadius:12,fontSize:15,fontWeight:700,cursor:!iss?"not-allowed":"pointer"}}>
              ⚖️ Analizza i miei diritti
            </button>
          </div>
          {righR&&<div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)",animation:"fadeIn 0.4s ease"}}>
            <div style={{display:"flex",alignItems:"center",gap:8,marginBottom:16,paddingBottom:12,borderBottom:"1px solid #E8EEF5"}}>
              <div style={{background:"#1A6FB4",borderRadius:8,padding:"5px 6px",display:"flex",color:"white"}}><SI/></div>
              <div style={{fontSize:14,fontWeight:700,color:"#0A1628"}}>Analisi diritti</div>
              <div style={{marginLeft:"auto",fontSize:11,color:"#4A5568",background:"#E8EEF5",padding:"3px 9px",borderRadius:20}}>Reg. CE 261/2004</div>
            </div>
            {parseAndRenderResult(righR,"rights")}
            <div style={{marginTop:12,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>Informazioni indicative. Per casi complessi consulta un legale o ENAC.</div>
          </div>}
        </div>}

        {tab==="bags"&&<div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#0A1628",marginBottom:4}}>Confronto politiche bagagli</div>
          <div style={{fontSize:13,color:"#4A5568",marginBottom:16}}>Regole aggiornate delle principali compagnie aeree.</div>
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
            {Object.keys(BAGGAGE).map(k=><button key={k} onClick={()=>setBagComp(BAGGAGE[k])} style={pp(bagComp===BAGGAGE[k])}>{k}</button>)}
          </div>
          {bagComp?<div style={{background:"#F5F8FC",borderRadius:12,padding:16,fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#2d3748"}}>{bagComp}</div>:
          <div style={{padding:20,textAlign:"center",color:"#4A5568",fontSize:13}}>Seleziona una compagnia per vedere le regole sui bagagli</div>}
          <div style={{marginTop:16,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>Le politiche cambiano frequentemente. Verifica sempre sul sito ufficiale della compagnia prima di partire.</div>
        </div>}

        {tab==="special"&&<div style={{background:"white",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
          <div style={{fontSize:15,fontWeight:700,color:"#0A1628",marginBottom:4}}>Servizi speciali</div>
          <div style={{fontSize:13,color:"#4A5568",marginBottom:16}}>Seleziona la categoria che ti interessa</div>

          {/* Sub-navigation */}
          <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:20}}>
            {[["wch","♿","Mobilità e disabilità"],["animals","🐾","Animali a bordo"],["unaccomp","👦","Minori non accompagnati"],["preg","🤰","Gravidanza"],["medical","🏥","Casi medici"]].map(([id,ic,lb])=>(
              <button key={id} onClick={()=>setSpecialSub(id)}
                style={{padding:"8px 14px",borderRadius:10,border:"none",cursor:"pointer",fontSize:13,fontWeight:600,
                  background:specialSub===id?"#0A1628":"#F5F8FC",
                  color:specialSub===id?"white":"#4A5568",
                  boxShadow:specialSub===id?"0 2px 8px rgba(10,22,40,0.2)":"none",
                  transition:"all 0.15s"}}>
                {ic} {lb}
              </button>
            ))}
          </div>

          {/* ── MOBILITÀ E DISABILITÀ ── */}
          {specialSub==="wch"&&<div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:12}}>
              Sedia a rotelle, gesso, disabilità visiva/uditiva, ossigeno. Dati verificati sui siti ufficiali.
            </div>
            <div style={{fontSize:11,color:"#1A6FB4",marginBottom:16,padding:"8px 12px",background:"#EEF6FF",borderRadius:8}}>
              <strong>Cosa significano i codici?</strong><br/>
              ♿ <strong>WCHR</strong> = hai difficoltà a camminare a lungo ma puoi fare le scale &nbsp;|&nbsp;
              🦽 <strong>WCHS</strong> = non puoi fare le scale, serve elevatore &nbsp;|&nbsp;
              🛏 <strong>WCHC</strong> = non deambuli, assistenza totale<br/>
              👁 <strong>BLND</strong> = non vedente/ipovedente &nbsp;|&nbsp;
              👂 <strong>DEAF</strong> = non udente &nbsp;|&nbsp;
              🧠 <strong>DPNA</strong> = disabilità cognitiva/non visibile
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {Object.keys(SPECIAL_ASSIST).map(k=>(
                <button key={k} onClick={()=>setSpecialComp(SPECIAL_ASSIST[k])}
                  style={pp(specialComp===SPECIAL_ASSIST[k])}>{k}</button>
              ))}
            </div>
            {specialComp
              ?<div style={{background:"#F5F8FC",borderRadius:12,padding:16,fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#2d3748"}}>{specialComp}</div>
              :<div style={{padding:20,textAlign:"center",color:"#4A5568",fontSize:13}}>Seleziona la tua compagnia per vedere procedure e dettagli</div>}
            <div style={{marginTop:16,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>
              ⚠️ Contatta sempre la compagnia almeno 48 ore prima della partenza. I posti vicino alle uscite di emergenza non possono essere assegnati a passeggeri con assistenza speciale.
            </div>
          </div>}

          {/* ── ANIMALI A BORDO ── */}
          {specialSub==="animals"&&<div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:12}}>
              Politiche aggiornate 2026 verificate sui manuali ufficiali delle compagnie.
            </div>
            <div style={{padding:"8px 12px",background:"#FEE2E2",borderRadius:8,marginBottom:16,fontSize:11,color:"#991B1B"}}>
              ❌ <strong>Ryanair, easyJet, Wizz Air</strong> non accettano animali domestici (solo cani guida certificati)<br/>
              ✅ Accettano animali: ITA Airways, Vueling, Lufthansa Group, KLM, Air France, Volotea, Norwegian, Transavia<br/>
              📋 Documentazione sempre richiesta: microchip + passaporto UE + vaccinazione antirabbica (min 21gg prima)
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {Object.keys(ANIMALS).map(k=>(
                <button key={k} onClick={()=>setAnimalComp(ANIMALS[k])}
                  style={pp(animalComp===ANIMALS[k])}>{k}</button>
              ))}
            </div>
            {animalComp
              ?<div style={{background:"#F5F8FC",borderRadius:12,padding:16,fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#2d3748"}}>{animalComp}</div>
              :<div style={{padding:20,textAlign:"center",color:"#4A5568",fontSize:13}}>Seleziona la tua compagnia per vedere le regole</div>}
            <div style={{marginTop:16,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>
              ⚠️ Normativa UE animali in aggiornamento (aprile 2026). Verifica sempre sul sito ufficiale della compagnia e con il tuo veterinario prima di partire.
            </div>
          </div>}

          {/* ── MINORI NON ACCOMPAGNATI ── */}
          {specialSub==="unaccomp"&&<div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:12}}>
              Procedure, documenti e limiti di età per compagnia. Dati verificati dai manuali operativi ufficiali.
            </div>
            <div style={{padding:"8px 12px",background:"#EEF6FF",borderRadius:8,marginBottom:16,fontSize:11,color:"#1A6FB4"}}>
              ℹ️ Il servizio va sempre prenotato <strong>per telefono</strong> — quasi mai prenotabile online<br/>
              🆔 Il bambino viene consegnato SOLO alla persona autorizzata con documento d'identità<br/>
              ❌ <strong>Ryanair ed easyJet</strong> non offrono il servizio UM (minimo 16 anni per volare da soli)
            </div>
            <div style={{display:"flex",flexWrap:"wrap",gap:8,marginBottom:16}}>
              {Object.keys(UNACCOMPANIED).map(k=>(
                <button key={k} onClick={()=>setUnaccompComp(UNACCOMPANIED[k])}
                  style={pp(unaccompComp===UNACCOMPANIED[k])}>{k}</button>
              ))}
            </div>
            {unaccompComp
              ?<div style={{background:"#F5F8FC",borderRadius:12,padding:16,fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#2d3748"}}>{unaccompComp}</div>
              :<div style={{padding:20,textAlign:"center",color:"#4A5568",fontSize:13}}>Seleziona la compagnia per vedere le procedure</div>}
            <div style={{marginTop:16,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>
              ⚠️ Contatta la compagnia per telefono con anticipo. Verifica sempre i documenti richiesti (specie per minori italiani: Dichiarazione Questura).
            </div>
          </div>}

          {/* ── GRAVIDANZA ── */}
          {specialSub==="preg"&&<div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:16}}>Regole generali valide per quasi tutte le compagnie europee. Verifica sempre con la tua compagnia specifica.</div>
            {[
              ["🟢 Fino alla 28ª settimana","Puoi volare normalmente su quasi tutte le compagnie. Nessun documento necessario di solito. Consulta il tuo medico per voli lunghi (>4 ore)."],
              ["🟡 28ª – 32ª settimana","La maggior parte delle compagnie richiede un certificato medico che attesti la data prevista del parto e l'idoneità al volo. Ottienilo dal tuo ginecologo entro 7-10 giorni dalla partenza."],
              ["🟠 32ª – 36ª settimana","Certificato medico obbligatorio su quasi tutte le compagnie. Alcune (es. Ryanair) richiedono anche firma di esonero responsabilità. Alcune low cost potrebbero non accettarti senza preavviso."],
              ["🔴 Dopo la 36ª settimana","La maggior parte delle compagnie non accetta passeggere dopo la 36ª settimana (LHG: fino alla 36ª). Gemelli: limite anticipato alla 32ª settimana su molte compagnie. Verifica SEMPRE prima di prenotare."],
              ["✅ Cosa portare sempre","Certificato del ginecologo con: settimana di gravidanza, data prevista del parto, firma e timbro del medico. Su voli internazionali serve anche in inglese."],
              ["📋 Al check-in","Presentati al banco check-in (non self service). Informa l'addetto della gravidanza. Evita i posti vicino alle uscite di emergenza. Richiedi un posto con più spazio (corridoio o prima fila)."],
            ].map(([title,text])=>(
              <div key={title} style={{background:"#F5F8FC",borderRadius:10,padding:"12px 14px",marginBottom:8}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{title}</div>
                <div style={{fontSize:13,color:"#4A5568",lineHeight:1.6}}>{text}</div>
              </div>
            ))}
            <div style={{marginTop:12,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>
              ⚠️ Le regole variano per compagnia. Verifica sempre sul sito ufficiale prima di prenotare. In caso di dubbio consulta il tuo medico.
            </div>
          </div>}

          {/* ── CASI MEDICI ── */}
          {specialSub==="medical"&&<div>
            <div style={{fontSize:13,color:"#4A5568",marginBottom:16}}>Guida per chi viaggia con esigenze mediche particolari.</div>
            {[
              ["💊 Farmaci a bordo","Farmaci in cabina: sempre ammessi in quantità per il viaggio + piccola riserva. Tienili nel bagaglio a mano, mai in stiva. Porta sempre la ricetta medica (in italiano e inglese per voli internazionali). Insulina e siringhe: ammesse con certificato medico. Farmaci liquidi: esentati dal limite 100ml se accompagnati da ricetta."],
              ["💨 Ossigeno terapeutico","Non puoi portare la tua bombola di ossigeno personale a bordo (in cabina). Devi prenotare l'ossigeno della compagnia (OXYG) almeno 7-10 giorni prima — è a pagamento. In alternativa, concentratori di ossigeno portatili (POC/PPOC) approvati FAA sono accettati su molte compagnie — verifica il modello specifico con la compagnia."],
              ["😴 CPAP e apparecchi respiratori","Ammessi a bordo come bagaglio medico aggiuntivo (non conta nel bagaglio a mano). Porta la documentazione medica. Alcune compagnie forniscono prese di corrente per CPAP — verifica in anticipo."],
              ["🦷 Gesso e ortesi","Gesso applicato da MENO di 48h: deve essere bivalvato/diviso dal medico prima del volo. Gesso da PIU' di 48h: nessun requisito aggiuntivo nella maggior parte dei casi. Gamba intera ingessata: alcune compagnie richiedono posti extra a pagamento. Porta sempre un certificato medico aggiornato."],
              ["🛏 Barella (STCR)","Se non puoi stare seduto, puoi viaggiare su barella. Il servizio STCR occupa 9 posti a bordo (verso la coda dell'aereo). Va prenotato con molto anticipo e richiede un modulo MEDIF firmato dal medico. È sempre a pagamento e non disponibile su tutti i voli/compagnie."],
              ["📋 MEDIF — Certificato medico","Il modulo MEDIF (firmato dal tuo medico) è richiesto per: gravidanza avanzata, bambini prematuri, malattie contagiose, uso di ossigeno, pazienti con condizioni che richiedono assistenza speciale. Scaricalo dal sito della tua compagnia, fallo compilare dal medico, presenta al check-in."],
            ].map(([title,text])=>(
              <div key={title} style={{background:"#F5F8FC",borderRadius:10,padding:"12px 14px",marginBottom:8}}>
                <div style={{fontWeight:700,fontSize:13,marginBottom:4}}>{title}</div>
                <div style={{fontSize:13,color:"#4A5568",lineHeight:1.6}}>{text}</div>
              </div>
            ))}
            <div style={{marginTop:12,padding:"10px 12px",background:"#FFFBEA",borderRadius:10,fontSize:11,color:"#7B5800"}}>
              ⚠️ Per qualsiasi condizione medica, contatta sempre la compagnia prima di prenotare. Le regole variano per compagnia e tipo di aeromobile.
            </div>
          </div>}

          {/* Default state - no sub selected */}
          {!specialSub&&<div style={{padding:32,textAlign:"center",color:"#4A5568",fontSize:14}}>
            👆 Seleziona una categoria qui sopra per vedere le informazioni
          </div>}
        </div>}

        {tab==="sos"&&<div style={{display:"flex",flexDirection:"column",gap:12}}>
          <div style={{background:"#FEE2E2",borderRadius:16,padding:20,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
            <div style={{fontSize:15,fontWeight:700,color:"#991B1B",marginBottom:12}}>🆘 Sono in aeroporto con un problema — cosa faccio?</div>
            <div style={{display:"flex",flexDirection:"column",gap:8}}>
              {[
                ["✈️ Volo cancellato adesso","1. VAI AL BANCO DELLA COMPAGNIA subito\n2. Chiedi conferma scritta della cancellazione\n3. Chiedi: rimborso integrale O riprotezione (scegli tu)\n4. Esigi pasti/bevande se l'attesa e' lunga\n5. Se volo il giorno dopo: chiedi hotel + trasferimento\n6. Compagnia non coopera: chiama ENAC 06-44596326"],
                ["⏰ Volo in forte ritardo","1. Tieniti aggiornato sull'app della compagnia\n2. Dopo 2h: chiedi pasti e bevande (tuo diritto)\n3. Dopo 5h: puoi abbandonare e chiedere rimborso integrale\n4. Documenta orario atterraggio effettivo\n5. Conserva tutte le ricevute di spese extra"],
                ["🧳 Bagaglio non arrivato","1. PRIMA DI USCIRE: ufficio Lost & Found\n2. Compila modulo di segnalazione bagaglio (PIR) (Property Irregularity Report)\n3. Chiedi rimborso spese immediate necessarie\n4. Conserva ricevuta modulo di segnalazione bagaglio (PIR) e tutti gli scontrini\n5. Entro 21 giorni: reclamo scritto alla compagnia"],
                ["🚫 Non mi fanno imbarcare","1. NON FIRMARE nessun documento che rinunci ai diritti\n2. Chiedi conferma scritta del negato imbarco\n3. Esigi compensazione immediata in contanti\n4. Chiedi rimborso O riprotezione (scegli tu)\n5. Rifiutano: foto di tutto, chiama ENAC"],
                ["🔄 Ho perso la coincidenza","1. NON uscire dall'aeroporto\n2. Vai SUBITO al banco della compagnia\n3. Se biglietto unico: chiedi riprotezione gratuita\n4. Se biglietti separati: chiedi comunque, poi assicurazione\n5. Conserva entrambe le carte imbarco"],
              ].map(([title,content])=>(
                <details key={title} style={{background:"white",borderRadius:10,overflow:"hidden"}}>
                  <summary style={{padding:"12px 16px",cursor:"pointer",fontWeight:600,fontSize:13,color:"#0A1628",listStyle:"none",display:"flex",justifyContent:"space-between",alignItems:"center"}}>
                    {title}<span>▼</span>
                  </summary>
                  <div style={{padding:"0 16px 16px",fontSize:13,lineHeight:1.8,whiteSpace:"pre-wrap",color:"#2d3748",borderTop:"1px solid #E8EEF5",paddingTop:12}}>{content}</div>
                </details>
              ))}
            </div>
          </div>
          <div style={{background:"white",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
            <div style={{fontSize:13,fontWeight:700,color:"#0A1628",marginBottom:12}}>📞 Numeri utili</div>
            {[["ENAC - Ente Nazionale Aviazione Civile","06 44596326 | enac.gov.it"],["Farnesina - Assistenza italiani all'estero","06 3691 (h24)"],["Emergenze Europa","112"],["Polizia di frontiera aeroporto","113"],["Sportello consumatori europeo","ecc-net.it (online)"]].map(([l,v])=>(
              <div key={l} style={{display:"flex",justifyContent:"space-between",padding:"8px 0",borderBottom:"1px solid #E8EEF5",fontSize:13}}>
                <span style={{color:"#0A1628",fontWeight:600}}>{l}</span>
                <span style={{color:"#1A6FB4"}}>{v}</span>
              </div>
            ))}
          </div>
        </div>}

        {tab==="chat"&&<div style={{background:"white",borderRadius:16,boxShadow:"0 2px 12px rgba(10,22,40,0.08)",display:"flex",flexDirection:"column",height:540,overflow:"hidden"}}>
          <div style={{padding:"14px 16px",borderBottom:"1px solid #E8EEF5",display:"flex",alignItems:"center",gap:10}}>
            <div style={{width:9,height:9,background:"#1A8C5B",borderRadius:"50%"}}/>
            <div style={{fontSize:14,fontWeight:700,color:"#0A1628"}}>Assistente GateReady</div>
            <div style={{fontSize:12,color:"#4A5568"}}>· {AIRPORTS.length} aeroporti · Istantaneo</div>
          </div>
          <div style={{flex:1,overflowY:"auto",padding:16,display:"flex",flexDirection:"column",gap:10}}>
            {msgs.map((m,i)=><div key={i} style={{display:"flex",justifyContent:m.r==="u"?"flex-end":"flex-start",animation:"fadeIn 0.3s ease"}}>
              <div style={{maxWidth:"82%",padding:"10px 14px",fontSize:13,lineHeight:1.7,whiteSpace:"pre-wrap",borderRadius:m.r==="u"?"16px 16px 4px 16px":"16px 16px 16px 4px",background:m.r==="u"?"#1A6FB4":"#E8EEF5",color:m.r==="u"?"white":"#0A1628"}}>{m.t}</div>
            </div>)}
            <div ref={eRef}/>
          </div>
          <div style={{padding:"6px 16px 8px",display:"flex",gap:6,flexWrap:"wrap",borderTop:"1px solid #E8EEF5"}}>
            {["Liquidi cabina","Visto USA","Check-in quando","Ryanair bagagli","Connessione persa"].map(s=><button key={s} onClick={()=>setCi(s)} style={{padding:"4px 10px",background:"#E8EEF5",border:"none",borderRadius:20,fontSize:11,color:"#4A5568",cursor:"pointer",fontWeight:600}}>{s}</button>)}
          </div>
          <div style={{padding:"10px 16px 14px",display:"flex",gap:8,borderTop:"1px solid #E8EEF5"}}>
            <input value={ci} onChange={e=>setCi(e.target.value)} onKeyDown={e=>{if(e.key==="Enter"&&ci.trim()){const q=ci.trim();setCi("");setMsgs(p=>[...p,{r:"u",t:q},{r:"a",t:chatAns(q)}]);}}} placeholder="Chiedi su visti, bagagli, diritti..." style={{flex:1,padding:"10px 14px",border:"1.5px solid #E8EEF5",borderRadius:12,fontSize:14,fontFamily:"inherit",outline:"none"}}/>
            <button onClick={()=>{if(ci.trim()){const q=ci.trim();setCi("");setMsgs(p=>[...p,{r:"u",t:q},{r:"a",t:chatAns(q)}]);}}} disabled={!ci.trim()} style={{padding:"10px 14px",background:!ci.trim()?"#CBD5E0":"#1A6FB4",color:"white",border:"none",borderRadius:12,cursor:!ci.trim()?"not-allowed":"pointer",display:"flex",alignItems:"center"}}><SE/></button>
          </div>
        </div>}

        <div style={{marginTop:20,background:"white",borderRadius:16,padding:16,boxShadow:"0 2px 12px rgba(10,22,40,0.08)"}}>
          <div style={{display:"flex",alignItems:"center",justifyContent:"space-between",marginBottom:10,flexWrap:"wrap",gap:8}}>
            <div style={{display:"flex",alignItems:"center",gap:8}}>
              <div style={{background:"#1A8C5B",borderRadius:6,padding:"3px 8px",fontSize:11,fontWeight:700,color:"white"}}>v{VERSION.number}</div>
              <div style={{fontSize:12,fontWeight:600,color:"#0A1628"}}>GateReady</div>
            </div>
            <div style={{fontSize:11,color:"#4A5568"}}>Aggiornato: {VERSION.date} · Prossima revisione: {VERSION.nextReview}</div>
          </div>
          <div style={{borderTop:"1px solid #E8EEF5",paddingTop:10,marginBottom:10}}>
            <div style={{fontSize:11,fontWeight:700,color:"#4A5568",marginBottom:6}}>Fonti informazioni:</div>
            <div style={{display:"flex",flexDirection:"column",gap:3}}>
              {Object.entries(VERSION.sources).map(([k,v])=>(
                <div key={k} style={{display:"flex",gap:6,fontSize:11}}>
                  <span style={{color:"#1A6FB4",fontWeight:600,minWidth:80,textTransform:"capitalize"}}>{k}:</span>
                  <span style={{color:"#4A5568"}}>{v}</span>
                </div>
              ))}
            </div>
          </div>
          <div style={{borderTop:"1px solid #E8EEF5",paddingTop:10}}>
            <div style={{fontSize:11,fontWeight:700,color:"#4A5568",marginBottom:6}}>Verifica sempre su fonti ufficiali:</div>
            <div style={{display:"flex",flexWrap:"wrap",gap:6}}>
              {VERSION.officialLinks.map(l=>(
                <a key={l.label} href={l.url} target="_blank" rel="noopener noreferrer"
                  style={{fontSize:11,color:"white",background:"#1A6FB4",padding:"4px 10px",borderRadius:20,textDecoration:"none",fontWeight:600}}>
                  {l.label} ↗
                </a>
              ))}
            </div>
          </div>
          <div style={{marginTop:10,padding:"8px 10px",background:"#FFFBEA",borderRadius:8,fontSize:11,color:"#7B5800"}}>
            ⚠️ Le informazioni fornite sono indicative e aggiornate alla data indicata. Requisiti di ingresso, visti e normative possono cambiare senza preavviso. Verifica sempre con fonti ufficiali prima di partire. GateReady non si assume responsabilità per modifiche successive alla pubblicazione.
          </div>
        </div>
      </div>
    </div>
  );
}
