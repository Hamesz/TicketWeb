export function determineBTCAmount(amount, setBTCAmount){
    console.info('fetching btc amount');
    const currency="GBP";
    if(amount === ""){
        setBTCAmount("...");
        return;
    }
    fetch(`https://blockchain.info/tobtc?currency=${currency}&value=${amount}`)
    .then(async response => {
        const data = await(response.json());
        setBTCAmount(data);
    })
    .catch(error => {
        console.error("There was an error fetch BTC price:", error);
    })
}