const selectors = {
    boardContainer: document.querySelector('.board-container'),
    board: document.querySelector('.board'),
    moves: document.querySelector('.moves'),
    timer: document.querySelector('.timer'),
    start: document.querySelector('.start'),
    reset: document.querySelector('.reset'),
    win: document.querySelector('.win')
};

const state = {
    gameStarted: false,
    flippedCards: 0,
    totalFlips: 0,
    totalTime: 0,
    loop: null
};

function shuffleArray(array) {
    const clonedArray = [...array];

    for (let i = clonedArray.length - 1; i > 0; i--) {
        const randomIndex = Math.floor(Math.random() * (i + 1));
        const original = clonedArray[i];

        clonedArray[i] = clonedArray[randomIndex];
        clonedArray[randomIndex] = original;
    }

    return clonedArray;
}

function pickRandomItems(array, items) {
    const clonedArray = [...array];
    const randomPicks = [];

    for (let i = 0; i < items; i++) {
        const randomIndex = Math.floor(Math.random() * clonedArray.length);

        randomPicks.push(clonedArray[randomIndex]);
        clonedArray.splice(randomIndex, 1);
    }

    return randomPicks;
}

function generateGame() {
    const dimensions = selectors.board.getAttribute('data-dimension');

    if (dimensions % 2 !== 0) {
        throw new Error("Must be an even number.");
    }
  
    const imageSources = [
      './img/0.png',
      './img/ava.png',
      './img/ban.png',
      './img/bob.png',
      './img/coolcat.png',
      './img/kappa.png',
      './img/lul.png',
      './img/notlikethis.png',
      './img/orc.png',
      './img/raptor.png'
    ];
    
    const img = pickRandomItems(imageSources, (dimensions * dimensions) / 2);
    const items = shuffleArray([...img, ...img]);
    const cards = `
        <div class="board" style="grid-template-columns: repeat(${dimensions}, auto)">
            ${items
                .map(
                    item => `
                <div class="card">
                    <div class="card-front"></div>
                    <div class="card-back">
                        <img src="${item}" class="emoji-image" />
                    </div>
                </div>
            `
                )
                .join('')}
       </div>
    `;

    const parser = new DOMParser().parseFromString(cards, 'text/html');

    selectors.board.replaceWith(parser.querySelector('.board'));
}

function startGame() {
    state.gameStarted = true;
    selectors.start.classList.add('disabled');

    state.loop = setInterval(() => {
        state.totalTime++;

        selectors.moves.innerText = `${state.totalFlips} moves`;
        selectors.timer.innerText = `Time: ${state.totalTime} sec`;
    }, 1000);

}

function flipBackUnmatchedCards() {
    document.querySelectorAll('.card:not(.matched)').forEach(card => {
        card.classList.remove('flipped');
    });

    state.flippedCards = 0;
}

function flipCard(card) {
    state.flippedCards++;
    state.totalFlips++;

    if (!state.gameStarted) {
        startGame();
    }

    if (state.flippedCards <= 2) {
        card.classList.add('flipped');
    }

    if (state.flippedCards === 2) {
        const flippedCards = document.querySelectorAll('.flipped:not(.matched)');
        const cardBacks = Array.from(flippedCards).map(card => card.querySelector('.card-back').innerHTML);

        if (cardBacks[0] === cardBacks[1]) {
            flippedCards[0].classList.add('matched');
            flippedCards[1].classList.add('matched');
        }

        setTimeout(() => {
            flipBackUnmatchedCards();
        }, 1000);
    }

    if (!document.querySelectorAll('.card:not(.flipped)').length) {
        setTimeout(() => {
            selectors.boardContainer.classList.add('flipped');
            selectors.win.innerHTML = `
                <span class="win-text">
                    You won!<br />
                    with <span class="highlight">${state.totalFlips}</span> moves<br />
                    under <span class="highlight">${state.totalTime}</span> seconds
                </span>
            `;

            clearInterval(state.loop);
        }, 1000);
    }
}

function attachEventListeners() {
    document.addEventListener('click', event => {
        const eventTarget = event.target;
        const eventParent = eventTarget.parentElement;

        if (
            eventTarget.className.includes('card') &&
            !eventParent.className.includes('flipped')
        ) {
            flipCard(eventParent);
        } else if (
            eventTarget.nodeName === 'BUTTON' &&
            eventTarget.className.includes('start') &&
            !eventTarget.className.includes('disabled')
        ) {
            startGame();
        } else if (
            eventTarget.nodeName === 'BUTTON' &&
            eventTarget.className.includes('reset')
        ) {
            resetGame();
        }
    });
}

function resetGame() {
    state.gameStarted = false;
    state.flippedCards = 0;
    state.totalFlips = 0;
    state.totalTime = 0;

    selectors.boardContainer.classList.remove('win', 'flipped');
    selectors.win.innerHTML = '';

    clearInterval(state.loop);

    selectors.start.classList.remove('disabled');

    selectors.moves.innerText = '0 moves';
    selectors.timer.innerText = 'Time: 0 sec';

    document.querySelectorAll('.card').forEach(card => {
        card.classList.remove('flipped', 'matched');
    });

    attachEventListeners(); // Reattach event listeners after resetting the game
}



generateGame();
attachEventListeners();
