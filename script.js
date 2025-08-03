console.log("JavaScript file loaded successfully!");
alert("JavaScript is working!");
let balance = 0;
let selectedChocolate = null;

const display = document.getElementById('display');
const balanceDisplay = document.getElementById('balance');
const buyBtn = document.getElementById('buyBtn');
const resetBtn = document.getElementById('resetBtn');
const dispensedItem = document.getElementById('dispensedItem');
const chocolateSlots = document.querySelectorAll('.chocolate-slot');
const coins = document.querySelectorAll('.coin');

// Coin insertion
coins.forEach(coin => {
    coin.addEventListener('click', () => {
        const value = parseInt(coin.dataset.value);
        balance += value;
        balanceDisplay.textContent = balance;
        updateDisplay('COIN INSERTED: ₹' + value);
        
        // Coin animation
        coin.style.transform = 'scale(0.8)';
        setTimeout(() => {
            coin.style.transform = 'scale(1)';
        }, 150);
        
        updateBuyButton();
    });
});

// Chocolate selection
chocolateSlots.forEach(slot => {
    slot.addEventListener('click', () => {
        // Remove previous selection
        chocolateSlots.forEach(s => s.classList.remove('selected'));
        
        // Select current slot
        slot.classList.add('selected');
        selectedChocolate = {
            name: slot.dataset.name,
            price: parseInt(slot.dataset.price),
            icon: slot.dataset.icon
        };
        
        updateDisplay(`SELECTED: ${selectedChocolate.name} - ₹${selectedChocolate.price}`);
        updateBuyButton();
    });
});

// Buy button
buyBtn.addEventListener('click', () => {
    if (selectedChocolate && balance >= selectedChocolate.price) {
        balance -= selectedChocolate.price;
        balanceDisplay.textContent = balance;
        
        // Create falling chocolate animation
        createFallingChocolate(selectedChocolate.icon);
        
        // Show dispensed item
        dispensedItem.innerHTML = `${selectedChocolate.icon} Enjoy your ${selectedChocolate.name}! ${selectedChocolate.icon}`;
        dispensedItem.classList.add('show');
        
        updateDisplay('DISPENSING... THANK YOU!');
        
        setTimeout(() => {
            dispensedItem.classList.remove('show');
            updateDisplay('SELECT YOUR CHOCOLATE');
            
            // Clear selection
            chocolateSlots.forEach(s => s.classList.remove('selected'));
            selectedChocolate = null;
            updateBuyButton();
        }, 3000);
    }
});

// Reset button
resetBtn.addEventListener('click', () => {
    balance = 0;
    balanceDisplay.textContent = balance;
    selectedChocolate = null;
    chocolateSlots.forEach(s => s.classList.remove('selected'));
    updateDisplay('MACHINE RESET - SELECT CHOCOLATE');
    updateBuyButton();
});

function updateDisplay(message) {
    display.textContent = message;
}

function updateBuyButton() {
    if (selectedChocolate && balance >= selectedChocolate.price) {
        buyBtn.disabled = false;
        buyBtn.textContent = `BUY (₹${selectedChocolate.price})`;
    } else {
        buyBtn.disabled = true;
        buyBtn.textContent = 'BUY';
    }
}

function createFallingChocolate(icon) {
    for (let i = 0; i < 5; i++) {
        setTimeout(() => {
            const fallingChocolate = document.createElement('div');
            fallingChocolate.className = 'falling-chocolate';
            fallingChocolate.textContent = icon;
            fallingChocolate.style.left = Math.random() * 300 + 50 + 'px';
            fallingChocolate.style.animation = 'fall 1s ease-in forwards';
            
            document.querySelector('.vending-machine').appendChild(fallingChocolate);
            
            setTimeout(() => {
                fallingChocolate.remove();
            }, 1000);
        }, i * 100);
    }
}

// Initial state
updateDisplay('SELECT YOUR CHOCOLATE');