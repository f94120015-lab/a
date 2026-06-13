// ============================================================
// STATE YÖNETİMİ
// ============================================================
const STATE_KEY = 'amok_state_v1';
const USERS_KEY = 'amok_users_v1';
const HEARTS_REFILL_COST = 50;
const XP_PER_CORRECT = 10;
const MAX_HEARTS = 5;

let state = {
  username: null,
  isGuest: false,
  streak: 0,
  xp: 0,
  hearts: MAX_HEARTS,
  completedLessons: [],
  unlockedAchievements: [],
  lastActiveDate: null,
  nightOwlTriggered: false,
  perfectLessonTriggered: false,
  warriorTriggered: false,
  placementTaken: false,
  wrongQuestions: [],
  streakFreezeBought: false,
  activeTheme: 'canva',
  dailyTasks: {
    lastResetDate: null,
    tasks: []
  },
  following: [
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
  ],
  followers: [
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
    { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
    { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
  ]
};

// Quiz ve diğer durumlar
let currentLesson = null;
let currentQuestionIndex = 0;
let correctCount = 0;
let wrongCount = 0;
let heartsAtStart = MAX_HEARTS;
let selectedAnswer = null;
let isAnswerChecked = false;
let matchState = null;
let autoAdvanceTimeout = null;

// Ek mod durumları
let isPlacementMode = false;
let isReviewMode = false;
let reviewQuestions = [];
let placementQuestionsList = [];

// ============================================================
// YARDIMCI FONKSİYONLAR
// ============================================================
function saveState() {
  localStorage.setItem(STATE_KEY, JSON.stringify(state));
}

function loadState() {
  const saved = localStorage.getItem(STATE_KEY);
  if (saved) {
    const parsed = JSON.parse(saved);
    state = { ...state, ...parsed };
  }
  // Initialize daily tasks if missing or empty
  if (!state.dailyTasks || !state.dailyTasks.tasks || state.dailyTasks.tasks.length === 0) {
    state.dailyTasks = {
      lastResetDate: new Date().toDateString(),
      tasks: getInitialDailyTasks()
    };
  }
  // Initialize following/followers if missing
  if (!state.following) {
    state.following = [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
    ];
  }
  if (!state.followers) {
    state.followers = [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ];
  }
  if (state.activeTheme === 'light') {
    state.activeTheme = 'canva';
    saveState();
  }
}

function getUsers() {
  const u = localStorage.getItem(USERS_KEY);
  return u ? JSON.parse(u) : {};
}

function saveUser(username, password) {
  const users = getUsers();
  users[username] = { password, createdAt: new Date().toISOString() };
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
}

function showScreen(screenId) {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  document.querySelectorAll('.app-screen').forEach(s => s.classList.remove('active'));
  document.getElementById(screenId).classList.add('active');
}

function showToast(message, type = 'info') {
  const container = document.getElementById('toast-container');
  const toast = document.createElement('div');
  toast.className = `toast ${type}`;
  toast.textContent = message;
  container.appendChild(toast);
  setTimeout(() => toast.remove(), 3000);
}

// ============================================================
// GÜNLÜK GÖREVLER (DAILY TASKS) SİSTEMİ
// ============================================================
function getInitialDailyTasks() {
  return [
    { id: 'lessons', text: 'Bugün 2 ders tamamla', target: 2, current: 0, xpReward: 20, completed: false, claimed: false },
    { id: 'xp', text: 'Bugün 50 Puan kazan', target: 50, current: 0, xpReward: 15, completed: false, claimed: false },
    { id: 'perfect', text: '1 dersi hatasız tamamla', target: 1, current: 0, xpReward: 25, completed: false, claimed: false },
    { id: 'review', text: '1 Hızlı Tekrar testi çöz', target: 1, current: 0, xpReward: 15, completed: false, claimed: false },
    { id: 'shop', text: 'Mağazadan bir ürün satın al', target: 1, current: 0, xpReward: 10, completed: false, claimed: false }
  ];
}

function checkAndResetDailyTasks() {
  const today = new Date().toDateString();
  if (!state.dailyTasks || state.dailyTasks.lastResetDate !== today) {
    state.dailyTasks = {
      lastResetDate: today,
      tasks: getInitialDailyTasks()
    };
    saveState();
  }
}

function updateDailyTaskProgress(taskId, value) {
  if (!state.dailyTasks) return;
  checkAndResetDailyTasks();
  
  const task = state.dailyTasks.tasks.find(t => t.id === taskId);
  if (task && !task.completed) {
    task.current = Math.min(task.target, task.current + value);
    if (task.current >= task.target) {
      task.completed = true;
      claimDailyTaskReward(task);
    }
    saveState();
    renderDailyTasks();
  }
}

function claimDailyTaskReward(task) {
  if (task.claimed) return;
  task.claimed = true;
  state.xp += task.xpReward;
  saveState();
  updateTopBar();
  showToast(`Görev tamamlandı: ${task.text}! +${task.xpReward} Puan kazandın! 🎉`, 'success');
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 50,
      angle: 60,
      spread: 55,
      origin: { x: 0 }
    });
    confetti({
      particleCount: 50,
      angle: 120,
      spread: 55,
      origin: { x: 1 }
    });
  }
}

function renderDailyTasks() {
  const list = document.getElementById('daily-tasks-list');
  if (!list) return;

  checkAndResetDailyTasks();

  list.innerHTML = state.dailyTasks.tasks.map(task => {
    const progressPercent = Math.round((task.current / task.target) * 100);
    const isCompleted = task.completed;
    
    return `
      <div class="daily-task-card ${isCompleted ? 'completed' : ''}" id="task-card-${task.id}">
        <div class="task-card-main">
          <div class="task-checkbox-wrap">
            <div class="task-checkbox">
              ${isCompleted ? '✓' : ''}
            </div>
          </div>
          <div class="task-details">
            <span class="task-text">${task.text}</span>
            <div class="task-meta">
              <span class="task-progress-text">${task.current}/${task.target}</span>
              <span class="task-reward">+${task.xpReward} Puan</span>
            </div>
          </div>
        </div>
        <div class="task-progress-bar-wrap">
          <div class="task-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
      </div>
    `;
  }).join('');
}

let dailyTasksTimerInterval = null;

function startDailyTasksTimer() {
  if (dailyTasksTimerInterval) {
    clearInterval(dailyTasksTimerInterval);
  }
  updateResetTimer();
  dailyTasksTimerInterval = setInterval(updateResetTimer, 1000);
}

function updateResetTimer() {
  const timerEl = document.getElementById('tasks-reset-timer');
  if (!timerEl) return;
  
  const now = new Date();
  const nextDay = new Date();
  nextDay.setHours(24, 0, 0, 0); // Next midnight
  
  const diffMs = nextDay - now;
  if (diffMs <= 0) {
    checkAndResetDailyTasks();
    renderDailyTasks();
    return;
  }
  
  const hours = Math.floor(diffMs / 3600000);
  const minutes = Math.floor((diffMs % 3600000) / 60000);
  const seconds = Math.floor((diffMs % 60000) / 1000);
  
  const pad = (num) => String(num).padStart(2, '0');
  timerEl.textContent = `Sıfırlanma: ${pad(hours)}:${pad(minutes)}:${pad(seconds)}`;
}



// ============================================================
// STREAK SİSTEMİ
// ============================================================
function updateStreak() {
  const today = new Date().toDateString();
  if (state.lastActiveDate === today) return; // Bugün zaten güncellendi

  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);

  if (state.lastActiveDate === yesterday.toDateString()) {
    state.streak += 1;
  } else if (state.lastActiveDate !== today) {
    state.streak = 1; // Seri kırıldı, yeniden başla
  }

  state.lastActiveDate = today;
  saveState();
}

// ============================================================
// BAŞARIM SİSTEMİ
// ============================================================
function checkAchievements() {
  const newlyUnlocked = [];

  achievements.forEach(ach => {
    if (state.unlockedAchievements.includes(ach.id)) return;
    if (ach.condition(state)) {
      state.unlockedAchievements.push(ach.id);
      newlyUnlocked.push(ach);
    }
  });

  if (newlyUnlocked.length > 0) {
    saveState();
  }

  return newlyUnlocked;
}

// ============================================================
// AUTH SİSTEMİ
// ============================================================
function initAuth() {
  const tabs = document.querySelectorAll('.auth-tab');
  const loginForm = document.getElementById('login-form');
  const registerForm = document.getElementById('register-form');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      if (tab.dataset.tab === 'login') {
        loginForm.classList.add('active');
        registerForm.classList.remove('active');
      } else {
        registerForm.classList.add('active');
        loginForm.classList.remove('active');
      }
    });
  });

  // Giriş
  loginForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('login-username').value.trim();
    const password = document.getElementById('login-password').value;

    const users = getUsers();
    if (!users[username]) {
      showToast('Kullanıcı bulunamadı!', 'error');
      return;
    }
    if (users[username].password !== password) {
      showToast('Şifre yanlış!', 'error');
      return;
    }

    // Kullanıcının state'ini yükle
    const userState = localStorage.getItem(`amok_state_${username}`);
    if (userState) {
      state = { ...state, ...JSON.parse(userState) };
    }

    state.username = username;
    state.isGuest = false;
    saveState();
    enterApp();
  });

  // Kayıt
  registerForm.addEventListener('submit', (e) => {
    e.preventDefault();
    const username = document.getElementById('register-username').value.trim();
    const email = document.getElementById('register-email').value.trim();
    const password = document.getElementById('register-password').value;

    if (username.length < 3) {
      showToast('Kullanıcı adı en az 3 karakter olmalı!', 'error');
      return;
    }

    const users = getUsers();
    if (users[username]) {
      showToast('Bu kullanıcı adı zaten alınmış!', 'error');
      return;
    }

    saveUser(username, password);
    state = {
      ...state,
      username,
      isGuest: false,
      streak: 0,
      xp: 0,
      hearts: MAX_HEARTS,
      completedLessons: [],
      unlockedAchievements: [],
      lastActiveDate: null,
      nightOwlTriggered: false,
      perfectLessonTriggered: false,
      warriorTriggered: false
    };
    saveState();
    showToast('Hesap oluşturuldu! Hoş geldin 🎉', 'success');
    enterApp();
  });

  // Misafir
  document.getElementById('btn-guest').addEventListener('click', () => {
    state.username = 'Misafir';
    state.isGuest = true;
    saveState();
    enterApp();
  });

  // Sosyal Giriş Seçenekleri
  const handleSocialLogin = (platform, displayName) => {
    showToast(`${platform} ile giriş yapılıyor...`, 'success');
    setTimeout(() => {
      // Mock social user state initialization
      state = {
        ...state,
        username: displayName,
        isGuest: false,
        streak: 0,
        xp: 0,
        hearts: MAX_HEARTS,
        completedLessons: [],
        unlockedAchievements: [],
        lastActiveDate: null,
        nightOwlTriggered: false,
        perfectLessonTriggered: false,
        warriorTriggered: false
      };
      saveState();
      showToast(`Hoş geldin, ${displayName}! 🎉`, 'success');
      enterApp();
    }, 800);
  };

  document.getElementById('btn-google-login').addEventListener('click', () => {
    handleSocialLogin('Google', 'Google Kullanıcısı');
  });

  document.getElementById('btn-facebook-login').addEventListener('click', () => {
    handleSocialLogin('Facebook', 'Facebook Kullanıcısı');
  });

  document.getElementById('btn-apple-login').addEventListener('click', () => {
    handleSocialLogin('Apple', 'Apple Kullanıcısı');
  });
}

