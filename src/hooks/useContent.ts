import contentJson from "@/data/content.json";
import pdfsJson from "@/data/protectedPdfs.json";
import type { ContentData, ProtectedPdf } from "@/types/content";

export function useContent() {
	const content = contentJson as ContentData;
	const protectedPdfs = pdfsJson as ProtectedPdf[];

	return { content, protectedPdfs };
}
