const avatars = ["🌿", "🔥", "🛶", "🌻", "🦟", "🎣", "🥔", "🍓"];
const QUESTION_SECONDS = 10;
const FEEDBACK_DELAY_SECONDS = 5;
const TIMER_UPDATE_MS = 250;

// Kysymykset ovat yhdessä paikassa, jotta visaa on helppo muokata tai laajentaa.
// tag kertoo käyttöliittymälle, onko kysymys faktaa, perinnettä vai kevyempi kompa.
const questions = [
  {
    tag: "Fakta",
    text: "Milloin juhannuspäivää vietetään Suomessa nykyisin?",
    answers: [
      "Aina 24. kesäkuuta",
      "Lauantaina 20. ja 26. kesäkuuta välillä",
      "Kesäkuun ensimmäisenä sunnuntaina",
      "Silloin kun ensimmäinen kokko syttyy",
    ],
    correctIndex: 1,
    explanation:
      "Suomessa juhannuspäivä on aina lauantai, joka osuu 20.-26. kesäkuuta välille.",
  },
  {
    tag: "Fakta",
    text: "Mikä viikonpäivä juhannusaatto yleensä on Suomessa?",
    answers: ["Sunnuntai", "Tiistai", "Perjantai", "Aina sama päivä kuin vappu"],
    correctIndex: 2,
    explanation:
      "Koska juhannuspäivä on lauantai, juhannusaatto on sitä edeltävä perjantai.",
  },
  {
    tag: "Fakta",
    text: "Mihin kristilliseen nimeen sana juhannus liittyy?",
    answers: ["Mikael Agricolaan", "Johannes Kastajaan", "Pyhään Luciaaan", "Joulu-Ukkoon"],
    correctIndex: 1,
    explanation:
      "Juhannus on saanut nimensä Johannes Kastajasta. Vanhemmissa perinteissä juhlaan liittyi myös Ukon juhla.",
  },
  {
    tag: "Perinne",
    text: "Mikä vanha suomalainen juhla yhdistetään juhannuksen taustaan?",
    answers: ["Kekri", "Runebergin päivä", "Ukon juhla", "Laskiainen"],
    correctIndex: 2,
    explanation:
      "Ennen kristillistä kerrostumaa keskikesän juhlaan liitettiin Ukko, ukkosen ja sadon jumala.",
  },
  {
    tag: "Fakta",
    text: "Mihin aikaan Suomen lippu nostetaan juhannusaattona?",
    answers: ["Kello 6", "Kello 12", "Kello 18", "Kun sauna on lämmin"],
    correctIndex: 2,
    explanation:
      "Juhannuksen liputus alkaa poikkeuksellisesti juhannusaattona kello 18.",
  },
  {
    tag: "Fakta",
    text: "Mihin asti Suomen lippua pidetään salossa juhannuksena?",
    answers: [
      "Juhannusaaton keskiyöhön",
      "Juhannuspäivän kello 21:een",
      "Seuraavaan maanantaihin",
      "Kunnes hyttyset luovuttavat",
    ],
    correctIndex: 1,
    explanation:
      "Juhannuksena lippu saa olla salossa yön yli, ja liputus päättyy juhannuspäivänä kello 21.",
  },
  {
    tag: "Fakta",
    text: "Mitä luonnonilmiötä juhannus on lähellä?",
    answers: ["Kesäpäivänseisausta", "Talvipäivänseisausta", "Syyspäiväntasausta", "Ensimmäistä räntäsadetta"],
    correctIndex: 0,
    explanation:
      "Juhannus sijoittuu lähelle kesäpäivänseisausta, jolloin päivä on vuoden pisimpiä.",
  },
  {
    tag: "Fakta",
    text: "Mitä yötön yö tarkoittaa pohjoisessa Suomessa?",
    answers: [
      "Kukaan ei saa mennä nukkumaan",
      "Kello pysähtyy keskiyöllä",
      "Aurinko ei laske lainkaan horisontin alle",
      "Sauna pysyy lämpimänä itsestään",
    ],
    correctIndex: 2,
    explanation:
      "Pohjoisessa Suomessa aurinko voi pysyä juhannuksen aikaan koko yön horisontin yläpuolella.",
  },
  {
    tag: "Perinne",
    text: "Mikä juhannuskokko on?",
    answers: [
      "Perunasalaatin virallinen nimi",
      "Ulkona poltettava suuri juhlatuli",
      "Saunan lämpömittarin yläraja",
      "Kokous, jossa päätetään grillivuorot",
    ],
    correctIndex: 1,
    explanation:
      "Juhannuskokko on perinteinen suuri ulkotuli, joka sytytetään usein vesistön lähellä.",
  },
  {
    tag: "Turvallisuus",
    text: "Milloin juhannuskokkoa ei pidä sytyttää?",
    answers: [
      "Kun makkara on vielä raaka",
      "Kun joku haluaa ottaa kuvan ensin",
      "Kun koivu näyttää liian juhlavalle",
      "Kun metsä- tai ruohikkopalovaroitus on voimassa",
    ],
    correctIndex: 3,
    explanation:
      "Avotulta ei saa tehdä metsä- tai ruohikkopalovaroituksen aikana. Kokko tarvitsee luvan ja turvalliset olosuhteet.",
  },
  {
    tag: "Perinne",
    text: "Mihin juhannuskoivuja perinteisesti käytetään?",
    answers: [
      "Järven lämmittämiseen",
      "Pihojen, ovien ja juhlapaikan koristeluun",
      "Hyttysten laskemiseen",
      "Saunavuorojen arpomiseen",
    ],
    correctIndex: 1,
    explanation:
      "Koivun oksat kuuluvat monen juhannuskoristeluun, erityisesti ovien ja pihapiirin tuntumaan.",
  },
  {
    tag: "Perinne",
    text: "Mihin seitsemän kukkaa tyynyn alla liittyy?",
    answers: [
      "Perunan keittoaikaan",
      "Kokon sytytysohjeeseen",
      "Juhannustaikaan, jossa unessa voi nähdä tulevan puolison",
      "Viralliseen liputusohjeeseen",
    ],
    correctIndex: 2,
    explanation:
      "Tunnetussa juhannustaiassa kerätään seitsemän erilaista kukkaa tyynyn alle tulevaa puolisoa varten.",
  },
  {
    tag: "Perinne",
    text: "Mikä on juhannussalko?",
    answers: [
      "Kalan mittaamiseen tarkoitettu keppi",
      "Koristeltu salko, joka tunnetaan etenkin ruotsinkielisessä juhannusperinteessä",
      "Saunan oven lukko",
      "Juhannusvisan salainen lisäkysymys",
    ],
    correctIndex: 1,
    explanation:
      "Juhannussalko eli midsommarstång kuuluu erityisesti ruotsalaiseen ja suomenruotsalaiseen juhannusperinteeseen.",
  },
  {
    tag: "Fakta",
    text: "Mitä sana mittumaari tarkoittaa?",
    answers: [
      "Mökkilaiturin mittanauhaa",
      "Makkaran paistoastetta",
      "Vanhaa nimitystä juhannukselle tai keskikesälle",
      "Keskikesän verotuspäivää",
    ],
    correctIndex: 2,
    explanation:
      "Mittumaari on vanha juhannukseen ja keskikesään liittyvä nimitys.",
  },
  {
    tag: "Perinne",
    text: "Mikä seuraavista on hyvin tavallinen juhannusperinne Suomessa?",
    answers: ["Saunominen", "Piparkakkutalon rakentaminen", "Munien maalaaminen", "Laskiaispullan laskeminen mäkeen"],
    correctIndex: 0,
    explanation:
      "Sauna kuuluu monen suomalaisen juhannukseen yhtä varmasti kuin keskustelu veden lämpötilasta.",
  },
  {
    tag: "Fakta",
    text: "Miksi monet kaupungit hiljenevät juhannuksena?",
    answers: [
      "Kaupungit suljetaan virallisesti pressulla",
      "Kaikki muuttavat hetkeksi Ahvenanmaalle",
      "Monet lähtevät mökeille, maalle tai vesistöjen äärelle",
      "Raitiovaunut menevät saunaan",
    ],
    correctIndex: 2,
    explanation:
      "Juhannus on Suomessa vahvasti mökki- ja maaseutujuhla, joten kaupunkien keskustoissa voi olla poikkeuksellisen hiljaista.",
  },
  {
    tag: "Fakta",
    text: "Mikä ruoka yhdistetään usein suomalaiseen juhannuspöytään?",
    answers: ["Mämmi", "Uudet perunat", "Runebergintorttu", "Laskiaispulla"],
    correctIndex: 1,
    explanation:
      "Uudet perunat ovat monelle juhannuspöydän odotettu klassikko, usein kalan, voin tai tillin kanssa.",
  },
  {
    tag: "Perinne",
    text: "Mitä juhannustaioissa on perinteisesti yritetty ennustaa?",
    answers: ["Sähkön hintaa", "Naapurin grillin mallia", "Seuraavan talven nastarenkaita", "Rakkautta ja tulevaa puolisoa"],
    correctIndex: 3,
    explanation:
      "Monet juhannustaiat liittyvät rakkauteen, tulevaan puolisoon ja onneen.",
  },
  {
    tag: "Kevyt kompa",
    text: "Mitä suomalainen usein tarkoittaa sanoessaan 'ei tässä nyt niin paljoa hyttysiä ole'?",
    answers: [
      "Hyttysiä ei ole yhtään",
      "Hän tekee hyönteistutkimusta",
      "Hyttysiä on aivan riittävästi",
      "Hän on muuttamassa Saharaan",
    ],
    correctIndex: 2,
    explanation:
      "Tämä on juhannuspuheen klassikko: määrä voi olla valtava, mutta tunnelman vuoksi asia ilmaistaan varovasti.",
  },
  {
    tag: "Kevyt kompa",
    text: "Jos joku sanoo juhannuksena 'järvivesi on ihan lämmintä', mitä kannattaa muistaa?",
    answers: [
      "Vesi on varmasti 28-asteista",
      "Arvio voi sisältää paljon kansallista optimismia",
      "Järvi on juuri keitetty",
      "Lämpömittari kuuluu heittää pois",
    ],
    correctIndex: 1,
    explanation:
      "Juhannuksena 'ihan lämmin' voi tarkoittaa kaikkea virkistävän ja luonnetta kasvattavan väliltä.",
  },
];

