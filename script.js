const description = document.getElementById("description");
const amount = document.getElementById("amount");
const category = document.getElementById("category");
const date = document.getElementById("date");
const type = document.getElementById("type");
const addBtn = document.getElementById("addBtn");
const clearAllBtn = document.getElementById("clearAllBtn");

const transactionList = document.getElementById("transactionList");

const balance = document.getElementById("balance");
const income = document.getElementById("income");
const expense = document.getElementById("expense");

const search = document.getElementById("search");
const filter = document.getElementById("filter");

let transactions =
JSON.parse(localStorage.getItem("transactions")) || [];

let chart;

function saveTransactions(){
localStorage.setItem("transactions",
JSON.stringify(transactions));
}

function updateSummary(){

let totalIncome=0;
let totalExpense=0;

transactions.forEach(t=>{

if(t.type==="income"){
totalIncome+=t.amount;
}else{
totalExpense+=t.amount;
}

});

income.textContent=totalIncome.toFixed(2);
expense.textContent=totalExpense.toFixed(2);
balance.textContent=
(totalIncome-totalExpense).toFixed(2);

updateChart();

}

function updateChart(){

const expenseData={};

transactions.forEach(t=>{

if(t.type==="expense"){

if(expenseData[t.category]){
expenseData[t.category]+=t.amount;
}else{
expenseData[t.category]=t.amount;
}

}

});

const labels=Object.keys(expenseData);
const values=Object.values(expenseData);

if(chart){
chart.destroy();
}

const ctx=document
.getElementById("expenseChart")
.getContext("2d");

chart=new Chart(ctx,{
type:"pie",

data:{
labels:labels,

datasets:[{

data:values,

backgroundColor:[
"#4F7CFF",
"#60A5FA",
"#93C5FD",
"#BFDBFE",
"#D1FAE5",
"#FBCFE8"
],

borderWidth:1

}]
},

options:{
responsive:true,
plugins:{
legend:{
position:"bottom"
}
}
}

});

}

function displayTransactions(){

transactionList.innerHTML="";
if(transactions.length===0){
transactionList.innerHTML=`
<div class="empty-state">
    <i class="fa-solid fa-wallet"></i>
    <h3>No Transactions Yet</h3>
    <p>Add your first income or expense.</p>
</div>
`;
updateSummary();
return;
}

const keyword=
search.value.toLowerCase();

const selected=
filter.value;

transactions.forEach((t,index)=>{

if(
t.description.toLowerCase()
.includes(keyword)
&&
(selected==="All"||
selected===t.category)
){

const li=document.createElement("li");

li.className="transaction";

li.innerHTML=`

<div class="left">

<div class="desc">

${t.description}

</div>

<div class="info">

${t.category} • ${t.date}

</div>

</div>

<div class="right">

<span class="amount
${t.type==="income"
?
"incomeColor"
:
"expenseColor"}">

${t.type==="income"
?
"+"
:
"-"}

₹${t.amount}

</span>

<button
class="deleteBtn"
onclick="deleteTransaction(${index})">

<i class="fa-solid fa-trash"></i>

</button>

</div>

`;

transactionList.appendChild(li);

}

});
updateSummary();

}
function deleteTransaction(index){

const confirmDelete = confirm("Are you sure you want to delete this transaction?");

if(!confirmDelete){
return;
}

transactions.splice(index,1);

saveTransactions();

displayTransactions();

showToast("Transaction deleted successfully!", "success");

}



addBtn.addEventListener("click",()=>{

if(
description.value.trim()===""||
amount.value===""||
date.value===""){
showToast("Please fill all fields!", "error");
return;
}

transactions.push({

description: description.value,

amount: Number(amount.value),

category: category.value,

date: date.value,

type: type.value

});
saveTransactions();

displayTransactions();

description.value="";
amount.value="";
date.value="";
category.selectedIndex=0;
type.selectedIndex=1;

});

search.addEventListener("keyup",displayTransactions);

filter.addEventListener("change",displayTransactions);

clearAllBtn.addEventListener("click",()=>{

if(transactions.length===0){
showToast("No transactions to delete!", "warning");
return;
}

const confirmClear = confirm("Delete all transactions?");

if(!confirmClear){
return;
}

transactions=[];

saveTransactions();

displayTransactions();
showToast("All transactions deleted successfully!", "success");

});

displayTransactions();

function showToast(message, type = "success") {

    Toastify({
        text: message,
        duration: 2500,
        gravity: "top",
        position: "right",
        close: true,
        stopOnFocus: true,

        style: {
            background:
                type === "success"
                    ? "#22c55e"
                    : type === "error"
                    ? "#ef4444"
                    : "#f59e0b"
        }

    }).showToast();


}