# Exact-Change
A cash register drawer function `checkCashRegister()` that accepts a purchase price as the first argument (price), payment as the second argument (`cash`), and cash-in-drawer (`cid`) as the third argument.

`cid` is a 2D array listing available currency.

Returns the string `"Insufficient Funds"` if cash-in-drawer is less than the change due. Returns the string `"Closed"` if cash-in-drawer is equal to the change due.

Otherwise, returns change in coin and bills, sorted in highest to lowest order.