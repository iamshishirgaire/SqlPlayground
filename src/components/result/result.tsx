import React from "react";

function Result() {
  return (
    <div className="border rounded-md overflow-auto">
      <table className="w-full text-sm pt-5">
        <thead>
          <tr>
            <th className="px-2 py-1 border-b">Name</th>
            <th className="px-2 py-1 border-b">Email</th>
            <th className="px-2 py-1 border-b">Country</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td className="px-2 py-1 border-b">John Doe</td>
            <td className="px-2 py-1 border-b">john@example.com</td>
            <td className="px-2 py-1 border-b">USA</td>
          </tr>
          <tr>
            <td className="px-2 py-1 border-b">Alice Smith</td>
            <td className="px-2 py-1 border-b">alice@example.com</td>
            <td className="px-2 py-1 border-b">UK</td>
          </tr>
          <tr>
            <td className="px-2 py-1 border-b">Carl Johnson</td>
            <td className="px-2 py-1 border-b">carl@example.com</td>
            <td className="px-2 py-1 border-b">Canada</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
}

export default Result;
