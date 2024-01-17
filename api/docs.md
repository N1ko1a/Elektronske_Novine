# Dokumentacija za backend stranu projekta

models/article.js
Sadrzi semu tabele koja se nalazi u bazi podataka

routes/news.js
Sadrzi logiku za endpoints kao sto su:
-Get all
-Update
-Create
-Delete

server.js
Sadrzi konekciju sa bazom mongodb i pokretanje servera

dataSync.js
Ova funkcija sluzi da skinemo sve vesti sa mediastack api-ja i da ih ubacimo u nasu bazu
Za povezivanje sa api koristili smo axios. Napravili smo while loop da prolazimo kroz strana pegination jer mozemo da uzmemo samo odredjeni broj podataka po jednoj strani. Takodje smo ubacili logiku ako se item nalazi u bazi da necemo ponovo da ga ubacujemo

##Offset

Predstavlja koliko rezultata želite preskočiti pre nego što počnete dobijati rezultate. Ovde se izračunava na osnovu trenutne stranice (currentPage) i broja rezultata po stranici (pageSize).

Na primer, ako postavite limit na 10 i currentPage na 2, offset će biti (2 - 1) \* 10 = 10, što znači da želite preskočiti prvih 10 rezultata i početi dobijati rezultate od 11. To je korisno za straničenje rezultata, tako da ne morate dobiti sve rezultate odjednom, već ih možete dobiti u manjim grupama (stranicama).

## res.article = article;

Da, naravno. Kada postavite članak (article) kao svojstvo objekta res (odgovora), praktično ga šaljete dalje niz lanac middleware-a ili rutu unutar Express.js aplikacije. To omogućava deljenje podataka između različitih delova vašeg servera koji se bave različitim zadacima.

U konkretnom slučaju koji ste naveli:

javascript

res.article = article;

Ovde se article (članak) dodaje kao svojstvo objekta res. Kada ovaj res objekat, koji sada sadrži i informacije o članku, pređe na sledeći middleware ili rutu u lancu zahteva, taj članak će biti dostupan kao res.article u tom sledećem delu koda.

Na primer, ako imate sledeći middleware koji treba da koristi informacije o članku:

javascript

function nekiMiddleware(req, res, next) {
// Korišćenje informacija o članku iz res.article
const article = res.article;

// ... dalje radite sa podacima o članku

next(); // Nastavite dalje sa izvršavanjem narednih middleware-a ili rute
}

U ovom primeru, res.article sadrži informacije o članku koje su postavljene u prethodnom middleware-u (getArticles). Ovo omogućava deljenje podataka između različitih delova aplikacije koji se izvršavaju u okviru istog HTTP zahteva.

Ova praksa omogućava modularnost i čistu organizaciju koda, čineći ga lakšim za održavanje. Takođe, omogućava vam da prenesete relevantne informacije kroz različite delove vaše aplikacije bez potrebe da ih svaki put prosleđujete kao parametre.
