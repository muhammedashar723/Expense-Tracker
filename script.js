let expenses = JSON.parse(localStorage.getItem("expenses")) || [];
let editIndex = -1;

function addExpense() {
    let name = document.getElementById("name").value;
    let amount = document.getElementById("amount").value;
    let category = document.getElementById("category").value;
    let date = document.getElementById("date").value;

    if (name == "" || amount == "" || category == "" || date == "") {
        alert("Fill all fields");
        return;
    }

    let expense = { name, amount, category, date };

    if (editIndex == -1) {
        expenses.push(expense);
    } else {
        expenses[editIndex] = expense;
        editIndex = -1;
        document.getElementById("btn").innerText = "Add Expense";
    }

    localStorage.setItem("expenses", JSON.stringify(expenses));
    clearForm();
    display();
}

function display() {
    let output = "";
    let filter = document.getElementById("filter").value;

    expenses.forEach((e, i) => {
        if (filter == "" || e.category == filter) {
            output += `<tr>
            <td>${e.name}</td>
            <td>${e.amount}</td>
            <td>${e.category}</td>
            <td>${e.date}</td>
            <td>
            <button class="btn btn-warning btn-sm" onclick="edit(${i})">Edit</button>
            <button class="btn btn-danger btn-sm" onclick="del(${i})">Delete</button>
            </td>
            </tr>`;
        }
    });

    document.getElementById("output").innerHTML = output;

    let total = expenses.reduce((sum, e) => sum + Number(e.amount), 0);
    document.getElementById("total").innerText = total;
}

function edit(i) {
    let e = expenses[i];
    document.getElementById("name").value = e.name;
    document.getElementById("amount").value = e.amount;
    document.getElementById("category").value = e.category;
    document.getElementById("date").value = e.date;
    editIndex = i;
    document.getElementById("btn").innerText = "Update Expense";
}

function del(i) {
    expenses.splice(i, 1);
    localStorage.setItem("expenses", JSON.stringify(expenses));
    display();
}

function clearForm() {
    document.getElementById("name").value = "";
    document.getElementById("amount").value = "";
    document.getElementById("category").value = "";
    document.getElementById("date").value = "";
}

display();