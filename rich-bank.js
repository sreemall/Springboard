const accounts = [
	{id: 1, owner: "Alice", balance: 500},
	{id: 2, owner: "Bob", balance: 300}
];

function getAccountById (id)
{
	for (const account of accounts)
	{
		if (account.id === id)
		{
			return account;
		}
	}
	return undefined;
}

function createAccount (newAccountId, newAccountOwner)
{
	if (!(Number.isInteger (newAccountId)) || newAccountId < 0) {
		throw new Error ("createAccount failed: Invalid Account Id: " + newAccountId + " Account Id must be positve Integer");
	}
	else if (!(typeof newAccountOwner === 'string') || newAccountOwner.length === 0) {
		throw new Error ("createAccount failed- account owner: " + newAccountOwner + " must be non empty string");
	}
	else {
		accounts.push(
			{
				id: newAccountId,
				owner: newAccountOwner,
				balance: 0
			}
		);
	}
}

function depositMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account: " + accountId + " not found");
	}
	else if (!(Number.isFinite (amount)) || amount <= 0)
	{
		throw new Error("depositMoney failed- Invalid value for deposit amount: " + amount + " The amount must be a finite positive number.");
	}
	else
		account.balance += amount;
}

function withdrawMoney (accountId, amount)
{
	const account = getAccountById(accountId);

	if (!account)
	{
		throw new Error("Account not found.");
	}
	else if (!Number.isFinite(amount) || amount <= 0)
	{
		throw new Error("withdrawMoney failed- " + amount +  " Invalid value for withdrawal amount: The amount must be a finite positive number.");
	}
	else
		account.balance -= amount;
}

function transferMoney (fromAccountId, toAccountId, amount)
{
	const fromAccount = getAccountById(fromAccountId);
	const toAccount = getAccountById(toAccountId);

	if (!fromAccount)
	{
		throw new Error("transferMoney failed- Source account not found. " + fromAccountId);
	}
	else if (!toAccount)
	{
		throw new Error("transferMoney failed- To account not found. " + toAccountId);
	}
	else if (!Number.isFinite(amount) || amount < 0)
	{
		throw new Error("transferMoney failed- Invalid value for transfer amount: " + amount +  " The amount must be a positive finite positive number.");
	}
	else
		toAccount.balance += amount;
}

/*
Hints: */

try {
getAccountById("1");

createAccount(1, "Alice");
//createAccount("3", "Charlie");
//createAccount(-3, "Charlie");
//createAccount(3, ["Charlie"]);
createAccount(3, "");
createAccount(3, "  ");

//depositMoney(1, "300")
//depositMoney(1, -300)
//depositMoney(1, 0)
//depositMoney(1, Infinity)
//depositMoney(4, 100)

//withdrawMoney(1, -100)
//withdrawMoney(1, 0)
withdrawMoney(1, 501)

//transferMoney(1, 4, 100)
transferMoney(1, 2, 501);
transferMoney(1, 2, 100);

}
catch (error) {
	console.log (error.message);
}