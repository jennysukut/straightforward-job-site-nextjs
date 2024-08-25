import Image from "next/image";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col items-center align-middle p-24 bg-cream">
      <h1 className="text-jade text-3xl">Straightforward Job Site</h1>
      <p className="text-lilac italic tracking-widest">testing out some tailwind classes + options</p>
      <button className="button bg-jade drop-shadow-smLime">test button</button>
      <button className="button bg-watermelon drop-shadow-olive max-w-52">new button with more text</button>

      <div className="borderContainer">
        <h3 className="text-jade text-lg">Here's a Heading</h3>
        <p className="text-jade">Smaller text test. Let's see what happens when we put more and more info in here.</p>
      </div>

      <div className="borderContainer">
        <h3 className="text-jade text-lg">Another Box</h3>
        <p className="text-jade italic text-sm">Here goes some italic text. Let's try and make it a bit smaller too and see what that does.</p>
      </div>

      <div className="solidContainer bg-emerald drop-shadow-apricot">
        <h3 className="text-lg">Testing header</h3>
        <p className="text-sm">Smaller text going here - it should be cream?</p>
      </div>
    </main>
  );
}
