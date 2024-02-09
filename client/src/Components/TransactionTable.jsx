import React from 'react';

const TransactionTable = ({ transactions }) => {
  // Create a reversed copy of the transactions array for displaying the latest transaction at the top
  const reversedTransactions = [...transactions].reverse();

  return (
    <div className="overflow-x-auto max-h-[75vh] max-w-full overflow-y-scroll shadow-md sm:rounded-lg font-Poppins">
      <table className="w-full text-sm text-left rtl:text-right text-[#faeaeb] dark:text-[#2f3d7e]">
        <thead className="text-xs uppercase bg-[#2f3d7e] text-[#faeaeb]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Transaction ID
            </th>
            <th scope="col" className="px-6 py-3">
              Account ID
            </th>
            <th scope="col" className="px-6 py-3">
              Type
            </th>
            <th scope="col" className="px-6 py-3">
              Amount
            </th>
            <th scope="col" className="px-6 py-3">
              Transaction Date
            </th>
            <th scope="col" className="px-6 py-3">
              Description
            </th>
          </tr>
        </thead>
        <tbody>
          {reversedTransactions.map((transaction) => (
            <tr key={transaction.TransactionID} className="border-b border-[#2f3d7e] odd:bg-white even:bg-gray-200 ">
              <td className="px-6 py-4">
                {transaction.TransactionID}
              </td>
              <td className="px-6 py-4">
                {transaction.AccountID}
              </td>
              <td className="px-6 py-4">
                {transaction.Type}
              </td>
              <td className="px-6 py-4">
                ₹{transaction.Amount}
              </td>
              <td className="px-6 py-4">
                {new Date(transaction.TransactionDate).toLocaleString()}
              </td>
              <td className="px-6 py-4 lg:w-32 overflow-hidden overflow-ellipsis whitespace-nowrap">
                {transaction.Description}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