function enterApp() {
  updateStreak();
  updateTopBar();
  renderLessonTree();
  renderAchievements();
  renderDailyTasks();
  startDailyTasksTimer();
  checkPlacementBanner();
  checkReviewBanner();
  renderSocialList();
  
  // Temaları yükle
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    document.documentElement.setAttribute('data-theme', state.activeTheme);
  } else {
    const saved = localStorage.getItem('amok_theme');
    if (saved === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
    } else {
      document.documentElement.removeAttribute('data-theme');
    }
  }

  showScreen('home-screen');
}

function logout() {
  // Kullanıcıya özel state kaydet
  if (state.username && !state.isGuest) {
    localStorage.setItem(`amok_state_${state.username}`, JSON.stringify(state));
  }
  localStorage.removeItem(STATE_KEY);
  
  // Temayı sıfırla
  document.documentElement.removeAttribute('data-theme');
  
  state = {
    username: null,
    isGuest: false,
    streak: 0,
    xp: 0,
    hearts: MAX_HEARTS,
    completedLessons: [],
    unlockedAchievements: [],
    lastActiveDate: null,
    nightOwlTriggered: false,
    perfectLessonTriggered: false,
    warriorTriggered: false,
    placementTaken: false,
    wrongQuestions: [],
    streakFreezeBought: false,
    activeTheme: 'canva',
    dailyTasks: {
      lastResetDate: null,
      tasks: []
    },
    following: [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
    ],
    followers: [
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ]
  };
  showScreen('auth-screen');
}

// ============================================================
// ÜST BAR GÜNCELLEME
// ============================================================
function updateTopBar() {
  const streakCount = document.getElementById('streak-count');
  if (streakCount) streakCount.textContent = state.streak;
  const xpCount = document.getElementById('xp-count');
  if (xpCount) xpCount.textContent = state.xp;
  const heartsCount = document.getElementById('hearts-count');
  if (heartsCount) heartsCount.textContent = state.hearts;

  const streakCountSide = document.getElementById('streak-count-side');
  if (streakCountSide) streakCountSide.textContent = state.streak;
  const xpCountSide = document.getElementById('xp-count-side');
  if (xpCountSide) xpCountSide.textContent = state.xp;
  const heartsCountSide = document.getElementById('hearts-count-side');
  if (heartsCountSide) heartsCountSide.textContent = state.hearts;

  const dropdownName = document.getElementById('dropdown-name');
  if (dropdownName) dropdownName.textContent = state.username || 'Kullanıcı';

  const loginTopbarBtn = document.getElementById('btn-login-topbar');
  const userMenu = document.querySelector('.user-menu');

  if (state.isGuest) {
    if (loginTopbarBtn) loginTopbarBtn.style.display = 'block';
    if (userMenu) userMenu.style.display = 'none';
  } else {
    if (loginTopbarBtn) loginTopbarBtn.style.display = 'none';
    if (userMenu) userMenu.style.display = 'block';
  }
}

function animateStat(elementId, className) {
  const el = document.getElementById(elementId);
  if (el) {
    el.classList.add(className);
    setTimeout(() => el.classList.remove(className), 500);
  }
  const elSide = document.getElementById(elementId + '-side');
  if (elSide) {
    elSide.classList.add(className);
    setTimeout(() => elSide.classList.remove(className), 500);
  }
}

// ============================================================
// DERS AĞACI RENDER
// ============================================================
function renderLessonTree() {
  const container = document.getElementById('tree-container');
  // Render definitions SVG for the path gradients
  container.innerHTML = `
    <svg style="position: absolute; width: 0; height: 0; overflow: hidden;">
      <defs>
        <linearGradient id="path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="var(--accent-primary)" />
          <stop offset="100%" stop-color="var(--accent-primary-hover)" />
        </linearGradient>
        <linearGradient id="canva-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#5AB07F" />
          <stop offset="50%" stop-color="#439A68" />
          <stop offset="100%" stop-color="#2E754C" />
        </linearGradient>
        <linearGradient id="mint-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#76c893" />
          <stop offset="50%" stop-color="#52b788" />
          <stop offset="100%" stop-color="#34a0a4" />
        </linearGradient>
        <linearGradient id="sakura-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#ffb5a7" />
          <stop offset="50%" stop-color="#ff8fa3" />
          <stop offset="100%" stop-color="#c77dff" />
        </linearGradient>
        <linearGradient id="sunset-path-gradient" x1="0%" y1="0%" x2="0%" y2="100%">
          <stop offset="0%" stop-color="#f4a261" />
          <stop offset="50%" stop-color="#e76f51" />
          <stop offset="100%" stop-color="#ffd166" />
        </linearGradient>
      </defs>
    </svg>
  `;

  units.forEach(unit => {
    // 1. Calculate progress in this unit
    const completedInUnit = unit.lessons.filter(lId => state.completedLessons.includes(lId)).length;
    const totalInUnit = unit.lessons.length;
    const progressPercent = Math.round((completedInUnit / totalInUnit) * 100);

    // 2. Create Unit Banner
    const banner = document.createElement('div');
    const colorIndex = ((unit.id - 1) % 10) + 1;
    banner.className = `unit-banner unit-color-${colorIndex}`;
    banner.innerHTML = `
      <div class="unit-banner-info">
        <h2>Bölüm ${unit.id}: ${unit.title}</h2>
        <p>${unit.description}</p>
      </div>
      <div class="unit-progress-container">
        <span class="unit-progress-text">${completedInUnit}/${totalInUnit} Tamamlandı</span>
        <div class="unit-progress-bar-wrap">
          <div class="unit-progress-bar" style="width: ${progressPercent}%"></div>
        </div>
      </div>
    `;
    container.appendChild(banner);

    // 3. Create Winding Path Container
    const pathContainer = document.createElement('div');
    pathContainer.className = 'unit-path-container';
    pathContainer.style.height = `${totalInUnit * 120}px`;

    // Compute coordinates for the lessons (Using a mathematical formula to guarantee all 20 units have unique shapes)
    const points = [];
    for (let idx = 0; idx < totalInUnit; idx++) {
      const u = unit.id;
      
      // Calculate parameters unique to each unit's ID
      const phase = (u * 1.7) % (2 * Math.PI);      // Unique phase shift
      const freq = 1.0 + (u * 0.15) % 1.2;          // Unique frequency
      const amp = 14 + (u * 3) % 9;                 // Unique amplitude
      const tilt = ((u % 3) - 1) * (2 + (u % 4));    // Unique diagonal tilt slope (negative, flat, or positive)
      
      // Combine wave and diagonal tilt
      const centerIndex = (totalInUnit - 1) / 2;
      const offsetPercent = Math.sin(idx * freq + phase) * amp + (idx - centerIndex) * tilt;

      points.push({
        x: 50 + offsetPercent,
        y: idx * 120 + 60
      });
    }

    // Build SVG path data
    let pathD = `M ${points[0].x} ${points[0].y}`;
    for (let i = 0; i < points.length - 1; i++) {
      const p0 = points[i];
      const p1 = points[i + 1];
      const cy = (p0.y + p1.y) / 2;
      pathD += ` C ${p0.x} ${cy}, ${p1.x} ${cy}, ${p1.x} ${p1.y}`;
    }

    // Build SVG progress path data
    let progressD = "";
    const progressLimit = Math.min(totalInUnit - 1, completedInUnit);
    if (progressLimit > 0) {
      progressD = `M ${points[0].x} ${points[0].y}`;
      for (let i = 0; i < progressLimit; i++) {
        const p0 = points[i];
        const p1 = points[i + 1];
        const cy = (p0.y + p1.y) / 2;
        progressD += ` C ${p0.x} ${cy}, ${p1.x} ${cy}, ${p1.x} ${p1.y}`;
      }
    }

    // Render path SVG
    const svgHTML = `
      <svg class="unit-path-svg" viewBox="0 0 100 ${totalInUnit * 120}" preserveAspectRatio="none">
        <path class="path-bg" d="${pathD}" />
        ${progressD ? `<path class="path-progress" d="${progressD}" stroke="url(#path-gradient)" />` : ''}
      </svg>
    `;
    pathContainer.innerHTML = svgHTML;

    // Render each lesson node
    unit.lessons.forEach((lId, idx) => {
      const lesson = lessons.find(l => l.id === lId);
      if (!lesson) return;

      const isCompleted = state.completedLessons.includes(lId);
      const isActive = !isCompleted && isLessonUnlocked(lId);
      const isLocked = !isCompleted && !isActive;

      const pt = points[idx];

      const nodeWrapper = document.createElement('div');
      nodeWrapper.className = 'lesson-node-wrapper';
      nodeWrapper.style.left = `${pt.x}%`;
      nodeWrapper.style.top = `${pt.y}px`;

      let statusClass = 'locked';
      if (isCompleted) {
        statusClass = 'completed';
      } else if (isActive) {
        statusClass = 'active';
      }

      // Inside pin icon content: always show lesson icon.
      const iconContent = `<span class="pin-icon">${lesson.icon}</span>`;

      nodeWrapper.innerHTML = `
        ${isActive ? '<div class="pulse-ring"></div>' : ''}
        <button class="lesson-node ${statusClass}" data-lesson-id="${lId}">
          <div class="pin-bg"></div>
          <div class="pin-inner">
            ${iconContent}
          </div>
          ${isLocked ? '<div class="pin-lock-badge">🔒</div>' : ''}
        </button>
        <div class="lesson-node-label">${lesson.title}</div>
      `;

      const btn = nodeWrapper.querySelector('.lesson-node');
      btn.addEventListener('click', (e) => {
        e.stopPropagation();
        togglePopover(btn, lId, unit.id, pt.x, pt.y);
      });

      pathContainer.appendChild(nodeWrapper);
    });

    container.appendChild(pathContainer);
  });
}

