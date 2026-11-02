const availableIngredients = ['🥩 Köfte', '🧀 Peynir', '🥬 Marul', '🍅 Domates'];

let currentOrder = [];
let playerPlate = [];
let score = 0;
let timeLeft = 30;
let timerInterval;

// Oyunu Başlat
function startGame() {
  score = 0;
  timeLeft = 30;
  document.getElementById('score').innerText = score;
  document.getElementById('timer').innerText = timeLeft;
  
  generateNewOrder();
  
  clearInterval(timerInterval);
  timerInterval = setInterval(() => {
    timeLeft--;
    document.getElementById('timer').innerText = timeLeft;
    if (timeLeft <= 0) {
      clearInterval(timerInterval);
      alert(`Süre Bitti! Toplam Skorun: ${score}`);
      startGame();
    }
  }, 1000);
}

// Rastgele Sipariş Üretme
function generateNewOrder() {
  currentOrder = ['🍞 Alt Ekmek'];
  
  // 2 ile 4 arası rastgele malzeme seç
  const count = Math.floor(Math.random() * 3) + 2;
  for (let i = 0; i < count; i++) {
    const randomItem = availableIngredients[Math.floor(Math.random() * availableIngredients.length)];
    currentOrder.push(randomItem);
  }
  
  currentOrder.push('🍞 Üst Ekmek');
  
  // Ekrana Siparişi Yazma
  const targetDiv = document.getElementById('targetOrder');
  targetDiv.innerHTML = currentOrder.map(item => `<span>${item}</span>`).join(' ➔ ');
  
  resetPlate();
}

// Tabağa Malzeme Ekleme
function addIngredient(item) {
  playerPlate.push(item);
  renderPlate();
}

// Tabağı Temizleme
function resetPlate() {
  playerPlate = [];
  renderPlate();
}

// Tabağı Ekrana Çizme
function renderPlate() {
  const plateDiv = document.getElementById('burgerPlate');
  plateDiv.innerHTML = '';
  playerPlate.forEach(item => {
    const div = document.createElement('div');
    div.className = 'ingredient-item';
    div.innerText = item;
    plateDiv.appendChild(div);
  });
}

// Siparişi Kontrol Etme
function checkBurger() {
  if (JSON.stringify(playerPlate) === JSON.stringify(currentOrder)) {
    score += 10;
    document.getElementById('score').innerText = score;
    alert('Tebrikler! Doğru Sipariş +10 Puan 🎉');
    generateNewOrder();
  } else {
    alert('Yanlış tarif veya sıralama! Tekrar dene ❌');
  }
}

// Sayfa yüklendiğinde oyunu başlat
window.onload = startGame;
