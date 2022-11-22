function InitDOM(UserCod, StatusCod) {
    document.getElementById('status').style.visibility = "hidden";
    document.getElementById('statusbtn').style.visibility = "hidden";
    document.getElementById('watch').style.visibility = "hidden";
    document.getElementsByTagName('col')[2].style.visibility = 'collapse';
    document.getElementsByTagName('col')[3].style.visibility = 'collapse';
    document.getElementsByTagName('col')[4].style.visibility = 'collapse';
    document.getElementById('admin').style.visibility = "hidden";
    document.getElementById('proposal').style.visibility = "hidden";

    if(UserCod !== 0) {
        switch(UserCod){
            case 1 :
                if(parseInt(StatusCod) === 0) {document.getElementById('admin').style.visibility = "visible"};
                document.getElementById('statusbtn').style.visibility = "visible";
                break;
            case 2 :
                if(parseInt(StatusCod) === 0) {document.getElementById('admin').style.visibility = "visible"};
                if(parseInt(StatusCod) === 1) {document.getElementById('proposal').style.visibility = "visible"};
                if(parseInt(StatusCod) === 3) {document.getElementsByTagName('col')[4].style.visibility = ''};
                if(parseInt(StatusCod) !== 5) {document.getElementById('statusbtn').style.visibility = "visible"};
                document.getElementsByTagName('col')[2].style.visibility = '';
                document.getElementsByTagName('col')[3].style.visibility = '';
                break;
            case 3  :
                if(parseInt(StatusCod) === 1) {document.getElementById('proposal').style.visibility = "visible"};
                if(parseInt(StatusCod) === 3) {document.getElementsByTagName('col')[4].style.visibility = ''};
                document.getElementsByTagName('col')[2].style.visibility = '';
                document.getElementsByTagName('col')[3].style.visibility = '';
                break;
            case 4  :
                break;
            default :
                break;
        };
        if(UserCod !== 4) {
            document.getElementById('status').style.visibility = "visible";
            document.getElementById('watch').style.visibility = "visible";
        };
        document.getElementById('titre').style.visibility = "visible";
    };
}
export default InitDOM;
