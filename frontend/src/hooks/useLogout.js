import { useState } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const useLogout = () => {

	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const logout = async () => {
		
		setLoading(true);
		try {
			
			const res = await fetch("/api/auth/logout", {
				method: "POST",
				headers: { "Content-Type": "application/json" ,
				"Access-Control-Allow-Origin": "*"},
			});
			const data = await res.json();
			console.log(data);
			
			localStorage.removeItem('chat-user')
			
			setAuthUser(null);
			
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
