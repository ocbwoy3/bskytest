"use client";

import { agent } from "@/lib/api";
import { GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import { useEffect, useState } from "react";
import { Sidebar, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarGroupLabel, SidebarMenuButton } from "../ui/sidebar";
import Image from "next/image";

function BlueskyLogo({
	className,
	...props
}: React.HTMLAttributes<HTMLOrSVGElement>) {
	return (<svg fill="none" viewBox="0 0 64 57" width="30" style={{width: "30px", height: "26.7188px"}}><path fill="#0085ff" d="M13.873 3.805C21.21 9.332 29.103 20.537 32 26.55v15.882c0-.338-.13.044-.41.867-1.512 4.456-7.418 21.847-20.923 7.944-7.111-7.32-3.819-14.64 9.125-16.85-7.405 1.264-15.73-.825-18.014-9.015C1.12 23.022 0 8.51 0 6.55 0-3.268 8.579-.182 13.873 3.805ZM50.127 3.805C42.79 9.332 34.897 20.537 32 26.55v15.882c0-.338.13.044.41.867 1.512 4.456 7.418 21.847 20.923 7.944 7.111-7.32 3.819-14.64-9.125-16.85 7.405 1.264 15.73-.825 18.014-9.015C62.88 23.022 64 8.51 64 6.55c0-9.818-8.578-6.732-13.873-2.745Z"></path></svg>)
}

/*

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

*/

const feedListTest = [
	"at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/whats-hot",
	"at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/bsky-team",
	"at://did:plc:z72i7hdynmk6r22z27h6tvur/app.bsky.feed.generator/with-friends",
	"at://did:plc:wzsilnxf24ehtmmc3gssy5bu/app.bsky.feed.generator/mentions",
	"at://did:plc:tenurhgjptubkk5zf5qhi3og/app.bsky.feed.generator/mutuals",
	"at://did:plc:tenurhgjptubkk5zf5qhi3og/app.bsky.feed.generator/catch-up",

	// Other
	"at://did:plc:jdkvwye2lf4mingzk7qdebzc/app.bsky.feed.generator/art-clean",
	"at://did:plc:vwzwgnygau7ed7b7wt5ux7y2/app.bsky.feed.generator/aaajwc4qiqvre",
	"at://did:plc:jdkvwye2lf4mingzk7qdebzc/app.bsky.feed.generator/art-nsfw",
	"at://did:plc:jdkvwye2lf4mingzk7qdebzc/app.bsky.feed.generator/furry-fursuit"
]

export function AppSidebar({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const [userFeeds, setUserFeeds] = useState<GeneratorView[]>([]);
	const [feeds, setFeeds] = useState<GeneratorView[]>([]);

	useEffect(()=>{
		agent.app.bsky.unspecced.getPopularFeedGenerators({
			limit: 40,
		}).then((feeds_response)=>{
			setFeeds(feeds_response.data.feeds)
		});

		agent.app.bsky.feed.getFeedGenerators({
			feeds: feedListTest
		}).then((feeds_response)=>{
			setUserFeeds(feeds_response.data.feeds)
		});

	},[])

	return (
		<Sidebar>
			<SidebarContent>
				
				<SidebarGroup>
					<SidebarGroupLabel>My Feeds</SidebarGroupLabel>
					<SidebarGroupContent>
						{
							userFeeds.map(feed=>(
								<SidebarMenuButton asChild key={feed.uri} onClick={()=>{
									((window || global) as any).setFeedURI(feed.uri);
									((window || global) as any).refreshFeed()
									console.log(`${feed.displayName} by @${feed.creator.handle}\n${feed.description}\n\nFeed URI: ${feed.uri}`)
								}}>
									<span>
										<img src={feed.avatar || "/feed.png"} className="w-6 h-6 rounded-md"/>
										<span>{feed.displayName}</span>
									</span>
								</SidebarMenuButton>
							))
						}
					</SidebarGroupContent>
				</SidebarGroup>

				<SidebarGroup>
					<SidebarGroupLabel>Discover</SidebarGroupLabel>
					<SidebarGroupContent>
						{
							feeds.map(feed=>{
								if (feedListTest.includes(feed.uri)) return (<></>);
								return (
									<SidebarMenuButton asChild key={feed.uri} onClick={()=>{
										((window || global) as any).setFeedURI(feed.uri);
										((window || global) as any).refreshFeed()
										console.log(`${feed.displayName} by @${feed.creator.handle}\n${feed.description}\n\nFeed URI: ${feed.uri}`)
									}}>
										<span>
											<img src={feed.avatar || "/feed.png"} className="w-6 h-6 rounded-md"/>
											<span>{feed.displayName}</span>
										</span>
									</SidebarMenuButton>
								)
							})
						}
					</SidebarGroupContent>
				</SidebarGroup>
			
			</SidebarContent>
		</Sidebar>
	)
}

