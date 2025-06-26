// import { CheckCircle, XCircle } from 'lucide-react';
// import React from 'react';

// export interface BloodRequest {
//     id: number;
//     bloodGroup: string;
//     userName: string;
//     status: 'Pending' | 'Approved' | 'Rejected';
// }

// interface BloodRequestTableProps {
//     requests: BloodRequest[];
//     onApprove: (id: number) => void;
//     onReject: (id: number) => void;
// }

// const BloodRequestTable: React.FC<BloodRequestTableProps> = ({ requests, onApprove, onReject }) => {
//     return (
//         <div className="w-full max-w-4xl mx-auto ">
            
//             <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700">
//                 <thead>
//                     <tr className="bg-gray-100 text-left">
//                         <th className="px-4 py-2 border">Donated On</th>
//                         <th className="p-2 border">Blood Group</th>
//                         <th className="p-2 border">User Name</th>
//                         {/* <th className="p-2 border">Action / Status</th> */}
//                     </tr>
//                 </thead>
//                 <tbody>
//                     {requests.map((req, idx) => (
//                         <tr key={req.id}>
//                             <td className="px-4 py-2 border">{idx + 1}</td>
//                             <td className="p-2 border">{req.bloodGroup}</td>
//                             <td className="p-2 border">{req.userName}</td>
//                             {/* <td className="p-2 border">
//                                 {req.status === 'Pending' ? (
//                                     <div className="space-x-2">
//                                         <button onClick={() => onApprove(req.id)} className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded inline-flex items-center">
//                                             <CheckCircle size={18} />
//                                         </button>
//                                         <button onClick={() => onReject(req.id)} className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded inline-flex items-center">
//                                             <XCircle size={18} />
//                                         </button>
//                                     </div>
//                                 ) : (
//                                     <span className={`font-semibold ${req.status === 'Approved' ? 'text-green-600' : 'text-red-500'}`}>{req.status}</span>
//                                 )}
//                             </td> */}
//                         </tr>
//                     ))}
//                 </tbody>
//             </table>
//         </div>
//     );
// };

// export default BloodRequestTable;


import React from 'react';

export interface BloodRequest {
  id: number;
  bloodGroup: string;
  userName: string;
  status: 'Pending' | 'Approved' | 'Rejected';
  date?: string; // Added optional date field
}

interface BloodRequestTableProps {
  requests: BloodRequest[];
  onApprove: (id: number) => void;
  onReject: (id: number) => void;
}

const BloodRequestTable: React.FC<BloodRequestTableProps> = ({ requests, onApprove, onReject }) => {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <table className="min-w-full text-sm text-left border border-gray-200 dark:border-gray-700">
        <thead>
          <tr className="bg-gray-100 text-left text-gray-800 font-semibold">
      
            <th className="px-4 py-3 border">Date</th>
            <th className="px-4 py-3 border">Blood Group</th>
            <th className="px-4 py-3 border">User Name</th>
            
          </tr>
        </thead>
        <tbody>
          {requests.map((req, idx) => (
            <tr key={req.id} className="hover:bg-gray-50 dark:hover:bg-gray-800">
             
              <td className="px-4 py-2 border">{req.date || 'N/A'}</td>
              <td className="px-4 py-2 border">{req.bloodGroup}</td>
              <td className="px-4 py-2 border">{req.userName}</td>
            
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default BloodRequestTable;