function togglePopover(button, lessonId, unitId, pctX, pxY) {
  // Remove existing popover if any
  const existingPopover = document.querySelector('.lesson-popover');
  if (existingPopover) {
    const isSame = existingPopover.dataset.lessonId == lessonId;
    existingPopover.remove();
    if (isSame) return;
  }

  const unit = units.find(u => u.id === unitId);
  const lesson = lessons.find(l => l.id === lessonId);
  if (!unit || !lesson) return;

  // Render preview details
  let previewHTML = '';
  const topic = rawTopics[unit.id - 1];
  const lessonIndex = unit.lessons.indexOf(lessonId);

  if (topic) {
    if (unit.id === 1 && lessonIndex < 8) {
      const formulas = [
        { formula: "Adjective + Noun", example: "<strong>Analytical method</strong>: Analitik yöntem" },
        { formula: "Noun + Noun", example: "<strong>Method evaluation</strong>: Yöntem değerlendirmesi" },
        { formula: "Noun + of + Noun", example: "<strong>Evaluation of projects</strong>: Projelerin değerlendirilmesi" },
        { formula: "Adjective + Noun + Noun", example: "<strong>Global wealth distribution</strong>: Küresel servet dağılımı" },
        { formula: "Present Participle (V-ing) + Noun", example: "<strong>Expanding economy</strong>: Büyüyen ekonomi" },
        { formula: "Noun + Present Participle (V-ing) + Noun", example: "<strong>Economy-stimulating policy</strong>: Ekonomiyi canlandıran politika" },
        { formula: "Past Participle (V-ed) + Noun", example: "<strong>Stimulated growth</strong>: Uyarılmış/Canlandırılmış büyüme" },
        { formula: "Adverb + Past Participle (V-ed) + Noun", example: "<strong>Regionally stimulated growth</strong>: Bölgesel olarak canlandırılmış büyüme" }
      ];
      const f = formulas[lessonIndex];
      previewHTML = `
        <div class="grammar-preview-box">
          <div class="grammar-formula"><span class="formula-badge">Formül</span> ${f.formula}</div>
          <div class="grammar-example">Örnek: ${f.example}</div>
        </div>
      `;
    } else if (lessonIndex === 0) {
      const wordsList = topic.vocab.map(w => `<span class="preview-word-badge">${w.en}: ${w.tr}</span>`).join('');
      previewHTML = `
        <div class="lesson-preview-title">Öğrenilecek kelimeler:</div>
        <div class="lesson-preview-words">${wordsList}</div>
      `;
    } else if (lessonIndex === 1) {
      const sentencesList = topic.sentences.map(s => `<div class="preview-sentence-item"><strong>${s.en}</strong>: ${s.tr}</div>`).join('');
      previewHTML = `
        <div class="lesson-preview-title">Örnek cümle kalıpları:</div>
        <div class="preview-sentences-list">${sentencesList}</div>
      `;
    } else if (lessonIndex === 2) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Dinlediğiniz kelimeleri ve cümleleri yazarak işitsel anlama yeteneğinizi geliştirin.</p>
      `;
    } else if (lessonIndex === 3) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">İngilizce metinleri sesli okuyarak telaffuz pratiği yapın ve konuşma becerilerini geliştirin.</p>
      `;
    } else if (lessonIndex === 4) {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Boşluk doldurma, kelime havuzu ve çoktan seçmeli sorularla pratik yapın.</p>
      `;
    } else {
      previewHTML = `
        <div class="lesson-preview-title">Ders Odak Noktası:</div>
        <p style="font-size: 0.8rem; color: var(--text-secondary); margin: 0; line-height: 1.4;">Genel kelime eşleştirme ve dinleme sorularıyla tüm üniteyi tekrar edin.</p>
      `;
    }
  }

  const isCompleted = state.completedLessons.includes(lessonId);

  // Create popover element
  const popover = document.createElement('div');
  popover.className = 'lesson-popover';
  popover.dataset.lessonId = lessonId;
  popover.style.top = `${pxY + 80}px`; // position directly below the node
  popover.style.left = `${pctX}%`;

  const isUnlocked = isLessonUnlocked(lessonId);

  let popoverSubtitleHTML = lesson.subtitle;
  if (unit.id === 1 && lessonIndex < 8) {
    const formulas = [
      { formula: "Adjective + Noun", example: "Analytical data: Analitik veri" },
      { formula: "Noun + Noun", example: "Resource allocation: Kaynak tahsisi" },
      { formula: "Noun + of + Noun", example: "Distribution of income: Gelir dağılımı" },
      { formula: "Adjective + Noun + Noun", example: "Precise analytical data: Hassas analitik veri" },
      { formula: "Present Participle (V-ing) + Noun", example: "Expanding economy: Büyüyen ekonomi" },
      { formula: "Noun + Present Participle (V-ing) + Noun", example: "Economy-stimulating policy: Ekonomiyi canlandıran politika" },
      { formula: "Past Participle (V-ed) + Noun", example: "Stimulated growth: Uyarılmış büyüme" },
      { formula: "Adverb + Past Participle (V-ed) + Noun", example: "Regionally stimulated growth: Bölgesel olarak canlandırılmış büyüme" }
    ];
    const f = formulas[lessonIndex];
    if (f) {
      popoverSubtitleHTML = `${lesson.subtitle}<br><span class="popover-example-translation" style="font-size: 0.8rem; display: block; margin-top: 4px; font-weight: normal; opacity: 0.9; color: var(--text-secondary);">Örnek Çeviri: <strong>${f.example}</strong></span>`;
    }
  }

  popover.innerHTML = `
    <div class="popover-arrow"></div>
    <div class="popover-header">
      <h4 class="popover-title">${lesson.title}</h4>
      <span class="popover-subtitle">${popoverSubtitleHTML}</span>
    </div>
    <div class="popover-body">
      ${previewHTML}
    </div>
    <div class="popover-footer">
      ${isUnlocked ? `
        <button class="btn btn-primary popover-start-btn">
          ${isCompleted ? 'Tekrar Et (+5 Puan)' : 'Dersi Başlat (+10 Puan)'}
        </button>
      ` : `
        <button class="btn btn-primary popover-start-btn" disabled>
          🔒 KİLİTLİ
        </button>
      `}
    </div>
  `;

  if (isUnlocked) {
    popover.querySelector('.popover-start-btn').addEventListener('click', () => {
      popover.remove();
      startLesson(lessonId);
    });
  }

  popover.addEventListener('click', (e) => e.stopPropagation());

  const pathContainer = button.closest('.unit-path-container');
  if (pathContainer) {
    pathContainer.appendChild(popover);
  }
}

// Global listener to close popover on outside click
document.addEventListener('click', () => {
  const popover = document.querySelector('.lesson-popover');
  if (popover) {
    popover.remove();
  }
});

function isLessonUnlocked(lessonId) {
  if (lessonId === 1) return true;

  // Find the lesson and its unit
  const lesson = lessons.find(l => l.id === lessonId);
  if (!lesson) return false;

  const currentUnitId = lesson.unitId;

  // Ensure all lessons of all previous units are fully completed
  if (currentUnitId > 1) {
    for (let uId = 1; uId < currentUnitId; uId++) {
      const prevUnit = units.find(u => u.id === uId);
      if (prevUnit) {
        const allCompleted = prevUnit.lessons.every(lId => state.completedLessons.includes(lId));
        if (!allCompleted) return false;
      }
    }
  }

  // The lesson is only unlocked if the previous lesson is completed
  return state.completedLessons.includes(lessonId - 1);
}

// ============================================================
// BAŞARIMLAR RENDER
// ============================================================
function renderAchievements() {
  const grid = document.getElementById('achievements-grid');
  grid.innerHTML = '';

  achievements.forEach(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    const card = document.createElement('div');
    card.className = `achievement-card ${isUnlocked ? 'unlocked' : 'locked'}`;
    card.innerHTML = `
      <span class="achievement-icon">${ach.icon}</span>
      <div class="achievement-info">
        <span class="achievement-title">${ach.title}</span>
        <span class="achievement-desc">${ach.description}</span>
      </div>
    `;
    grid.appendChild(card);
  });
}

// ============================================================
// QUIZ MOTORU
// ============================================================
function startLesson(lessonId) {
  currentLesson = lessons.find(l => l.id === lessonId);
  if (!currentLesson) return;

  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  heartsAtStart = state.hearts;
  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  // Can kontrolü
  if (state.hearts <= 0) {
    showGameOver();
    return;
  }

  updateQuizUI();
  showScreen('quiz-screen');
  renderQuestion();
}

function updateQuizUI() {
  // İlerleme çubuğu
  const total = isReviewMode ? reviewQuestions.length : currentLesson.questions.length;
  const progress = (currentQuestionIndex / total) * 100;
  document.getElementById('quiz-progress').style.width = `${progress}%`;

  // Can
  document.getElementById('quiz-hearts-count').textContent = state.hearts;
}

function renderQuestion() {
  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentLesson.questions[currentQuestionIndex];
  if (!question) return;

  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  const body = document.getElementById('quiz-body');
  const btnCheck = document.getElementById('btn-check');
  const feedbackPanel = document.getElementById('feedback-panel');

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  updateQuizUI();

  switch (question.type) {
    case 'multiple-choice':
      renderMultipleChoice(body, question);
      break;
    case 'word-bank':
      renderWordBank(body, question);
      break;
    case 'matching':
      renderMatching(body, question);
      break;
    case 'fill-blank-dropdown':
      renderFillBlankDropdown(body, question);
      break;
    case 'fill-blank-text':
      renderFillBlankText(body, question);
      break;
    case 'translation-text':
      renderTranslationText(body, question);
      break;
  }
}

// ── Çoktan Seçmeli ──────────────────────────────────────────
function renderMultipleChoice(container, question) {
  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    ${question.translation ? `<p class="quiz-translation">${question.translation}</p>` : ''}
    <div class="mc-options">
      ${question.options.map((opt, i) => `
        <button class="mc-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>
  `;

  container.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;
      container.querySelectorAll('.mc-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      selectedAnswer = parseInt(btn.dataset.index);
      document.getElementById('btn-check').disabled = false;

      // Seçim yapıldıktan 250ms sonra cevabı otomatik olarak kontrol et
      setTimeout(() => {
        checkAnswer();
      }, 250);
    });
  });
}

// ── Kelime Bankası ──────────────────────────────────────────
function renderWordBank(container, question) {
  const shuffledWords = [...question.words].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <p class="quiz-translation">${question.translation}</p>
    <div class="wb-sentence" id="wb-sentence"></div>
    <div class="wb-bank" id="wb-bank">
      ${shuffledWords.map((w, i) => `
        <button class="wb-word" data-word="${w}" data-idx="${i}">${w}</button>
      `).join('')}
    </div>
  `;

  const sentenceContainer = document.getElementById('wb-sentence');
  const selectedWords = [];

  container.querySelectorAll('.wb-word').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked) return;

      if (btn.classList.contains('in-sentence')) {
        // Cümleden kaldır
        const word = btn.dataset.word;
        const idx = selectedWords.indexOf(word);
        if (idx > -1) selectedWords.splice(idx, 1);
        btn.classList.remove('in-sentence');

        // Orijinal kelimeyi tekrar göster
        const original = container.querySelector(`.wb-word[data-word="${word}"]:not(.in-sentence).used`);
        if (original) original.classList.remove('used');

        updateSentenceDisplay();
        return;
      }

      if (btn.classList.contains('used')) return;

      btn.classList.add('used');
      selectedWords.push(btn.dataset.word);

      // Cümleye ekle
      const sentenceWord = document.createElement('button');
      sentenceWord.className = 'wb-word in-sentence';
      sentenceWord.dataset.word = btn.dataset.word;
      sentenceWord.textContent = btn.dataset.word;
      sentenceWord.addEventListener('click', () => {
        if (isAnswerChecked) return;
        const idx = selectedWords.indexOf(sentenceWord.dataset.word);
        if (idx > -1) selectedWords.splice(idx, 1);
        sentenceWord.remove();
        btn.classList.remove('used');
        updateSentenceDisplay();
      });
      sentenceContainer.appendChild(sentenceWord);

      updateSentenceDisplay();
    });
  });

  function updateSentenceDisplay() {
    sentenceContainer.classList.toggle('has-words', selectedWords.length > 0);
    selectedAnswer = selectedWords.length > 0 ? [...selectedWords] : null;
    document.getElementById('btn-check').disabled = selectedWords.length === 0;
  }
}

