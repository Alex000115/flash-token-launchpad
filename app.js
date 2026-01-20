// REPLACE WITH YOUR DEPLOYED FACTORY ADDRESS
const FACTORY_ADDRESS = "YOUR_FACTORY_ADDRESS_HERE"; 

const FACTORY_ABI = [
    "function deployToken(string name, string symbol, uint256 supply) external returns (address)",
    "event TokenDeployed(address tokenAddress, string name, string symbol, address owner)"
];

let provider, signer, factoryContract;

const connectBtn = document.getElementById("connectBtn");
const deployBtn = document.getElementById("deployBtn");
const statusBox = document.getElementById("status");

connectBtn.addEventListener("click", async () => {
    if (window.ethereum) {
        await window.ethereum.request({ method: 'eth_requestAccounts' });
        provider = new ethers.providers.Web3Provider(window.ethereum);
        signer = provider.getSigner();
        factoryContract = new ethers.Contract(FACTORY_ADDRESS, FACTORY_ABI, signer);
        
        const address = await signer.getAddress();
        connectBtn.innerText = address.substring(0, 6) + "..." + address.substring(38);
        deployBtn.disabled = false;
    } else {
        alert("Please install MetaMask!");
    }
});

deployBtn.addEventListener("click", async () => {
    const name = document.getElementById("tName").value;
    const symbol = document.getElementById("tSymbol").value;
    const supply = document.getElementById("tSupply").value;

    if (!name || !symbol || !supply) return alert("Fill all fields");

    statusBox.innerText = "Deploying... Confirm transaction.";
    statusBox.classList.remove("hidden");

    try {
        const tx = await factoryContract.deployToken(name, symbol, supply);
        statusBox.innerText = "Transaction sent! Waiting for confirmation...";
        
        const receipt = await tx.wait();
        const event = receipt.events.find(e => e.event === "TokenDeployed");
        const tokenAddress = event.args.tokenAddress;

        statusBox.innerHTML = `Success! Token deployed at: <br> <b>${tokenAddress}</b>`;
        statusBox.style.color = "#00ff88";
    } catch (err) {
        console.error(err);
        statusBox.innerText = "Error: " + err.message;
        statusBox.style.color = "#ff4d4d";
    }
});
