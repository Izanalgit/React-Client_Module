import {useState} from 'react';


const PremyMenu = ({ premium }) => {

    const premiumTime = premium.premiumTime;
    const messageTokens = premium.premiumTokens;

    const [isBuying , setIsBuying] = useState(false);

    const handleBuying = () => {
        isBuying ?
            setIsBuying(false) :
            setIsBuying(true);
    }

    return (
        <div >
            <h3>Tokens de Chat :</h3>
            <h4>Premium : {premiumTime}</h4>
            <h4>Tokens : {messageTokens}</h4>
            
            <button onClick={handleBuying}>
                {isBuying ? "Cancelar" : "Comprar"}
            </button>

            {isBuying &&
                <p>Menu de comprar</p>
            
            }
        </div>
    );
};

export default PremyMenu;