// ── Eşleştirme ──────────────────────────────────────────────
function renderMatching(container, question) {
  const shuffledRight = [...question.pairs].sort(() => Math.random() - 0.5);

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="match-grid">
      <span class="match-col-header">Türkçe</span>
      <span class="match-col-header">İngilizce</span>
      ${question.pairs.map((pair, i) => `
        <button class="match-item match-left" data-left="${pair.left}" data-pair-index="${i}">${pair.left}</button>
        <button class="match-item match-right" data-right="${shuffledRight[i].right}">${shuffledRight[i].right}</button>
      `).join('')}
    </div>
  `;

  matchState = {
    pairs: question.pairs,
    selectedLeft: null,
    selectedRight: null,
    matchedCount: 0,
    totalPairs: question.pairs.length,
    wrongAttempts: 0
  };

  container.querySelectorAll('.match-left').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-left').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedLeft = btn.dataset.left;
      tryMatch(container, question);
    });
  });

  container.querySelectorAll('.match-right').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isAnswerChecked || btn.classList.contains('matched')) return;
      container.querySelectorAll('.match-right').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      matchState.selectedRight = btn.dataset.right;
      tryMatch(container, question);
    });
  });
}

function tryMatch(container, question) {
  if (!matchState.selectedLeft || !matchState.selectedRight) return;

  const correctPair = question.pairs.find(p => p.left === matchState.selectedLeft);
  const isCorrectMatch = correctPair && correctPair.right === matchState.selectedRight;

  if (isCorrectMatch) {
    // Doğru eşleşme
    const leftBtn = container.querySelector(`.match-left[data-left="${matchState.selectedLeft}"]`);
    const rightBtn = container.querySelector(`.match-right[data-right="${matchState.selectedRight}"]`);

    leftBtn.classList.remove('selected');
    rightBtn.classList.remove('selected');
    leftBtn.classList.add('matched');
    rightBtn.classList.add('matched');

    matchState.matchedCount++;
  } else {
    // Yanlış eşleşme
    matchState.wrongAttempts++;

    const leftBtn = container.querySelector(`.match-left.selected`);
    const rightBtn = container.querySelector(`.match-right.selected`);

    if (leftBtn) leftBtn.classList.add('wrong-flash');
    if (rightBtn) rightBtn.classList.add('wrong-flash');

    setTimeout(() => {
      if (leftBtn) { leftBtn.classList.remove('selected', 'wrong-flash'); }
      if (rightBtn) { rightBtn.classList.remove('selected', 'wrong-flash'); }
    }, 500);
  }

  matchState.selectedLeft = null;
  matchState.selectedRight = null;

  // Tüm çiftler eşleşti mi?
  if (matchState.matchedCount === matchState.totalPairs) {
    selectedAnswer = matchState.wrongAttempts === 0 ? 'perfect' : 'with-errors';
    // Eşleştirme tamamlandı, otomatik kontrol
    setTimeout(() => {
      checkAnswer();
    }, 400);
  }
}

// ── Boşluk Doldurma - Açılır Menü (Dropdown) ──────────────────
function renderFillBlankDropdown(container, question) {
  const parts = question.sentence.split('___');
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<select class="inline-dropdown" id="fb-dropdown-select">${selectOptions}</select>${parts[1] || ''}
    </div>
  `;

  const selectEl = document.getElementById('fb-dropdown-select');
  selectEl.addEventListener('change', () => {
    if (isAnswerChecked) return;
    selectedAnswer = parseInt(selectEl.value);
    document.getElementById('btn-check').disabled = isNaN(selectedAnswer);
  });
}

// ── Boşluk Doldurma - Serbest Metin (Text) ────────────────────
function renderFillBlankText(container, question) {
  const parts = question.sentence.split('___');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<input type="text" class="inline-text-input" id="fb-text-input" autocomplete="off" placeholder="yazın">${parts[1] || ''}
    </div>
  `;

  const inputEl = document.getElementById('fb-text-input');
  setTimeout(() => inputEl.focus(), 100);

  inputEl.addEventListener('input', () => {
    if (isAnswerChecked) return;
    selectedAnswer = inputEl.value.trim();
    document.getElementById('btn-check').disabled = selectedAnswer.length === 0;
  });
}

// ── Tam Metin Çeviri Testi (Klavyeli Girdi) ──────────────────
function renderTranslationText(container, question) {
  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="translation-input-wrap">
      <textarea class="translation-textarea" id="translation-text-area" placeholder="İngilizce çeviriyi buraya yazın..." autocomplete="off"></textarea>
    </div>
  `;

  const textEl = document.getElementById('translation-text-area');
  setTimeout(() => textEl.focus(), 100);

  textEl.addEventListener('input', () => {
    if (isAnswerChecked) return;
    selectedAnswer = textEl.value.trim();
    document.getElementById('btn-check').disabled = selectedAnswer.length === 0;
  });
}

function checkAnswer() {
  if (isAnswerChecked) return;
  isAnswerChecked = true;

  const question = isReviewMode ? reviewQuestions[currentQuestionIndex] : currentLesson.questions[currentQuestionIndex];
  let isCorrect = false;

  switch (question.type) {
    case 'multiple-choice':
      isCorrect = selectedAnswer === question.correctIndex;
      showMCFeedback(question);
      break;
    case 'word-bank':
      isCorrect = Array.isArray(selectedAnswer) &&
        selectedAnswer.length === question.correctOrder.length &&
        selectedAnswer.every((w, i) => w === question.correctOrder[i]);
      break;
    case 'matching':
      isCorrect = selectedAnswer === 'perfect';
      break;
    case 'fill-blank-dropdown':
      isCorrect = selectedAnswer === question.correctIndex;
      const selectEl = document.getElementById('fb-dropdown-select');
      if (selectEl) {
        selectEl.style.borderColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        selectEl.style.backgroundColor = isCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
        selectEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
      }
      break;
    case 'fill-blank-text':
      {
        const userVal = (selectedAnswer || "").toLowerCase().trim();
        const correctVal = question.correct.toLowerCase().trim();
        isCorrect = userVal === correctVal;
        const inputEl = document.getElementById('fb-text-input');
        if (inputEl) {
          inputEl.style.borderBottomColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          inputEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        }
      }
      break;
    case 'translation-text':
      {
        const cleanUser = (selectedAnswer || "").toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        const cleanCorrect = question.correctSentence.toLowerCase().replace(/[.,\/#!$%\^&\*;:{}=\-_`~()?]/g, "").replace(/\s+/g, " ").trim();
        isCorrect = cleanUser === cleanCorrect;
        const textEl = document.getElementById('translation-text-area');
        if (textEl) {
          textEl.style.borderColor = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
          textEl.style.backgroundColor = isCorrect ? 'var(--color-correct-bg)' : 'var(--color-wrong-bg)';
          textEl.style.color = isCorrect ? 'var(--color-correct)' : 'var(--color-wrong)';
        }
      }
      break;
  }

  // Feedback panel
  const feedbackPanel = document.getElementById('feedback-panel');
  const feedbackIcon = document.getElementById('feedback-icon');
  const feedbackText = document.getElementById('feedback-text');

  feedbackPanel.classList.add('show');

  if (isCorrect) {
    feedbackPanel.classList.add('correct');
    feedbackPanel.classList.remove('wrong');
    feedbackIcon.textContent = '✓';
    feedbackText.textContent = question.explanation || 'Harika! Doğru cevap! 🎉';
    correctCount++;
    state.xp += XP_PER_CORRECT;
    animateStat('stat-xp', 'xp-gain');
    updateDailyTaskProgress('xp', XP_PER_CORRECT);

    // Sorular doğru cevaplandığında sayfanın sağında ve solunda küçük havai fişek patlamaları oluşsun
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.4 },
        scalar: 1.2
      });
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.4 },
        scalar: 1.2
      });
    }
    
    // Remove from wrongQuestions if answered correctly
    const qIndex = state.wrongQuestions.indexOf(question.id);
    if (qIndex > -1) {
      state.wrongQuestions.splice(qIndex, 1);
    }
  } else {
    feedbackPanel.classList.add('wrong');
    feedbackPanel.classList.remove('correct');
    feedbackIcon.textContent = '✗';

    let correctAnswerText = '';
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
      correctAnswerText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctAnswerText = question.correct;
    } else if (question.type === 'translation-text') {
      correctAnswerText = question.correctSentence;
    } else if (question.type === 'word-bank') {
      correctAnswerText = question.correctOrder.join(' ');
    }

    feedbackText.textContent = `Doğru cevap: ${correctAnswerText}`;
    wrongCount++;
    
    if (!isReviewMode) {
      state.hearts = Math.max(0, state.hearts - 1);
      animateStat('stat-hearts', 'heart-lose');
      updateTopBar();
      
      // Add to wrongQuestions for spaced repetition
      if (!state.wrongQuestions.includes(question.id)) {
        state.wrongQuestions.push(question.id);
      }
    }
  }

  saveState();

  const btnCheck = document.getElementById('btn-check');
  btnCheck.textContent = 'DEVAM ET';
  btnCheck.disabled = false;

  if (isCorrect) {
    autoAdvanceTimeout = setTimeout(() => {
      nextQuestion();
    }, 1200);
  }
}

