import { useState } from "react";
import useEth from "../../contexts/EthContext/useEth";
import NoticeNoArtifact from "./NoticeNoArtifact";
import NoticeWrongNetwork from "./NoticeWrongNetwork";

import Contract from "./Contract";
import Ident   from "./Ident";

function Voting() {
  const { state } = useEth();
  const [ident, setIdent] = useState();
  const [titre, setTitre] = useState("");
  const [userCod, setUserCod] = useState("");

  return (
    <div className="voting">
      {
      !state.artifact ? <NoticeNoArtifact /> :
        !state.contract ? <NoticeWrongNetwork /> :
          <>
            <div className="contract-container">
              <Contract ident={ident} titre={titre} userCod={userCod} /> 
              <Ident setIdent={setIdent} setTitre={setTitre} setUserCod={setUserCod}/>
            </div>
          </>
      }
    </div>
  );
}
export default Voting;