const state = {
  uiMode: "solo",
  role: "solo",
  phase: "start",
  roomCode: "",
  player: {
    id: getOrCreatePlayerId(),
    name: "",
    avatar: avatars[0],
  },
  players: {},
  currentQuestionIndex: 0,
  score: 0,
  answeredCount: 0,
  hasAnswered: false,
  isDone: false,
  questionTimerId: null,
  timerIntervalId: null,
  advanceTimerId: null,
  questionEndsAt: 0,
  advanceEndsAt: 0,
};

const network = {
  peer: null,
  hostConnection: null,
  connectionsByPlayerId: new Map(),
  playerIdByPeerId: new Map(),
};

const startView = document.querySelector("#start-view");
const lobbyView = document.querySelector("#lobby-view");
const quizView = document.querySelector("#quiz-view");
const resultView = document.querySelector("#result-view");
const joinForm = document.querySelector("#join-form");
const playerNameInput = document.querySelector("#player-name");
const avatarOptions = document.querySelector("#avatar-options");
const modeButtons = document.querySelectorAll(".mode-button");
const roomCodeGroup = document.querySelector("#room-code-group");
const roomCodeInput = document.querySelector("#room-code-input");
const startStatus = document.querySelector("#start-status");
const joinSubmitButton = document.querySelector("#join-submit-button");
const roomCodeLabel = document.querySelector("#room-code-label");
const roomStatus = document.querySelector("#room-status");
const roomLinkInput = document.querySelector("#room-link-input");
const copyLinkButton = document.querySelector("#copy-link-button");
const playerCountLabel = document.querySelector("#player-count-label");
const playerList = document.querySelector("#player-list");
const startRoomButton = document.querySelector("#start-room-button");
const leaveRoomButton = document.querySelector("#leave-room-button");
const playerAvatar = document.querySelector("#player-avatar");
const playerNameLabel = document.querySelector("#player-name-label");
const progressLabel = document.querySelector("#progress-label");
const scoreLabel = document.querySelector("#score-label");
const questionCounter = document.querySelector("#question-counter");
const timerPanel = document.querySelector(".timer-panel");
const timerLabel = document.querySelector("#timer-label");
const timerValue = document.querySelector("#timer-value");
const timerBar = document.querySelector("#timer-bar");
const questionTag = document.querySelector("#question-tag");
const questionText = document.querySelector("#question-text");
const answerOptions = document.querySelector("#answer-options");
const feedbackPanel = document.querySelector("#feedback-panel");
const feedbackTitle = document.querySelector("#feedback-title");
const feedbackExplanation = document.querySelector("#feedback-explanation");
const autoAdvanceStatus = document.querySelector("#auto-advance-status");
const leaderboardPanel = document.querySelector("#leaderboard-panel");
const leaderboardRoomLabel = document.querySelector("#leaderboard-room-label");
const leaderboardList = document.querySelector("#leaderboard-list");
const resultAvatar = document.querySelector("#result-avatar");
const resultScore = document.querySelector("#result-score");
const resultFeedback = document.querySelector("#result-feedback");
const resultLeaderboardPanel = document.querySelector("#result-leaderboard-panel");
const resultRoomLabel = document.querySelector("#result-room-label");
const resultLeaderboardList = document.querySelector("#result-leaderboard-list");
const restartButton = document.querySelector("#restart-button");