function showMCFeedback(question) {
  const options = document.querySelectorAll('.mc-option');
  options.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.classList.add('correct');
    } else if (idx === selectedAnswer && idx !== question.correctIndex) {
      btn.classList.add('wrong');
    }
  });
}

function showFBFeedback(question) {
  const options = document.querySelectorAll('.fb-option');
  options.forEach(btn => {
    const idx = parseInt(btn.dataset.index);
    if (idx === question.correctIndex) {
      btn.classList.add('selected');
      btn.style.borderColor = 'var(--color-correct)';
      btn.style.background = 'var(--color-correct-bg)';
    } else if (idx === selectedAnswer) {
      btn.style.borderColor = 'var(--color-wrong)';
      btn.style.background = 'var(--color-wrong-bg)';
    }
  });
}

function nextQuestion() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  currentQuestionIndex++;

  // Canlar bitti mi?
  if (!isReviewMode && state.hearts <= 0) {
    showGameOver();
    return;
  }

  // Ders/Tekrar bitti mi?
  const total = isReviewMode ? reviewQuestions.length : currentLesson.questions.length;
  if (currentQuestionIndex >= total) {
    if (isReviewMode) {
      completeReviewSession();
    } else {
      completeLesson();
    }
    return;
  }

  renderQuestion();
}

function completeReviewSession() {
  isReviewMode = false;
  updateDailyTaskProgress('review', 1);
  saveState();
  showToast('Tekrar oturumu tamamlandı! Yanlışlarını pekiştirdin. 🎉', 'success');
  
  updateTopBar();
  renderLessonTree();
  renderAchievements();
  checkReviewBanner();
  showScreen('home-screen');
}

// ============================================================
// DERS TAMAMLAMA
// ============================================================
function completeLesson() {
  // Dersi tamamlanan listesine ekle
  if (!state.completedLessons.includes(currentLesson.id)) {
    state.completedLessons.push(currentLesson.id);
  }

  // Gece kuşu kontrolü
  const hour = new Date().getHours();
  if (hour >= 22 || hour < 6) {
    state.nightOwlTriggered = true;
  }

  // Mükemmeliyetçi kontrolü
  if (wrongCount === 0) {
    state.perfectLessonTriggered = true;
    updateDailyTaskProgress('perfect', 1);
  }

  updateDailyTaskProgress('lessons', 1);

  saveState();

  // Başarım kontrolü
  const newAchievements = checkAchievements();

  // Özet ekranı güncelle
  const total = currentLesson.questions.length;
  const accuracy = Math.round((correctCount / total) * 100);
  const earnedXP = correctCount * XP_PER_CORRECT;

  document.getElementById('summary-lesson-name').textContent = `"${currentLesson.title}" dersini tamamladın!`;
  document.getElementById('summary-xp').textContent = `+${earnedXP}`;
  document.getElementById('summary-accuracy').textContent = `${accuracy}%`;

  // Yeni başarımları göster
  const summaryAch = document.getElementById('summary-achievements');
  const achList = document.getElementById('summary-achievement-list');

  if (newAchievements.length > 0) {
    summaryAch.style.display = 'block';
    achList.innerHTML = newAchievements.map(a =>
      `<span class="summary-achievement-badge">${a.icon} ${a.title}</span>`
    ).join('');
  } else {
    summaryAch.style.display = 'none';
  }

  // Konfeti
  showScreen('summary-screen');
  if (typeof confetti === 'function') {
    setTimeout(() => {
      confetti({
        particleCount: 100,
        spread: 70,
        origin: { y: 0.6 },
        colors: ['#8b6e4e', '#5b8c5a', '#d4a843', '#c9a87c']
      });
    }, 300);
  }
}

// ============================================================
// CAN BİTTİ EKRANI
// ============================================================
function showGameOver() {
  const costEl = document.getElementById('refill-cost');
  costEl.textContent = `(${HEARTS_REFILL_COST} Puan)`;

  const refillBtn = document.getElementById('btn-refill-hearts');
  refillBtn.disabled = state.xp < HEARTS_REFILL_COST;

  if (state.xp < HEARTS_REFILL_COST) {
    refillBtn.style.opacity = '0.5';
    refillBtn.title = `Yeterli puan yok. (${state.xp}/${HEARTS_REFILL_COST})`;
  } else {
    refillBtn.style.opacity = '1';
    refillBtn.title = '';
  }

  showScreen('gameover-screen');
}

// ============================================================
// TEMA DEĞİŞTİRME
// ============================================================
function initTheme() {
  const saved = localStorage.getItem('amok_theme');
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    document.documentElement.setAttribute('data-theme', state.activeTheme);
  } else if (saved === 'dark') {
    document.documentElement.setAttribute('data-theme', 'dark');
    document.getElementById('btn-theme').textContent = '☀️';
  }
}

function toggleTheme() {
  if (['gold', 'canva', 'mint', 'sakura', 'sunset'].includes(state.activeTheme)) {
    state.activeTheme = 'light';
    saveState();
  }
  const isDark = document.documentElement.getAttribute('data-theme') === 'dark';
  if (isDark) {
    document.documentElement.removeAttribute('data-theme');
    localStorage.setItem('amok_theme', 'light');
    document.getElementById('btn-theme').textContent = '🌙';
  } else {
    document.documentElement.setAttribute('data-theme', 'dark');
    localStorage.setItem('amok_theme', 'dark');
    document.getElementById('btn-theme').textContent = '☀️';
  }
  renderStore();
}

// ============================================================
// SEKME YÖNETİMİ
// ============================================================
function switchTab(tabId) {
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.classList.toggle('active', btn.dataset.tab === tabId);
  });
  document.querySelectorAll('.tab-content').forEach(content => {
    content.classList.toggle('active', content.id === `tab-content-${tabId}`);
  });
  if (tabId === 'leaderboard') {
    renderLeaderboard();
  } else if (tabId === 'store') {
    renderStore();
  } else if (tabId === 'profile') {
    renderProfile();
  }
}

// ============================================================
// PROFİL SEKME RENDER
// ============================================================
let activeSocialSubTab = 'following'; // Global tab state for social section

