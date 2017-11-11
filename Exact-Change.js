function checkCashRegister(price, cash, cid) {
  var changeOwed = 0;
  var changeGiven = [];
  var changeType = {
    PENNY: 0.01,
    NICKEL: 0.05,
    DIME: 0.10,
    QUARTER: 0.25,
    ONE: 1.00,
    FIVE: 5.00,
    TEN: 10.00,
    TWENTY: 20.00,
    'ONE HUNDRED': 100.00
  };
  var changeTally = {
    PENNY: 0,
    NICKEL: 0,
    DIME: 0,
    QUARTER: 0,
    ONE: 0,
    FIVE: 0,
    TEN: 0,
    TWENTY: 0,
    'ONE HUNDRED': 0
  };
  // Get difference of 2nd and 1st arg
  changeOwed = cash - price;

  // loop through cid and remove change from highest to lowest
  for (var i = 8; i >= 0; i--) {
    while (changeOwed >= changeType[cid[i][0]] && cid[i][1] >= changeType[cid[i][0]]) {
      changeOwed -= changeType[cid[i][0]];
      changeOwed = Math.round(changeOwed * 100) / 100;
      cid[i][1] -= changeType[cid[i][0]];
      cid[i][1] = Math.round(cid[i][1] * 100) / 100;
      changeTally[cid[i][0]]++;
    }
  }
  var cidTotal = 0.00;
  for (let i = 0; i < cid.length; i++) {
    cidTotal += cid[i][1];
    cidTotal = Math.round(cidTotal * 100) / 100;
  }
  if (changeOwed === 0) {
    if (cidTotal === 0) {
      changeGiven = "Closed";
    } else {
      // return array of change
      var keys = Object.keys(changeType);
      keys.reverse();
      for (let i = 0; i < keys.length; i++) {
        if (changeTally[keys[i]] !== 0) {
          changeGiven.push([keys[i], changeTally[keys[i]] * changeType[keys[i]]]);
        }
      }
    }
  } else {
    changeGiven = "Insufficient Funds";
  }
  return changeGiven;
}
// Examples
checkCashRegister(19.5, 20.0, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90.0],
  ['FIVE', 55.0],
  ['TEN', 20.0],
  ['TWENTY', 60.0],
  ['ONE HUNDRED', 100.0],
]); // returns [["QUARTER", 0.50]].
checkCashRegister(3.26, 100.0, [
  ['PENNY', 1.01],
  ['NICKEL', 2.05],
  ['DIME', 3.1],
  ['QUARTER', 4.25],
  ['ONE', 90.0],
  ['FIVE', 55.0],
  ['TEN', 20.0],
  ['TWENTY', 60.0],
  ['ONE HUNDRED', 100.0],
]); // returns [["TWENTY", 60.00], ["TEN", 20.00], ["FIVE", 15.00], ["ONE", 1.00], ["QUARTER", 0.50], ["DIME", 0.20], ["PENNY", 0.04]].
checkCashRegister(19.5, 20.0, [
  ['PENNY', 0.01],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]); // returns "Insufficient Funds".
checkCashRegister(19.5, 20.0, [
  ['PENNY', 0.01],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 1.0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]); // returns "Insufficient Funds".
checkCashRegister(19.5, 20.0, [
  ['PENNY', 0.5],
  ['NICKEL', 0],
  ['DIME', 0],
  ['QUARTER', 0],
  ['ONE', 0],
  ['FIVE', 0],
  ['TEN', 0],
  ['TWENTY', 0],
  ['ONE HUNDRED', 0],
]); // returns "Closed".