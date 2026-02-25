<?php

namespace Database\Seeders;

use App\Models\Movie;
use Illuminate\Database\Seeder;

class MovieSeeder extends Seeder
{

  private $baseMovies = [
    [
      "title" => "A remény rabjai",
      "tagline" => "A Shawshank egy börtön- egy sötét kastély egy mély üregben… A félelem a cellában tarthat. De a remény a szabadság maga…",
      "release_date" => "1994-09-23",
      "poster_path" => "https://image.tmdb.org/t/p/w500/oBZ36R1z6Ner9TYmZeSWPhHwF7r.jpg",
      "overview" => "1946-ban egy Andy Dufresne nevű bankárt - noha makacsul hangoztatja ártatlanságát - kettős gyilkosság elkövetése miatt életfogytiglani börtönbüntetésre ítélnek. Dufresne egy Maine állambeli büntetés-végrehajtó intézetbe kerül és hamar meg kell ismerkedjen a börtönélet kegyetlen mindennapjaival, a szadista börtönszemélyzettel, a szinte elállatiasodott rabokkal. Azonban Andy nem törik meg. A bankéletben szerzett tapasztalatai segítségével elnyeri az őrök kegyét és azzal, hogy elvállalja egyik rabtársa illegális akcióiból származó bevételeinek könyvelését, kivívja \"társai\" elismerését is. Cserébe viszont lehetőséget kap a börtön könyvtárának a fejlesztésére, ezzel némi emberi méltóságot csempészve a keserű körülmények között élő rabok mindennapjaiba.",
      'runtime' => 142,
      "certification" => "16"
    ],
    [
      "title" => "A sötét lovag",
      "tagline" => "Ki itt belépsz, ne számíts törvényre.",
      "release_date" => "2008-07-16",
      "poster_path" => "https://image.tmdb.org/t/p/w500/wzJZ6tLRMwhStehrcjSyiVGnn3R.jpg",
      "overview" => "Batman valamint két társa, egy rendőr és egy ügyész mindent elkövet, hogy megtisztítsa Gotham City utcáit a banditáktól. Már kezdik azt hinni, önként vállalt feladatukat siker koronázhatja, amikor megjelenik a bűnözők között valaki, aki minden elődjénél ravaszabb és veszélyesebb. Úgy hívják: Joker. A városban ettől kezdve a félelem az úr: elszabadul a korlátlan, értelmetlen, kivédhetetlennek tűnő gonoszság.",
      "runtime" => 152,
      "certification" => "16"
    ],
    [
      "title" => "Ponyvaregény",
      "tagline" => "",
      "release_date" => "1994-09-10",
      "poster_path" => "https://image.tmdb.org/t/p/w500/i8N31RHT6WaBXSicxABMRyBH4yQ.jpg",
      "overview" => "Adott két idősödő, szabad szájú, tökös, szimpatikus gengszter, Vincent és Jules, akik igyekeznek főnöküknek visszaszerezni egy aktatáskát. Ehhez persze meg kell ölniük pár embert, de ez az egyszerű bérgyilkosokkal gyakran megesik. Jules a rá célzott golyókat csodával határos módon elkerüli, s ezt jelnek tekintvén úgy dönt, felhagy eddigi életével. Társának viszont el kell vinnie szórakozni a gengszterfőnök feleségét... Van továbbá egy boxoló, Butch, aki a hírhedt marffiafőnök, Marselleus Wallace átvágását tervezi. Hogy-hogy nem, odáig fajul a történet, hogy végül már inkább a megmentésére készül, mint a lelövésére... Nem utolsósorban, pedig, van egy piti rabló-párosunk is, akik éppen egy étterem kirablására készülnek. Ám ott reggelizik Vincent és Jules.",
      "runtime" => 154,
      "certification" => "18"
    ],
    [
      "title" => "A Gyűrűk Ura: A király visszatér",
      "tagline" => "Véget ér az utazás",
      "release_date" => "2003-12-01",
      "poster_path" => "https://image.tmdb.org/t/p/w500/5AjfQsNm7eJKAaYJZq23DMJvA5d.jpg",
      "overview" => "Gandalf Pipinnel Gondorba vágtat, hogy Denethort felkészítse Szauron túlerejével szemben. Théoden király összevonja seregeit Gondor segélyhívására. Aragorn végül vállalja sorsát, és hű társaival harcba szólítja a hegyek közt élő holtakat. Középfölde sorsa azonban egészen máshol fog eldőlni. Frodó és Samu a Hatalom gyűrűjével Mordor sötét útvesztőit járja. De minél közelebb kerülnek a Végzet hegyéhez, Frodót annál jobban húzza a Gyűrű szörnyű súlya. A világ sorsa egy apró hobbit kezében van, aki kétséges, hogy ellen tud állni a legnagyobbakat is legyőző kísértésnek.",
      "runtime" => 201,
      "certification" => "12"
    ],
    [
      "title" => "Forrest Gump",
      "tagline" => "",
      "release_date" => "1994-06-23",
      "poster_path" => "https://image.tmdb.org/t/p/w500/arw2vcBveWOVZr6pxd9XTd1TdQa.jpg",
      "overview" => "Az alacsony IQ-val rendelkező Forrest nagy dolgokat ért el életében, és jelentős történelmi események során is jelen volt – minden esetben messze felülmúlva azt, amit bárki elképzelt, hogy képes lenne megtenni. De annak ellenére, hogy mindent elért, egyetlen igaz szerelme elkerüli őt.",
      "runtime" => 142,
      "certification" => "12"
    ],
    [
      "title" => "Harcosok klubja",
      "tagline" => "Káosz. Pánik. Szappan.",
      "release_date" => "1999-10-15",
      "poster_path" => "https://image.tmdb.org/t/p/w500/74RcH5EIo9IrPIgsZw7mGd989tW.jpg",
      "overview" => "Amerika nagyvárosainak pincéiben egy titkos szervezet működik: ha egy éjjel az utca összes nyilvános telefonja összetörik, ők jártak ott; ha egy köztéri szobor óriás fémgömbje legurul talapzatáról, és szétrombol egy gyorsétkezdét, az az ő művük; ha egy elegáns bank parkolójának összes autóját rettentően összerondítják a galambok - az sem véletlen. Vigyáznak a leveleinkre, átveszik telefonüzeneteinket, kísérnek az utcán: és még csak készülnek a végső dobásra: a nagy bummra... Pedig az egészet csak két túlzottan unatkozó jóbarát találta ki: azzal kezdték, hogy rájöttek, nincs jobb stresszoldó, mint ha alaposan megverik egymást. Pofonokat adni jó. Pofonokat kapni jó. Számukra ez a boldog élet szabálya.",
      "runtime" => 139,
      "certification" => "18"
    ],
    [
      "title" => "Csillagok között",
      "tagline" => "A Föld elpusztul, de mi nem pusztulunk vele.",
      "release_date" => "2014-11-05",
      "poster_path" => "https://image.tmdb.org/t/p/w500/6KiSSndIMLj1swkpPNq2lYppDVQ.jpg",
      "overview" => "A nem túl távoli jövőben járunk, melyben bolygónk kezd lakhatatlanná válni. A föld alig hoz termést, rendszeresek a homokviharok, és lassan levegőt se lehet venni. Egy jelenés Coopert a NASA titkos telepére vezeti, ahol felkérik, hogy legyen a tagja annak a csapatnak, mely az emberiségnek új lakhelyet keres az univerzumban. Egy ismeretlen segítséggel megnyitott átjárón keresztül eljutnak egy galaxisba, ahol a közelben kialakult fekete lyuk miatt az idő is másképp telik. Ami nekik egy óra, az a végét járó földön éveket jelent. Alaposan meg kell hát gondolnia Coopernek, hogy a szóba jöhető bolygók közül melyikre látogat el, ha vissza akar térni a lányához, ahogy azt megígérte.",
      "runtime" => 169,
      "certification" => "12"
    ],
    [
      "title" => "A Gyűrűk Ura: A gyűrű szövetsége",
      "tagline" => "Egy gyűrű mind fölött",
      "release_date" => "2001-12-18",
      "poster_path" => "https://image.tmdb.org/t/p/w500/f2yO1mAJlXvP5tLcDGV8Y2Qr3Fx.jpg",
      "overview" => "Frodó, az ifjú hobbit egy gyűrűt kap Bilbótól, amiről kiderül, hogy az Egy Gyűrű, mellyel a Sötétség Ura rabszolgasorba taszíthatja Középfölde népeit. Gandalf Völgyzugolyba küldi Frodót, ahol a tündék legbölcsebb vezetője, Elrond dönt a gyűrű sorsáról. Nincs más lehetőség, a gyűrűt el kell pusztítani Mordorban, a Végzet-katlanban. A szabadnépek tanácsán megújul a Szövetség, és Gandalf vezetésével Frodó és társai, a dúnadán Aragorn, a tünde Legolas, Gimli, a törp, és Boromir, az emberek képviseletében, nekivágnak a reménytelen küldetésnek. A jövő attól függ, hogyan alakul a szövetség sorsa.",
      "runtime" => 179,
      "certification" => "12"
    ],
    [
      "title" => "A Gyűrűk Ura: A két torony",
      "tagline" => "Egy új hatalom emelkedik",
      "release_date" => "2002-12-18",
      "poster_path" => "https://image.tmdb.org/t/p/w500/gqaabsFeu9dFCWIgAHaRFb7WtoG.jpg",
      "overview" => "A gonosz ereje egyre nő, mert szövetséget kötött a két torony: Szauron vára Barad-dúr, és Szarumán, az áruló mágus erődje, Orthanc. Frodó és hű barátja, Samu Mordor földje felé tart, hogy a tűzbe hajítsa terhét, ám egy újabb veszéllyel kell szembenézniük - felbukkan Gollam, aki magának követeli a gyűrűt. Eközben a szövetség még élő tagjai a Kósza vezetésével újabb harcokba keverednek. Rohan lovasai mellett küzdenek és különös szövetségesekre lelnek, az Entekre. Árnyék vetül a világra. A Sötét Úr hadseregei Gondor felé vonulnak. Kezdetét veszi a háború.",
      "runtime" => 210,
      "certification" => "12"
    ],
    [
      "title" => "Eredet",
      "tagline" => "Az agyad lesz a tetthely",
      "release_date" => "2010-07-15",
      "poster_path" => "https://image.tmdb.org/t/p/w500/xMQpKxZzJog5DVMCjSTsD99AziI.jpg",
      "overview" => "A profi tolvaj mindent el tud lopni. Minél nagyobb mester a szakmájában, annál kevésbé lehet előtte akadály. Dom Cobb a legjobbak között is az első: ő mások álmait szerzi meg. Amikor áldozata éjszaka az álomfázisba jut, ő belopózik, és a legnagyobb értékekkel távozik. E tudás tette Cobbot az ipari kémkedés legkeresettebb bűnözőjévé és örökké menekülő, magányos férfivá.És most kap egy esélyt, hogy helyrehozza az összes régi hibáját, és visszaszerezze az elveszett életét. Ehhez nem lopnia kell, hanem profi bandája segítségével visszatérnie az eredethez, és egy gondolatot elültetni valakinek a fejében. Ez lesz a tökéletes bűntény. De a legjobb tervet is keresztülhúzhatja, ha a kiszemelt áldozat maga is profi. Aki olyan veszélyes, amilyenről Cobb még csak nem is álmodott.",
      "runtime" => 142,
      "certification" => "16"
    ],
    [
      "title" => "Bosszúállók: Végjáték",
      "tagline" => "Bármi áron!",
      "release_date" => "2019-04-24",
      "poster_path" => "https://image.tmdb.org/t/p/w500/lwTr5hPyqdMXyZiPWimb0Xgdz3F.jpg",
      "overview" => "A galaxis őrzőinek és a bosszúállóknak a háborúja Thanos-szal a végső szakaszába lép. A végső csata kimenetele mindörökre megváltoztathatja nemcsak a Föld, de az egész univerzum sorsát.",
      "runtime" => 181,
      "certification" => "12"
    ],
    [
      "title" => "Bosszúállók: Végtelen háború",
      "tagline" => "Egy egész univerzum. Egyszer s mindenkorra.",
      "release_date" => "2018-04-25",
      "poster_path" => "https://image.tmdb.org/t/p/w500/pq1VMwnSRclXCMRk0OeERLAz4JM.jpg",
      "overview" => "A Bosszúállóknak és a Földnek egy minden korábbinál nagyobb fenyegetéssel kell szembenézniük, egy új veszedelemmel, mely a kozmikus árnyékból emelkedik ki, Thanosszal, akinek eltökélt célja, hogy megszerezze mind a hat végtelen követ, és ezzel korlátlan hatalomra tegyen szert. A Bosszúállók minden eddigi harca ehhez a pillanathoz vezetett – a Föld, és a létezés sorsa soha nem volt még annyira bizonytalan, mint most.",
      "runtime" => 149,
      "certification" => "16"
    ]
  ];

  public function run()
  {
    foreach ($this->baseMovies as $movie) {
      Movie::create($movie);
    }
  }
}
