import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionsModal from "../Components/TransactionsModal";
import ModalPayment from "../Components/ModalPayment";
import { PiCommand } from "react-icons/pi";
import AccountsTable from "../Components/AccountsTable";

const BankerDash = () => {
  const { currentUser } = useSelector((state) => state.user);
  const [accounts, setAccounts] = useState([]);
  console.log(accounts);
  const [selectedAccountTransactions, setSelectedAccountTransactions] =
    useState([]);
  const [isTransactionsModalOpen, setIsTransactionsModalOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    fetchAllAccountsData();
  }, [currentUser]);

  const fetchAllAccountsData = async () => {
    setIsLoading(true);
    try {
      const res = await fetch("/api/banker/allaccounts", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });

      const data = await res.json();
      setAccounts(data);
      //   console.log(data);
    } catch (error) {
      console.error("Failed to fetch accounts", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleViewTransactionsClick = async (accountId) => {
    setIsLoading(true);
    try {
      const res = await fetch(`/api/banker/transaction/${accountId}`);

      const data = await res.json();
      setSelectedAccountTransactions(data);
      console.log(data);
      toggleTransactionsModal();
    } catch (error) {
      console.error(
        `Failed to fetch transactions for account ${accountId}`,
        error
      );
    } finally {
      setIsLoading(false);
    }
  };

  const toggleTransactionsModal = () => {
    setIsTransactionsModalOpen(!isTransactionsModalOpen);
  };

  return (
    <>
      {isLoading ? (
        <div className="flex justify-center items-center min-h-screen">
          <PiCommand className="animate-spin text-6xl text-[#2f3d7e]" />
        </div>
      ) : (
        <>
          <div className="relative m-5 lg:m-12 lg:mx-24 flex flex-col  justify-center gap-10 text-[#faeaeb]">
            <div className="text-[#2f3d7e] font-bold text-lg lg:text-2xl ">
              Welcome Back {currentUser.Username}
            </div>
            <div className=" w-full">
              <div className="text-[#2f3d7e] font-bold text-sm lg:text-lg py-4">
                Accounts and their details
              </div>
              <AccountsTable
                accounts={accounts}
                onViewTransactionsClick={handleViewTransactionsClick}
              />
            </div>
          </div>
            <TransactionsModal
              isOpen={isTransactionsModalOpen}
              toggleModal={toggleTransactionsModal}
              transactions={selectedAccountTransactions}
            />
        </>
      )}
    </>
  );
};

export default BankerDash;
