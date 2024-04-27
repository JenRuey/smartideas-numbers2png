import React from 'react';
import './App.css';
import { toPng } from 'html-to-image';

type Props = {
  texts: string[]
}

function ServiceRequestIcon({ texts }: Props) {
  if (texts.length == 0)
    return <div></div>

  const highest_length = [...texts].sort(
    function (a: string, b: string) {
      return b.length - a.length;
    }
  )[0].length
  const lenpercharacter = 17.3
  const width = lenpercharacter * highest_length
  const height = 26 * texts.length
  return (
    <svg
      id={"print-area-svg"}
      xmlns="http://www.w3.org/2000/svg"
      width={width}
      height={height}
      viewBox={"0 0 " + width + " " + height}
    >
      <rect fill="white" width={width} height={height}></rect>
      {texts.map((item, index) => {
        let x_number = (width - (item.length * lenpercharacter)) / 2
        return <text key={index} x={x_number} y={25 * (index + 1) + (index * 1)} fontWeight="bold" fontSize="30" fill="black">
          {item}
        </text>
      })}
    </svg>
  );
}

function App() {
  const [text, setText] = React.useState("123")

  const onclick = () => {
    const svg = document.getElementById('print-area-svg');
    if (svg){
      // // first an doctype
      // var svgDocType = document.implementation.createDocumentType('svg', "-//W3C//DTD SVG 1.1//EN", "http://www.w3.org/Graphics/SVG/1.1/DTD/svg11.dtd");
      // // then a new SVG Document
      // var svgDoc = document.implementation.createDocument('http://www.w3.org/2000/svg', 'svg', svgDocType);
      // // set its documentElement to our root svg node (well a clone of it)
      // svgDoc.replaceChild(svg.cloneNode(true), svgDoc.documentElement);

      // const svgData = new XMLSerializer().serializeToString(svgDoc);
      // const blob = new Blob([svgData], { type: 'image/svg+xml;charset=utf-8' });
      // const url = URL.createObjectURL(blob);
      // const link = document.createElement('a');
      // link.href = url;
      // link.download = 'text.svg';
      // document.body.appendChild(link);
      // link.click();
      // document.body.removeChild(link);
      toPng(svg, { cacheBust: false })
      .then((dataUrl) => {
        const link = document.createElement('a');
        link.href = dataUrl;
        link.download = "my-image-name.png";
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
      })
      .catch((err) => {
        console.log(err);
      });
    }
  }


  return (
    <div className="App">
      <button onClick={onclick} style={{ padding: "20px 50px" }}>Convert</button>
      <textarea value={text} onChange={(event) => {
        setText(event.target.value);
      }} style={{ height: text.split("\n").length * 16 }} />
      <div style={{ border: "1px solid black" }}>
        <ServiceRequestIcon texts={text.split("\n")} />
      </div>
    </div>
  );
}

export default App;
