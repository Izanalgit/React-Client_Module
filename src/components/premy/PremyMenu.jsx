import {useState} from 'react';

import AddPremy from './AddPremyProvisional';

import '../../css/Premy.css'

const PremyMenu = ({ premium , onComplete }) => {

    const premiumTime = premium.premiumTime;
    const messageTokens = premium.premiumTokens;

    const [isBuying , setIsBuying] = useState(false);

    const handleBuying = () => {
        onComplete();
        isBuying ?
            setIsBuying(false) :
            setIsBuying(true);
    }

    return (
        <div className='premy-menu'>
            {isBuying &&
            <div className='buying-menu'>
                <h3>Menu de comprar</h3>
                <AddPremy />
            </div>
            }
            {!isBuying &&
            <div className='tokens-menu'>
                <h3>Tokens de Chat :</h3>
                <h4>Premium : {premiumTime}</h4>
                <h4>Tokens : {messageTokens}</h4>
            </div>
            }
            <button onClick={handleBuying} className={isBuying ? "buying" : ""}>
                {isBuying ? "Cancelar" : "Comprar"}
            </button>
        </div>
    );
};

export default PremyMenu;