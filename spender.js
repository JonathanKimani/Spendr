
  document.addEventListener("DOMContentLoaded",() =>{
    const form = document.getElementById("munyunform");
    const descriptionInput =document.getElementById("description");
    const valueInput =document.getElementById("munyun");
    const typeInput= document.getElementById("type")
    const balanceEl = document.getElementById("balance");
    const incomeEl = document.getElementById("income");
    const expensesEl= document.getElementById("expenses")
    const transactionContainer = document.getElementById("rightblock");

 
  let transactions = [];

  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const description = descriptionInput.value.trim();
    const value = parseInt(valueInput.value);
    const type = typeInput.value;

    if (!description || isNaN(value)) return;

    const transaction = {
      id: Date.now(),
      description,
      value,
      type
    };

    transactions.push(transaction);
    updateUI();
    form.reset();
  });

  transactionContainer.addEventListener("click", (e) => {
    if (e.target.classList.contains("Delete")) {
      const id = parseInt(e.target.closest(".transaction").dataset.id);
      transactions = transactions.filter((t) => t.id !== id);
      updateUI();
    }
  });

  function updateUI() {
    
    const existingTransactions = transactionContainer.querySelectorAll(".transaction");
    existingTransactions.forEach((el) => el.remove());

    let totalIncome = 0;
    let totalExpenses = 0;

    transactions.forEach((t) => {
      const div = document.createElement("div");
      div.classList.add("transaction", t.type);
      div.dataset.id = t.id;

      div.innerHTML = `
        <span>${t.description}</span>
        <span class="amounttrans">
          Ksh ${t.value} <button class="Delete">Delete</button>
        </span>
      `;

      transactionContainer.appendChild(div);

      if (t.type === "income") totalIncome += t.value;
      else totalExpenses += t.value;
    });

    const finalBalance = totalIncome - totalExpenses;

    balanceEl.textContent = `Ksh ${finalBalance}`;
    incomeEl.textContent = `Ksh ${totalIncome}`;
    expensesEl.textContent = `Ksh ${totalExpenses}`;
  }
});
