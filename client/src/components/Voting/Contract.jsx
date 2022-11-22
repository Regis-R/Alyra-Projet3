import { useState , useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";
import InitDOM from "../DOM/InitDOM"
import { InitVoters, AjoutVoterTableau , InitProposalsId, AjoutTableauProposal, InitVoted, InitProposalsTxt, WinnerSelect } from "../DOM/Tableau";

function Contract({ident, titre, userCod}) {
    const { state: { contract, accounts } } = useEth();

    const [statusId, setStatusId] = useState(0);
    const [statusTxt, setStatusTxt] = useState("");

    const [newVoter, setnewVoter] = useState("");
    const [newProposal, setnewProposal] = useState("");

    //bouton status suivant
    const nextstatus = async e => {
      switch(parseInt(statusId)) {
        case 0:
          try {
            await contract.methods.startProposalsRegistering().send({ from: accounts[0] });
          } catch (err) {}; break;
        case 1:
          try {
            await contract.methods.endProposalsRegistering().send({ from: accounts[0] });
          } catch (err) {}; break;
        case 2:
          try {
            await contract.methods.startVotingSession().send({ from: accounts[0] });
          } catch (err) {}; break;
        case 3:
          try {
            await contract.methods.endVotingSession().send({ from: accounts[0] });
          } catch (err) {}; break;
        case 4:
          try {
            await contract.methods.tallyVotes().send({ from: accounts[0] });
            document.getElementById('statusbtn').style.visibility = "hidden";
            WinnerSelect();
          } catch (err) {}; break;
        default:
          break;
      };
      window.location.reload(); 
    };

    //champs pour ajouter un participant
    const writevoterChange = e => {
      if (/^0x[a-fA-F0-9]{40}$/.test(e.target.value)) { setnewVoter(e.target.value); }
    };
    //Bouton pour ajouter un participant
    const writevoter = async e => {
      try{
        await contract.methods.addVoter(newVoter).send({ from: accounts[0] });
        AjoutVoterTableau(newVoter);
        setnewVoter("");
      } catch (err) {}
    };

    //champs pour ajouter une proposition
    const writeproposalChange = e => { setnewProposal(e.target.value); };
    //Bouton pour ajouter une proposition
    const writeproposal = async e => {
      try {
        await contract.methods.addProposal(newProposal).send({ from: accounts[0] });
        AjoutTableauProposal(newProposal);
        setnewProposal("");
      } catch (err) {}
      document.getElementById('proposal').style.visibility = "hidden";
    };


    //Bouton de vote pour une proposition
    const vote = async e => {
      try {
        //Récupérer le numéro de ligne pour déterminer l'Id
        const VoteProposalId = 1;
        await contract.methods.setVote(VoteProposalId).send({ from: accounts[0] });
        //Rechercher l'adresse du User dans le tableau
        const VoterLigne = 1;
        document.getElementById('whiteliste').rows[VoterLigne].cells[1].innerHTML = VoteProposalId;
        //Cacher les boutons
        document.getElementsByTagName('col')[4].style.visibility = 'collapse';
      } catch (err) {}
    };
  

    useEffect(() => {
      let laststatus;
      (async function () {
          //anciens événements : Changement de status
          let oldStatus= await contract.getPastEvents('WorkflowStatusChange', {fromBlock: 0, toBlock: 'latest'});
          let oldiesStatus=[];
          oldStatus.forEach(event => {
            oldiesStatus.push(event.returnValues.newStatus);
          });
          laststatus = 0;
          if(oldiesStatus.length > 0) {
            laststatus = oldiesStatus[oldiesStatus.length - 1]
          };
          setStatusId(laststatus);
  
          switch(parseInt(laststatus)) {
            case 0 : setStatusTxt("RegisteringVoters"); break;
            case 1 : setStatusTxt("ProposalsRegistrationStarted"); break;
            case 2 : setStatusTxt("ProposalsRegistrationEnded"); break;
            case 3 : setStatusTxt("VotingSessionStarted"); break;
            case 4 : setStatusTxt("VotingSessionEnded"); break;
            case 5 : setStatusTxt("VotesTallied"); break;            
            default: break;
          };

  
          //anciens événements : Chargement des votants existants
          let oldVoters= await contract.getPastEvents('VoterRegistered', {fromBlock: 0, toBlock: 'latest'});
          let oldiesVoter=[];
          oldVoters.forEach(event => {
            oldiesVoter.push(event.returnValues.voterAddress);
          });
          InitVoters(oldiesVoter);

          //anciens événements : Chargement des participants qui ont voté
          let oldVoted= await contract.getPastEvents('Voted', {fromBlock: 0, toBlock: 'latest'});
          let oldiesVoted=[];
          oldVoted.forEach(event => {
            oldiesVoted.push(event.returnValues.voter);
            oldiesVoted.push(event.returnValues.proposalId);
          });
          InitVoted(oldiesVoted);

          //anciens événements : Chargement des Id des propositions existantes
          let oldProposals= await contract.getPastEvents('ProposalRegistered', {fromBlock: 0, toBlock: 'latest'});
          let oldiesProposals=[];
          oldProposals.forEach(event => {
            oldiesProposals.push(event.returnValues.proposalId);
          });
          InitProposalsId(oldiesProposals);

          //Chargement des propositions existantes
          const user = document.getElementById('user').textContent;
          let lstProposals=[];
          for( let i = 1; i <= oldiesProposals.length; i++){
            let proposal = await contract.methods.getOneProposal(i).call({ from: user });
            lstProposals.push(proposal[0]);
          }
          InitProposalsTxt(lstProposals);

          if(parseInt(laststatus) === 5) { WinnerSelect(); }
        }
      )();
    }, [contract])  
  
    useEffect(() => {
      InitDOM(userCod, statusId);
    });
  
    return (
      <>
        <p>Simple Voting V1.0</p>

        <fieldset id="ident" className="inputs"><legend>Identification...</legend>
          <div>Adresse de connection :</div>
          <div id="user">{ident}</div>
          <div id="titre">{titre}</div>
        </fieldset>

        <div id="votingsession">
          <fieldset id="status" className="inputs"><legend>Status en cours...</legend>
            <strong id="statustxt">{statusTxt}</strong>
            <button id="statusbtn" onClick={nextstatus}>Etape Suivante</button>
          </fieldset>

          <fieldset id="admin" className="inputs"><legend>Enregistrement des participants...</legend>
            <div>Entrer l'adresse du nouveau votant :</div>
            <input type="text" placeholder="new voter" value={newVoter} onChange={writevoterChange}/>
            <button className="bouton" onClick={writevoter}>Enregister</button>
          </fieldset>

          <fieldset id="watch" className="inputs"><legend>Liste d'informations...</legend>
          <table id="whiteliste">
            <colgroup>
              <col width='450px'/> 
              <col />
              <col />
              <col />
              <col />
            </colgroup>                
            <thead>
              <tr><th>Adresse votant</th><th>Vote</th><th>Proposition émise</th><th>Id</th><th className="colbtn"></th></tr>
            </thead>
            <tbody>
              <tr className="lignes"><td></td><td></td><td></td><td></td><td className="colbtn"><button onClick={vote}>Choix</button></td></tr>
            </tbody>
          </table>
          </fieldset>

          <fieldset id="proposal" className="inputs"><legend>Enregistrement d'une proposition...</legend>
            <div>Entrer la nouvelle proposition :</div>
            <input type="text" placeholder="new proposal" value={newProposal} onChange={writeproposalChange}/>
            <button className="bouton" onClick={writeproposal}>Enregister</button>
          </fieldset>
        </div>
      </>
    )
  }
  
  export default Contract;