import baseApi from "./@baseURL";

//fuel station login
const signIn = async (data) => {
  try {
    
    let response = await baseApi.post(
      "auth/loginStation",
      data
    );
    return response.data;
  } catch (err) {
    console.log(err);
    return err.response.data;
  }
};

//get dashboard info
const getDashBoard = async (id) => {

    try {
        
        let response = await baseApi.get(
            `station/dashboard/${id}`
        )

        if(response.headers["x-access-token"]){
            sessionStorage.setItem("accessToken", response.headers["x-access-token"]);
        }
        return response.data;
    } 
    catch (err) {
        return err.response.data;
    }
}

export { signIn, getDashBoard };