const MOCK_USER_DATABASE = [
  { username: 'John Doe', xp: 600, streak: 15, avatarColor: '#8BB8E8' },
  { username: 'Buse Kaya', xp: 410, streak: 8, avatarColor: '#E8919A' },
  { username: 'Mert Yılmaz', xp: 150, streak: 1, avatarColor: '#F2C078' },
  { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
  { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' },
  { username: 'Deniz Aksu', xp: 720, streak: 25, avatarColor: '#7EC8C8' }
];

function renderProfile() {
  const container = document.querySelector('#tab-content-profile .profile-container');
  if (!container) return;

  const firstLetter = (state.username || 'K').charAt(0).toUpperCase();
  const isGuest = state.isGuest;
  
  // Calculate completed lessons stats
  const completedCount = state.completedLessons.length;
  const totalLessons = lessons.length;
  const progressPercent = Math.round((completedCount / totalLessons) * 100) || 0;

  // Count achievements
  const unlockedCount = state.unlockedAchievements.length;
  const totalAchievements = achievements.length;
  
  // Generate achievements HTML
  const achievementsHTML = achievements.map(ach => {
    const isUnlocked = state.unlockedAchievements.includes(ach.id);
    return `
      <div class="profile-achievement-item ${isUnlocked ? 'unlocked' : 'locked'}">
        <span class="p-ach-icon">${ach.icon}</span>
        <div class="p-ach-info">
          <span class="p-ach-title">${ach.title}</span>
          <span class="p-ach-desc">${ach.description}</span>
        </div>
        ${isUnlocked ? '<span class="p-ach-status">✓</span>' : '<span class="p-ach-status">🔒</span>'}
      </div>
    `;
  }).join('');

  container.innerHTML = `
    <div class="profile-header-card">
      <div class="profile-avatar-wrap">
        <div class="profile-avatar">${firstLetter}</div>
      </div>
      <div class="profile-user-details">
        <h2 class="profile-username">${state.username || 'Kullanıcı'}</h2>
        <span class="profile-role-badge">${isGuest ? 'Misafir Hesap' : 'Kayıtlı Üye'}</span>
      </div>
    </div>

    ${isGuest ? `
      <div class="profile-guest-alert">
        <div class="guest-alert-icon">💡</div>
        <div class="guest-alert-body">
          <h3>İlerlemeni Kaydet!</h3>
          <p>Misafir modunda tarayıcı verileri silindiğinde ilerlemen kaybolabilir. Ücretsiz bir hesap açarak serini ve puanlarını koru!</p>
          <button class="btn btn-primary btn-sm" id="btn-profile-register">Hesap Oluştur / Giriş Yap</button>
        </div>
      </div>
    ` : ''}

    <h3 class="profile-section-title">📊 İstatistiklerin</h3>
    <div class="profile-stats-grid">
      <div class="profile-stat-box">
        <span class="stat-box-icon">🔥</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${state.streak}</span>
          <span class="stat-box-label">Günlük Seri</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">⚡</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${state.xp}</span>
          <span class="stat-box-label">Toplam Puan</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">📚</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${completedCount}/${totalLessons}</span>
          <span class="stat-box-label">Ders İlerlemesi (${progressPercent}%)</span>
        </div>
      </div>
      <div class="profile-stat-box">
        <span class="stat-box-icon">🏆</span>
        <div class="stat-box-values">
          <span class="stat-box-num">${unlockedCount}/${totalAchievements}</span>
          <span class="stat-box-label">Başarımlar</span>
        </div>
      </div>
    </div>

    <h3 class="profile-section-title">🏆 Başarımların İlerlemesi</h3>
    <div class="profile-achievements-list">
      ${achievementsHTML}
    </div>

    <div class="profile-actions-card">
      <h3 class="profile-section-title" style="margin-top: 0;">⚙️ Ayarlar</h3>
      <div class="profile-actions-buttons">
        <button class="btn btn-secondary" id="btn-profile-logout">Çıkış Yap / Hesap Değiştir</button>
        <button class="btn btn-ghost" id="btn-profile-clear" style="color: var(--color-wrong); border-color: var(--color-wrong-border);">İlerlemeyi Sıfırla</button>
      </div>
    </div>
  `;

  // Attach event listeners
  if (isGuest) {
    document.getElementById('btn-profile-register').addEventListener('click', () => {
      logout(); // Will log out and show auth screen
    });
  }

  document.getElementById('btn-profile-logout').addEventListener('click', () => {
    logout();
  });

  document.getElementById('btn-profile-clear').addEventListener('click', () => {
    if (confirm('Tüm ders ilerlemeniz ve puanlarınız kalıcı olarak silinecektir. Emin misiniz?')) {
      state.completedLessons = [];
      state.unlockedAchievements = [];
      state.xp = 0;
      state.streak = 0;
      state.hearts = MAX_HEARTS;
      state.wrongQuestions = [];
      state.streakFreezeBought = false;
      state.dailyTasks = {
        lastResetDate: new Date().toDateString(),
        tasks: getInitialDailyTasks()
      };
      state.following = [
        { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
        { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' }
      ];
      state.followers = [
        { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
        { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
        { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
        { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
      ];
      saveState();
      showToast('Tüm verileriniz sıfırlandı!', 'info');
      enterApp();
      switchTab('profile');
    }
  });
}

function initSocialSystem() {
  const subtabFollowing = document.getElementById('subtab-following');
  const subtabFollowers = document.getElementById('subtab-followers');
  const searchInput = document.getElementById('social-search-input');
  const searchClear = document.getElementById('social-search-clear');
  const searchBtn = document.getElementById('btn-social-search');

  // Tab switching
  subtabFollowing.addEventListener('click', () => {
    activeSocialSubTab = 'following';
    subtabFollowing.classList.add('active');
    subtabFollowers.classList.remove('active');
    renderSocialList();
  });

  subtabFollowers.addEventListener('click', () => {
    activeSocialSubTab = 'followers';
    subtabFollowers.classList.add('active');
    subtabFollowing.classList.remove('active');
    renderSocialList();
  });

  // Search input events
  searchInput.addEventListener('input', () => {
    searchClear.style.display = searchInput.value.trim().length > 0 ? 'block' : 'none';
  });

  searchClear.addEventListener('click', () => {
    searchInput.value = '';
    searchClear.style.display = 'none';
    document.getElementById('social-search-results').style.display = 'none';
    searchInput.focus();
  });

  // Search button
  searchBtn.addEventListener('click', () => {
    searchSocialUsers();
  });

  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      searchSocialUsers();
    }
  });

  // Initial render
  renderSocialList();
}

function renderSocialList() {
  const contentEl = document.getElementById('social-list-content');
  if (!contentEl) return;

  // Update tabs numbers
  const tabFollowing = document.getElementById('subtab-following');
  if (tabFollowing) tabFollowing.textContent = `Takip Ettiklerim (${state.following.length})`;
  
  const tabFollowers = document.getElementById('subtab-followers');
  if (tabFollowers) tabFollowers.textContent = `Takipçilerim (${state.followers.length})`;

  const currentList = activeSocialSubTab === 'following' ? state.following : state.followers;

  if (currentList.length === 0) {
    contentEl.innerHTML = `
      <div class="social-empty-state">
        ${activeSocialSubTab === 'following' ? 'Henüz kimseyi takip etmiyorsun. Yukarıdan arkadaş arayabilirsin!' : 'Sizi henüz kimse takip etmiyor.'}
      </div>
    `;
    return;
  }

  contentEl.innerHTML = currentList.map(user => {
    const letter = user.username.charAt(0).toUpperCase();
    const isFollowing = state.following.some(u => u.username === user.username);
    
    let actionBtn = '';
    if (activeSocialSubTab === 'following') {
      actionBtn = `
        <div class="social-action-buttons">
          <button class="social-btn social-kudos-btn" onclick="congratulateFriend('${user.username}')" title="Tebrik Et">👏</button>
          <button class="social-btn social-unfollow-btn" onclick="toggleFollowUser('${user.username}', false)">Takipten Çık</button>
        </div>
      `;
    } else {
      // Followers tab
      actionBtn = isFollowing 
        ? `<span class="social-status-text">Takip Ediliyor</span>`
        : `<button class="social-btn social-follow-btn" onclick="toggleFollowUser('${user.username}', true)">Geri Takip Et</button>`;
    }

    return `
      <div class="friend-card">
        <div class="friend-avatar" style="background-color: ${user.avatarColor || '#7EC8C8'}">${letter}</div>
        <div class="friend-details">
          <span class="friend-name">${user.username}</span>
          <div class="friend-meta">
            <span class="friend-stat">⚡ ${user.xp} Puan</span>
            ${user.streak > 0 ? `<span class="friend-stat">🔥 ${user.streak} Gün</span>` : ''}
          </div>
        </div>
        ${actionBtn}
      </div>
    `;
  }).join('');
}

function searchSocialUsers() {
  const input = document.getElementById('social-search-input');
  const resultsEl = document.getElementById('social-search-results');
  if (!input || !resultsEl) return;

  const query = input.value.trim().toLowerCase();
  if (query.length === 0) {
    resultsEl.style.display = 'none';
    return;
  }

  // Combine mock database and existing leaderboard to search
  const allSearchable = [
    ...MOCK_USER_DATABASE,
    { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
    { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
    { username: 'Can Kaya', xp: 210, streak: 0, avatarColor: '#F2A871' },
    { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
    { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
  ];

  // Remove duplicates and self
  const uniqueUsers = [];
  const names = new Set();
  
  allSearchable.forEach(u => {
    if (u.username !== state.username && !names.has(u.username)) {
      names.add(u.username);
      uniqueUsers.push(u);
    }
  });

  const matches = uniqueUsers.filter(u => u.username.toLowerCase().includes(query));

  if (matches.length === 0) {
    resultsEl.innerHTML = `<div class="search-no-results">Kullanıcı bulunamadı.</div>`;
    resultsEl.style.display = 'block';
    return;
  }

  resultsEl.innerHTML = `
    <div class="search-results-header">Arama Sonuçları</div>
    <div class="search-results-list">
      ${matches.map(user => {
        const letter = user.username.charAt(0).toUpperCase();
        const isFollowing = state.following.some(u => u.username === user.username);
        
        const btnText = isFollowing ? 'Takipten Çık' : 'Takip Et';
        const btnClass = isFollowing ? 'social-unfollow-btn' : 'social-follow-btn';
        
        return `
          <div class="search-result-card">
            <div class="friend-avatar small" style="background-color: ${user.avatarColor || '#7EC8C8'}">${letter}</div>
            <div class="search-result-details">
              <span class="search-result-name">${user.username}</span>
              <span class="search-result-xp">⚡ ${user.xp} Puan</span>
            </div>
            <button class="social-btn ${btnClass}" onclick="toggleFollowUser('${user.username}', ${!isFollowing})">${btnText}</button>
          </div>
        `;
      }).join('')}
    </div>
  `;
  resultsEl.style.display = 'block';
}

function toggleFollowUser(username, isFollowing) {
  if (!state.following) {
    state.following = [];
  }

  if (isFollowing) {
    // Follow
    const allSearchable = [
      ...MOCK_USER_DATABASE,
      { username: 'Ahmet Yılmaz', xp: 450, streak: 5, avatarColor: '#E88A9A' },
      { username: 'Elif Demir', xp: 320, streak: 3, avatarColor: '#B4A7D6' },
      { username: 'Can Kaya', xp: 210, streak: 0, avatarColor: '#F2A871' },
      { username: 'Sarah Connor', xp: 180, streak: 12, avatarColor: '#8BC6A0' },
      { username: 'Melis Şen', xp: 90, streak: 2, avatarColor: '#E8CB6E' }
    ];
    
    const userToFollow = allSearchable.find(u => u.username === username);
    if (userToFollow && !state.following.some(u => u.username === username)) {
      state.following.push(userToFollow);
      showToast(`${username} takip edilmeye başlandı! 👤`, 'success');
      updateDailyTaskProgress('shop', 0); // triggers daily check just in case
    }
  } else {
    // Unfollow
    const idx = state.following.findIndex(u => u.username === username);
    if (idx > -1) {
      state.following.splice(idx, 1);
      showToast(`${username} takipten çıkarıldı.`, 'info');
    }
  }

  saveState();
  
  // Re-render the search panel if active
  const searchInput = document.getElementById('social-search-input');
  if (searchInput && searchInput.value.trim().length > 0) {
    searchSocialUsers();
  }

  // Update tabs numbers
  const tabFollowing = document.getElementById('subtab-following');
  if (tabFollowing) tabFollowing.textContent = `Takip Ettiklerim (${state.following.length})`;
  
  const tabFollowers = document.getElementById('subtab-followers');
  if (tabFollowers) tabFollowers.textContent = `Takipçilerim (${state.followers.length})`;

  // Re-render lists
  renderSocialList();
}

function congratulateFriend(username) {
  showToast(`${username} tebrik edildi! 👏👏`, 'success');
  if (typeof confetti === 'function') {
    confetti({
      particleCount: 40,
      spread: 60,
      origin: { y: 0.8 }
    });
  }
}

// ============================================================
// LİDERLİK TABLOSU
// ============================================================
function renderLeaderboard() {
  const list = document.getElementById('leaderboard-list');
  if (!list) return;

  const baseCompetitors = [
    { name: "Ahmet Yılmaz", xp: 450 },
    { name: "Elif Demir", xp: 320 },
    { name: "Can Kaya", xp: 210 },
    { name: "Sarah Connor", xp: 180 },
    { name: "Melis Şen", xp: 90 }
  ];

  const competitors = [
    ...baseCompetitors,
    { name: (state.username || 'Misafir') + " (Sen)", xp: state.xp, isUser: true }
  ];

  competitors.sort((a, b) => b.xp - a.xp);

  list.innerHTML = competitors.map((c, index) => {
    const rank = index + 1;
    let rankClass = `rank-${rank}`;
    if (rank > 3) rankClass = 'rank-other';

    return `
      <tr class="leaderboard-row ${c.isUser ? 'user-row' : ''} ${rankClass}">
        <td><span class="rank-badge">${rank}</span></td>
        <td>${c.name}</td>
        <td>${c.xp} Puan</td>
      </tr>
    `;
  }).join('');
}

// ============================================================
// SANAL MAĞAZA İŞLEMLERİ
// ============================================================
function buyStoreItem(item, price) {
  const xpBefore = state.xp;
  if (state.xp < price) {
    showToast('Yeterli puan yok!', 'error');
    return;
  }

  if (item === 'hearts') {
    if (state.hearts >= MAX_HEARTS) {
      showToast('Canların zaten dolu!', 'warning');
      return;
    }
    state.hearts = MAX_HEARTS;
    state.xp -= price;
    showToast('Canların yenilendi! ❤️', 'success');
  } else if (item === 'streak-freeze') {
    if (state.streakFreezeBought) {
      showToast('Zaten bir adet Seri Dondurucun var!', 'warning');
      return;
    }
    state.streakFreezeBought = true;
    state.xp -= price;
    showToast('Seri Dondurucu satın alındı! ❄️', 'success');
  } else if (item === 'gold-theme') {
    if (state.activeTheme === 'gold') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Altın tema kapatıldı.', 'info');
    } else {
      state.activeTheme = 'gold';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'gold');
      showToast('Altın tema aktif edildi! 👑', 'success');
    }
  } else if (item === 'canva-theme') {
    if (state.activeTheme === 'canva') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Canva teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'canva';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'canva');
      showToast('Canva teması aktif edildi! 🎨', 'success');
    }
  } else if (item === 'mint-theme') {
    if (state.activeTheme === 'mint') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Mint teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'mint';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'mint');
      showToast('Pastel Mint teması aktif edildi! 🌿', 'success');
    }
  } else if (item === 'sakura-theme') {
    if (state.activeTheme === 'sakura') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Sakura teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'sakura';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'sakura');
      showToast('Pastel Sakura teması aktif edildi! 🌸', 'success');
    }
  } else if (item === 'sunset-theme') {
    if (state.activeTheme === 'sunset') {
      state.activeTheme = 'light';
      document.documentElement.removeAttribute('data-theme');
      showToast('Pastel Sunset teması kapatıldı.', 'info');
    } else {
      state.activeTheme = 'sunset';
      state.xp -= price;
      document.documentElement.setAttribute('data-theme', 'sunset');
      showToast('Pastel Sunset teması aktif edildi! 🌅', 'success');
    }
  }

  if (state.xp < xpBefore) {
    updateDailyTaskProgress('shop', 1);
  }

  saveState();
  updateTopBar();
  renderStore();
}

function renderStore() {
  const goldThemeBtn = document.getElementById('buy-gold-theme-btn');
  if (goldThemeBtn) {
    if (state.activeTheme === 'gold') {
      goldThemeBtn.textContent = 'Aktif (Kapat)';
      goldThemeBtn.classList.remove('btn-primary');
      goldThemeBtn.classList.add('btn-secondary');
    } else {
      goldThemeBtn.textContent = '200 Puan';
      goldThemeBtn.classList.add('btn-primary');
      goldThemeBtn.classList.remove('btn-secondary');
    }
  }

  const canvaThemeBtn = document.getElementById('buy-canva-theme-btn');
  if (canvaThemeBtn) {
    if (state.activeTheme === 'canva') {
      canvaThemeBtn.textContent = 'Aktif (Kapat)';
      canvaThemeBtn.classList.remove('btn-primary');
      canvaThemeBtn.classList.add('btn-secondary');
    } else {
      canvaThemeBtn.textContent = '150 Puan';
      canvaThemeBtn.classList.add('btn-primary');
      canvaThemeBtn.classList.remove('btn-secondary');
    }
  }

  const mintThemeBtn = document.getElementById('buy-mint-theme-btn');
  if (mintThemeBtn) {
    if (state.activeTheme === 'mint') {
      mintThemeBtn.textContent = 'Aktif (Kapat)';
      mintThemeBtn.classList.remove('btn-primary');
      mintThemeBtn.classList.add('btn-secondary');
    } else {
      mintThemeBtn.textContent = '100 Puan';
      mintThemeBtn.classList.add('btn-primary');
      mintThemeBtn.classList.remove('btn-secondary');
    }
  }

  const sakuraThemeBtn = document.getElementById('buy-sakura-theme-btn');
  if (sakuraThemeBtn) {
    if (state.activeTheme === 'sakura') {
      sakuraThemeBtn.textContent = 'Aktif (Kapat)';
      sakuraThemeBtn.classList.remove('btn-primary');
      sakuraThemeBtn.classList.add('btn-secondary');
    } else {
      sakuraThemeBtn.textContent = '120 Puan';
      sakuraThemeBtn.classList.add('btn-primary');
      sakuraThemeBtn.classList.remove('btn-secondary');
    }
  }

  const sunsetThemeBtn = document.getElementById('buy-sunset-theme-btn');
  if (sunsetThemeBtn) {
    if (state.activeTheme === 'sunset') {
      sunsetThemeBtn.textContent = 'Aktif (Kapat)';
      sunsetThemeBtn.classList.remove('btn-primary');
      sunsetThemeBtn.classList.add('btn-secondary');
    } else {
      sunsetThemeBtn.textContent = '130 Puan';
      sunsetThemeBtn.classList.add('btn-primary');
      sunsetThemeBtn.classList.remove('btn-secondary');
    }
  }

  const freezeBtn = document.getElementById('buy-streak-freeze-btn');
  if (freezeBtn) {
    if (state.streakFreezeBought) {
      freezeBtn.textContent = 'Satın Alındı';
      freezeBtn.disabled = true;
      freezeBtn.style.opacity = '0.5';
    } else {
      freezeBtn.textContent = '100 Puan';
      freezeBtn.disabled = false;
      freezeBtn.style.opacity = '1';
    }
  }
}

// ============================================================
// EVENT LİSTENERLER
// ============================================================
function initEventListeners() {
  // Tema
  document.getElementById('btn-theme').addEventListener('click', toggleTheme);

  // Kullanıcı menüsü
  document.getElementById('btn-user-menu').addEventListener('click', (e) => {
    e.stopPropagation();
    document.getElementById('user-dropdown').classList.toggle('open');
  });

  document.addEventListener('click', () => {
    document.getElementById('user-dropdown').classList.remove('open');
  });

  // Çıkış
  document.getElementById('btn-logout').addEventListener('click', logout);

  // Giriş Yap butonu (Üst Bar)
  const loginTopbarBtn = document.getElementById('btn-login-topbar');
  if (loginTopbarBtn) {
    loginTopbarBtn.addEventListener('click', () => {
      showScreen('auth-screen');
    });
  }

  // Quiz kapatma
  document.getElementById('quiz-close').addEventListener('click', () => {
    if (confirm('Dersten çıkmak istediğine emin misin? İlerleme kaybedilecek.')) {
      updateTopBar();
      renderLessonTree();
      renderAchievements();
      showScreen('home-screen');
    }
  });

  // Kontrol Et / Devam Et butonu
  document.getElementById('btn-check').addEventListener('click', () => {
    if (!isAnswerChecked) {
      checkAnswer();
    } else {
      nextQuestion();
    }
  });

  // Özet ekranı devam
  document.getElementById('btn-summary-continue').addEventListener('click', () => {
    updateTopBar();
    renderLessonTree();
    renderAchievements();
    showScreen('home-screen');
  });

  // Can Bitti ekranı butonları
  document.getElementById('btn-refill-hearts').addEventListener('click', () => {
    if (state.xp >= HEARTS_REFILL_COST) {
      state.xp -= HEARTS_REFILL_COST;
      state.hearts = MAX_HEARTS;
      state.warriorTriggered = true;
      saveState();
      checkAchievements();
      updateTopBar();
      showToast('Canlar dolduruldu! ❤️', 'success');

      // Derse geri dön
      if (currentLesson) {
        updateQuizUI();
        showScreen('quiz-screen');
        renderQuestion();
      } else {
        renderLessonTree();
        renderAchievements();
        showScreen('home-screen');
      }
    } else {
      showToast('Yeterli puan yok!', 'error');
    }
  });

  document.getElementById('btn-restart-lesson').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    saveState();
    updateTopBar();
    if (currentLesson) {
      startLesson(currentLesson.id);
    }
  });

  document.getElementById('btn-go-home').addEventListener('click', () => {
    state.hearts = MAX_HEARTS;
    saveState();
    updateTopBar();
    renderLessonTree();
    renderAchievements();
    showScreen('home-screen');
  });

  // Sekmeler (Nav Tabs)
  document.querySelectorAll('.nav-tab').forEach(btn => {
    btn.addEventListener('click', () => {
      switchTab(btn.dataset.tab);
    });
  });

  // Mağaza Satın Alma Butonları
  document.getElementById('buy-hearts-btn').addEventListener('click', () => buyStoreItem('hearts', 50));
  document.getElementById('buy-streak-freeze-btn').addEventListener('click', () => buyStoreItem('streak-freeze', 100));
  document.getElementById('buy-gold-theme-btn').addEventListener('click', () => buyStoreItem('gold-theme', 200));
  document.getElementById('buy-canva-theme-btn').addEventListener('click', () => buyStoreItem('canva-theme', 150));
  document.getElementById('buy-mint-theme-btn').addEventListener('click', () => buyStoreItem('mint-theme', 100));
  document.getElementById('buy-sakura-theme-btn').addEventListener('click', () => buyStoreItem('sakura-theme', 120));
  document.getElementById('buy-sunset-theme-btn').addEventListener('click', () => buyStoreItem('sunset-theme', 130));

  // Seviye Belirleme Sınavı
  const startPlacementBtn = document.getElementById('btn-start-placement');
  if (startPlacementBtn) {
    startPlacementBtn.addEventListener('click', () => {
      startPlacementTest();
    });
  }

  const placementCloseBtn = document.getElementById('placement-close');
  if (placementCloseBtn) {
    placementCloseBtn.addEventListener('click', () => {
      if (confirm('Sınavdan çıkmak istediğinize emin misiniz? Seviyeniz kaydedilmeyecek.')) {
        isPlacementMode = false;
        showScreen('home-screen');
      }
    });
  }

  const btnPlacementCheck = document.getElementById('btn-placement-check');
  if (btnPlacementCheck) {
    btnPlacementCheck.addEventListener('click', () => {
      if (!isPlacementAnswerChecked) {
        checkPlacementAnswer();
      } else {
        nextPlacementQuestion();
      }
    });
  }

  // Hızlı Tekrar
  const startReviewBtn = document.getElementById('btn-start-review');
  if (startReviewBtn) {
    startReviewBtn.addEventListener('click', () => {
      startReviewMode();
    });
  }

  // Klavye Kısayolları (Quiz ve Placement ekranları için)
  document.addEventListener('keydown', (e) => {
    // Eğer kullanıcı bir metin kutusuna veya alana yazıyorsa kısayolları engelle
    if (document.activeElement && (document.activeElement.tagName === 'INPUT' || document.activeElement.tagName === 'TEXTAREA')) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        return; // Sayı yazmasına izin ver
      }
      if (e.key === 'Enter') {
        // Textarea içinde Enter satır atlamalı, input içindeyse kontrol butonu tıklanabilir
        if (document.activeElement.tagName === 'INPUT') {
          const checkBtn = document.getElementById('btn-check') || document.getElementById('btn-placement-check');
          if (checkBtn && !checkBtn.disabled) {
            checkBtn.click();
            e.preventDefault();
          }
        }
        return;
      }
    }

    const quizScreen = document.getElementById('quiz-screen');
    const placementScreen = document.getElementById('placement-screen');
    const summaryScreen = document.getElementById('summary-screen');

    if (quizScreen && quizScreen.classList.contains('active')) {
      // 1, 2, 3, 4 seçimi
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        // MC options
        const mcOpts = quizScreen.querySelectorAll('.mc-option');
        if (mcOpts.length > idx) {
          mcOpts[idx].click();
          return;
        }
        // Fill blank options
        const fbOpts = quizScreen.querySelectorAll('.fb-option');
        if (fbOpts.length > idx) {
          fbOpts[idx].click();
          return;
        }
      }
      // Enter: Kontrol Et / Devam Et
      if (e.key === 'Enter') {
        const checkBtn = document.getElementById('btn-check');
        if (checkBtn && !checkBtn.disabled) {
          checkBtn.click();
          e.preventDefault();
        }
      }
    } else if (placementScreen && placementScreen.classList.contains('active')) {
      if (['1', '2', '3', '4'].includes(e.key)) {
        const idx = parseInt(e.key) - 1;
        const mcOpts = placementScreen.querySelectorAll('.mc-option');
        if (mcOpts.length > idx) {
          mcOpts[idx].click();
          return;
        }
        const fbOpts = placementScreen.querySelectorAll('.fb-option');
        if (fbOpts.length > idx) {
          fbOpts[idx].click();
          return;
        }
      }
      if (e.key === 'Enter') {
        const checkBtn = document.getElementById('btn-placement-check');
        if (checkBtn && !checkBtn.disabled) {
          checkBtn.click();
          e.preventDefault();
        }
      }
    } else if (summaryScreen && summaryScreen.classList.contains('active')) {
      if (e.key === 'Enter') {
        const summaryContinue = document.getElementById('btn-summary-continue');
        if (summaryContinue) {
          summaryContinue.click();
          e.preventDefault();
        }
      }
    }
  });
}

