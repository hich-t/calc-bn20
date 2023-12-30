"use client"
import React, { useState } from 'react';

const Home = () => {
  const [cartridgePrices, setCartridgePrices] = useState({ cyan: "", magenta: "", yellow: "", black: "" });
  const [inkUsage, setInkUsage] = useState({ cyan: "", magenta: "", yellow: "", black: "" });

  const updateCosts = () => {
    return Object.keys(inkUsage).reduce((total, color) => {
      const usage = parseFloat(inkUsage[color]) || 0;
      const price = parseFloat(cartridgePrices[color]) || 0;
      return total + (usage / 200) * price;
    }, 0);
  };

  const handleInputChange = (color, type) => e => {
    const value = parseFloat(e.target.value) || 0;
    if (type === 'price') {
      setCartridgePrices(prevPrices => ({ ...prevPrices, [color]: value }));
    } else {
      setInkUsage(prevUsage => ({ ...prevUsage, [color]: value }));
    }
  };

  const totalCost = updateCosts();

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold text-center mb-4 sm:text-2xl">Calculateur de coût d'impression pour Roland BN-20</h1>
      
      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">Prix des cartouches (€)</h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {['cyan', 'magenta', 'yellow', 'black'].map(color => (
            <div key={color} className="flex flex-col">
              <label className="font-medium">
                {color.charAt(0).toUpperCase() + color.slice(1)}:
              </label>
              <input
                type="number"
                value={cartridgePrices[color]}
                onChange={handleInputChange(color, 'price')}
                className="mt-1 p-2 text-black border border-gray-300 rounded-md"
              />
            </div>
          ))}
        </div>
      </div>

      <div className="mb-6">
        <h2 className="text-lg font-semibold mb-3 sm:text-xl">Consommation d'encre (cc)</h2>
        <table className="w-full text-sm sm:text-base">
          {/* <thead>
            <tr className="bg-gray-100">
              <th className="px-2 py-1 sm:px-3 sm:py-2">Couleur</th>
              <th className="px-2 py-1 sm:px-3 sm:py-2">Consommation (cc)</th>
            </tr>
          </thead> */}
          <tbody>
            {['cyan', 'magenta', 'yellow', 'black'].map(color => (
              <tr key={color}>
                <td className="px-2 py-1 sm:px-3 sm:py-2">{color.charAt(0).toUpperCase() + color.slice(1)}</td>
                <td className="px-2 py-1 sm:px-3 sm:py-2">
                  <input
                    type="number"
                    value={inkUsage[color]}
                    onChange={handleInputChange(color, 'usage')}
                    className="p-2 text-black border border-gray-300 rounded-md w-full"
                  />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      <h2 className="text-lg font-semibold sm:text-xl">Coût total: <span className="font-bold">{totalCost.toFixed(2)} €</span></h2>
    </div>
  );
}

export default Home;
