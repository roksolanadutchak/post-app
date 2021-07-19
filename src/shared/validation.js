export const validateTitle = (value) => {
    let error;
    if(!value){
        error = 'Required'
    } else if(value.length < 5){
        error = 'Too short!'
    } else if(!/^[a-zA-Z\s]*$/.test(value)){
        error = 'Symbols, numbers and cyrillic letters is not allowed'
    }
    return error;
}
export const  validateBody = (value) => {
    let error;
    if(!value){
        error = 'Required'
    } else if(value.length < 20){
        error = 'Too short!'
    } else if(!/^[a-zA-Z\s]*$/.test(value)){
        error = 'Symbols, numbers and cyrillic letters is not allowed'
    }
    return error;
}
