const textInput = document.getElementById('text');
const amountInput = document.getElementById('amount');
const budgetForm = document.getElementById('budget-form');
const totalBudget = document.getElementById('total-budget');
const transactionList = document.getElementById('transaction-list');

let transactions = [];

// Add transaction to list and update total budget
function addTransaction(description, amount) {
    const transaction = {
        id: generateID(),
        description,
        amount: +amount
    };

    transactions.push(transaction);

    updateTotalBudget();
    updateTransactionList();

    textInput.value = '';
    amountInput.value = '';
}

// Generate unique ID for transaction
function generateID() {
    return Math.floor(Math.random() * 1000000);
}

// Update total budget
function updateTotalBudget() {
    const amounts = transactions.map(transaction => transaction.amount);
    const total = amounts.reduce((acc, item) => (acc += item), 0).toFixed(2);

    totalBudget.innerText = total;
}

// Update transaction list
function updateTransactionList() {
    transactionList.innerHTML = '';

    transactions.forEach(transaction => {
        const sign = transaction.amount < 0 ? '-' : '+';
        const itemClass = transaction.amount < 0 ? 'expense' : 'income';

        const transactionItem = document.createElement('li');
        transactionItem.classList.add('transaction');
        transactionItem.classList.add(itemClass);
        transactionItem.innerHTML = `
            ${transaction.description} <span>${sign}Rs${Math.abs(transaction.amount)}</span>
            <button class="delete-btn" onclick="removeTransaction(${transaction.id})">X</button>
        `;

        transactionList.appendChild(transactionItem);
    });
}

// Remove transaction
function removeTransaction(id) {
    transactions = transactions.filter(transaction => transaction.id !== id);
    updateTotalBudget();
    updateTransactionList();
}

// Event listener for form submission
budgetForm.addEventListener('submit', e => {
    e.preventDefault();

    const description = textInput.value.trim();
    const amount = amountInput.value.trim();

    if (description === '' || amount === '') {
        alert('Please enter a description and amount.');
    } else {
        addTransaction(description, amount);
    }
});
