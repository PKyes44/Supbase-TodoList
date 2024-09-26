"use client";

import {
	createContext,
	Dispatch,
	PropsWithChildren,
	SetStateAction,
	useContext,
	useState,
} from "react";

type InitialValue = {
	isLoggedIn: boolean;
	isAuthInitialized: boolean;
	setIsLoggedIn: Dispatch<SetStateAction<boolean>>;
	initializeAuth: () => void;
};
const initialValue: InitialValue = {
	isLoggedIn: false,
	isAuthInitialized: false,
	setIsLoggedIn: () => {},
	initializeAuth: () => {},
};

const AuthContext = createContext(initialValue);

export const useAuth = () => useContext(AuthContext);

export function AuthContextProvider({ children }: PropsWithChildren) {
	const [isLoggedIn, setIsLoggedIn] = useState(false);
	const [isAuthInitialized, setIsAuthInitialized] = useState(false);

	const initializeAuth = () => {
		setIsAuthInitialized(true);
	};

	const value = {
		isLoggedIn,
		isAuthInitialized,
		setIsLoggedIn,
		initializeAuth,
	};

	return (
		<AuthContext.Provider value={value}>{children}</AuthContext.Provider>
	);
}
