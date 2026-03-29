import { Canvas } from "@react-three/fiber";
import "./App.css";
import Dog from "./components/Dog";
import { Environment } from "@react-three/drei";

function App() {
  return (
    <>
      <main>
        <div className="images">
          <img id="image-1" src="/image-1.png" alt="image 1" />
          <img id="image-2" src="/image-2.png" alt="image 2" />
          <img id="image-3" src="/image-3.png" alt="image 3" />
          <img id="image-4" src="/image-4.png" alt="image 4" />
          <img id="image-5" src="/image-5.png" alt="image 5" />
          <img id="image-6" src="/image-6.png" alt="image 6" />
          <img id="image-7" src="/image-7.png" alt="image 7" />
        </div>
        <Canvas
          id="canvas-element"
          style={{
            height: "100vh",
            width: "100vw",
            position: "fixed",
            top: 0,
            left: 0,
            zIndex: 1,
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
        <section id="section-2">
          <div className="titles">
            <div img-title="image-1" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 1</h1>
            </div>
            <div img-title="image-2" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 1</h1>
            </div>
            <div img-title="image-3" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 1</h1>
            </div>
            <div img-title="image-4" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 3</h1>
            </div>
            <div img-title="image-5" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 4</h1>
            </div>
            <div img-title="image-6" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 5</h1>
            </div>
            <div img-title="image-7" className="title">
              <small>2020 - ONGOING</small>
              <h1>COOL SHADDER 6</h1>
            </div>
          </div>
        </section>
        <section id="sectoin-3"></section>
      </main>
    </>
  );
}

export default App;
