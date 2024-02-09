import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import TransactionTable from "../Components/TransactionTable";
import ModalPayment from "../Components/ModalPayment";
import { PiCommand } from "react-icons/pi";

const UserTransaction = () => {
  const [accountDetails, setAccountDetails] = useState({});

  const [transactions, setTransactions] = useState([]);

  const [isModalOpen, setIsModalOpen] = useState(false);

  const [updateTransactions, setUpdateTransactions] = useState(false);

  const [isLoading, setIsLoading] = useState(false);

  const [transactionType, setTransactionType] = useState("deposit");

  // console.log(transactions, 'Transaction Details');

  const { currentUser } = useSelector((state) => state.user);
  //   console.log(currentUser.UserID);

  const fetchAccountDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/account/${currentUser.UserID}`);
      const data = await res.json();
      // console.log(data);
      setAccountDetails(data);
    } catch (error) {
      console.error("Failed to fetch account details", error);
    } finally {
      setIsLoading(false);
    }
  };

  const fetchTransactionsDetails = async () => {
    try {
      setIsLoading(true);
      const res = await fetch(`/api/user/transactions/${currentUser.UserID}`);
      const data = await res.json();
      setTransactions(data);
      // setUpdateTransactions(false);
    } catch (error) {
      console.error("Failed to fetch transactions details", error);
    } finally {
      setIsLoading(false); // End loading
      setUpdateTransactions(false);
    }
  };

  useEffect(() => {
    if (currentUser && currentUser.UserID) {
      fetchAccountDetails();
      fetchTransactionsDetails();
    }
  }, [currentUser, updateTransactions]);

  const onTransactionAdded = () => {
    setUpdateTransactions(true);
    toggleModal();
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  return (
    <>
      <div className="relative m-5 lg:m-12 lg:mx-24 flex flex-col  justify-center gap-10 text-[#faeaeb] ">
        {isLoading && (
          <div className=" absolute left-[50%] top-[50%] flex justify-center items-center">
            <PiCommand className=" animate-spin text-4xl text-[#2f3d7e]" />
          </div>
        )}
        <div
          className={` ${
            isLoading ? "filter blur-sm" : ""
          } flex flex-col sm:flex-row justify-between gap-10`}
        >
          <div className=" flex flex-col bg-gray-200 rounded-lg backdrop-blur-xl border p-3 px-4">
            <div className="text-[#2f3d7e] font-bold text-lg lg:text-2xl ">
              Welcome Back {currentUser.Username}
            </div>
            <span className=" text-xs font-semibold text-[#2f3d7e] lg:text-lg lg:p-3 p-2">
              Account No: {accountDetails.AccountID}
            </span>
            <span className="text-sm font-semibold text-[#2f3d7e] lg:text-lg lg:p-3 p-2">
              Balance: ₹ {accountDetails.Balance}
            </span>
          </div>
          <div className=" flex sm:flex-col flex-wrap justify-end gap-8 items-center">
            <button
              onClick={() => {
                setTransactionType("deposit");
                toggleModal();
              }}
              className="text-sm font-semibold lg:text-lg bg-[#2f3d7e] rounded-lg lg:p-3 p-2"
            >
              Deposit Money
            </button>
            <button
              onClick={() => {
                setTransactionType("withdrawal");
                toggleModal();
              }}
              className="text-sm font-semibold lg:text-lg bg-[#2f3d7e] rounded-lg lg:p-3 p-2"
            >
              Withdraw Money
            </button>
          </div>
        </div>
        <div className=" ">
        <div className="text-[#2f3d7e] font-bold text-sm lg:text-lg py-4">
                Your transaction details
              </div>
          <TransactionTable transactions={transactions} />
        </div>
        <ModalPayment
          isModalOpen={isModalOpen}
          toggleModal={toggleModal}
          onTransactionAdded={onTransactionAdded}
          accountDetails={accountDetails}
          transactionType={transactionType}
        />
      </div>
    </>
  );
};

export default UserTransaction;
