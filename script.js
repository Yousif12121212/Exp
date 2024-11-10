const budgets = { food: 0, fuel: 0, monthly: 0 };
const remaining = { food: 0, fuel: 0, monthly: 0 };
let expenses = { food: [], fuel: [], monthly: [] };
const savedFiles = [];

function setBudget(category) {
  const budgetInput = document.getElementById(`${category}-budget`);
  const remainingDisplay = document.getElementById(`remaining-${category}`);
  
  const budget = parseFloat(budgetInput.value);
  if (!isNaN(budget) && budget > 0) {
    budgets[category] = budget;
    remaining[category] = budget;
    remainingDisplay.textContent = budget;
  }
}

function addExpense(category) {
  const amountInput = document.getElementById(`${category}-amount`);
  const remainingDisplay = document.getElementById(`remaining-${category}`);
  const amount = parseFloat(amountInput.value);
  
  if (!isNaN(amount) && amount > 0 && remaining[category] >= amount) {
    remaining[category] -= amount;
    remainingDisplay.textContent = remaining[category];

    const listItem = document.createElement('li');
    listItem.textContent = `${category === 'food' ? 'الأكل' : category === 'fuel' ? 'البترول' : 'المصروف الشهري'}: ${amount} ريال`;
    document.getElementById('expense-list').appendChild(listItem);
    
    expenses[category].push(amount);
    amountInput.value = '';
  }
}

function saveExpenses() {
  const fileName = prompt("أدخل اسم الملف:");
  if