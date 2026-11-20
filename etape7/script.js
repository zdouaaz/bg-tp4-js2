"use strict"; 

const persons = [
    { nom: "nom-1", prenom: "prenom-1", points: 5 },
    { nom: "nom-2", prenom: "prenom-2", points: 10 },
    { nom: "nom-3", prenom: "prenom-3", points: 15 }
];

let lignes = 0;
let total_points = 0;
function doInsertRowTable(num, nom, prenom, points) {
    const table = document.querySelector("table");
    const row = document.createElement("tr");
    row.setAttribute("class", "row");
    const col1 = document.createElement("td");
    const col2 = document.createElement("td");
    const col3 = document.createElement("td");
    const col4 = document.createElement("td");
    const col5 = document.createElement("td");
    col1.innerText = num;
    col2.innerText = nom;
    col3.innerText = prenom;
    col4.innerText = points;
    const checkbox = document.createElement("input");
    checkbox.setAttribute("type", "checkbox");
    col5.append(checkbox);
    col1.setAttribute("class", "col_number");
    col2.setAttribute("class", "col_text");
    col3.setAttribute("class", "col_text");
    col4.setAttribute("class", "col_number");
    col5.setAttribute("class", "col_chkbox");
    row.append(col1, col2, col3, col4, col5);
    table.append(row);
}
function doInsert(nom, prenom, points) {
    lignes++;
    total_points += points;
    doInsertRowTable(lignes, nom, prenom, points);
    update_summary();
}
function update_summary() {
    const element_lignes = document.getElementById("p1");
    const element_points = document.getElementById("p3");
    element_lignes.innerText = lignes + " ligne(s)";
    element_points.innerText = "Total point(s)= " + total_points;
    const element_moyenne = document.getElementById("p2");
    if (lignes > 0) {
        element_moyenne.innerText = "Moyenne= " + (total_points / lignes).toFixed(2);
    } else {
        element_moyenne.innerText = "";
    }
}
function init() {
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}
function consoleTableau() {
    console.log(persons);
}
function doNewData() {
    const elt_nom = document.getElementById("form_nom");
    const elt_prenom = document.getElementById("form_prenom");
    const elt_points = document.getElementById("form_points");
    const nom = elt_nom.value;
    const prenom = elt_prenom.value;
    const points = parseInt(elt_points.value); 
    if (nom === "" || prenom === "" || Number.isNaN(points)) {
        alert("Formulaire incomplet !"); 
    } else {
        doInsert(nom, prenom, points);
        persons.push({ nom: nom, prenom: prenom, points: points });
        elt_nom.value = "";
        elt_prenom.value = "";
        elt_points.value = "";
    }
}
function deleteRow() {
    if (lignes === 0) {
        alert("Le tableau est vide !");
        return;
    }
    const table = document.querySelector("table");
    const cochees = table.querySelectorAll(".col_chkbox input:checked");
    if (cochees.length === 0) {
        alert("Sélectionnez au moins une ligne !");
        return;
    }
    if (!confirm("Voulez-vous vraiment supprimer les lignes sélectionnées ?")) {
        return;
    }
    const rows = table.querySelectorAll("tr");
    for (let i = rows.length - 1; i >= 1; i--) {
        const row = rows[i];
        const checkbox = row.querySelector(".col_chkbox input");

        if (checkbox.checked) {
            const points = parseInt(row.cells[3].innerText); 
            total_points -= points;                       
            lignes--;
            row.remove();                                    
            persons.splice(i - 1, 1);                       
        }
    }
    const restantes = table.querySelectorAll("tr");
    for (let i = 1; i < restantes.length; i++) {
        restantes[i].cells[0].innerText = i;
    }
    alert("Lignes supprimées avec succès !");
    update_summary();
function toggleSelectAll() {
    const boxes = document.querySelectorAll(".col_chkbox input");

    let toutesCochees = true;
    for (const box of boxes) {
        if (!box.checked) {
            toutesCochees = false;
        }
    }
    for (const box of boxes) {
        box.checked = !toutesCochees;
    }
}
}
function sortByPoints() {
   
    persons.sort(function (a, b) {
        return b.points - a.points;
    });
    const table = document.querySelector("table");
    const rows = table.querySelectorAll("tr");
    for (let i = rows.length - 1; i >= 1; i--) {
        rows[i].remove();
    }
    lignes = 0;
    total_points = 0;
    for (const person of persons) {
        doInsert(person.nom, person.prenom, person.points);
    }
}
init();