let OnlyOneInitVoters = false;
let OnlyOneInitProposalsId = false;
let OnlyOneInitProposalsTxt = false;
let OnlyOneInitVoted = false;
let VotersLigneEnCours = 1;
let ProposalsLigneEnCours = 1;

export function InitVoters(lstVoter) {
  if(lstVoter.length > 0 && OnlyOneInitVoters === false) {
    try{
      let ligne = document.querySelector('#whiteliste tbody tr');
      for( let i = 0; i < lstVoter.length; i++){
        if(i > 0) {
          document.getElementById('whiteliste').appendChild(ligne.cloneNode("true"))
        };
      };
      for( let i = 0; i < lstVoter.length; i++){
        document.getElementById('whiteliste').rows[i + 1].cells[0].innerHTML = lstVoter[i];
      };
      VotersLigneEnCours += lstVoter.length;
      OnlyOneInitVoters = true;
    }
    catch (err) {}
  }
};

export function InitVoted(lstVoted) {
  if(lstVoted.length > 0 && OnlyOneInitVoted === false) {
    let i = 0;
    do {
      //Recherche l'adresse dans le tableau lstVoted[i]
      let trouve = false;
      let j = 1;
      while(trouve === false) {
        if(document.getElementById('whiteliste').rows[j].cells[0].innerHTML === lstVoted[i]){
          document.getElementById('whiteliste').rows[j].cells[1].innerHTML = lstVoted[i + 1];
          break;
        }
        j = j + 1;
      };
      i = i + 2;
    } while(i < lstVoted.length);
    OnlyOneInitVoted = true;
  }
};

export function InitProposalsId(lstProposals) {
  if(lstProposals.length > 0 && OnlyOneInitProposalsId === false) {
    try{
      for( let i = 0; i < lstProposals.length; i++){      
        document.getElementById('whiteliste').rows[i + 1].cells[3].innerHTML = lstProposals[i];
      }
      ProposalsLigneEnCours += lstProposals.length;
      OnlyOneInitProposalsId = true;
    }
    catch (err) {}
  }
};

export function InitProposalsTxt(lstProposals) {
  if(lstProposals.length > 0 && OnlyOneInitProposalsTxt === false) {
    try{
      for( let i = 0; i < lstProposals.length; i++){      
        document.getElementById('whiteliste').rows[i + 1].cells[2].innerHTML = lstProposals[i];
      }
      OnlyOneInitProposalsTxt = true;
    }
    catch (err) {}
  }
};

export function AjoutVoterTableau(newAddr) {
    //Ajout du nouveau votant dans la liste
    let ligne = document.querySelector('#whiteliste tbody tr');
    if(VotersLigneEnCours > 1) {document.getElementById('whiteliste').appendChild(ligne.cloneNode("true"))};
    document.getElementById('whiteliste').rows[VotersLigneEnCours].cells[0].innerHTML = newAddr;
    VotersLigneEnCours += 1;
};

export function AjoutTableauProposal(newProposal) {
    //Ajout d'une nouvelle proposition'
    document.getElementById('whiteliste').rows[ProposalsLigneEnCours].cells[2].innerHTML = newProposal;
    document.getElementById('whiteliste').rows[ProposalsLigneEnCours].cells[3].innerHTML = ProposalsLigneEnCours;
    ProposalsLigneEnCours += 1;
};


export function WinnerSelect() {
    //Propsition gagnante

    let resultats=[VotersLigneEnCours];
    for(let i = 1; i < VotersLigneEnCours; i++) {
      resultats[i] = 0;
    }
    for(let i = 1; i < VotersLigneEnCours; i++) {
      resultats[document.getElementById('whiteliste').rows[i].cells[1].innerHTML] += 1;
    }
    let winnerId = 0;
    let nbVotes = 0;
    for(let i = 1; i < VotersLigneEnCours; i++) {
      if(winnerId < resultats[i]) {
        winnerId = i;
        nbVotes = resultats[i];
      }
    }
    let i = 1;
    while(true) {
      if(parseInt(document.getElementById('whiteliste').rows[i].cells[3].innerHTML) === parseInt(winnerId)){
        document.getElementById('whiteliste').rows[i].cells[2].style.background = "green";
        document.getElementById('whiteliste').rows[i].cells[2].innerHTML += ("   ( " + nbVotes + " votes)");
        break;
      };
      i += 1;
    };    
};       