// ============================================================
// SEVİYE BELİRLEME SINAVI (PLACEMENT TEST)
// ============================================================
let placementCorrectCount = 0;
let placementCurrentIndex = 0;
let placementSelectedAnswer = null;
let isPlacementAnswerChecked = false;

function checkPlacementBanner() {
  const banner = document.getElementById('placement-banner');
  if (banner) {
    if (!state.placementTaken) {
      banner.style.display = 'flex';
    } else {
      banner.style.display = 'none';
    }
  }
}

function startPlacementTest() {
  isPlacementMode = true;
  placementCorrectCount = 0;
  placementCurrentIndex = 0;
  placementSelectedAnswer = null;
  isPlacementAnswerChecked = false;
  placementQuestionsList = placementQuestions;

  showScreen('placement-screen');
  renderPlacementQuestion();
}

function renderPlacementQuestion() {
  const question = placementQuestionsList[placementCurrentIndex];
  if (!question) return;

  placementSelectedAnswer = null;
  isPlacementAnswerChecked = false;

  const body = document.getElementById('placement-body');
  const btnCheck = document.getElementById('btn-placement-check');
  const feedbackPanel = document.getElementById('placement-feedback-panel');

  feedbackPanel.classList.remove('show', 'correct', 'wrong');
  btnCheck.disabled = true;
  btnCheck.textContent = 'KONTROL ET';

  // İlerleme çubuğu
  const total = placementQuestionsList.length;
  const progress = (placementCurrentIndex / total) * 100;
  document.getElementById('placement-progress').style.width = `${progress}%`;

  switch (question.type) {
    case 'multiple-choice':
      renderPlacementMultipleChoice(body, question);
      break;
    case 'fill-blank-dropdown':
      renderPlacementFillBlankDropdown(body, question);
      break;
    case 'fill-blank-text':
      renderPlacementFillBlankText(body, question);
      break;
  }
}

