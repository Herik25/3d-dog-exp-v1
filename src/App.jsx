import { Canvas } from "@react-three/fiber";
import "./App.css";
import Dog from "./components/Dog";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <>
      <main>
        <Canvas
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
            backgroundImage: "url('/background-1.png')",
            backgroundSize: "cover",
          }}
        >
          <Dog />
          <Environment preset="city" />
        </Canvas>
        <section id="sectoin-1">
          <nav>
            <span className="nav-logo">HERIK</span>
            <div></div>
            <span className="center-text">COOL</span>
            <div></div>
            <img src="/menu-right.svg" alt="right-menu" />
          </nav>
          <div className="section-1-wrapper">
            <div className="section-1-main-div">
              <h1>
                THIS IS
                <br /> THE SHIT <br /> I WAS TRYING
                <br /> TO CREATE{" "}
              </h1>
              <div></div>
              <div></div>
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Esse
                harum debitis delectus minima dignissimos veritatis laborum
                odio, similique voluptates cupiditate eos iusto quod? Accusamus
                animi perferendis voluptate nam ex sed reprehenderit,
                repudiandae ipsum suscipit ad?
              </p>
            </div>
          </div>
        </section>
        <section id="sectoin-2"></section>
        <section id="sectoin-3"></section>
      </main>
    </>
  );
}

export default App;
