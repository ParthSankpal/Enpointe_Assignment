import React from 'react';
import TransactionTable from './TransactionTable';
import Modal from "react-modal";
import { AiOutlineClose } from "react-icons/ai";



const TransactionsModal = ({ isOpen, toggleModal, transactions }) => {
  if (!isOpen) return null;

  return (
    // <div className="fixed inset-0 bg-black bg-opacity-50 backdrop-blur-sm flex justify-center items-center">
    //   <div className="bg-white p-5 rounded-lg max-w-2xl w-full">
    //     <div className="flex justify-between items-center mb-4">
    //       <h2 className="text-2xl">Transactions</h2>
    //       <button onClick={toggleModal}>Close</button>
    //     </div>
    //     <TransactionTable transactions={transactions} />
    //   </div>
    // </div>

    <Modal
      isOpen={isOpen}
      onRequestClose={toggleModal}
      contentLabel="Transactions Modal"
    //   style={customStyles}
    >
      <div className="relative  h-full md:h-auto font-Poppins">
        {/* <div className="relative bg-white rounded-lg shadow dark:bg-gray-700"> */}
          <button
            type="button"
            className="absolute top-1 right-2.5 text- bg-transparent  rounded-lg text-sm p-1.5 ml-auto inline-flex items-center "
            onClick={toggleModal}
          >
            <AiOutlineClose className="text-2xl text-[#2f3d7e]" />
            <span className="sr-only">Close</span>
          </button>
          <div className=" w-full">
            <h3 className="mb-4 text-xl font-medium text-[#2f3d7e] ">Transaction Details</h3>
            <div className="overflow-auto">
              {/* Here you render the TransactionTable component, passing the transactions */}
              <TransactionTable transactions={transactions} />
            </div>
          </div>
        </div>
      {/* </div> */}
    </Modal>
  );
};

export default TransactionsModal;
