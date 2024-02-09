import React from 'react';

const AccountsTable = ({ accounts, onViewTransactionsClick }) => {
  return (
    <div className="overflow-x-auto max-h-[75vh] max-w-full overflow-y-scroll shadow-md sm:rounded-lg font-Poppins">
      <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
        <thead className="text-xs uppercase bg-[#2f3d7e] text-[#faeaeb]">
          <tr>
            <th scope="col" className="px-6 py-3">
              Account ID
            </th>
            <th scope="col" className="px-6 py-3">
              Username
            </th>
            <th scope="col" className="px-6 py-3">
              User ID
            </th>
            <th scope="col" className="px-6 py-3">
              Balance
            </th>
            <th scope="col" className="px-6 py-3">
              Transactions
            </th>
          </tr>
        </thead>
        <tbody>
          {accounts.map((account) => (
            <tr key={account.AccountID} className="border-b border-[#2f3d7e]  odd:bg-white even:bg-gray-50 ">
              <td className="px-6 py-4">
                {account.AccountID}
              </td>
              <td className="px-6 py-4">
                {account.Username}
              </td>
              <td className="px-6 py-4">
                {account.UserID}
              </td>
              <td className="px-6 py-4">
                ₹{account.Balance}
              </td>
              <td className="px-6 py-4 text-left">
                <button
                  onClick={() => onViewTransactionsClick(account.AccountID)}
                  className="font-medium text-blue-600 dark:text-blue-500 hover:underline"
                >
                  View Transactions
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default AccountsTable;
