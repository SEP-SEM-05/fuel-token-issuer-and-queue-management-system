import baseApi from "./@baseURL";

//fuel station login
const signIn = async (data) => {
  try {
    console.log(data);
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

export {signIn};
