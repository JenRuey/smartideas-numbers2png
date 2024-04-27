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
  const lenpercharacter = 17
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
        return <text key={index} x={x_number + 2} y={25 * (index + 1) + (index * 1)} fontWeight="bold" fontSize="30px" fill="black" fontFamily='Ariel-Black'>
          {item}
        </text>
      })}
    </svg>
  );
}

function App() {
  const [text, setText] = React.useState("123")
  const [dataurl, setdataurl] = React.useState("")

  const onclick = () => {
    const svg = document.getElementById('print-area-svg');
    if (svg) {
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
          console.log(dataUrl)
          // const link = document.createElement('a');
          // link.href = dataUrl;
          // link.download = "my-image-name.png";
          // document.body.appendChild(link);
          // link.click();
          // document.body.removeChild(link);

          const img = new Image();
          img.crossOrigin = "anonymous";
          img.src = dataUrl;
          img.onload = () => {
            // create Canvas
            const canvas = document.createElement("canvas");
            const ctx = canvas.getContext("2d");
            canvas.width = img.width;
            canvas.height = img.height;
            if (ctx) {
              ctx.drawImage(img, 0, 0);
              let canvas_dataurl = canvas.toDataURL("image/png");
              // for create tag anchor
              const a = document.createElement("a");
              a.download = `image-download`;
              a.href = canvas_dataurl
              a.click();

              setdataurl(canvas_dataurl)
            }
          };
        })
        .catch((err) => {
          console.log(err);
        });


    }
  }

  console.log(dataurl)
  return (
    <div className="App">
      <hr/>
      <textarea value={text} onChange={(event) => {
        setText(event.target.value);
      }} style={{ fontSize: "30px", height: text.split("\n").length * 35 , textAlign:'center'}} />
      <hr/>
      <button onClick={onclick} style={{ padding: "20px 50px" }}>Convert</button>
      <hr/>
      {dataurl &&
        <img src={dataurl} />}
      <div style={{ border: "1px solid black", opacity: 0 }}>
        <ServiceRequestIcon texts={text.split("\n")} />
      </div>
    </div>
  );
}

export default App;
