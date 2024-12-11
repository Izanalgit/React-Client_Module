const errorMsgUtil = (errorRaw) => {

    if(errorRaw.includes('STATUS'))
        return errorRaw.slice(12);
    else 
        return errorRaw;

}

export default errorMsgUtil;