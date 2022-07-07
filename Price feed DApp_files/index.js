async function connect() {
    const priceElem = document.querySelector('#price')

    try {
        priceElem.textContent = 'Updating price...';

        //The WitnetPriceVerifier ABI must be placed here
        const ABI = [{"type":"event","name":"CurrencyPairSet","inputs":[{"type":"bytes32","name":"erc2362ID","internalType":"bytes32","indexed":true},{"type":"address","name":"pricefeed","internalType":"contract IERC165","indexed":false}],"anonymous":false},{"type":"event","name":"OwnershipTransferred","inputs":[{"type":"address","name":"previousOwner","internalType":"address","indexed":true},{"type":"address","name":"newOwner","internalType":"address","indexed":true}],"anonymous":false},{"type":"function","stateMutability":"pure","outputs":[{"type":"bytes32","name":"","internalType":"bytes32"}],"name":"currencyPairId","inputs":[{"type":"string","name":"_caption","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"contract IERC165"}],"name":"getPriceFeed","inputs":[{"type":"bytes32","name":"_erc2362id","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"","internalType":"string"}],"name":"getPriceFeedCaption","inputs":[{"type":"address","name":"_pricefeed","internalType":"contract IERC165"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"string","name":"_caption","internalType":"string"}],"name":"lookupERC2362ID","inputs":[{"type":"bytes32","name":"_erc2362id","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"address","name":"","internalType":"address"}],"name":"owner","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"renounceOwnership","inputs":[]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"setPriceFeed","inputs":[{"type":"address","name":"_pricefeed","internalType":"contract IERC165"},{"type":"uint256","name":"_decimals","internalType":"uint256"},{"type":"string","name":"_base","internalType":"string"},{"type":"string","name":"_quote","internalType":"string"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bytes32[]","name":"","internalType":"bytes32[]"}],"name":"supportedCurrencyPairs","inputs":[]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsCurrencyPair","inputs":[{"type":"bytes32","name":"_erc2362id","internalType":"bytes32"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"bool","name":"","internalType":"bool"}],"name":"supportsPriceFeed","inputs":[{"type":"address","name":"_pricefeed","internalType":"contract IERC165"}]},{"type":"function","stateMutability":"nonpayable","outputs":[],"name":"transferOwnership","inputs":[{"type":"address","name":"newOwner","internalType":"address"}]},{"type":"function","stateMutability":"view","outputs":[{"type":"int256","name":"_lastPrice","internalType":"int256"},{"type":"uint256","name":"_lastTimestamp","internalType":"uint256"},{"type":"uint256","name":"_latestUpdateStatus","internalType":"uint256"}],"name":"valueFor","inputs":[{"type":"bytes32","name":"_erc2362id","internalType":"bytes32"}]}]

        //Andromeda Http Provider Address
        const web3 = new Web3(new Web3.providers.HttpProvider("https://andromeda.metis.io/?owner=1088"))

        const contract = new web3.eth.Contract(ABI);

        //WitnetPriceVerifier Contract Address
        contract.options.address = "0xD39D4d972C7E166856c4eb29E54D3548B4597F53";

        //ID for the required data pair
        const currentPriceResponse = await contract.methods.valueFor('0x4ba45817').call()

        if (currentPriceResponse[0]) {
            const formatter = new Intl.NumberFormat('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 6,
            });
            priceElem.textContent = formatter.format(currentPriceResponse[0] / 1000000);
        }

    } catch (e) {
        priceElem.textContent = 'An error occurred while updating the price, please refresh your page.';
    }
}

window.onload = function() {
    connect();
}
