document.addEventListener('DOMContentLoaded', function () {
  const CARDS = document.querySelectorAll('.memory__card');
  console.log(CARDS);   

  let hasFlippedCard = false;
  let lockBoard = false;
  let firstCard, secondCard;  

  function flipCard() {
    if (lockBoard) return;
    if (this === firstCard) return;

    this.classList.add('flip');

    if (!hasFlippedCard) {
      hasFlippedCard = true;
      firstCard = this;
      return;
    }

    secondCard = this;    

    checkForMatch();    
        
  }

  function checkForMatch() {
    let isMatch = firstCard.dataset.ragnar === secondCard.dataset.ragnar; isMatch ? disableCARDS() : unflipCARDS();    
  }

  let open = [];
  
  function disableCARDS() {
    firstCard.removeEventListener('click', flipCard);
    secondCard.removeEventListener('click', flipCard);

    if(disableCARDS) {      
      open.push('lucky');      
    }
    console.log(open);

       
    if(open.length == CARDS.length/2) {
      document.querySelector('.modal').classList.add('restart');
    }   

    resetBoard();
  }  

  function unflipCARDS() {
    lockBoard = true;

    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');

      resetBoard();
    }, 1500);
    
  }

  function resetBoard() {
    [hasFlippedCard, lockBoard] = [false, false];
    [firstCard, secondCard] = [null, null];
    
  }

  (function shuffle() {
    CARDS.forEach(card => {
      let ramdomPos = Math.floor(Math.random() * CARDS.length);
      card.style.order = ramdomPos;
    });
    
  })();

  let timers = document.querySelector('.timers');
  let number = 61;

  let score = setInterval(function() {
    timers.textContent = timers.value;
    timers.textContent = +number;
    number--;
    timers.textContent = number
    if(number === 0) {
      document.querySelector('.modal').classList.add('restart');
      clearInterval(score);
    }    
                 
  }, 1000);

  CARDS.forEach(card => card.addEventListener('click', flipCard));

  document.querySelector('.modal__btn').addEventListener('click', function () {
    location.reload();    
  })  

});