function getOrCreatePlayerId() {
  const savedId = localStorage.getItem("juhannusvisa-player-id");

  if (savedId) {
    return savedId;
  }

  const randomPart =
    typeof crypto !== "undefined" && crypto.randomUUID
      ? crypto.randomUUID().slice(0, 8)
      : Math.random().toString(36).slice(2, 10);
  const playerId = `player-${randomPart}`;
  localStorage.setItem("juhannusvisa-player-id", playerId);
  return playerId;
}

function showView(activeView) {
  [startView, lobbyView, quizView, resultView].forEach((view) => {
    const isActive = view === activeView;
    view.hidden = !isActive;
    view.classList.toggle("view-active", isActive);
  });
}

function setMode(mode) {
  state.uiMode = mode;
  modeButtons.forEach((button) => {
    const isActive = button.dataset.mode === mode;
    button.classList.toggle("mode-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  roomCodeGroup.hidden = mode !== "join";
  joinSubmitButton.textContent =
    mode === "solo" ? "Aloita yksinpeli" : mode === "host" ? "Luo huone" : "Liity huoneeseen";
  setStartStatus("");
}

function setStartStatus(message, isError = false) {
  startStatus.hidden = !message;
  startStatus.textContent = message;
  startStatus.classList.toggle("status-error", isError);
}

function setRoomStatus(message, isError = false) {
  roomStatus.hidden = !message;
  roomStatus.textContent = message;
  roomStatus.classList.toggle("status-error", isError);
}

function renderAvatarOptions() {
  avatarOptions.innerHTML = "";

  avatars.forEach((avatar) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "avatar-option";
    button.textContent = avatar;
    button.setAttribute("aria-label", `Valitse avatar ${avatar}`);
    button.setAttribute("aria-pressed", String(avatar === state.player.avatar));

    button.addEventListener("click", () => {
      state.player.avatar = avatar;
      renderAvatarOptions();
    });

    avatarOptions.append(button);
  });
}

function preparePlayerFromForm() {
  const playerName = playerNameInput.value.trim();

  if (!playerName) {
    playerNameInput.focus();
    return false;
  }

  state.player.name = sanitizeName(playerName);
  localStorage.setItem("juhannusvisa-player", state.player.name);
  localStorage.setItem("juhannusvisa-avatar", state.player.avatar);
  return true;
}

function resetQuizProgress() {
  clearQuizTimers();
  state.currentQuestionIndex = 0;
  state.score = 0;
  state.answeredCount = 0;
  state.hasAnswered = false;
  state.isDone = false;
}

function startSoloQuiz() {
  destroyNetwork();
  state.role = "solo";
  state.phase = "quiz";
  state.roomCode = "";
  state.players = {};
  resetQuizProgress();
  showView(quizView);
  renderQuestion();
}

function createRoom() {
  if (!ensurePeerAvailable()) {
    return;
  }

  destroyNetwork();
  resetQuizProgress();
  state.role = "host";
  state.phase = "lobby";
  state.roomCode = generateRoomCode();
  state.players = {};
  syncLocalPlayer({ isHost: true, connected: true });

  showView(lobbyView);
  renderLobby();
  setRoomStatus("Avataan huonetta...");
  updateRoomParam(state.roomCode);

  network.peer = new Peer(state.roomCode, { debug: 1 });
  network.peer.on("open", (id) => {
    state.roomCode = id;
    syncLocalPlayer({ isHost: true, connected: true });
    renderLobby();
    setRoomStatus("Huone on valmis.");
    updateRoomParam(id);
  });
  network.peer.on("connection", attachHostConnection);
  network.peer.on("error", handlePeerError);
}

function joinRoom(roomCode) {
  if (!ensurePeerAvailable()) {
    return;
  }

  const cleanCode = extractRoomCode(roomCode);

  if (!cleanCode) {
    setStartStatus("Anna huonekoodi tai kutsulinkki.", true);
    roomCodeInput.focus();
    return;
  }

  destroyNetwork();
  resetQuizProgress();
  state.role = "guest";
  state.phase = "lobby";
  state.roomCode = cleanCode;
  state.players = {};
  syncLocalPlayer({ connected: true });

  showView(lobbyView);
  renderLobby();
  setRoomStatus("Yhdistetään huoneeseen...");
  updateRoomParam(cleanCode);

  network.peer = new Peer(undefined, { debug: 1 });
  network.peer.on("open", () => {
    const connection = network.peer.connect(cleanCode, {
      reliable: true,
      serialization: "json",
      metadata: { playerId: state.player.id },
    });
    attachGuestConnection(connection);
  });
  network.peer.on("error", handlePeerError);
}

function ensurePeerAvailable() {
  if (typeof Peer === "function") {
    return true;
  }

  setStartStatus(
    "Moninpeli tarvitsee PeerJS-yhteyden. Tarkista nettiyhteys tai kokeile yksinpeliä.",
    true,
  );
  return false;
}

function generateRoomCode() {
  const alphabet = "ABCDEFGHJKLMNPQRSTUVWXYZ23456789";
  let suffix = "";

  for (let index = 0; index < 4; index += 1) {
    suffix += alphabet[Math.floor(Math.random() * alphabet.length)];
  }

  return `JUHA-${suffix}`;
}

function extractRoomCode(value) {
  const trimmed = String(value || "").trim();

  try {
    const url = new URL(trimmed);
    return normalizeRoomCode(url.searchParams.get("room") || "");
  } catch {
    return normalizeRoomCode(trimmed);
  }
}

function normalizeRoomCode(value) {
  return String(value || "")
    .trim()
    .toUpperCase()
    .replace(/[^A-Z0-9_-]/g, "");
}

function attachHostConnection(connection) {
  connection.on("open", () => {
    sendToConnection(connection, { type: "room-state", room: serializeRoom() });
  });
  connection.on("data", (message) => handleHostMessage(connection, message));
  connection.on("close", () => markConnectionClosed(connection));
  connection.on("error", () => markConnectionClosed(connection));
}

function attachGuestConnection(connection) {
  network.hostConnection = connection;

  connection.on("open", () => {
    setRoomStatus("Liitytty huoneeseen. Odotetaan aloitusta.");
    sendToHost({ type: "join", player: getLocalPlayerSnapshot({ connected: true }) });
  });
  connection.on("data", handleGuestMessage);
  connection.on("close", () => {
    setRoomStatus("Yhteys huoneeseen katkesi. Hostin selain saattoi sulkeutua.", true);
  });
  connection.on("error", () => {
    setRoomStatus("Yhteys huoneeseen epäonnistui.", true);
  });
}

function handleHostMessage(connection, message) {
  if (!message || typeof message !== "object") {
    return;
  }

  if (message.type === "join") {
    const player = normalizePlayer(message.player);
    network.connectionsByPlayerId.set(player.id, connection);
    network.playerIdByPeerId.set(connection.peer, player.id);
    state.players[player.id] = {
      ...state.players[player.id],
      ...player,
      connected: true,
      isHost: false,
    };

    if (state.phase === "quiz") {
      sendToConnection(connection, { type: "start", room: serializeRoom() });
    } else {
      sendToConnection(connection, { type: "room-state", room: serializeRoom() });
    }

    setRoomStatus(`${player.name} liittyi huoneeseen.`);
    broadcastRoomState();
    renderLobby();
    renderLeaderboards();
  }

  if (message.type === "score") {
    const playerId = String(message.playerId || "");
    const currentPlayer = state.players[playerId];

    if (!currentPlayer) {
      return;
    }

    state.players[playerId] = {
      ...currentPlayer,
      score: clampNumber(message.score, 0, questions.length),
      answered: clampNumber(message.answered, 0, questions.length),
      done: Boolean(message.done),
      connected: true,
    };

    broadcastRoomState();
    renderLeaderboards();
  }
}

function handleGuestMessage(message) {
  if (!message || typeof message !== "object") {
    return;
  }

  if (message.type === "room-state") {
    hydrateRoom(message.room);
    renderLobby();
    renderLeaderboards();
  }

  if (message.type === "start") {
    hydrateRoom(message.room);
    beginMultiplayerQuiz();
  }
}

function handlePeerError(error) {
  const message = getPeerErrorMessage(error);

  if (startView.hidden) {
    setRoomStatus(message, true);
  } else {
    setStartStatus(message, true);
  }
}

function getPeerErrorMessage(error) {
  if (!error || !error.type) {
    return "Moninpeliyhteydessä tapahtui virhe.";
  }

  if (error.type === "peer-unavailable") {
    return "Huonetta ei löytynyt. Tarkista koodi ja yritä uudelleen.";
  }

  if (error.type === "unavailable-id") {
    return "Huonekoodi oli jo käytössä. Palaa alkuun ja luo uusi huone.";
  }

  if (error.type === "network" || error.type === "server-error" || error.type === "socket-error") {
    return "Yhteys välityspalvelimeen epäonnistui. Tarkista nettiyhteys.";
  }

  if (error.type === "browser-incompatible") {
    return "Selain ei tue WebRTC-yhteyksiä, joita moninpeli tarvitsee.";
  }

  return `Moninpelivirhe: ${error.type}`;
}

function beginMultiplayerQuiz() {
  state.phase = "quiz";
  resetQuizProgress();
  syncLocalPlayer({
    score: 0,
    answered: 0,
    done: false,
    connected: true,
    isHost: state.role === "host",
  });
  showView(quizView);
  renderQuestion();
  renderLeaderboards();
}

function startRoomQuiz() {
  if (state.role !== "host") {
    return;
  }

  Object.values(state.players).forEach((player) => {
    player.score = 0;
    player.answered = 0;
    player.done = false;
  });

  beginMultiplayerQuiz();
  broadcast({ type: "start", room: serializeRoom() });
  broadcastRoomState();
}

function markConnectionClosed(connection) {
  const playerId = network.playerIdByPeerId.get(connection.peer);

  if (!playerId || !state.players[playerId]) {
    return;
  }

  state.players[playerId] = {
    ...state.players[playerId],
    connected: false,
  };
  network.connectionsByPlayerId.delete(playerId);
  network.playerIdByPeerId.delete(connection.peer);
  broadcastRoomState();
  renderLobby();
  renderLeaderboards();
}

function sendToConnection(connection, message) {
  if (connection && connection.open) {
    connection.send(message);
  }
}

function sendToHost(message) {
  sendToConnection(network.hostConnection, message);
}

function broadcast(message) {
  network.connectionsByPlayerId.forEach((connection) => {
    sendToConnection(connection, message);
  });
}

function broadcastRoomState() {
  if (state.role !== "host") {
    return;
  }

  broadcast({ type: "room-state", room: serializeRoom() });
}

function serializeRoom() {
  return {
    code: state.roomCode,
    phase: state.phase,
    players: Object.values(state.players),
    questionCount: questions.length,
  };
}

function hydrateRoom(room) {
  if (!room || typeof room !== "object") {
    return;
  }

  state.roomCode = normalizeRoomCode(room.code || state.roomCode);
  state.phase = room.phase || state.phase;
  state.players = {};

  if (Array.isArray(room.players)) {
    room.players.forEach((player) => {
      const normalizedPlayer = normalizePlayer(player);
      state.players[normalizedPlayer.id] = normalizedPlayer;
    });
  }

  syncLocalPlayer({
    connected: true,
    isHost: state.role === "host",
  });
}

function normalizePlayer(player) {
  const safePlayer = player && typeof player === "object" ? player : {};
  const id = String(safePlayer.id || `player-${Math.random().toString(36).slice(2, 10)}`);

  return {
    id,
    name: sanitizeName(safePlayer.name),
    avatar: avatars.includes(safePlayer.avatar) ? safePlayer.avatar : avatars[0],
    score: clampNumber(safePlayer.score, 0, questions.length),
    answered: clampNumber(safePlayer.answered, 0, questions.length),
    done: Boolean(safePlayer.done),
    connected: safePlayer.connected !== false,
    isHost: Boolean(safePlayer.isHost),
  };
}

function sanitizeName(name) {
  return String(name || "Nimetön")
    .trim()
    .slice(0, 24) || "Nimetön";
}

function clampNumber(value, min, max) {
  const number = Number(value);

  if (!Number.isFinite(number)) {
    return min;
  }

  return Math.max(min, Math.min(max, Math.round(number)));
}

function getLocalPlayerSnapshot(overrides = {}) {
  return normalizePlayer({
    id: state.player.id,
    name: state.player.name,
    avatar: state.player.avatar,
    score: state.score,
    answered: state.answeredCount,
    done: state.isDone,
    connected: true,
    isHost: state.role === "host",
    ...overrides,
  });
}

function syncLocalPlayer(overrides = {}) {
  const player = getLocalPlayerSnapshot(overrides);
  state.players[player.id] = player;
  return player;
}

function renderLobby() {
  roomCodeLabel.textContent = state.roomCode || "...";
  roomLinkInput.value = state.roomCode ? buildRoomLink(state.roomCode) : "";
  leaderboardRoomLabel.textContent = state.roomCode ? state.roomCode : "";
  resultRoomLabel.textContent = state.roomCode ? state.roomCode : "";

  const players = getSortedPlayers();
  playerCountLabel.textContent = `${players.length} mukana`;
  playerList.innerHTML = "";

  players.forEach((player) => {
    playerList.append(createPlayerRow(player));
  });

  startRoomButton.hidden = state.role !== "host";
  startRoomButton.disabled = state.role === "host" && players.length === 0;

  if (state.role === "guest" && state.phase === "lobby") {
    setRoomStatus("Odotetaan hostin aloitusta.");
  }
}

function createPlayerRow(player) {
  const item = document.createElement("li");
  item.className = "player-row";

  const identity = document.createElement("span");
  identity.className = "player-row-name";
  identity.textContent = `${player.avatar} ${player.name}${player.isHost ? " (host)" : ""}`;

  const status = document.createElement("span");
  status.className = player.connected ? "player-online" : "player-offline";
  status.textContent = player.connected ? "paikalla" : "poissa";

  item.append(identity, status);
  return item;
}

function buildRoomLink(code) {
  const url = new URL(window.location.href);
  url.searchParams.set("room", code);
  return url.toString();
}

function updateRoomParam(code) {
  const url = new URL(window.location.href);

  if (code) {
    url.searchParams.set("room", code);
  } else {
    url.searchParams.delete("room");
  }

  history.replaceState(null, "", url.toString());
}

async function copyRoomLink() {
  const link = roomLinkInput.value;

  if (!link) {
    return;
  }

  try {
    if (navigator.clipboard && window.isSecureContext) {
      await navigator.clipboard.writeText(link);
    } else {
      roomLinkInput.select();
      document.execCommand("copy");
    }
    setRoomStatus("Kutsulinkki kopioitu.");
  } catch {
    roomLinkInput.select();
    setRoomStatus("Linkki valittu. Kopioi se selaimen valikosta.", true);
  }
}

function renderQuestion() {
  clearQuizTimers();
  const question = questions[state.currentQuestionIndex];
  state.hasAnswered = false;

  playerAvatar.textContent = state.player.avatar;
  playerNameLabel.textContent = state.player.name;
  progressLabel.textContent = `${state.currentQuestionIndex + 1}/${questions.length}`;
  scoreLabel.textContent = `${state.score} pistettä`;
  questionCounter.textContent = `Kysymys ${state.currentQuestionIndex + 1}`;
  timerLabel.textContent = "Aikaa vastata";
  updateTimerDisplay(QUESTION_SECONDS, QUESTION_SECONDS);
  questionTag.textContent = question.tag;
  questionText.textContent = question.text;
  answerOptions.innerHTML = "";
  feedbackPanel.hidden = true;
  feedbackPanel.className = "feedback-panel";
  autoAdvanceStatus.hidden = true;
  autoAdvanceStatus.textContent = "";
  leaderboardPanel.hidden = state.role === "solo";

  question.answers.forEach((answer, index) => {
    const button = document.createElement("button");
    button.type = "button";
    button.className = "answer-button";
    button.textContent = answer;
    button.addEventListener("click", () => resolveQuestion(index, false));
    answerOptions.append(button);
  });

  startQuestionTimer();
  renderLeaderboards();
}

function startQuestionTimer() {
  state.questionEndsAt = Date.now() + QUESTION_SECONDS * 1000;
  state.timerIntervalId = window.setInterval(updateQuestionTimer, TIMER_UPDATE_MS);
  state.questionTimerId = window.setTimeout(() => resolveQuestion(null, true), QUESTION_SECONDS * 1000);
  updateQuestionTimer();
}

function updateQuestionTimer() {
  const remainingMs = Math.max(0, state.questionEndsAt - Date.now());
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  updateTimerDisplay(remainingSeconds, QUESTION_SECONDS);
}

function updateTimerDisplay(remainingSeconds, totalSeconds) {
  const safeRemaining = Math.max(0, Math.min(totalSeconds, remainingSeconds));
  const ratio = totalSeconds > 0 ? safeRemaining / totalSeconds : 0;

  timerValue.textContent = safeRemaining;
  timerBar.style.transform = `scaleX(${ratio})`;
  timerPanel.classList.toggle("timer-low", safeRemaining <= 3);
}

function clearQuizTimers() {
  if (state.questionTimerId) {
    window.clearTimeout(state.questionTimerId);
  }

  if (state.timerIntervalId) {
    window.clearInterval(state.timerIntervalId);
  }

  if (state.advanceTimerId) {
    window.clearTimeout(state.advanceTimerId);
  }

  state.questionTimerId = null;
  state.timerIntervalId = null;
  state.advanceTimerId = null;
  state.questionEndsAt = 0;
  state.advanceEndsAt = 0;
}

function resolveQuestion(selectedIndex, timedOut) {
  if (state.hasAnswered) {
    return;
  }

  if (state.questionTimerId) {
    window.clearTimeout(state.questionTimerId);
  }

  if (state.timerIntervalId) {
    window.clearInterval(state.timerIntervalId);
  }

  state.questionTimerId = null;
  state.timerIntervalId = null;

  const question = questions[state.currentQuestionIndex];
  const isCorrect = !timedOut && selectedIndex === question.correctIndex;
  state.hasAnswered = true;
  state.answeredCount = Math.max(state.answeredCount, state.currentQuestionIndex + 1);

  if (isCorrect) {
    state.score += 1;
  }

  updateTimerDisplay(timedOut ? 0 : Math.max(0, Math.ceil((state.questionEndsAt - Date.now()) / 1000)), QUESTION_SECONDS);

  [...answerOptions.children].forEach((button, index) => {
    button.disabled = true;

    if (index === question.correctIndex) {
      button.classList.add("correct");
    } else if (!timedOut && index === selectedIndex) {
      button.classList.add("incorrect");
    }
  });

  scoreLabel.textContent = `${state.score} pistettä`;
  feedbackPanel.hidden = false;
  feedbackPanel.classList.add(isCorrect ? "right" : "wrong");
  feedbackTitle.textContent = getFeedbackTitle(isCorrect, timedOut);
  feedbackExplanation.textContent = question.explanation;
  scheduleAutoAdvance();

  syncAndShareScore(false);
}

function getFeedbackTitle(isCorrect, timedOut) {
  if (timedOut) {
    return "Aika loppui! Oikea vastaus näkyy vihreällä.";
  }

  return isCorrect ? "Oikein meni!" : "Ei aivan, mutta juhannushenki säilyy.";
}

function scheduleAutoAdvance() {
  state.advanceEndsAt = Date.now() + FEEDBACK_DELAY_SECONDS * 1000;
  autoAdvanceStatus.hidden = false;
  state.timerIntervalId = window.setInterval(updateAutoAdvanceStatus, TIMER_UPDATE_MS);
  state.advanceTimerId = window.setTimeout(advanceQuiz, FEEDBACK_DELAY_SECONDS * 1000);
  updateAutoAdvanceStatus();
}

function updateAutoAdvanceStatus() {
  const remainingMs = Math.max(0, state.advanceEndsAt - Date.now());
  const remainingSeconds = Math.ceil(remainingMs / 1000);
  const label =
    state.currentQuestionIndex === questions.length - 1
      ? "Tulokset näytetään"
      : "Seuraava kysymys alkaa";

  timerLabel.textContent = "Vastaus lukittu";
  autoAdvanceStatus.textContent = `${label} ${remainingSeconds} sekunnin kuluttua.`;
}

function advanceQuiz() {
  if (state.timerIntervalId) {
    window.clearInterval(state.timerIntervalId);
  }

  if (state.advanceTimerId) {
    window.clearTimeout(state.advanceTimerId);
  }

  state.timerIntervalId = null;
  state.advanceTimerId = null;

  if (state.currentQuestionIndex < questions.length - 1) {
    state.currentQuestionIndex += 1;
    renderQuestion();
    return;
  }

  renderResults();
}

function syncAndShareScore(done) {
  state.isDone = done;
  syncLocalPlayer({
    score: state.score,
    answered: state.answeredCount,
    done,
    connected: true,
    isHost: state.role === "host",
  });

  if (state.role === "guest") {
    sendToHost({
      type: "score",
      playerId: state.player.id,
      score: state.score,
      answered: state.answeredCount,
      done,
    });
  }

  if (state.role === "host") {
    broadcastRoomState();
  }

  renderLeaderboards();
}

function getResultFeedback(score) {
  const ratio = score / questions.length;

  if (ratio === 1) {
    return "Täydellinen suoritus. Sinulle voi antaa sekä liputusohjeen että grillipihdit ilman ylimääräistä valvontaa.";
  }

  if (ratio >= 0.75) {
    return "Vahvaa juhannusosaamista. Tiedät perinteet, faktat ja sen, että hyttysistä ei kannata aloittaa väittelyä.";
  }

  if (ratio >= 0.5) {
    return "Hyvä keskikesän taso. Pientä hapuilua, mutta kokko ei kaatunut ja perunat pysyivät lautasella.";
  }

  if (ratio >= 0.25) {
    return "Lupaava mökkikokelas. Vielä vähän liputusta, perinteitä ja järviveden tulkintaa, niin homma alkaa kulkea.";
  }

  return "Tulos jäi matalaksi, mutta juhannus ei ole pelkkää pistelaskua. Aloita uudestaan ja syytä tällä kertaa hyttysiä.";
}

function renderResults() {
  state.phase = state.role === "solo" ? "results" : state.phase;
  syncAndShareScore(true);

  resultAvatar.textContent = state.player.avatar;
  resultScore.textContent = `${state.score}/${questions.length} oikein`;
  resultFeedback.textContent = getResultFeedback(state.score);
  resultLeaderboardPanel.hidden = state.role === "solo";
  restartButton.textContent = state.role === "solo" ? "Aloita alusta" : "Palaa alkuun";
  showView(resultView);
  renderLeaderboards();
}

function getSortedPlayers() {
  return Object.values(state.players).sort((first, second) => {
    if (second.score !== first.score) {
      return second.score - first.score;
    }

    if (second.answered !== first.answered) {
      return second.answered - first.answered;
    }

    return first.name.localeCompare(second.name, "fi");
  });
}

function renderLeaderboards() {
  renderLeaderboardList(leaderboardList);
  renderLeaderboardList(resultLeaderboardList);
  leaderboardPanel.hidden = state.role === "solo" || quizView.hidden;
  resultLeaderboardPanel.hidden = state.role === "solo" || resultView.hidden;
  leaderboardRoomLabel.textContent = state.roomCode || "";
  resultRoomLabel.textContent = state.roomCode || "";
}

function renderLeaderboardList(targetList) {
  targetList.innerHTML = "";

  getSortedPlayers().forEach((player) => {
    const item = document.createElement("li");
    item.className = "leaderboard-row";

    const name = document.createElement("span");
    name.textContent = `${player.avatar} ${player.name}`;

    const score = document.createElement("strong");
    score.textContent = `${player.score}/${questions.length}`;

    const progress = document.createElement("small");
    progress.textContent = player.done ? "valmis" : `${player.answered}/${questions.length} vastattu`;

    item.append(name, score, progress);
    targetList.append(item);
  });
}

function restartQuiz() {
  destroyNetwork();
  state.role = "solo";
  state.phase = "start";
  state.roomCode = "";
  state.players = {};
  resetQuizProgress();
  updateRoomParam("");
  playerNameInput.value = state.player.name;
  setMode("solo");
  showView(startView);
  playerNameInput.focus();
}

function leaveRoom() {
  restartQuiz();
}

function destroyNetwork() {
  clearQuizTimers();

  network.connectionsByPlayerId.forEach((connection) => {
    if (connection.close) {
      connection.close();
    }
  });
  network.connectionsByPlayerId.clear();
  network.playerIdByPeerId.clear();

  if (network.hostConnection && network.hostConnection.close) {
    network.hostConnection.close();
  }

  network.hostConnection = null;

  if (network.peer && !network.peer.destroyed) {
    network.peer.destroy();
  }

  network.peer = null;
}

function restorePlayer() {
  const savedName = localStorage.getItem("juhannusvisa-player");
  const savedAvatar = localStorage.getItem("juhannusvisa-avatar");

  if (savedName) {
    state.player.name = sanitizeName(savedName);
    playerNameInput.value = state.player.name;
  }

  if (savedAvatar && avatars.includes(savedAvatar)) {
    state.player.avatar = savedAvatar;
  }
}

function restoreRoomParam() {
  const params = new URLSearchParams(window.location.search);
  const roomCode = normalizeRoomCode(params.get("room") || "");

  if (roomCode) {
    roomCodeInput.value = roomCode;
    setMode("join");
  }
}

joinForm.addEventListener("submit", (event) => {
  event.preventDefault();

  if (!preparePlayerFromForm()) {
    return;
  }

  if (state.uiMode === "solo") {
    startSoloQuiz();
  } else if (state.uiMode === "host") {
    createRoom();
  } else {
    joinRoom(roomCodeInput.value);
  }
});

modeButtons.forEach((button) => {
  button.addEventListener("click", () => setMode(button.dataset.mode));
});

copyLinkButton.addEventListener("click", copyRoomLink);
startRoomButton.addEventListener("click", startRoomQuiz);
leaveRoomButton.addEventListener("click", leaveRoom);
restartButton.addEventListener("click", restartQuiz);
window.addEventListener("beforeunload", destroyNetwork);

restorePlayer();
renderAvatarOptions();
setMode("solo");
restoreRoomParam();
