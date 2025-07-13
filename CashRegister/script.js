// Global variables as required by tests
let price = 19.5;
let cid = [
    ["PENNY", 1.01],
    ["NICKEL", 2.05],
    ["DIME", 3.1],
    ["QUARTER", 4.25],
    ["ONE", 90],
    ["FIVE", 55],
    ["TEN", 20],
    ["TWENTY", 60],
    ["ONE HUNDRED", 100]
];

// Currency unit values in cents
const currencyUnit = {
    "PENNY": 1,
    "NICKEL": 5,
    "DIME": 10,
    "QUARTER": 25,
    "ONE": 100,
    "FIVE": 500,
    "TEN": 1000,
    "TWENTY": 2000,
    "ONE HUNDRED": 10000
};

document.addEventListener('DOMContentLoaded', function() {
    const cashInput = document.getElementById('cash');
    const purchaseBtn = document.getElementById('purchase-btn');
    const changeDueDisplay = document.getElementById('change-due');

    function checkCashRegister(price, cash, cid) {
        let changeDue = cash - price;
        let changeDueCents = Math.round(changeDue * 100);
        
        // Calculate total cash in drawer in cents
        let totalCid = 0;
        cid.forEach(item => {
            totalCid += Math.round(item[1] * 100);
        });
        
        // Handle insufficient customer cash
        if (changeDue < 0) {
            return { status: "INSUFFICIENT_CUSTOMER_CASH" };
        }
        
        // Handle exact payment
        if (changeDue === 0) {
            return { status: "EXACT_CASH", change: [] };
        }
        
        // Handle cases where drawer has less than change due
        if (totalCid < changeDueCents) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }
        
        // Calculate change
        let change = [];
        let cidCopy = JSON.parse(JSON.stringify(cid)).reverse();
        
        for (let item of cidCopy) {
            const unitName = item[0];
            const unitValue = currencyUnit[unitName];
            let unitAmount = Math.round(item[1] * 100);
            let unitCount = 0;
            
            while (changeDueCents >= unitValue && unitAmount > 0) {
                changeDueCents -= unitValue;
                unitAmount -= unitValue;
                unitCount += unitValue;
            }
            
            if (unitCount > 0) {
                change.push([unitName, unitCount / 100]);
            }
        }
        
        // Check if exact change could be given
        if (changeDueCents > 0) {
            return { status: "INSUFFICIENT_FUNDS", change: [] };
        }
        
        // Check if drawer will be closed after giving change
        let remainingCash = totalCid - (Math.round(changeDue * 100));
        if (remainingCash === 0) {
            return { 
                status: "CLOSED", 
                // Return original cid but only with denominations that had money
                change: cid.filter(item => item[1] > 0)
            };
        }
        
        return { status: "OPEN", change: change };
    }

    purchaseBtn.addEventListener('click', function() {
        const cash = parseFloat(cashInput.value);
        
        if (isNaN(cash) || cash < 0) {
            alert("Please enter a valid cash amount");
            return;
        }
        
        const result = checkCashRegister(price, cash, cid);
        
        if (result.status === "INSUFFICIENT_CUSTOMER_CASH") {
            alert("Customer does not have enough money to purchase the item");
            return;
        }
        
        let displayText = "";
        
        if (result.status === "EXACT_CASH") {
            displayText = "No change due - customer paid with exact cash";
        } 
        else if (result.status === "OPEN") {
            displayText = "Status: OPEN";
            result.change.forEach(item => {
                displayText += ` ${item[0]}: $${item[1].toFixed(2)}`;
            });
        } 
        else if (result.status === "CLOSED") {
            displayText = "Status: CLOSED";
            // For CLOSED status, show all denominations that had money (not just change)
            result.change.forEach(item => {
                displayText += ` ${item[0]}: $${item[1].toFixed(2)}`;
            });
        } 
        else if (result.status === "INSUFFICIENT_FUNDS") {
            displayText = "Status: INSUFFICIENT_FUNDS";
        }
        
        changeDueDisplay.textContent = displayText;
    });
});