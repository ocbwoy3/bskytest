"use client";

import {
	Menubar,
	MenubarContent,
	MenubarItem,
	MenubarMenu,
	MenubarSeparator,
	MenubarShortcut,
	MenubarTrigger,
} from "@/components/ui/menubar"
import { agent } from "@/lib/api";
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useEffect, useState } from "react";
import { HoverCard, HoverCardContent, HoverCardTrigger } from "../ui/hover-card";

const FeedAvatarFalback = (
	<svg width="24" height="24" viewBox="0 0 32 32" fill="none" stroke="none" data-testid="userAvatarFallback">
		<rect width="32" height="32" rx="4" fill="#0070FF"></rect>
		<path d="M13.5 7.25C13.5 6.55859 14.0586 6 14.75 6C20.9648 6 26 11.0352 26 17.25C26 17.9414 25.4414 18.5 24.75 18.5C24.0586 18.5 23.5 17.9414 23.5 17.25C23.5 12.418 19.582 8.5 14.75 8.5C14.0586 8.5 13.5 7.94141 13.5 7.25ZM8.36719 14.6172L12.4336 18.6836L13.543 17.5742C13.5156 17.4727 13.5 17.3633 13.5 17.25C13.5 16.5586 14.0586 16 14.75 16C15.4414 16 16 16.5586 16 17.25C16 17.9414 15.4414 18.5 14.75 18.5C14.6367 18.5 14.5312 18.4844 14.4258 18.457L13.3164 19.5664L17.3828 23.6328C17.9492 24.1992 17.8438 25.1484 17.0977 25.4414C16.1758 25.8008 15.1758 26 14.125 26C9.63672 26 6 22.3633 6 17.875C6 16.8242 6.19922 15.8242 6.5625 14.9023C6.85547 14.1602 7.80469 14.0508 8.37109 14.6172H8.36719ZM14.75 9.75C18.8906 9.75 22.25 13.1094 22.25 17.25C22.25 17.9414 21.6914 18.5 21 18.5C20.3086 18.5 19.75 17.9414 19.75 17.25C19.75 14.4883 17.5117 12.25 14.75 12.25C14.0586 12.25 13.5 11.6914 13.5 11C13.5 10.3086 14.0586 9.75 14.75 9.75Z" fill="white"></path>
	</svg>
)

function BlueskyLogo({
	className,
	...props
}: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (<svg fill="none" viewBox="0 0 64 57" width="30" style={{width: "30px", height: "26.7188px"}}><path fill="#0085ff" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>)
}

export function AppMenubar({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const [feeds, setFeeds] = useState<GeneratorView[]>([])

	useEffect(()=>{
		agent.app.bsky.unspecced.getPopularFeedGenerators({
			limit: 40,
		}).then((feeds_response)=>{
			setFeeds(feeds_response.data.feeds)
		})
	},[])

	return (
		<Menubar>
			<MenubarMenu>
				<MenubarTrigger><strong>Bluesky</strong></MenubarTrigger>
				<MenubarContent>
					<MenubarItem disabled>View Profile</MenubarItem>
					<MenubarItem disabled>Post</MenubarItem>
					<MenubarSeparator/>
					<MenubarItem disabled>Log In</MenubarItem>
				</MenubarContent>
			</MenubarMenu>
			<MenubarMenu>
				<MenubarTrigger>Feed</MenubarTrigger>
				<MenubarContent className="max-h-96 overflow-auto no-scrollbar">
					{feeds.map((feed) => (
						<MenubarItem key={feed.uri} onClick={()=>{
							console.log(`${feed.displayName} by @${feed.creator.handle}\n${feed.description}`)
							console.log(`Feed URI: ${feed.uri}`)
						}}>
							{ feed.avatar ? (
								<img src={feed.avatar || feed.creator.avatar} className="w-6 h-6 rounded-md"/>
							) : FeedAvatarFalback }
							<div className="w-2"></div>
							{feed.displayName}
						</MenubarItem>
					))}
				</MenubarContent>
			</MenubarMenu>
		</Menubar>
	)
}

