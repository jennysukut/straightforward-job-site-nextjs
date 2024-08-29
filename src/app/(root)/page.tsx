import SiteButton from "@/components/siteButton";

export default function Home() {
  return (
    <main className="Main flex flex-col items-center p-24 align-middle">
      <div className="MainSection flex h-[50vh] w-full max-w-[1000px] items-center justify-between">
        <h1 className="MainText max-w-[680px] text-3xl font-medium text-apricot">
          here, we utilize{" "}
          <span className="font-semibold text-orange">honesty </span> and{" "}
          <span className="font-semibold text-orange">transparency </span> to
          make job searching & hiring better for{" "}
          <span className="font-semibold text-orange">
            every person involved.
          </span>
        </h1>
        <div className="ButtonContainer flex flex-col gap-11">
          <SiteButton
            aria="our difference"
            size="large"
            addClasses="w-[260px]"
            variant="filled"
            colorScheme="d6"
          >
            what makes us different?
          </SiteButton>
          <SiteButton
            aria="view job listings"
            size="large"
            addClasses="w-full"
            variant="filled"
            colorScheme="c1"
          >
            explore jobs
          </SiteButton>
        </div>
      </div>
    </main>
  );
}
