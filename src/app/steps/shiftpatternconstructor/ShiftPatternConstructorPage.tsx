
// "use client";

// import { useRouter } from "next/navigation";
// import ShiftPatternConstructor from "@/components/ShiftPatternConstructor/ShiftPatternConstructor";
// import styles from "../Questions.module.scss";
// import Header from "@/components/Header/Header";
// import { useShiftStore } from "@/store/useShiftStore";
// import { useSalaryStore } from "@/store/useSalaryStore";

// const ShiftPatternConstructorPage = () => {
//   const router = useRouter();
//     const { hoursPerShift} =
//     useSalaryStore();



//   const {
//     shiftPatternKey,
//     setShiftPatternKey,
//     setShiftPattern,
//     setDayHours,
//     setNightHours,
//   } = useShiftStore();


//   let hoursPerShiftNumber: number;
  
//   if (hoursPerShift) {
//     hoursPerShiftNumber = hoursPerShift;
//   }

//   const goBack = () => {
//     router.push("/steps/hourspershift");
//   };

//   const handleSubmit = ({ shiftPatternKey }: { shiftPatternKey: string }) => {
//     setShiftPatternKey(shiftPatternKey);
//     switch (shiftPatternKey) {
//       case "1day1dayOff":
//         setShiftPattern(["dayShift", "offShift"]);
//         setDayHours([hoursPerShiftNumber, 0]);
//         setNightHours([0, 0]);
//         router.push("/steps/districtcoefficient");
//         break;
//       case "2days2daysOff":
//         setShiftPattern(["dayShift", "dayShift", "offShift", "offShift"]);
//         setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 0, 0]);
//         setNightHours([0, 0, 0, 0]);
//         router.push("/steps/districtcoefficient");
//         break;
//       case "2days2nights4daysOff":
//         setShiftPattern([
//           "dayShift",
//           "dayShift",
//           "nightShift",
//           "nightShift",
//           "offShift",
//           "offShift",
//           "offShift",
//           "offShift",
//         ]);
//         setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 2, 4, 2, 0, 0, 0]);
//         setNightHours([0, 0, 2, hoursPerShiftNumber-4, hoursPerShiftNumber-6, 0, 0, 0]);
//         router.push("/steps/nightBonus");
//         break;
//       case "2daysDayOff2nights3DaysOff":
//         setShiftPattern([
//           "dayShift",
//           "dayShift",
//           "offShift",
//           "nightShift",
//           "nightShift",
//           "offShift",
//           "offShift",
//           "offShift",
//         ]);
//         setDayHours([hoursPerShiftNumber, hoursPerShiftNumber, 0, 2, 4, 2, 0, 0]);
//         setNightHours([0, 0, 0, 2, hoursPerShiftNumber-4, hoursPerShiftNumber-6, 0, 0]);
//         router.push("/steps/nightBonus");
//         break;

//       case "1day1nightDayOff":
//         setShiftPattern(["dayShift", "nightShift", "offShift"]);
//         setDayHours([hoursPerShiftNumber, 2, 2]);
//         setNightHours([0, 2, hoursPerShiftNumber-6]);
//         router.push("/steps/nightBonus");
//         break;
//       default:
//         setShiftPattern([]);
//     }
//   };

//   //Получить выбранный график сменности от пользователя из QuestionSelect

//   return (
//     <div className={styles.container}>
//       <Header />
//       <div className={styles.questionForm}>
//         <div className={styles.note}><p>Сайт в активной разработке <br></br> Скоро появятся и другие варианты графиков</p></div>
//         <ShiftPatternConstructor
//           title="Выберите свой график работы"
//           label="График работы"
//           onSubmit={handleSubmit}
//           onBack={goBack}
//         />
//       </div>
//     </div>
//   );
// };

// export default ShiftPatternConstructorPage;
