// ==============================
// カード・デッキ
// ==============================

const suits = ["♠", "♥", "♦", "♣"];
const ranks = ["A", "J", "Q", "K"];

let deck = [];

let playerHand = [];
let cpuHand = [];

let selectedCards = [];

function createDeck() {
    deck = [];

    for (const suit of suits) {
        for (const rank of ranks) {
            deck.push({
                rank: rank,
                suit: suit
            });
        }
    }

    // ジョーカー
    deck.push({
        rank: "JOKER",
        suit: null
    });
}


// ==============================
// シャッフル
// ==============================

function shuffleDeck() {

    for (let i = deck.length - 1; i > 0; i--) {

        const j = Math.floor(Math.random() * (i + 1));

        [deck[i], deck[j]] = [deck[j], deck[i]];
    }
}


// ==============================
// カードを配る
// ==============================

function dealCards() {

    playerHand = [];
    cpuHand = [];

    // 交互に5枚ずつ配る
    for (let i = 0; i < 5; i++) {
        playerHand.push(deck.pop());
        cpuHand.push(deck.pop());
    }
}


// ==============================
// ゲーム開始
// ==============================

function startGame() {

    createDeck();
    shuffleDeck();
    dealCards();

    // 選択状態も初期化
    selectedCards = [];

    // 手札を画面に表示
    displayHands();


    console.log("PLAYER");
    console.log(playerHand);

    console.log("CPU");
    console.log(cpuHand);

    console.log("残り");
    console.log(deck);
}

function displayHands() {

    const playerArea = document.getElementById("player-hand");
    const cpuArea = document.getElementById("cpu-hand");

    playerArea.innerHTML = "";
    cpuArea.innerHTML = "";

    // PLAYER
    for (let i = 0; i < playerHand.length; i++) {

        const card = playerHand[i];
        const cardElement = document.createElement("button");

        if (card.rank === "JOKER") {
            cardElement.textContent = "JOKER";
        } else {
            cardElement.textContent = card.rank + card.suit;
        }

        // 選択済みなら分かるようにする
        if (selectedCards.includes(i)) {
            cardElement.textContent = "✓ " + cardElement.textContent;
        }

        // カードをクリックしたとき
        cardElement.addEventListener("click", function () {
            selectCard(i);
        });

        playerArea.appendChild(cardElement);
    }


    // CPU
    for (let i = 0; i < cpuHand.length; i++) {

        const cardElement = document.createElement("button");

        cardElement.textContent = "？？";

        cpuArea.appendChild(cardElement);
    }
}

function selectCard(index) {

    if (selectedCards.includes(index)) {

        // すでに選択されていたら解除
        selectedCards = selectedCards.filter(
            cardIndex => cardIndex !== index
        );

    } else {

        // 選択されていなければ追加
        selectedCards.push(index);
    }

    displayHands();
}

function exchangeCards() {

    // 何も選択していない場合
    if (selectedCards.length === 0) {
        console.log("交換なし");
        return;
    }

    for (const index of selectedCards) {

        // 山札から1枚引いて、その位置のカードと交換
        playerHand[index] = deck.pop();
    }

    console.log("交換枚数:", selectedCards.length);
    console.log("交換後:", playerHand);
    console.log("山札残り:", deck);

    // 選択状態をリセット
    selectedCards = [];

    displayHands();
}


// ==============================
// ボタン
// ==============================

document
    .getElementById("start-button")
    .addEventListener("click", startGame);

document
    .getElementById("exchange-button")
    .addEventListener("click", exchangeCards);