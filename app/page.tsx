import Nav        from "./components/Nav";
import Hero       from "./components/Hero";
import MyStory    from "./components/MyStory";
import Resume     from "./components/Resume";
import Footer     from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MyStory />
        <Resume />
      </main>
      <Footer />
    </>
  );
}
