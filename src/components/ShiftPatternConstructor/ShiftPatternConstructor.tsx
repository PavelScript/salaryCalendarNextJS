// "use client";

// import { useState } from "react";
// import styles from "./ShiftPatternConstructor.module.scss";

// type ShiftBlock = {
//   id: string;
//   type: "dayShift" | "nightShift" | "dayOff";
//   days: number;
// };

// const ShiftPatternConstructor = () => {
//   const [blocks, setBlocks] = useState<ShiftBlock[]>([
//     { id: "1", type: "dayShift", days: 2 },
//   ]);

//   const shiftOptions = [
//     { value: "dayShift", label: "день" },
//     { value: "nightShift", label: "ночь" },
//     { value: "dayOff", label: "выходной" },
//   ];

//   const handleTypeChange = (id: string, value: string) => {
//     setBlocks(blocks.map(b => b.id === id ? { ...b, type: value as any } : b));
//   };

//   const handleDaysChange = (id: string, value: string) => {
//     const num = Number(value);
//     if (!isNaN(num) && num >= 1) {
//       setBlocks(blocks.map(b => b.id === id ? { ...b, days: num } : b));
//     }
//   };

//   const addBlock = () => {
//     const newId = String(Date.now());
//     setBlocks([...blocks, { id: newId, type: "dayOff", days: 1 }]);
//   };

//   const removeBlock = (id: string) => {
//     if (blocks.length > 1) {
//       setBlocks(blocks.filter(b => b.id !== id));
//     }
//   };

//   const handleSubmit = (e: React.FormEvent) => {
//     e.preventDefault();
    
//     // Валидация: хотя бы один рабочий день
//     const hasWork = blocks.some(b => b.type !== "dayOff");
//     if (!hasWork) {
//       alert("График должен содержать хотя бы один рабочий день (день или ночь).");
//       return;
//     }

//     console.log("Собранный график:", blocks);
//     // Здесь вы можете передать blocks в родительский компонент через пропс или контекст
//   };

//   return (
//     <div className={styles.container}>
//       <div className={styles.inputField}>
//         <h2>Соберите свой график работы</h2>
//         <form onSubmit={handleSubmit}>
//           <div className={styles.blocksContainer}>
//             {blocks.map((block) => (
//               <div key={block.id} className={styles.blockRow}>
//                 <input
//                   type="number"
//                   inputMode="numeric"
//                   min="1"
//                   value={block.days}
//                   onChange={(e) => handleDaysChange(block.id, e.target.value)}
//                   className={styles.daysInput}
//                 />
//                 <select
//                   value={block.type}
//                   onChange={(e) => handleTypeChange(block.id, e.target.value)}
//                   className={styles.typeSelect}
//                 >
//                   {shiftOptions.map((opt) => (
//                     <option key={opt.value} value={opt.value}>
//                       {opt.label}
//                     </option>
//                   ))}
//                 </select>
//                 <button
//                   type="button"
//                   onClick={() => removeBlock(block.id)}
//                   className={styles.removeBtn}
//                   disabled={blocks.length <= 1}
//                 >
//                   🗑️
//                 </button>
//               </div>
//             ))}
//           </div>

//           <button type="button" onClick={addBlock} className={styles.addButton}>
//             + Добавить период
//           </button>

//           <div className={styles.formControls}>
//             <button type="button" className={styles.backButton}>
//               Назад
//             </button>
//             <button type="submit" className={styles.nextButton}>
//               Далее
//             </button>
//           </div>
//         </form>
//       </div>
//     </div>
//   );
// };

// export default ShiftPatternConstructor;