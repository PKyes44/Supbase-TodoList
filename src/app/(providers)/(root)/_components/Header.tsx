"use client";

import Link from "next/link";
import React from "react";
import supabase from "@/supabase/client";
import { useAuth } from "../../../../../contexts/auth.context";

function Header() {
	const { isLoggedIn, isAuthInitialized } = useAuth();
	const handleClickLogOut = async () => {
		console.log("logOut");
		await supabase.auth.signOut();
	};

	return (
		<header className=" border-b border-black">
			<div className="w-[1000px] m-auto h-16 flex flex-row items-center justify-between ">
				<Link className="font-extrabold text-2xl" href="/">
					TODO-LIST
				</Link>
				{isAuthInitialized && (
					<nav>
						<ul className="flex flex-row gap-x-5">
							{isLoggedIn ? (
								<>
									<li>
										<Link href="/todos/new">Todo 생성</Link>
									</li>
									<li>
										<button onClick={handleClickLogOut}>
											로그아웃
										</button>
									</li>
								</>
							) : (
								<>
									<li>
										<Link href="/log-in">로그인</Link>
									</li>
									<li>
										<Link href="/sign-up">회원가입</Link>
									</li>
								</>
							)}
						</ul>
					</nav>
				)}
			</div>
		</header>
	);
}

export default Header;
