import SiteButton from "@/components/siteButton";

export default function Home() {
  return (
    <main className="Main flex flex-grow flex-col items-center bg-cream">
      <div className="MainSection flex w-full max-w-[1000px] flex-grow items-center justify-center">
        <div className="MainContainer flex -translate-y-[8vh] flex-col items-start gap-4">
          <h1 className="MainTitle text-2xl font-bold text-darkJade">
            What makes us different?
          </h1>
          <p className="MainText max-w-[700px] text-2xl font-bold text-jade">
            here, we utilize{" "}
            <span className="font-extrabold text-darkJade">honesty </span> and{" "}
            <span className="font-extrabold text-darkJade">transparency </span>{" "}
            to make job searching & hiring better for{" "}
            <span className="font-extrabold text-darkJade">
              every person involved.
            </span>
          </p>
          <div className="ButtonContainer mt-5 flex gap-8">
            <SiteButton
              aria="see our difference"
              size="large"
              variant="filled"
              colorScheme="a5"
            >
              learn more
            </SiteButton>
            <SiteButton
              aria="view job listings"
              size="large"
              variant="filled"
              colorScheme="b1"
            >
              explore jobs
            </SiteButton>
          </div>
        </div>
      </div>
    </main>
  );
}
