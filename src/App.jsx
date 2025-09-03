import React, { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";

const App = () => {
  const [num, setNum] = useState(0);
  const [type, setType] = useState("linear");
  const [gradients, setGradients] = useState([]);

  // Generate a random hex color
  const getHexColor = () => {
    const rgb = 255 * 255 * 255;
    const random = Math.random() * rgb;
    const int = Math.floor(random);
    const hexCode = int.toString(16);
    const colorHex = hexCode.padStart(6, "0");
    return `#${colorHex}`;
  };

  // Generate multiple gradients
  const generateGradients = () => {
    const colors= [];
    for (let i = 0; i < num; i++) {
      const color1 = getHexColor();
      const color2 = getHexColor();
      const degree = Math.floor(Math.random() * 360);
      const degreeString = `${degree}deg`;
      if(type==="linear"){
        colors.push({ 
        gradient :`linear-gradient(${degreeString}, ${color1}, ${color2})`,
        css:`background:linear-gradient(${degreeString}, ${color1}, ${color2})`
      });
      }else{
        colors.push({ 
          gradient :`radial-gradient(circle, ${color1}, ${color2})`,
          css:`background:radial-gradient(circle, ${color1}, ${color2})`
        });
      }
      console.log(colors);
   
    }
    setGradients(colors);
  };

  useEffect(() => {
    generateGradients();
  }, [num,type]);
 const onCopy=(css)=>{
   navigator.clipboard.writeText(css)
   toast.success("Copied")
 }
  return (
    <div className="min-h-screen bg-white py-12">
      <div className="w-9/12 mx-auto">
        <div className="flex justify-between">
          <h1 className="text-3xl font-bold  text-gray-800">
            Random Gradient Generator - {num} {type}
          </h1>
        </div>

        <div className="flex gap-4">
          <input
            type="number"
            className="border border-slate-400 bg-white rounded-lg w-[100px] p-2"
            placeholder="12"
            onChange={(e) => setNum(Number(e.target.value))}
          />

          <select
            value={type}
            className="border border-slate-400 bg-white rounded-lg w-[100px] p-2"
            onChange={(e) => setType(e.target.value)}
          >
            <option value="linear">Linear</option>
            <option value="radial">Radial</option>
          </select>

          <button
            onClick={generateGradients}
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          >
            Generate
          </button>
        </div>

        <div className="grid grid-cols-4 gap-4 mt-4">
          {gradients.map((item, index) => (
            <div
              key={index}
              className="h-[180px] rounded-xl relative"
              style={{background: item.gradient}}
            >
              <button
                className="bg-black/45 hover:bg-black text-white rounded absolute bottom-3 right-3 text-sm px-2 py-1"
                onClick={onCopy}
              >
                Copy
              </button>
            </div>
          ))}
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default App;
