export const calculatePercentage = (price: number) =>{
    const {CASHBACK_PERCENTAGE} = process.env
    const percentage = Number(CASHBACK_PERCENTAGE || 75)  

    return price * ( percentage / 100)
}