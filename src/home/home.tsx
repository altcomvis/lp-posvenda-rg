import Header from "@/components/Header";
import VideoHero from "@/components/VideoHero";
import NumbersSection from "@/components/NumbersSection";
import AudienceSection from "@/components/AudienceSection";
import AwardsSection from "@/components/AwardsSection";
import AuditoriumsSection from "@/components/AuditoriumsSection";
import EstablishmentsSection from "@/components/EstablishmentsSection";
import ProducersSection from "@/components/ProducersSection";
import KidsSection from "@/components/KidsSection";
import ShowsSection from "@/components/ShowsSection";
import ActivationsSection from "@/components/ActivationsSection";
import MediaSection from "@/components/MediaSection";
import SponsorsSection from "@/components/SponsorsSection";
import Footer from "@/components/Footer";

export default function Home() {
	return (
		<div className="min-h-screen ">
			<Header />
			<main>
				<VideoHero />
				<NumbersSection />
				<AudienceSection />
				<AwardsSection />
				<AuditoriumsSection />
				<EstablishmentsSection />
				<ProducersSection />
				<KidsSection />
				<ShowsSection />
				<ActivationsSection />
				<MediaSection />
				<SponsorsSection />
			</main>
			<Footer />
		</div>
	);
}
