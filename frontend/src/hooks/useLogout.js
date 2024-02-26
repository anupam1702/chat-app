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
				headers: { "Content-Type": "application/json" },
			});
			const data = await res.json();
			console.log(data);
			if (data.error&& data.error !== 'Logged Out Successfully') {
				
				throw new Error(data.error);
			}
			
			// console.log("try ke ander middle");
			localStorage.removeItem('chat-user')
			// console.log("try ke ander niche");
			setAuthUser(null);
			// console.log("try ke ander niche2");
			
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, logout };
};
export default useLogout;
