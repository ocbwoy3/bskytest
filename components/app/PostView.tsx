"use client";

import { agent } from "@/lib/api";
import { FeedViewPost, GeneratorView } from "@atproto/api/dist/client/types/app/bsky/feed/defs";
import React, { useEffect, useState } from "react";
import { toast } from "sonner";
import { Button } from "../ui/button";

type PostEmbedImage = {alt: string, fullsize: string, thumb: string};

function ThumbnailView({
	className,
	post,
	...props
}: React.HTMLAttributes<HTMLDivElement> & { post: FeedViewPost }) {
	const postText: string = (post.post.record as any).text;
	const imgs: PostEmbedImage[] = (post.post.embed?.images as []) || [];
	const external = (post.post.embed?.external as any);
	const isVideo = post.post.embed?.playlist;
	const hasPorn = imgs.length !== 0;

	// console.log(imgs)

	const labels = post.post.labels || [];

	const [showImage, setShowImage] = useState<boolean>(labels.length === 0);

	// if ((imgs.length) === 0 && !isVideo) return (<></>);

	return (
		<div>
			{ postText.length !== 0 ? <div className="w-full h-[3px]"></div> : "" }
			{
				(labels.length !== 0 && hasPorn) ? (
					<Button onClick={()=>{setShowImage(!showImage)}}>{showImage ? "Hide" : "Show"} images</Button>
				) : (<></>)
			}
			{
				isVideo ? (
					<>
						<Button onClick={()=>{
							window.navigator.clipboard.writeText(isVideo as string)
						}}>Copy m3u8 playlist url</Button>
						<div className="w-full h-[5px]"></div>
					</>
				) : (<></>)
			}	
			{
				showImage ? (imgs.map(a=>(
					<>
						<img key={a.thumb} src={a.thumb} alt={a.alt} className="rounded-md"/>
						<div className="w-full h-[5px]"></div>
					</>
				))) : (<></>)
			}
			{
				external ? (
					<>
						<img key={external.uri as string} src={external.uri} className="rounded-md"/>
						<div className="w-full h-[5px]"></div>
					</>
				) : (<></>)
			}		
		</div>
	)
}

export function PostView({
	className,
	...props
}: React.HTMLAttributes<HTMLDivElement>) {
	const [posts, setPosts] = useState<FeedViewPost[]>([])
	const [feedName, setFeedName] = useState<string>("Loading Feeds")
	
	useEffect(()=>{
		let debounce = false;
		((window || global) as any).refreshFeed = () => {
			if (debounce) return;
			debounce = true;

			agent.app.bsky.feed.getFeed({
				feed: (window as any).getFeedURI(),
				limit: 100,
			}).then((p)=>{
				setPosts(p.data.feed)
				debounce = false;
				agent.app.bsky.feed.getFeedGenerator({
					feed: (window as any).getFeedURI()
				}).then((g)=>{
					setFeedName(`${g.data.view.displayName} by @${g.data.view.creator.handle} - ${g.data.view.creator.did}`)
				})
			}).catch((e_)=>{
				console.error(e_)
				toast("Error calling app.bsky.feed.getFeed",{
					description: `${e_}`
				})
				debounce = false;
			})

		}
		((window || global) as any).refreshFeed();
	},[])

	return (
		<div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-[600px] max-w-[600px] max-h-screen">
			<div className="w-full h-8 text-ctp-lavender text-center items-center">
				{feedName}
			</div>
			<div className="max-h-fit overflow-y-auto text-wrap">
				{
					posts.map((post)=>(
						<div key={post.post.uri}>
							<div className="w-full h-[7px]"></div>
							<span className="inline-flex items-center">
								<img src={post.post.author.avatar || "/feed.png"} className="w-8 h-8 rounded-full"/>
								<div className="w-2 h-full"></div>
								<strong>{post.post.author.displayName || post.post.author.did}</strong>
								<div className="w-2 h-full"></div>
								<span className="text-ctp-subtext0">{"@"+post.post.author.handle}</span>
							</span>
							<div className="flex items-center">
								<div>
								</div>
							</div>
							{((post.post.record as any).text as string).length !== 0 ? (
								<>
									{((post.post.record as any).text as string)}
									<br/>
								</>
							) : ""}
							<ThumbnailView post={post}/>
							{
								post.post.labels?.map(a=>(
									<>Labaled as {a.val}<br/></>
								))
							}
							{post.post.likeCount} likes | {post.post.replyCount} replies | {post.post.repostCount} reskeets | {post.post.quoteCount} quote reskeets
							<div className="bg-white w-full h-[1px]"></div>
						</div>
					))
				}
			</div>
		</div>
	)
}

