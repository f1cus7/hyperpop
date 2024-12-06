// Инициализация элементов
const playNode = document.getElementById('play');
const firstScreenNode = document.getElementById('first-screen');
const bodyNode = document.querySelector('body');
const volumeSlider = document.getElementById('volume-slider');


let live = 3;
let currentLevel = 0;

// Глобальная переменная для текущего аудио
let currentHowl = null;
let isAudioPlaying = false; // Флаг воспроизведения аудио
let audioEnded = false;     // Флаг завершения аудио
// Обработчик изменения видимости
document.addEventListener('visibilitychange', () => {
    if (!currentHowl || audioEnded) return;

    if (document.hidden) {
        // Ставим аудио на паузу, если пользователь уходит с вкладки
        currentHowl.pause();
        isAudioPlaying = false;
    } else if (!isAudioPlaying) {
        // Возобновляем аудио, если пользователь вернулся
        currentHowl.play();
        isAudioPlaying = true;
    }
});

// Массив уровней
const levels = [
  {
    audioSrc: 'audio/1.mp3',
    options: [
      { src: 'images/2.jpg', text: 'Rizza — Vertigo', isCorrect: false },
      { src: 'images/3.jpg', text: 'Midix — А что если мы сдохнем?', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Аквариум', isCorrect: false },
      { src: 'images/1.jpg', text: '17 Seventeen — 2017', isCorrect: true }
    ]
  },
  {
    audioSrc: 'audio/2.mp3',
    options: [
      { src: 'images/1.jpg', text: '17 Seventeen — Сердце', isCorrect: false },
      { src: 'images/17.jpg', text: 'Midix — Твоё имя', isCorrect: true },
      { src: 'images/5.jpg', text: 'Haunted — Laura Les', isCorrect: false },
      { src: 'images/1.jpg', text: '17 SEVENTEEN — USB', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/3.mp3',
    options: [
      { src: 'images/6.jpg', text: '17 Seventeen — Cпать', isCorrect: false },
      { src: 'images/2.jpg', text: 'Rizza — Vertigo', isCorrect: true },
      { src: 'images/3.jpg', text: 'Midix – Sailor Moon', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — BOO!', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/4.mp3',
    options: [
      { src: 'images/8.jpg', text: 'Rizza — Плачь', isCorrect: true },
      { src: 'images/6.jpg', text: 'Midix – Слышу как ты дышишь', isCorrect:  false},
      { src: 'images/1.jpg', text: '17 SEVENTEEN — ХИЛКА!', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Не скучай', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/5.mp3',
    options: [
      { src: 'images/9.jpg', text: 'rizza – sussubus', isCorrect: false },
      { src: 'images/10.jpg', text: 'Шайни — Yeyo!', isCorrect: true },
      { src: 'images/11.jpg', text: 'LONEVATE, 18th – запах сирени', isCorrect: false },
      { src: 'images/1.jpg', text: '17 SEVENTEEN — Фейки', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/6.mp3',
    options: [
      { src: 'images/12.jpg', text: 'WENARO & LXNER — Лёд', isCorrect: true },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Witch House', isCorrect:  false},
      { src: 'images/1.jpg', text: '17 SEVENTEEN — 1 Июня', isCorrect: false },
      { src: 'images/13.jpg', text: 'Midix – CYBERBABY', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/7.mp3',
    options: [
      { src: 'images/14.jpg', text: 'Sqwore & rizza — Холодное оружие', isCorrect: true },
      { src: 'images/15.jpg', text: 'rizza — Quinn', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Ненавижу порядок', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Грусть', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/8.mp3',
    options: [
      { src: 'images/3.jpg', text: 'Midix – Sailor Moon', isCorrect: false },
      { src: 'images/16.jpg', text: 'Sqwore, 17 SEVENTEEN — НЛО', isCorrect: true },
      { src: 'images/17.jpg', text: 'Midix & Chuyko - 2DWRLD', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Аквариум', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/9.mp3',
    options: [
      { src: 'images/18.jpg', text: 'quiizzzmeow — Aomine Daiki', isCorrect: true },
      { src: 'images/4.jpg', text: 'Sqwore — Давай сбежим', isCorrect: false },
      { src: 'images/1.jpg', text: '17 SEVENTEEN — Фейки', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Девочка в окне напротив', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/10.mp3',
    options: [
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Ночник', isCorrect: false },
      { src: 'images/19.jpg', text: 'Sqwore — Тут кто-нибудь есть?', isCorrect: false },
      { src: 'images/20.jpg', text: '17 SEVENTEEN — В голове', isCorrect: true },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Не скучай', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/11.mp3',
    options: [
      { src: 'images/21.jpg', text: 'madk1d – Толпы', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Пластиковые воспоминания', isCorrect: false },
      { src: 'images/3.jpg', text: 'Midix — А что если мы сдохнем?', isCorrect: false },
      { src: 'images/22.jpg', text: 'DSPRITE – Погоди', isCorrect: true }
    ]
  },
  {
    audioSrc: 'audio/12.mp3',
    options: [
      { src: 'images/4.jpg', text: 'Sqwore — Звезда упала', isCorrect: false },
      { src: 'images/23.jpg', text: 'OG Buda & MAYOT — Вина', isCorrect: true },
      { src: 'images/11.jpg', text: 'LONEVATE, 18th – запах сирени', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Я же говорил', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/13.mp3',
    options: [
      { src: 'images/4.jpg', text: 'Sqwore — Навечно', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Грусть', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Аквариум', isCorrect: true },
      { src: 'images/17.jpg', text: 'Midix – Tokyo Ghoul', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/14.mp3',
    options: [
      { src: 'images/24.jpg', text: 'quiizzzmeow, shadowraze & LXNER - adaptive strike', isCorrect: true },
      { src: 'images/17.jpg', text: 'Midix & Chuyko - 2DWRLD', isCorrect: false },
      { src: 'images/25.jpg', text: 'semmmyq & shinra — untitled', isCorrect: false },
      { src: 'images/11.jpg', text: 'LONEVATE, 18th – запах сирени', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/15.mp3',
    options: [
      { src: 'images/1.jpg', text: '17 Seventeen — Сердце', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Коммунарка', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore — Ненавижу порядок', isCorrect: false },
      { src: 'images/26.jpg', text: 'zeekayo – Зря', isCorrect: true }
    ]
  },
  {
    audioSrc: 'audio/16.mp3',
    options: [
      { src: 'images/6.jpg', text: '17 Seventeen — Cпать', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Не скучай', isCorrect: false },
      { src: 'images/17.jpg', text: 'Midix & Chuyko - 2DWRLD', isCorrect: true },
      { src: 'images/4.jpg', text: 'Sqwore — Давай сбежим', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/17.mp3',
    options: [
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Грусть', isCorrect: false },
      { src: 'images/25.jpg', text: 'semmmyq & shinra — untitled', isCorrect: true },
      { src: 'images/9.jpg', text: 'rizza – sussubus', isCorrect: false },
      { src: 'images/3.jpg', text: 'Midix – Sailor Moon', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/18.mp3',
    options: [
      { src: 'images/4.jpg', text: 'Sqwore — Звезда упала', isCorrect: false },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Ночник', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Пластиковые воспоминания', isCorrect: false },
      { src: 'images/19.jpg', text: 'Sqwore — Тут кто-нибудь есть?', isCorrect: true }
    ]
  },
  {
    audioSrc: 'audio/19.mp3',
    options: [
      { src: 'images/27.jpg', text: 'Климлордс – Ничтожество', isCorrect: true },
      { src: 'images/7.jpg', text: 'Sqwore, 17 SEVENTEEN — Грусть', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore — Ненавижу порядок', isCorrect: false },
      { src: 'images/9.jpg', text: 'rizza – sussubus', isCorrect: false }
    ]
  },
  {
    audioSrc: 'audio/20.mp3',
    options: [
      { src: 'images/4.jpg', text: 'Sqwore – Сладких снов', isCorrect: false },
      { src: 'images/17.jpg', text: 'Midix – 2DWORLD', isCorrect: false },
      { src: 'images/17.jpg', text: 'Midix – Tokyo Ghoul', isCorrect: false },
      { src: 'images/21.jpg', text: 'madk1d – Толпы', isCorrect: true }
    ]
  },
  {
    audioSrc: 'audio/21.mp3',
    options: [
      { src: 'images/28.jpg', text: '3TERNITY, хочу спать – Крем', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore – Звезда упала', isCorrect: true },
      { src: 'images/29.jpg', text: 'Pure, 17 SEVENTEEN – бабочки', isCorrect: false },
      { src: 'images/30.jpg', text: 'Pure, Cloud King – Красные глаза', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/22.mp3',
    options: [
      { src: 'images/31.jpg', text: 'Pure – незнакомый город', isCorrect: false },
      { src: 'images/32.jpg', text: '3TERNITY, maiiki – Шрамы', isCorrect: false },
      { src: 'images/4.jpg', text: 'Sqwore – Давай сбежим', isCorrect: true },
      { src: 'images/33.jpg', text: 'хадсон – Забываю', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/23.mp3',
    options: [
      { src: 'images/34.jpg', text: 'LOLIWZ – uf-af', isCorrect: true },
      { src: 'images/35.jpg', text: 'pyatno – mp3', isCorrect: false },
      { src: 'images/36.jpg', text: 'LXNER, takeluf – Crowbars', isCorrect: false },
      { src: 'images/37.jpg', text: '17 SEVENTEEN – Может просто', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/24.mp3',
    options: [
      { src: 'images/37.jpg', text: '17 SEVENTEEN –  Котики', isCorrect: false },
      { src: 'images/38.jpg', text: 'whyalive – ALT + F4', isCorrect: false },
      { src: 'images/39.jpg', text: '17 SEVENTEEN – Капли', isCorrect: false },
      { src: 'images/32.jpg', text: '3TERNITY, OG Buda – ФИТИЛЬ', isCorrect: true },
    ]
  },
  {
    audioSrc: 'audio/25.mp3',
    options: [
      { src: 'images/40.jpg', text: 'АДЛИН –  Иней', isCorrect: false },
      { src: 'images/41.jpg', text: '17 SEVENTEEN – USB (Remix)', isCorrect: true },
      { src: 'images/42.jpg', text: 'rizza – Quinn', isCorrect: false },
      { src: 'images/43.jpg', text: 'enamor3d – суши', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/26.mp3',
    options: [
      { src: 'images/44.jpg', text: 'KVESTAR – Бесконечное лето', isCorrect: false },
      { src: 'images/45.jpg', text: 'quiizzzmeow, ushira – Одиноко', isCorrect: false },
      { src: 'images/46.jpg', text: 'whyalive, Denya8 – Hyperpop luv', isCorrect: true },
      { src: 'images/47.jpg', text: 'drowsyy, 17 SEVENTEEN – Февраль', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/27.mp3',
    options: [
      { src: 'images/48.jpg', text: 'Pathetic – Dreamcore', isCorrect: true },
      { src: 'images/49.jpg', text: 'Климлордс –  Твои лапки', isCorrect: false },
      { src: 'images/50.jpg', text: 'CUPSIZE – ты любишь танцевать', isCorrect: false },
      { src: 'images/51.jpg', text: 'Pepel Nahudi – Каждый день', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/28.mp3',
    options: [
      { src: 'images/29.jpg', text: 'Pure, 17 SEVENTEEN – бабочки', isCorrect: false },
      { src: 'images/39.jpg', text: '17 SEVENTEEN – Капли', isCorrect: false },
      { src: 'images/45.jpg', text: 'quiizzzmeow, ushira – Одиноко', isCorrect: false },
      { src: 'images/52.jpg', text: '17 SEVENTEEN – Конфетка', isCorrect: true },
    ]
  },
  {
    audioSrc: 'audio/29.mp3',
    options: [
      { src: 'images/53.jpg', text: 'whyalive – ALT + F4', isCorrect: false },
      { src: 'images/54.jpg', text: '17 SEVENTEEN – Жвачка', isCorrect: true },
      { src: 'images/47.jpg', text: 'drowsyy, 17 SEVENTEEN – Февраль', isCorrect: false },
      { src: 'images/37.jpg', text: '17 SEVENTEEN – Может просто', isCorrect: false },
    ]
  },
  {
    audioSrc: 'audio/30.mp3',
    options: [
      { src: 'images/49.jpg', text: 'Климлордс –  Твои лапки', isCorrect: false },
      { src: 'images/44.jpg', text: 'KVESTAR – Бесконечное лето', isCorrect: false },
      { src: 'images/55.jpg', text: 'Horoshiyagni, whyalive – Код', isCorrect: true },
      { src: 'images/42.jpg', text: 'rizza – Quinn', isCorrect: false },
    ]
  },
];

// Слушатель на кнопку "Играть"
playNode.addEventListener(`click`, startGame);

YaGames.init()
.then((ysdk) => {
  // Сообщаем платформе, что игра загрузилась и можно начинать играть.
  ysdk.features.LoadingAPI?.ready();
})
.catch(console.error);

function startGame() {
  const volumeValue = volumeSlider ? volumeSlider.value : 1;
  firstScreenNode.style.display = 'none';
  loadLevel(currentLevel, volumeValue);
  console.log('game started!')
  YaGames
  .init()
  .then(ysdk => {
      console.log('Yandex SDK initialized');
      window.ysdk = ysdk;
  });
}




// Функция загрузки уровня
function loadLevel(levelIndex, volumeValue) {
  const level = levels[levelIndex];
  const { audioSrc, options } = level;

  bodyNode.innerHTML = `
    <div>
      <div style="display: flex">
        <div class="hearts" id="hearts-container">
          ${generateHearts(live)}
        </div>
        <div class="now-lvl">Песня: ${levelIndex + 1}/${levels.length}</div>
      </div>
      <div>
        <div id="circle">
          <p id="text-in-circle">3.00</p>
        </div>
      </div>
      <div class="cards">
        ${options.map(option => `
          <div class="card ${option.isCorrect ? 'right' : 'wrong'}">
            <img src="${option.src}" alt="" class="img-song" />
            <p class="p-song">${option.text}</p>
          </div>`).join('')}
      </div>
    </div>`;

    const cardNodes = document.querySelectorAll('.card');

    // Функция для разблокировки карточек через 10 секунды
    function unlockCards() {
      cardNodes.forEach(card => {
        setTimeout(() => {
          card.classList.add('active'); // Разрешаем клики
          if (currentLevel == 10) {
            YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())
          } else if (currentLevel == 20) {
            YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())
          } else if (currentLevel == 30) {
            YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())
          }
        }, 10000); // Разблокируем карточки через 10 секунды
      });
    }

    unlockCards();

  // Используем Howler для воспроизведения аудио
  currentHowl = new Howl({
    src: [audioSrc],
    volume: volumeValue / 100, // Преобразование volumeValue в диапазон 0-1
    onend: () => {
      console.log('Audio playback finished');
      audioEnded = true;
      isAudioPlaying = false;
      currentHowl = null;
    }
  });

  currentHowl.play();
  isAudioPlaying = true;
  audioEnded = false;

  // Таймер обратного отсчёта и обработка кликов
  startCountdown();
  setupCardListeners();

  // Останавливаем аудио через 10 секунд
  setTimeout(() => {
    if (currentHowl) {
      currentHowl.stop();
      isAudioPlaying = false;
      audioEnded = true;
      currentHowl = null;
    }
  }, 10000);
}

// Таймер обратного отсчета
function startCountdown() {
  const textInCircle = document.getElementById('text-in-circle');
  let i = 10.00;

  const interval = setInterval(() => {
    textInCircle.innerHTML = i.toFixed(2);
    i -= 0.01;

    if (i < 0) {
      clearInterval(interval);
      textInCircle.innerHTML = "0.00";
      document.querySelector('.cards').style.opacity = "1";
    }
  }, 10);
}

// Обработчики кликов по карточкам
function setupCardListeners() {
  const wrongCards = document.querySelectorAll('.wrong');
  const rightCard = document.querySelector('.right');
  const heartsContainer = document.getElementById('hearts-container');

  wrongCards.forEach(card => {
    card.addEventListener('click', () => {
      if (live > 0) {
        live--;
        heartsContainer.innerHTML = generateHearts(live);
        card.style.backgroundColor = 'rgba(255, 0, 0, 0.5)';

        if (live === 0) {

          bodyNode.innerHTML = `    <!-- Начальный экран -->
    <div id="first-screen">
      <!-- Название на перовой странице -->
      <div class="name_div">
        <p class="default-bg" id="name">Хайперпоп тест</p>
      </div>
            <!-- Текст на первой странице -->
            <div>
              <h4 class="default-bg" id="main-text">
                Привет тем, кто до сих пор живёт в 2021. <br>В этом тесте мы вспомним
                золотую эпоху hyperpop'а, когда трава была зеленее, реквиемы краснее,
                а мир фиолетовее, благодаря обложкам новых гиперпоп-треков.
              </h4>
            </div>

      <!-- Кнопка плэй -->
<!-- Кнопка плэй -->
<div id="play">
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="10vh"
    height="10vh"
    fill="white"
    class="bi bi-play-circle-fill"
    viewBox="0 0 16 16"
  >
    <path
      d="M16 8A8 8 0 1 1 0 8a8 8 0 0 1 16 0zM6.79 5.093A.5.5 0 0 0 6 5.5v5a.5.5 0 0 0 .79.407l3.5-2.5a.5.5 0 0 0 0-.814l-3.5-2.5z"
    />
  </svg>
</div>

`
        live = 3;
        currentLevel = 0;
        const playNode = document.getElementById('play');
        playNode.addEventListener(`click`, startGame);
        YaGames.init().then(ysdk => ysdk.adv.showFullscreenAdv())


function startGame() {
  const volumeValue = volumeSlider ? volumeSlider.value : 1;
  firstScreenNode.style.display = 'none';
  loadLevel(currentLevel, volumeValue);
}
        }
      }
    });
  });

  rightCard.addEventListener('click', () => nextLvl());
}

// Генерация сердец
function generateHearts(live) {
  const heartFull = `
    <svg xmlns="http://www.w3.org/2000/svg" width="3vh" height="3vh" fill="white" class="bi bi-suit-heart-fill" viewBox="0 0 16 16">
      <path d="M4 1c2.21 0 4 1.755 4 3.92C8 2.755 9.79 1 12 1s4 1.755 4 3.92c0 3.263-3.234 4.414-7.608 9.608a.513.513 0 0 1-.784 0C3.234 9.334 0 8.183 0 4.92 0 2.755 1.79 1 4 1z"/>
    </svg>`;
  const heartEmpty = `
    <svg xmlns="http://www.w3.org/2000/svg" width="3vh" height="3vh" fill="white" class="bi bi-suit-heart" viewBox="0 0 16 16">
      <path d="m8 6.236-.894-1.789c-.222-.443-.607-1.08-1.152-1.595C5.418 2.345 4.776 2 4 2 2.324 2 1 3.326 1 4.92c0 1.211.554 2.066 1.868 3.37.337.334.721.695 1.146 1.093C5.122 10.423 6.5 11.717 8 13.447c1.5-1.73 2.878-3.024 3.986-4.064.425-.398.81-.76 1.146-1.093C14.446 6.986 15 6.131 15 4.92 15 3.326 13.676 2 12 2c-.777 0-1.418.345-1.954.852-.545.515-.93 1.152-1.152 1.595zm.392 8.292a.513.513 0 0 1-.784 0c-1.601-1.902-3.05-3.262-4.243-4.381C1.3 8.208 0 6.989 0 4.92 0 2.755 1.79 1 4 1c1.6 0 2.719 1.05 3.404 2.008.26.365.458.716.596.992a7.6 7.6 0 0 1 .596-.992C9.281 2.049 10.4 1 12 1c2.21 0 4 1.755 4 3.92 0 2.069-1.3 3.288-3.365 5.227-1.193 1.12-2.642 2.48-4.243 4.38z"/>
    </svg>`;

  return heartFull.repeat(live) + heartEmpty.repeat(3 - live);
}



function endGame() {
  bodyNode.innerHTML = `
  <p class="default-bg end-game">Поздравляю с прохождением теста!<br>
  Ты доказал, что знаешь хайперпоп, а значит 2021 год у тебя был прекрасный. Если тебе понравился тест — напиши в комментариях, тест с какой тематикой/исполнителем ты бы хотел видеть!</p>
  `;
}

function nextLvl() {
  currentLevel++;
  if (currentLevel < levels.length) {
    const volumeValue = volumeSlider ? volumeSlider.value : 1;
    loadLevel(currentLevel, volumeValue);
  } else {
    endGame();
  }
}