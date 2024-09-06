import SiteButton from "@/components/siteButton";

export default function Home() {
  return (
    <main className="Main flex flex-col items-center bg-cream p-24 align-middle">
      <div className="MainSection flex h-[36vh] w-full max-w-[1000px] items-center justify-center">
        <div className="ButtonContainer flex flex-col gap-8">
          <SiteButton
            aria="our difference"
            size="large"
            addClasses="w-[16vw]"
            variant="filled"
            colorScheme="a5"
          >
            what makes us different?
          </SiteButton>
          <SiteButton
            aria="view job listings"
            size="large"
            addClasses="w-full"
            variant="filled"
            colorScheme="b1"
          >
            explore jobs
          </SiteButton>
        </div>
        <h1 className="MainText ml-14 max-w-[37vw] font-sans font-bold text-jade">
          here, we utilize{" "}
          <span className="font-extrabold text-darkJade">honesty </span> and{" "}
          <span className="font-extrabold text-darkJade">transparency </span> to
          make job searching & hiring better for{" "}
          <span className="font-extrabold text-darkJade">
            every person involved.
          </span>
        </h1>
      </div>
    </main>
  );
}
