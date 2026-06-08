const addButton = document.getElementById("addButton");
const expenseName = document.getElementById("expenseName");
const expenseAmount = document.getElementById("expenseAmount");
const category = document.getElementById("category");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");

let total = 0;

addButton.addEventListener("click", function() {

    const li = document.createElement("li");

    const amount = Number(expenseAmount.value);

    const deleteButton = document.createElement("button");


    deleteButton.textContent = "Delete";
   
    deleteButton.addEventListener("click", function() {

    total = total - amount;

    totalAmount.textContent = total;

    li.remove();

});
    li.textContent =
    expenseName.value + " - " +
    category.value + " - Rs " +
    expenseAmount.value;

    li.appendChild(deleteButton);
    expenseList.appendChild(li);
    

    total = total + Number(expenseAmount.value);

totalAmount.textContent = total;

});
localStorage.setItem("test", "Hello Rozena");