function validerCommande(){
    let nom = document.getElementById("nom").value;
    let telephone = document.getElementById("telephone").value;
    let offre = document.getElementById("offre").value;

    if(nom === "" || telephone === "" || offre === ""){
        alert("Veuillez remplir tous les champs !");
        return false;
    }

    alert("Commande envoyée avec succès ✅");
    return false;
}

/* SLIDER AUTO */
let slides = document.querySelectorAll(".slide");
let index = 0;

setInterval(()=>{
    slides[index].classList.remove("active");
    index = (index + 1) % slides.length;
    slides[index].classList.add("active");
},4000);

function genererNumeroCommande(){
    return "CMD-" + Math.floor(Math.random()*1000000);
}

function traiterCommande(){
    let nom = document.getElementById("nom").value;
    let telephone = document.getElementById("telephone").value;
    let offre = document.getElementById("offre").value;
    let paiement = document.getElementById("paiement").value;

    if(nom==="" || telephone==="" || offre==="" || paiement===""){
        alert("Veuillez remplir tous les champs");
        return false;
    }

    let numero = genererNumeroCommande();

    alert("Simulation paiement Mobile Money...\nCode USSD envoyé au " + telephone);

    localStorage.setItem("commande", JSON.stringify({
        numero: numero,
        nom: nom,
        telephone: telephone,
        offre: offre,
        paiement: paiement,
        date: new Date().toLocaleString()
    }));

    window.location.href = "facture.html";
    return false;
}

/* AFFICHER FACTURE */
window.onload = function(){
    let data = localStorage.getItem("commande");
    if(data){
        let cmd = JSON.parse(data);
        document.getElementById("contenuFacture").innerHTML = `
            <p><strong>Numéro :</strong> ${cmd.numero}</p>
            <p><strong>Nom :</strong> ${cmd.nom}</p>
            <p><strong>Téléphone :</strong> ${cmd.telephone}</p>
            <p><strong>Offre :</strong> ${cmd.offre}$</p>
            <p><strong>Paiement :</strong> ${cmd.paiement}</p>
            <p><strong>Date :</strong> ${cmd.date}</p>
        `;
    }
}

/* GENERER PDF */
function telechargerPDF(){
    let element = document.getElementById("facture");
    html2pdf().from(element).save("facture_canalplus.pdf");
}