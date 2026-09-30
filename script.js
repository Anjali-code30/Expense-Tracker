//Dom Element
let amount = document.getElementById("amount");
let btn = document.querySelector("#btn");
let desci = document.querySelector("#descri");
let rupess = document.querySelector("#rupess");
let income = document.querySelector(".income-Amount");
let expense = document.querySelector(".expense-Amount");
let transactionList = document.querySelector("#transaction-list");
let form = document.querySelector(".form");

const transaction = JSON.parse(localStorage.getItem("transactions")) || [];

form.addEventListener("submit", addAmount);

function addAmount(event) {
  event.preventDefault();
  let descriVal = desci.value;
  let inputVal = amount.value;

  let newTransaction = { description: descriVal, amount: inputVal };
  transaction.push(newTransaction)
  localStorage.setItem("transactions", JSON.stringify(transaction));
  updateTotals();
  addToDom(newTransaction);

  desci.value = "";
  amount.value = "";

}

function updateTotals() {
  let totalIncome = 0;
  let totalExpense = 0;

  transaction.forEach(t => {
    let amount = Number(t.amount)
    if (amount > 0) {
      totalIncome += amount;
    }
    else if (amount < 0) {
      totalExpense -= amount
    }
  }
  );
  let balance = totalIncome - totalExpense

  if(balance === 0){
  rupess.textContent = ` Rs. ${balance}.00`;
  }
  else{
  rupess.textContent = ` Rs. ${balance}`;
  }
  if(totalIncome === 0){
  income.textContent = ` Rs. ${totalIncome}.00`;
  }
  else{
  income.textContent = ` Rs. ${totalIncome}`;
  }
  if(totalExpense === 0){
  expense.textContent = ` Rs. ${totalExpense}.00`;
  }
  else{
  expense.textContent = ` Rs. ${totalExpense}`;
  }

}


function addToDom(t) {
  let div = document.createElement("div");
  let descri = document.createElement("span");
  let input = document.createElement("span");
  let remove = document.createElement("span");
  descri.textContent = t.description;
  input.textContent = parseInt(t.amount);

  remove.textContent = "\u2715";
  remove.classList.add("remove");
  input.appendChild(remove);


  div.appendChild(descri);
  div.appendChild(input);


  div.classList.add("transaction");

  if (parseInt(t.amount) > 0) {
    div.classList.add("inc");
  }
  else if (parseInt(t.amount) < 0) {
    div.classList.add("exp");

  }
  if (!isNaN(parseInt(t.amount)) && t.description.trim() !== "") {
    transactionList.appendChild(div);
  }

  remove.addEventListener("click", function () {
    removefunc(t, div)
  })

}

function removefunc(t, div) {
  const index = transaction.indexOf(t);

  if (index !== -1) {
    transaction.splice(index, 1);
  }

  // Update localStorage
  localStorage.setItem("transactions", JSON.stringify(transaction));
  div.remove();
  updateTotals();
}

transaction.forEach(t => addToDom(t));
updateTotals();




















