import { db } from "./db.js";
import render from "./render.js";

const listEl = document.querySelector(".accounts-list__container");
const detailsEl = document.querySelector(".details__list");

document.onreadystatechange = function (e) {
  if (document.readyState === "complete") {
    bankStart();
  }
};

function bankStart() {
  const accounts = db.accounts;
  render.loadAccountsList(listEl, accounts);
}

listEl.addEventListener("click", function (e) {
  const { id } = e.target.closest(".accounts-list__item").dataset;

  const accountTranzactions = db.functions.getAccoutTransactions(+id);

  const allAccounts = document.querySelectorAll(".accounts-list__item");
  allAccounts.forEach((accountDiv) => {
    accountDiv === e.target.closest(".accounts-list__item")
      ? accountDiv.classList.add("active")
      : accountDiv.classList.remove("active");
  });
  render.loadAccountDetails(id, detailsEl, accountTranzactions);
});
