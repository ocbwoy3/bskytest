"use client";

import { useEffect } from "react";

export function InitalAppLoader({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
		
	useEffect(()=>{
		let currentFeedURI = "at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot";
		((window || global) as any).getFeedURI = () => { return currentFeedURI };
		((window || global) as any).setFeedURI = (a: string) => { currentFeedURI = a };
		/*
		manager.login({
			identifier: window?.localStorage?.BLUESKY_USERNAME,
			password: window?.localStorage?.BLUESKY_PASSWORD	
		})
		*/
	},[])

	return (<></>)
}
