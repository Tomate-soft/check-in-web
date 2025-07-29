import { CheckInRegister } from "@/app/home/page";
const API_URL = "https://internal.api.tomatesoft.com/operating-period";

 export const getCurrentPeriodService = async ()=> {
     const response =  await fetch("https://internal.api.tomatesoft.com/operating-period/current", {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        },
      }
 ).then((res)=> res.json());
 return response;
}

export const updatePeriodService =  async (id: string, body: CheckInRegister[]) => {
  return await fetch(`${API_URL}/${id}`, {
    method: "PUT",
    headers: {
      "Content-Type" : "application/json",
    },
    body:JSON.stringify(body),
  }) 

}