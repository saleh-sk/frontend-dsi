// import UserHelper from "@/Utils/UserHelper";
// import axios from "axios";
// import React, { useEffect, useState } from "react";
// import variables from "variables";

// const ViewTeams = () => {
//   const [respMsg, setRespMsg] = useState("");
//   useEffect(() => {
//     const FetchTeams = async () => {
//       try {
//         const endpoint = variables.apiUrl + "v1/teams";
//         const resp = await axios.get(endpoint, {
//         headers: {
//           Authorization: `Bearer ${token}`,
//           "Content-Type": "application/json",
//         },
//       });
//       } catch (error) {
        
//       }
//     };
//     FetchTeams();
//   },[token]);

//   const [error, setError] = useState("");
//   const token = UserHelper.getToken();

//   if (!token) {
//     setError("No authorization token found. Please login again.");
//     return;
//   }

//   return (
//     <div>
//       {error && <p style={{ color: "red" }}>{error}</p>}
//       {respMsg && <p style={{ color: "green" }}>{respMsg}</p>}
//     </div>
//   );
// };

// export default ViewTeams;
