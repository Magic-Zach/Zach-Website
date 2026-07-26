import Nav        from "./components/Nav";
import Hero       from "./components/Hero";
import MyStory    from "./components/MyStory";
import MyThinking from "./components/MyThinking";
import Resume     from "./components/Resume";
import Contact    from "./components/Contact";
import Footer     from "./components/Footer";

export default function Home() {
  return (
    <>
      <Nav />
      <main>
        <Hero />
        <MyStory />
        <MyThinking />
        <Resume />
        <Contact />
      </main>
      <Footer />
    </>
  );
}