function renderPlacementMultipleChoice(container, question) {
  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div class="mc-options">
      ${question.options.map((opt, i) => `
        <button class="mc-option" data-index="${i}">${opt}</button>
      `).join('')}
    </div>
  `;
  container.querySelectorAll('.mc-option').forEach(btn => {
    btn.addEventListener('click', () => {
      if (isPlacementAnswerChecked) return;
      container.querySelectorAll('.mc-option').forEach(b => b.classList.remove('selected'));
      btn.classList.add('selected');
      placementSelectedAnswer = parseInt(btn.dataset.index);
      document.getElementById('btn-placement-check').disabled = false;
    });
  });
}

function renderPlacementFillBlankDropdown(container, question) {
  const parts = question.sentence.split('___');
  const selectOptions = `<option value="" disabled selected>Seçin...</option>` +
    question.options.map((opt, i) => `<option value="${i}">${opt}</option>`).join('');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<select class="inline-dropdown" id="fb-placement-dropdown-select">${selectOptions}</select>${parts[1] || ''}
    </div>
  `;

  const selectEl = document.getElementById('fb-placement-dropdown-select');
  selectEl.addEventListener('change', () => {
    if (isPlacementAnswerChecked) return;
    placementSelectedAnswer = parseInt(selectEl.value);
    document.getElementById('btn-placement-check').disabled = isNaN(placementSelectedAnswer);
  });
}

function renderPlacementFillBlankText(container, question) {
  const parts = question.sentence.split('___');

  container.innerHTML = `
    <p class="quiz-prompt">${question.prompt}</p>
    <div style="font-size: 1.25rem; font-weight: 500; text-align: center; margin: 24px 0; color: var(--text-primary);">
      ${parts[0]}<input type="text" class="inline-text-input" id="fb-placement-text-input" autocomplete="off" placeholder="yazın">${parts[1] || ''}
    </div>
  `;

  const inputEl = document.getElementById('fb-placement-text-input');
  setTimeout(() => inputEl.focus(), 100);

  inputEl.addEventListener('input', () => {
    if (isPlacementAnswerChecked) return;
    placementSelectedAnswer = inputEl.value.trim();
    document.getElementById('btn-placement-check').disabled = placementSelectedAnswer.length === 0;
  });
}

function checkPlacementAnswer() {
  const question = placementQuestionsList[placementCurrentIndex];
  isPlacementAnswerChecked = true;

  let isCorrect = false;
  if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
    isCorrect = placementSelectedAnswer === question.correctIndex;
  } else if (question.type === 'fill-blank-text') {
    const userVal = (placementSelectedAnswer || "").toLowerCase().trim();
    const correctVal = question.correct.toLowerCase().trim();
    isCorrect = userVal === correctVal;
  }

  const panel = document.getElementById('placement-feedback-panel');
  const icon = document.getElementById('placement-feedback-icon');
  const text = document.getElementById('placement-feedback-text');

  panel.classList.add('show');
  if (isCorrect) {
    panel.classList.add('correct');
    panel.classList.remove('wrong');
    icon.textContent = '✓';
    text.textContent = 'Doğru! Tebrikler.';
    placementCorrectCount++;

    // Sorular doğru cevaplandığında sayfanın sağında ve solunda küçük havai fişek patlamaları oluşsun
    if (typeof confetti === 'function') {
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.2, y: 0.4 },
        scalar: 1.2
      });
      confetti({
        particleCount: 65,
        spread: 360,
        startVelocity: 35,
        origin: { x: 0.8, y: 0.4 },
        scalar: 1.2
      });
    }
  } else {
    panel.classList.add('wrong');
    panel.classList.remove('correct');
    icon.textContent = '✗';
    let correctText = '';
    if (question.type === 'multiple-choice' || question.type === 'fill-blank-dropdown') {
      correctText = question.options[question.correctIndex];
    } else if (question.type === 'fill-blank-text') {
      correctText = question.correct;
    }
    text.textContent = `Yanlış. Doğru cevap: "${correctText}"`;
  }

  const btnCheck = document.getElementById('btn-placement-check');
  btnCheck.textContent = 'DEVAM ET';

  if (isCorrect) {
    autoAdvanceTimeout = setTimeout(() => {
      nextPlacementQuestion();
    }, 1200);
  }
}

function nextPlacementQuestion() {
  if (autoAdvanceTimeout) {
    clearTimeout(autoAdvanceTimeout);
    autoAdvanceTimeout = null;
  }
  placementCurrentIndex++;
  if (placementCurrentIndex >= placementQuestionsList.length) {
    completePlacementTest();
  } else {
    renderPlacementQuestion();
  }
}

function completePlacementTest() {
  state.placementTaken = true;

  let feedbackMsg = '';
  if (placementCorrectCount <= 2) {
    feedbackMsg = `Seviye Sınavı Tamamlandı! ${placementCorrectCount}/5 doğru yaptın. 1. Bölümden (Temel Seviye) başlaman uygun görüldü.`;
  } else if (placementCorrectCount <= 4) {
    // Unlock Unit 1 lessons (1 to 8)
    state.completedLessons = [1, 2, 3, 4, 5, 6, 7, 8];
    feedbackMsg = `Tebrikler! ${placementCorrectCount}/5 doğru yaptın. 1. Bölümü başarıyla atladın! Doğrudan 2. Bölümden başlayabilirsin.`;
  } else {
    // Unlock all lessons
    state.completedLessons = lessons.map(l => l.id);
    feedbackMsg = `Mükemmel! 5/5 doğru yaptın. Tüm seviyelerin kilidi açıldı, dilediğin konudan başlayabilirsin!`;
  }

  saveState();
  isPlacementMode = false;

  showToast('Seviyeniz başarıyla belirlendi!', 'success');
  alert(feedbackMsg);
  enterApp();
}

// ============================================================
// AKILLI TEKRAR (SPACED REPETITION) BANNER & REVIEW ENGINE
// ============================================================
function checkReviewBanner() {
  const banner = document.getElementById('review-banner');
  const btn = document.getElementById('btn-start-review');
  if (banner && btn) {
    if (state.wrongQuestions && state.wrongQuestions.length > 0) {
      banner.style.display = 'flex';
      btn.textContent = `Hızlı Tekrar (${state.wrongQuestions.length} Soru)`;
    } else {
      banner.style.display = 'none';
    }
  }
}

function startReviewMode() {
  if (!state.wrongQuestions || state.wrongQuestions.length === 0) return;

  isReviewMode = true;
  currentQuestionIndex = 0;
  correctCount = 0;
  wrongCount = 0;
  selectedAnswer = null;
  isAnswerChecked = false;
  matchState = null;

  // Hata yapılan soruları veritabanından çek
  reviewQuestions = [];
  state.wrongQuestions.forEach(qId => {
    lessons.forEach(l => {
      const q = l.questions.find(quest => quest.id === qId);
      if (q) reviewQuestions.push(q);
    });
  });

  if (reviewQuestions.length === 0) {
    isReviewMode = false;
    showToast('Tekrar edilecek soru bulunamadı.', 'info');
    return;
  }

  showScreen('quiz-screen');
  renderQuestion();
}

// ============================================================
// WEB NOTIFICATION BİLDİRİMLERİ
// ============================================================
function initNotifications() {
  // Bildirim izni istemi kaldırıldı.
}

// ============================================================
// BAŞLATMA
// ============================================================
function init() {
  initTheme();
  loadState();
  initAuth();
  initEventListeners();

  // Eğer giriş yapılmamışsa varsayılan olarak misafir moduna al
  if (!state.username) {
    state.username = 'Misafir';
    state.isGuest = true;
    saveState();
  }
  initSocialSystem();
  enterApp();
  initNotifications();
}

// DOM yüklendiğinde başlat
document.addEventListener('DOMContentLoaded', init);
