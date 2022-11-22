import { useEffect } from "react";
import useEth from "../../contexts/EthContext/useEth";

function Ident({setIdent, setTitre, setUserCod}) {
  const { state: { contract, accounts } } = useEth();

  const whoAreYou = async e => {
    setIdent(accounts[0]);
    //if User = admin
    if( accounts[0] === "0xeF09575d6349ab5275A645337218707c8bD4e5F2") {
      try  {
        await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
        setTitre("administrateur");
        setUserCod(2);
        document.getElementById('votingsession').style.visibility = "visible";
      }
      catch (err) {
        setTitre("administrateur");
        setUserCod(1);
        document.getElementById('votingsession').style.visibility = "visible";
      }
    } else {
      //if newUser = votant
      try  {
        await contract.methods.getVoter(accounts[0]).call({ from: accounts[0] });
        setTitre("participant");
        setUserCod(3);
        document.getElementById('votingsession').style.visibility = "visible";
      }
      catch (err) {
        setTitre("inconnu");
        setUserCod(4);
        console.log("UserCod = ", 4);
      }
    };
  };

  useEffect(() => {
    document.getElementById('votingsession').style.visibility = "hidden";
    whoAreYou()
  });  
}
export default Ident;