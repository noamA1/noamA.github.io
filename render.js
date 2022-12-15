class Render {
  loadAccountsList(parentEl, data) {
    const markup = data
      .map((acc) => {
        return `
            <div data-id="${acc.id}" class="accounts-list__item">
        
                <div>
                    <label>Account ID: </label> <span> ${acc.id}</span>
                </div>
                <div>
                    <label>Full name: </label> <span> ${acc.ownerId.lastName} ${acc.ownerId.firstName}</span>
                </div>
                <div>
                    <label>Client ID: </label> <span> ${acc.ownerId.id}</span>
                </div>
                <div>
                    <label>Balance: </label> <span> ${acc.balance}</span>
                </div>
            </div> `;
      })
      .join("");
    parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  loadAccountDetails(accId, parentEl, data) {
    this.clear(parentEl);

    let markup;
    if (data.length === 0) {
      markup = `<div class="error-message"> There are no transactions for account ${accId} yet.</div>`;
      return;
    }
    markup = data
      .map((trz) => {
        return `
        <div class="details__list--item">
            <div>
                <label>ID: </label> <span> ${trz.id}</span>
            </div>
            <div>
                <label>Transaction Type: </label> <span> ${trz.type}</span>
            </div>
            <div>
                <label>Amount: </label> <span> ${trz.amount}</span>
            </div>
        </div>`;
      })
      .join("");
    document.querySelector(
      ".details__title"
    ).textContent = `Detail for account ${data[0].accId}`;
    parentEl.insertAdjacentHTML("afterbegin", markup);
  }

  clear(element) {
    element.innerHTML = "";
  }
}

export default new Render();
