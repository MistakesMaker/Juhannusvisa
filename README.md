# Juhannusvisa

Juhannusvisa on suomenkielinen selainvisa juhannuksesta. Se toimii staattisena GitHub Pages -sivuna, ja mukana on sekä yksinpeli että kevyt moninpeli huonekoodeilla.

## Ominaisuudet

- Pelaaja syöttää nimen ja valitsee emoji-avatarin.
- Yksinpelissä pelaaja voi aloittaa heti.
- Moninpelissä yksi pelaaja luo huoneen ja muut liittyvät huonekoodilla tai kutsulinkillä.
- Huoneen luoja eli host näkee pelaajalistan ja käynnistää kisan painamalla **Aloita kisa**.
- Pelaajat vastaavat omilla puhelimillaan, ja tulostaulu päivittyy huoneessa.
- Jokaisessa kysymyksessä on 10 sekunnin vastausaika. Jos aika loppuu, oikea vastaus näytetään ilman pistettä.
- Palautetta näytetään 5 sekuntia, minkä jälkeen visa siirtyy automaattisesti eteenpäin.
- Kysymykset ovat pääosin faktapohjaisia, mutta mukana on muutama kevyt juhannuskompa.

## Tiedostot

- `index.html` sisältää sovelluksen rakenteen ja PeerJS-kirjaston latauksen.
- `style.css` sisältää mobiili ensin -tyylit, värit, huonenäkymän ja vastausanimaatiot.
- `script.js` sisältää pelilogiikan, moninpelin ja kysymykset yhdessä muokattavassa taulukossa.

## Käyttö paikallisesti

Avaa `index.html` selaimessa. Yksinpeli toimii suoraan.

Moninpeli kannattaa testata julkaistulla HTTPS-osoitteella, esimerkiksi GitHub Pagesissa. Huoneet käyttävät PeerJS/WebRTC-yhteyttä, jossa hostin selain toimii huoneen vetäjänä. Jos host sulkee sivun, huone päättyy.

## Kysymysten muokkaaminen

Avaa `script.js` ja muokkaa `questions`-taulukkoa. Jokaisella kysymyksellä on seuraava rakenne:

```js
{
  tag: "Fakta",
  text: "Kysymysteksti",
  answers: ["Vaihtoehto 1", "Vaihtoehto 2", "Vaihtoehto 3"],
  correctIndex: 0,
  explanation: "Lyhyt selitys oikeasta vastauksesta."
}
```

`correctIndex` alkaa nollasta, eli `0` tarkoittaa ensimmäistä vastausvaihtoehtoa.

## Julkaisu GitHub Pagesissa

1. Luo GitHubiin uusi repository.
2. Lisää nämä tiedostot repositoryn juureen: `index.html`, `style.css`, `script.js` ja `README.md`.
3. Avaa repositoryn asetukset GitHubissa.
4. Mene kohtaan **Pages**.
5. Valitse lähteeksi **Deploy from a branch**.
6. Valitse branchiksi `main` ja kansioksi `/root`.
7. Tallenna. GitHub näyttää hetken kuluttua Pages-osoitteen, jossa visa toimii.

## Moninpelin huomioita

Moninpeli ei käytä omaa backendia tai tietokantaa. Se käyttää PeerJS-kirjastoa yhteyden välittämiseen pelaajien selainten välille. Tämä sopii kevyeen juhannusvisaan, mutta isoon tapahtumaan tai erittäin luotettavaan käyttöön kannattaa myöhemmin harkita omaa PeerServeriä, Firebasea, Supabasea tai muuta reaaliaikaista taustapalvelua.

## Jatkokehitys

Koodissa pelitila on keskitetty `state`-olioon ja moninpeliyhteydet `network`-olioon. Sen päälle on luontevaa lisätä myöhemmin esimerkiksi:

- hostin ohjaama kysymys kerrallaan eteneminen
- ajastetut kysymykset
- pysyvä tulostaulu
- erillinen ison näytön esitysnäkymä
- oma PeerServer tai tietokantapohjainen moninpeli
