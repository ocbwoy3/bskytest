import { PostView } from "@/components/app/PostView";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { agent } from "@/lib/api";
import Image from "next/image";

export default async function Home() {
	return (
		<PostView/>
	);
}
