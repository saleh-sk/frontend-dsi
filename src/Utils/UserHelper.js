const UserHelper = {
  getAuthUser: () => {
    const authUserString = sessionStorage.getItem("authUser");
    return authUserString ? JSON.parse(authUserString) : null;
  },
  getToken: () => {
    const user = UserHelper.getAuthUser();
    return user?.token;
  }
};

export default UserHelper;
