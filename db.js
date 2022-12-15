class Client {
  firstName;
  lastName;
  id;

  constructor(id, fName, lName) {
    this.firstName = fName;
    this.lastName = lName;
    this.id = id;
  }
}

class Transaction {
  id;
  accId;
  type;
  amount;

  constructor(id, accNum, type, amount) {
    this.id = id;
    this.accId = accNum;
    this.type = type;
    this.amount = amount;
  }
}

class Account {
  id;
  ownerId;
  balance;

  constructor(id, owner) {
    this.id = id;
    this.ownerId = owner;
  }
}

export let db = {
  clients: [],
  accounts: [],
  transactions: [],
  functions: {
    getAccount: function (accId) {
      return db.accounts.find((acc) => acc.id === accId);
    },

    getAccoutTransactions: function (accId) {
      return db.transactions.filter((trz) => trz.accId === accId);
    },

    getUserBalance: function (accId) {
      return this.getAccoutTransactions(accId).reduce(
        (balance, trz) => (balance += trz.amount),
        0
      );
    },
  },
};

function getRandomNumber(max) {
  return Math.floor(Math.random() * max);
}

(function init() {
  // create clients array
  for (let c = 1; c < 6; c++) {
    const client = new Client(c * 769, "Moshe " + c * 3, "Mr. Pinto " + c * 5);
    db.clients.push(client);
  }

  for (let a = 1; a < 18; a++) {
    const account = new Account(a * 76, db.clients[getRandomNumber(5)]);
    db.accounts.push(account);
  }

  for (let t = 1; t < 120; t++) {
    const tempType = getRandomNumber(2) === 1 ? "Deposit" : "Withdraw";
    const accNumber = db.accounts[getRandomNumber(13)].id;
    const amount = getRandomNumber(3500);
    const transaction = new Transaction(
      t,
      accNumber,
      tempType,
      tempType === "Withdraw" ? amount * -1 : amount
    );
    db.transactions.push(transaction);
  }

  db.accounts.forEach(
    (acc) => (acc.balance = db.functions.getUserBalance(acc.id))
  );
})();
