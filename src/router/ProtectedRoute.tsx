// // components/ProtectedRoute.tsx
// import { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import { getAdminProfile } from '../api/all.api';
// import { refreshAccessToken } from '../api/auth.api';

// const ProtectedRoute = ({ children }: { children: JSX.Element }) => {
//   const [loading, setLoading] = useState(true);
//   const navigate = useNavigate();

//   useEffect(() => {
//     const verifyAuth = async () => {
//       try {
//         await getAdminProfile();
//         setLoading(false);
//       } catch (error: any) {
//         const status = error?.response?.status;
//         console.warn("🔐 Auth failed with status:", status);

//         if ( status === 401) {
//           try {
//             console.log("🔄 Trying to refresh token...");
//             await refreshAccessToken();
//             await getAdminProfile();
//             setLoading(false);
//           } catch (refreshError) {
//             console.error("❌ Refresh failed:", refreshError);
//             navigate('/signin');
//           }
//         } else {
//           console.error("❌ Unknown auth error:", error);
//           navigate('/signin');
//         }
//       }
//     };

//     verifyAuth();
//   }, [navigate]);

//   if (loading) return <div className="text-center mt-10 text-lg font-medium">Loading...</div>;

//   return children;
// };

// export default ProtectedRoute;


import { useEffect, useState, ReactNode } from 'react';
import { useNavigate } from 'react-router-dom';
import { getAdminProfile } from '../api/all.api';
import { refreshAccessToken } from '../api/auth.api';

interface ProtectedRouteProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const verifyAuth = async () => {
      try {
        await getAdminProfile();
        setLoading(false);
      } catch (error: any) {
        const status = error?.response?.status;
        console.warn("🔐 Auth failed with status:", status);

        if (status === 401) {
          try {
            console.log("🔄 Trying to refresh token...");
            await refreshAccessToken();
            await getAdminProfile();
            setLoading(false);
          } catch (refreshError) {
            console.error("❌ Refresh failed:", refreshError);
            navigate('/signin');
          }
        } else {
          console.error("❌ Unknown auth error:", error);
          navigate('/signin');
        }
      }
    };

    verifyAuth();
  }, [navigate]);

  if (loading)
    return (
      <div className="text-center mt-10 text-lg font-medium">
        Loading...
      </div>
    );

  return <>{children}</>; // ReactNode works for fragments
};

export default ProtectedRoute;
