const AuthService = {
    login: (userrole: string, userid: string) => {
        if (userrole === "Admin" && userid === "12345") {
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", "Admin");
            localStorage.setItem("userid", userid);
            return true;
        } 
        if (userrole === "Doctor") { 
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", "Doctor");
            localStorage.setItem("userid", userid);
            return true;
        }
        if (userrole === "Patient" ) { 
            localStorage.setItem("auth", "true");
            localStorage.setItem("role", "Patient");
            localStorage.setItem("userid", userid);
            return true;
        }
        return false;
    },

    logout: () => {
        localStorage.removeItem("auth");
        localStorage.removeItem("role");
        localStorage.removeItem("userid");
    },

    isAuthenticated: () => localStorage.getItem("auth") === "true",
    getRole: () => localStorage.getItem("role"),
    getUserId: () => localStorage.getItem("userid")

}

export default AuthService;
