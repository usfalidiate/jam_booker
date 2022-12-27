import styles from '../styles/Home.module.css'
import {useState, useEffect, useRef} from 'react';
import { initializeApp } from 'firebase/app';
import {
  getFirestore,
  collection,
  addDoc,
  getDocs,
  deleteDoc,
  doc,
  onSnapshot,
  updateDoc,
  getDoc,
  setDoc,
  child,
  query,
  fieldPath,
  where,
  documentId,
  querySnapshot,
} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyCZYEob1Y7WfewV1jcSeeCkiJ9PBBgwe4s",
  authDomain: "jambooker-c1e75.firebaseapp.com",
  projectId: "jambooker-c1e75",
  storageBucket: "jambooker-c1e75.appspot.com",
  messagingSenderId: "553558722528",
  appId: "1:553558722528:web:2f9b3c8480ca632b248d85"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {

  let currentDate = new Date();

  const [activeMonth, setActiveMonth] = useState( currentDate.getMonth() );
  const [activeYear, setActiveYear] = useState( currentDate.getFullYear() );
  const [activeDay, setActiveDay] = useState( currentDate.getDate() );

  const [unlock, setUnlock] = useState({ user1Unlock: true, user2Unlock: true, user3Unlock:true, user4Unlock:true });

  const docRef = doc( db, 'users', activeYear.toString(), 'Availability', activeMonth.toString() )

  const [trig, setTrig] = useState( false );


  /////////////////////////// INITIAL PUSH TO CREATE DOCS IN FIRESTORE //////////////////////////////
// const docRefPush = doc( db, 'users', '2022', 'Availability', '10' );

// useEffect(() => {
//   setDoc( docRefPush, {
//     user1: [
//       {day1: false},
//       {day2: false},
//       {day3: false},
//       {day4: false},
//       {day5: false},
//       {day6: false},
//       {day7: false},
//       {day8: false},
//       {day9: false},
//       {day10: false},
//       {day11: false},
//       {day12: false},
//       {day13: false},
//       {day14: false},
//       {day15: false},
//       {day16: false},
//       {day17: false},
//       {day18: false},
//       {day19: false},
//       {day20: false},
//       {day21: false},
//       {day22: false},
//       {day23: false},
//       {day24: false},
//       {day25: false},
//       {day26: false},
//       {day27: false},
//       {day28: false},
//       {day29: false},
//       {day30: false},
//       {day31: false},

//     ],

//     user2: [
//       {day1: true},
//       {day2: true},
//       {day3: true},
//       {day4: true},
//       {day5: true},
//       {day6: true},
//       {day7: true},
//       {day8: true},
//       {day9: true},
//       {day10: true},
//       {day11: true},
//       {day12: true},
//       {day13: true},
//       {day14: true},
//       {day15: true},
//       {day16: true},
//       {day17: true},
//       {day18: true},
//       {day19: true},
//       {day20: true},
//       {day21: true},
//       {day22: true},
//       {day23: true},
//       {day24: true},
//       {day25: true},
//       {day26: true},
//       {day27: true},
//       {day28: true},
//       {day29: true},
//       {day30: true},
//       {day31: true},
//     ],

//     user3: [
//       {day1: true},
//       {day2: true},
//       {day3: true},
//       {day4: true},
//       {day5: true},
//       {day6: true},
//       {day7: true},
//       {day8: true},
//       {day9: true},
//       {day10: true},
//       {day11: true},
//       {day12: true},
//       {day13: true},
//       {day14: true},
//       {day15: true},
//       {day16: true},
//       {day17: true},
//       {day18: true},
//       {day19: true},
//       {day20: true},
//       {day21: true},
//       {day22: true},
//       {day23: true},
//       {day24: true},
//       {day25: true},
//       {day26: true},
//       {day27: true},
//       {day28: true},
//       {day29: true},
//       {day30: true},
//       {day31: true},
//     ],

//     user4: [
//       {day1: false},
//       {day2: false},
//       {day3: false},
//       {day4: false},
//       {day5: false},
//       {day6: false},
//       {day7: false},
//       {day8: false},
//       {day9: false},
//       {day10: false},
//       {day11: false},
//       {day12: false},
//       {day13: false},
//       {day14: false},
//       {day15: false},
//       {day16: false},
//       {day17: false},
//       {day18: false},
//       {day19: false},
//       {day20: false},
//       {day21: false},
//       {day22: false},
//       {day23: false},
//       {day24: false},
//       {day25: false},
//       {day26: false},
//       {day27: false},
//       {day28: false},
//       {day29: false},
//       {day30: false},
//       {day31: false},
//     ] 
//   });
// },[]);
// /////////////////////////////////////////////////////////////////////////////////

  const [users, setUsers] = useState({
    user1: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
        day6: null,
        day7: null,
        day8: null,
        day9: null,
        day10: null,
        day11: null,
        day12: null,
        day13: null,
        day14: null,
        day15: null,
        day16: null,
        day17: null,
        day18: null,
        day19: null,
        day20: null,
        day21: null,
        day22: null,
        day23: null,
        day24: null,
        day25: null,
        day26: null,
        day27: null,
        day28: null,
        day29: null,
        day30: null,
        day31: null
      },

    user2: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
        day6: null,
        day7: null,
        day8: null,
        day9: null,
        day10: null,
        day11: null,
        day12: null,
        day13: null,
        day14: null,
        day15: null,
        day16: null,
        day17: null,
        day18: null,
        day19: null,
        day20: null,
        day21: null,
        day22: null,
        day23: null,
        day24: null,
        day25: null,
        day26: null,
        day27: null,
        day28: null,
        day29: null,
        day30: null,
        day31: null
      },

    user3: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
        day6: null,
        day7: null,
        day8: null,
        day9: null,
        day10: null,
        day11: null,
        day12: null,
        day13: null,
        day14: null,
        day15: null,
        day16: null,
        day17: null,
        day18: null,
        day19: null,
        day20: null,
        day21: null,
        day22: null,
        day23: null,
        day24: null,
        day25: null,
        day26: null,
        day27: null,
        day28: null,
        day29: null,
        day30: null,
        day31: null
      },

    user4: {
        day1: null,
        day2: null,
        day3: null,
        day4: null,
        day5: null,
        day6: null,
        day7: null,
        day8: null,
        day9: null,
        day10: null,
        day11: null,
        day12: null,
        day13: null,
        day14: null,
        day15: null,
        day16: null,
        day17: null,
        day18: null,
        day19: null,
        day20: null,
        day21: null,
        day22: null,
        day23: null,
        day24: null,
        day25: null,
        day26: null,
        day27: null,
        day28: null,
        day29: null,
        day30: null,
        day31: null 
      }

  })
 
/////////////////// CHANGE MONTH & WEEK DAY NUMBERS TO NAMES /////////////////////
const monthToName = () => {
  if (activeMonth == 0) { return 'January' }
  if (activeMonth == 1) { return 'February' }
  if (activeMonth == 2) { return 'March' }
  if (activeMonth == 3) { return 'April' }
  if (activeMonth == 4) { return 'May' }
  if (activeMonth == 5) { return 'June' }
  if (activeMonth == 6) { return 'July' }
  if (activeMonth == 7) { return 'August' }
  if (activeMonth == 8) { return 'September' }
  if (activeMonth == 9) { return 'October' }
  if (activeMonth == 10) { return 'November' }
  if (activeMonth == 11) { return 'December' }
  if (activeMonth == undefined) { return currentDate.getMonth }  
}

const tableDayNameArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ];

function tableDayName (i) {
  let activeDate = new Date(activeYear, activeMonth, tableDayNameArray[i]);
      activeDate.getDay();
      if (activeDate.getDay() == 0) { return 'Sunday' }
      if (activeDate.getDay() == 1) { return 'Monday' }
      if (activeDate.getDay() == 2) { return 'Tuesday' }
      if (activeDate.getDay() == 3) { return 'Wednesday' }
      if (activeDate.getDay() == 4) { return 'Thursday' }
      if (activeDate.getDay() == 5) { return 'Friday' }
      if (activeDate.getDay() == 6) { return 'Saturday' }
}

///////////// SET INIT DATA FROM FIRESTORE ON LOAD //////////////////////////
  
  useEffect(()=> {
    const loadDoc = async () => {
      let initList = []
      try {
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
        const cloudState = docSnap.data();
        cloudState.id = docSnap.id;
        initList.push(cloudState);
          setUsers({
            user1: {
                day1: cloudState.user1[0].day1,
                day2: cloudState.user1[1].day2,
                day3: cloudState.user1[2].day3,
                day4: cloudState.user1[3].day4,
                day5: cloudState.user1[4].day5,
                day6: cloudState.user1[5].day6,
                day7: cloudState.user1[6].day7,
                day8: cloudState.user1[7].day8,
                day9: cloudState.user1[8].day9,
                day10: cloudState.user1[9].day10,
                day11: cloudState.user1[10].day11,
                day12: cloudState.user1[11].day12,
                day13: cloudState.user1[12].day13,
                day14: cloudState.user1[13].day14,
                day15: cloudState.user1[14].day15,
                day16: cloudState.user1[15].day16,
                day17: cloudState.user1[16].day17,
                day18: cloudState.user1[17].day18,
                day19: cloudState.user1[18].day19,
                day20: cloudState.user1[19].day20,
                day21: cloudState.user1[20].day21,
                day22: cloudState.user1[21].day22,
                day23: cloudState.user1[22].day23,
                day24: cloudState.user1[23].day24,
                day25: cloudState.user1[24].day25,
                day26: cloudState.user1[25].day26,
                day27: cloudState.user1[26].day27,
                day28: cloudState.user1[27].day28,
                day29: cloudState.user1[28].day29,
                day30: cloudState.user1[29].day30,
                day31: cloudState.user1[30].day31,
            
              
            },
        
            user2: {
                day1: cloudState.user2[0].day1,
                day2: cloudState.user2[1].day2,
                day3: cloudState.user2[2].day3,
                day4: cloudState.user2[3].day4,
                day5: cloudState.user2[4].day5,
                day6: cloudState.user2[5].day6,
                day7: cloudState.user2[6].day7,
                day8: cloudState.user2[7].day8,
                day9: cloudState.user2[8].day9,
                day10: cloudState.user2[9].day10, 
                day11: cloudState.user2[10].day11,
                day12: cloudState.user2[11].day12,
                day13: cloudState.user2[12].day13,
                day14: cloudState.user2[13].day14,
                day15: cloudState.user2[14].day15,
                day16: cloudState.user2[15].day16,
                day17: cloudState.user2[16].day17,
                day18: cloudState.user2[17].day18,
                day19: cloudState.user2[18].day19,
                day20: cloudState.user2[19].day20,
                day21: cloudState.user2[20].day21,
                day22: cloudState.user2[21].day22,
                day23: cloudState.user2[22].day23,
                day24: cloudState.user2[23].day24,
                day25: cloudState.user2[24].day25,
                day26: cloudState.user2[25].day26,
                day27: cloudState.user2[26].day27,
                day28: cloudState.user2[27].day28,
                day29: cloudState.user2[28].day29,
                day30: cloudState.user2[29].day30,
                day31: cloudState.user2[30].day31,                             
            },
        
            user3: {
                day1: cloudState.user3[0].day1,
                day2: cloudState.user3[1].day2,
                day3: cloudState.user3[2].day3,
                day4: cloudState.user3[3].day4,
                day5: cloudState.user3[4].day5,
                day6: cloudState.user3[5].day6,
                day7: cloudState.user3[6].day7,
                day8: cloudState.user3[7].day8,
                day9: cloudState.user3[8].day9,
                day10: cloudState.user3[9].day10, 
                day11: cloudState.user3[10].day11,
                day12: cloudState.user3[11].day12,
                day13: cloudState.user3[12].day13,
                day14: cloudState.user3[13].day14,
                day15: cloudState.user3[14].day15,
                day16: cloudState.user3[15].day16,
                day17: cloudState.user3[16].day17,
                day18: cloudState.user3[17].day18,
                day19: cloudState.user3[18].day19,
                day20: cloudState.user3[19].day20,
                day21: cloudState.user3[20].day21,
                day22: cloudState.user3[21].day22,
                day23: cloudState.user3[22].day23,
                day24: cloudState.user3[23].day24,
                day25: cloudState.user3[24].day25,
                day26: cloudState.user3[25].day26,
                day27: cloudState.user3[26].day27,
                day28: cloudState.user3[27].day28,
                day29: cloudState.user3[28].day29,
                day30: cloudState.user3[29].day30,
                day31: cloudState.user3[30].day31,              
            },
        
            user4: {
                day1: cloudState.user4[0].day1,
                day2: cloudState.user4[1].day2,
                day3: cloudState.user4[2].day3,
                day4: cloudState.user4[3].day4,
                day5: cloudState.user4[4].day5,
                day6: cloudState.user4[5].day6,
                day7: cloudState.user4[6].day7,
                day8: cloudState.user4[7].day8,
                day9: cloudState.user4[8].day9,
                day10: cloudState.user4[9].day10, 
                day11: cloudState.user4[10].day11,
                day12: cloudState.user4[11].day12,
                day13: cloudState.user4[12].day13,
                day14: cloudState.user4[13].day14,
                day15: cloudState.user4[14].day15,
                day16: cloudState.user4[15].day16,
                day17: cloudState.user4[16].day17,
                day18: cloudState.user4[17].day18,
                day19: cloudState.user4[18].day19,
                day20: cloudState.user4[19].day20,
                day21: cloudState.user4[20].day21,
                day22: cloudState.user4[21].day22,
                day23: cloudState.user4[22].day23,
                day24: cloudState.user4[23].day24,
                day25: cloudState.user4[24].day25,
                day26: cloudState.user4[25].day26,
                day27: cloudState.user4[26].day27,
                day28: cloudState.user4[27].day28,
                day29: cloudState.user4[28].day29,
                day30: cloudState.user4[29].day30,
                day31: cloudState.user4[30].day31,              
            }
            
        })         
                     
        } else {
          console.log('loadDoc shat the bed')
        }

      } catch(error) {
        console.log(error)
      }
    };
    loadDoc();
  }, [activeYear, activeMonth])

 


//////////////////    UPDATING FIRESTORE ON CLICK    ////////////////////////

useEffect(() => {
  let x = activeDay.toString();
  if (users.user1[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user1:[ 
        {day1: users.user1.day1},
        {day2: users.user1.day2}, 
        {day3: users.user1.day3},
        {day4: users.user1.day4},
        {day5: users.user1.day5},
        {day6: users.user1.day6},
        {day7: users.user1.day7},
        {day8: users.user1.day8},
        {day9: users.user1.day9},
        {day10: users.user1.day10},
        {day11: users.user1.day11},
        {day12: users.user1.day12}, 
        {day13: users.user1.day13},
        {day14: users.user1.day14},
        {day15: users.user1.day15},
        {day16: users.user1.day16},
        {day17: users.user1.day17},
        {day18: users.user1.day18},
        {day19: users.user1.day19},
        {day20: users.user1.day20},
        {day21: users.user1.day21},
        {day22: users.user1.day22}, 
        {day23: users.user1.day23},
        {day24: users.user1.day24},
        {day25: users.user1.day25},
        {day26: users.user1.day26},
        {day27: users.user1.day27},
        {day28: users.user1.day28},
        {day29: users.user1.day29},
        {day30: users.user1.day30},
        {day31: users.user1.day31},



 
      ],
    })
    } catch {
      console.log('no user1 update firestore on click true')

    }};
  
  if (users.user1[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user1:[ 
        {day1: users.user1.day1},
        {day2: users.user1.day2}, 
        {day3: users.user1.day3},
        {day4: users.user1.day4},
        {day5: users.user1.day5},
        {day6: users.user1.day6},
        {day7: users.user1.day7},
        {day8: users.user1.day8},
        {day9: users.user1.day9},
        {day10: users.user1.day10}, 
        {day11: users.user1.day11},
        {day12: users.user1.day12}, 
        {day13: users.user1.day13},
        {day14: users.user1.day14},
        {day15: users.user1.day15},
        {day16: users.user1.day16},
        {day17: users.user1.day17},
        {day18: users.user1.day18},
        {day19: users.user1.day19},
        {day20: users.user1.day20},
        {day21: users.user1.day21},
        {day22: users.user1.day22}, 
        {day23: users.user1.day23},
        {day24: users.user1.day24},
        {day25: users.user1.day25},
        {day26: users.user1.day26},
        {day27: users.user1.day27},
        {day28: users.user1.day28},
        {day29: users.user1.day29},
        {day30: users.user1.day30},
        {day31: users.user1.day31},    
      ],   
    })
    } catch {
      console.log('no user1 update firestore on click false')

    }
  }

  if (users.user2[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user2:[ 
        {day1: users.user2.day1},
        {day2: users.user2.day2}, 
        {day3: users.user2.day3},
        {day4: users.user2.day4},
        {day5: users.user2.day5},
        {day6: users.user2.day6},
        {day7: users.user2.day7},
        {day8: users.user2.day8},
        {day9: users.user2.day9},
        {day10: users.user2.day10}, 
        {day11: users.user2.day11},
        {day12: users.user2.day12}, 
        {day13: users.user2.day13},
        {day14: users.user2.day14},
        {day15: users.user2.day15},
        {day16: users.user2.day16},
        {day17: users.user2.day17},
        {day18: users.user2.day18},
        {day19: users.user2.day19},
        {day20: users.user2.day20},
        {day21: users.user2.day21},
        {day22: users.user2.day22}, 
        {day23: users.user2.day23},
        {day24: users.user2.day24},
        {day25: users.user2.day25},
        {day26: users.user2.day26},
        {day27: users.user2.day27},
        {day28: users.user2.day28},
        {day29: users.user2.day29},
        {day30: users.user2.day30},
        {day31: users.user2.day31}, 
      ],   
    })
    } catch {
      console.log('no user2 update firestore on click true')

    }
  }
  if (users.user2[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user2:[ 
        {day1: users.user2.day1},
        {day2: users.user2.day2}, 
        {day3: users.user2.day3},
        {day4: users.user2.day4},
        {day5: users.user2.day5},
        {day6: users.user2.day6},
        {day7: users.user2.day7},
        {day8: users.user2.day8},
        {day9: users.user2.day9},
        {day10: users.user2.day10}, 
        {day11: users.user2.day11},
        {day12: users.user2.day12}, 
        {day13: users.user2.day13},
        {day14: users.user2.day14},
        {day15: users.user2.day15},
        {day16: users.user2.day16},
        {day17: users.user2.day17},
        {day18: users.user2.day18},
        {day19: users.user2.day19},
        {day20: users.user2.day20},
        {day21: users.user2.day21},
        {day22: users.user2.day22}, 
        {day23: users.user2.day23},
        {day24: users.user2.day24},
        {day25: users.user2.day25},
        {day26: users.user2.day26},
        {day27: users.user2.day27},
        {day28: users.user2.day28},
        {day29: users.user2.day29},
        {day30: users.user2.day30},
        {day31: users.user2.day31},  
      ],   
    })
    } catch {
      console.log('no user2 update firestore on click false')

    }
  }

  if (users.user3[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user3:[ 
        {day1: users.user3.day1},
        {day2: users.user3.day2}, 
        {day3: users.user3.day3}, 
        {day4: users.user3.day4},
        {day5: users.user3.day5},
        {day6: users.user3.day6},
        {day7: users.user3.day7},
        {day8: users.user3.day8},
        {day9: users.user3.day9},
        {day10: users.user3.day10}, 
        {day11: users.user3.day11},
        {day12: users.user3.day12}, 
        {day13: users.user3.day13},
        {day14: users.user3.day14},
        {day15: users.user3.day15},
        {day16: users.user3.day16},
        {day17: users.user3.day17},
        {day18: users.user3.day18},
        {day19: users.user3.day19},
        {day20: users.user3.day20},
        {day21: users.user3.day21},
        {day22: users.user3.day22}, 
        {day23: users.user3.day23},
        {day24: users.user3.day24},
        {day25: users.user3.day25},
        {day26: users.user3.day26},
        {day27: users.user3.day27},
        {day28: users.user3.day28},
        {day29: users.user3.day29},
        {day30: users.user3.day30},
        {day31: users.user3.day31},        
      ],   
    })
    } catch {
      console.log('no user3 update firestore on click true')

    }
  }
  if (users.user3[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user3:[ 
        {day1: users.user3.day1},
        {day2: users.user3.day2}, 
        {day3: users.user3.day3},
        {day4: users.user3.day4},
        {day5: users.user3.day5},
        {day6: users.user3.day6},
        {day7: users.user3.day7},
        {day8: users.user3.day8},
        {day9: users.user3.day9},
        {day10: users.user3.day10}, 
        {day11: users.user3.day11},
        {day12: users.user3.day12}, 
        {day13: users.user3.day13},
        {day14: users.user3.day14},
        {day15: users.user3.day15},
        {day16: users.user3.day16},
        {day17: users.user3.day17},
        {day18: users.user3.day18},
        {day19: users.user3.day19},
        {day20: users.user3.day20},
        {day21: users.user3.day21},
        {day22: users.user3.day22}, 
        {day23: users.user3.day23},
        {day24: users.user3.day24},
        {day25: users.user3.day25},
        {day26: users.user3.day26},
        {day27: users.user3.day27},
        {day28: users.user3.day28},
        {day29: users.user3.day29},
        {day30: users.user3.day30},
        {day31: users.user3.day31},         
      ],   
    })
    } catch {
      console.log('no user3 update firestore on click false')

    }
  }

  if (users.user4[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user4:[ 
        {day1: users.user4.day1},
        {day2: users.user4.day2}, 
        {day3: users.user4.day3}, 
        {day4: users.user4.day4},
        {day5: users.user4.day5},
        {day6: users.user4.day6},
        {day7: users.user4.day7},
        {day8: users.user4.day8},
        {day9: users.user4.day9},
        {day10: users.user4.day10}, 
        {day11: users.user4.day11},
        {day12: users.user4.day12}, 
        {day13: users.user4.day13},
        {day14: users.user4.day14},
        {day15: users.user4.day15},
        {day16: users.user4.day16},
        {day17: users.user4.day17},
        {day18: users.user4.day18},
        {day19: users.user4.day19},
        {day20: users.user4.day20},
        {day21: users.user4.day21},
        {day22: users.user4.day22}, 
        {day23: users.user4.day23},
        {day24: users.user4.day24},
        {day25: users.user4.day25},
        {day26: users.user4.day26},
        {day27: users.user4.day27},
        {day28: users.user4.day28},
        {day29: users.user4.day29},
        {day30: users.user4.day30},
        {day31: users.user4.day31},        
      ],   
    })
    } catch {
      console.log('no user4 update firestore on click true')

    }
  }
  if (users.user4[`day${x}`] === false) {
    try {
    updateDoc(docRef, {
      user4:[ 
        {day1: users.user4.day1},
        {day2: users.user4.day2}, 
        {day3: users.user4.day3},
        {day4: users.user4.day4},
        {day5: users.user4.day5},
        {day6: users.user4.day6},
        {day7: users.user4.day7},
        {day8: users.user4.day8},
        {day9: users.user4.day9},
        {day10: users.user4.day10}, 
        {day11: users.user4.day11},
        {day12: users.user4.day12}, 
        {day13: users.user4.day13},
        {day14: users.user4.day14},
        {day15: users.user4.day15},
        {day16: users.user4.day16},
        {day17: users.user4.day17},
        {day18: users.user4.day18},
        {day19: users.user4.day19},
        {day20: users.user4.day20},
        {day21: users.user4.day21},
        {day22: users.user4.day22}, 
        {day23: users.user4.day23},
        {day24: users.user4.day24},
        {day25: users.user4.day25},
        {day26: users.user4.day26},
        {day27: users.user4.day27},
        {day28: users.user4.day28},
        {day29: users.user4.day29},
        {day30: users.user4.day30},
        {day31: users.user4.day31},         
      ],   
    })
    } catch {
      console.log('no user4 update firestore on click false')

    }
  }
}, [ trig ]);


/////// HANDLE CLICKS TO UPDATE USERS' STATE //////////////

const handleClick1 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user1: {
        ...users.user1, [`day${i}`]: !users.user1[`day${i}`]
      
    }
  }})
};

const handleClick2 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user2: {
        ...users.user2, [`day${i}`]: !users.user2[`day${i}`]
      
    }
  }})
};

const handleClick3 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user3: {
        ...users.user3, [`day${i}`]: !users.user3[`day${i}`]
      
    }
  }})
};

const handleClick4 = (i) => {
  setActiveDay(i);
  setTrig(prev=> !prev);
  setUsers (prev=>{return{
    ...users, user4: {
        ...users.user4, [`day${i}`]: !users.user4[`day${i}`]
      
    }
  }})
};






  return (
    <div>
      <h1>warmer</h1>


<h2>Select Year</h2>
        <button onClick={()=> setActiveYear(2022)}> 2022 </button>
        <button onClick={()=> setActiveYear(2023)}> 2023 </button>
        {/* <button onClick={()=> setActiveYear(2024)}> 2024 </button>
        <button onClick={()=> setActiveYear(2025)}> 2025 </button>
        <button onClick={()=> setActiveYear(2026)}> 2026 </button>
        <button onClick={()=> setActiveYear(2027)}> 2027 </button>
        <button onClick={()=> setActiveYear(2028)}> 2028 </button> */}

      <h2>Select Month</h2>
        <button onClick ={()=> setActiveMonth(0)}> January </button>
        <button onClick ={()=> setActiveMonth(1)}> February </button>
        <button onClick ={()=> setActiveMonth(2)}> March </button>
        <button onClick ={()=> setActiveMonth(3)}> April </button>
        <button onClick ={()=> setActiveMonth(4)}> May </button>
        <button onClick ={()=> setActiveMonth(5)}> June </button>
        <button onClick ={()=> setActiveMonth(6)}> July </button>
        <button onClick ={()=> setActiveMonth(7)}> August </button>
        <button onClick ={()=> setActiveMonth(8)}> September </button>
        <button onClick ={()=> setActiveMonth(9)}> October </button>
        <button onClick ={()=> setActiveMonth(10)}> November </button>
        <button onClick ={()=> setActiveMonth(11)}> December </button>

    <h1> You are currently looking at:  { monthToName() } { activeYear }     </h1>

    <table className='tableDefault'>
    <tbody>
    <tr>
      <th scope="topRow"> Date </th>
      <th scope="topRow"> Day </th>
      <th scope="topRow"> Meeks </th>
      <th scope="topRow"> Theuns </th>  
      <th scope="topRow"> Nathan </th>
      <th scope="topRow"> Troy </th>
    </tr>
 
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[0] }  </th>
      <th scope="rowDay"> { tableDayName(0) }  </th>
        <td>       
          <button onClick={ () => {
            handleClick1(1);    
          }} className={ users.user1.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > user 1 day 1 avail or unavail 
          </button>     
        </td>

        <td>       
          <button onClick={ () => {
            handleClick2(1);    
          }} className={ users.user2.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > user 2 day 1 avail or unavail 
          </button>     
        </td>

        <td>       
          <button onClick={ () => {
            handleClick3(1);    
          }} className={ users.user3.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > user 3 day 1 avail or unavail 
          </button>     
        </td>

        <td>       
          <button onClick={ () => {
            handleClick4(1);    
          }} className={ users.user4.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > user 4 day 1 avail or unavail 
          </button>     
        </td>

    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[1] }</th>
      <th scope="rowDay"> { tableDayName(1) } </th>
        <td>    
          <button onClick={ () => {
              handleClick1(2); 
            }} className={ users.user1.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 2 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(2); 
            }} className={ users.user2.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 2 avail or unavail 
            </button>      
        </td>

        <td>    
          <button onClick={ () => {
              handleClick3(2); 
            }} className={ users.user3.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 2 avail or unavail 
            </button>      
        </td>

        <td>    
          <button onClick={ () => {
              handleClick4(2); 
            }} className={ users.user4.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 2 avail or unavail 
            </button>      
        </td>

    </tr>
 
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[2] }</th>
      <th scope="rowDay"> { tableDayName(2) } </th>      
      <td>    
          <button onClick={ () => {
              handleClick1(3); 
            }} className={ users.user1.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 3 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(3); 
            }} className={ users.user2.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 3 avail or unavail 
            </button>      
        </td>

      <td>    
          <button onClick={ () => {
              handleClick3(3); 
            }} className={ users.user3.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 3 avail or unavail 
            </button>      
        </td>

      <td>    
          <button onClick={ () => {
              handleClick4(3); 
            }} className={ users.user4.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 3 avail or unavail 
            </button>      
        </td>

    </tr>
    
    <tr>
      <th scope="colDate">  { monthToName() } { tableDayNameArray[3] } </th>
      <th scope="rowDay"> { tableDayName(3) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(4); 
            }} className={ users.user1.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 4 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(4); 
            }} className={ users.user2.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 4 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(4); 
            }} className={ users.user3.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 4 avail or unavail 
            </button>      
        </td>        
        <td>    
          <button onClick={ () => {
              handleClick4(4); 
            }} className={ users.user4.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 4 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[4] } </th>
      <th scope="rowDay"> { tableDayName(4) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(5); 
            }} className={ users.user1.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 5 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(5); 
            }} className={ users.user2.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 5 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(5); 
            }} className={ users.user3.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 5 avail or unavail 
            </button>      
        </td>      
        <td>    
          <button onClick={ () => {
              handleClick4(5); 
            }} className={ users.user4.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 5 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[5] } </th>
      <th scope="rowDay"> { tableDayName(5) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(6); 
            }} className={ users.user1.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 6 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(6); 
            }} className={ users.user2.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 6 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(6); 
            }} className={ users.user3.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 6 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(6); 
            }} className={ users.user4.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 6 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[6] }</th>
      <th scope="rowDay"> { tableDayName(6) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(7); 
            }} className={ users.user1.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 7 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(7); 
            }} className={ users.user2.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 7 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(7); 
            }} className={ users.user3.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 7 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(7); 
            }} className={ users.user4.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 7 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[7] }</th>
      <th scope="rowDay"> { tableDayName(7) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(8); 
            }} className={ users.user1.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 8 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(8); 
            }} className={ users.user2.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 8 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(8); 
            }} className={ users.user3.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 8 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(8); 
            }} className={ users.user4.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 8 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[8] }</th>
      <th scope="rowDay"> { tableDayName(8) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(9); 
            }} className={ users.user1.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 9 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(9); 
            }} className={ users.user2.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 9 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(9); 
            }} className={ users.user3.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 9 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(9); 
            }} className={ users.user4.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 9 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[9] }</th>
      <th scope="rowDay"> { tableDayName(9) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(10); 
            }} className={ users.user1.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 10 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(10); 
            }} className={ users.user2.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 10 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(10); 
            }} className={ users.user3.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 10 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(10); 
            }} className={ users.user4.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 10 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[10] }</th>
      <th scope="rowDay"> { tableDayName(10) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(11); 
            }} className={ users.user1.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 11 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(11); 
            }} className={ users.user2.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 11 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(11); 
            }} className={ users.user3.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 11 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(11); 
            }} className={ users.user4.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 11 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[11] }</th>
      <th scope="rowDay"> { tableDayName(11) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(12); 
            }} className={ users.user1.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 12 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(12); 
            }} className={ users.user2.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 12 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(12); 
            }} className={ users.user3.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 12 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(12); 
            }} className={ users.user4.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 12 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[12] }</th>
      <th scope="rowDay"> { tableDayName(12) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(13); 
            }} className={ users.user1.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 13 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(13); 
            }} className={ users.user2.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 13 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(13); 
            }} className={ users.user3.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 13 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(13); 
            }} className={ users.user4.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 13 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[13] }</th>
      <th scope="rowDay"> { tableDayName(13) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(14); 
            }} className={ users.user1.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 14 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(14); 
            }} className={ users.user2.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 14 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(14); 
            }} className={ users.user3.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 14 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(14); 
            }} className={ users.user4.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 14 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[14] }</th>
      <th scope="rowDay"> { tableDayName(14) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(15); 
            }} className={ users.user1.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 15 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(15); 
            }} className={ users.user2.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 15 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(15); 
            }} className={ users.user3.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 15 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(15); 
            }} className={ users.user4.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 15 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[15] }</th>
      <th scope="rowDay"> { tableDayName(15) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(16); 
            }} className={ users.user1.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 16 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(16); 
            }} className={ users.user2.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 16 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(16); 
            }} className={ users.user3.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 16 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(16); 
            }} className={ users.user4.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 16 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[16] }</th>
      <th scope="rowDay"> { tableDayName(16) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(17); 
            }} className={ users.user1.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 17 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(17); 
            }} className={ users.user2.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 17 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(17); 
            }} className={ users.user3.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 17 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(17); 
            }} className={ users.user4.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 17 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[17] }</th>
      <th scope="rowDay"> { tableDayName(17) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(18); 
            }} className={ users.user1.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 18 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(18); 
            }} className={ users.user2.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 18 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(18); 
            }} className={ users.user3.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 18 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(18); 
            }} className={ users.user4.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 18 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[18] }</th>
      <th scope="rowDay"> { tableDayName(18) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(19); 
            }} className={ users.user1.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 19 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(19); 
            }} className={ users.user2.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 19 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(19); 
            }} className={ users.user3.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 19 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(19); 
            }} className={ users.user4.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 19 avail or unavail 
            </button>      
        </td>
    </tr>
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[19] }</th>
      <th scope="rowDay"> { tableDayName(19) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(20); 
            }} className={ users.user1.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 20 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(20); 
            }} className={ users.user2.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 20 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(20); 
            }} className={ users.user3.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 20 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(20); 
            }} className={ users.user4.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 20 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[20] }</th>
      <th scope="rowDay"> { tableDayName(20) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(21); 
            }} className={ users.user1.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 21 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(21); 
            }} className={ users.user2.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 21 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(21); 
            }} className={ users.user3.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 21 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(21); 
            }} className={ users.user4.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 21 avail or unavail 
            </button>      
        </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[21] }</th>
      <th scope="rowDay"> { tableDayName(21) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(22); 
            }} className={ users.user1.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 22 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(22); 
            }} className={ users.user2.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 22 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(22); 
            }} className={ users.user3.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 22 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(22); 
            }} className={ users.user4.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 22 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[22] }</th>
      <th scope="rowDay"> { tableDayName(22) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(23); 
            }} className={ users.user1.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 23 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(23); 
            }} className={ users.user2.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 23 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(23); 
            }} className={ users.user3.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 23 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(23); 
            }} className={ users.user4.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 23 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[23] }</th>
      <th scope="rowDay"> { tableDayName(23) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(24); 
            }} className={ users.user1.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 24 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(24); 
            }} className={ users.user2.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 24 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(24); 
            }} className={ users.user3.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 24 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(24); 
            }} className={ users.user4.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 24 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[24] }</th>
      <th scope="rowDay"> { tableDayName(24) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(25); 
            }} className={ users.user1.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 25 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(25); 
            }} className={ users.user2.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 25 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(25); 
            }} className={ users.user3.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 25 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(25); 
            }} className={ users.user4.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 25 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[25] }</th>
      <th scope="rowDay"> { tableDayName(25) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(26); 
            }} className={ users.user1.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 26 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(26); 
            }} className={ users.user2.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 26 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(26); 
            }} className={ users.user3.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 26 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(26); 
            }} className={ users.user4.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 26 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[26] }</th>
      <th scope="rowDay"> { tableDayName(26) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(27); 
            }} className={ users.user1.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 27 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(27); 
            }} className={ users.user2.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 27 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(27); 
            }} className={ users.user3.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 27 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(27); 
            }} className={ users.user4.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 27 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[27] }</th>
      <th scope="rowDay"> { tableDayName(27) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(28); 
            }} className={ users.user1.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 28 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(28); 
            }} className={ users.user2.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 28 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(28); 
            }} className={ users.user3.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 28 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(28); 
            }} className={ users.user4.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 28 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[28] }</th>
      <th scope="rowDay"> { tableDayName(28) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(29); 
            }} className={ users.user1.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 29 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(29); 
            }} className={ users.user2.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 29 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(29); 
            }} className={ users.user3.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 29 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(29); 
            }} className={ users.user4.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 29 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[29] }</th>
      <th scope="rowDay"> { tableDayName(29) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(30); 
            }} className={ users.user1.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 30 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(30); 
            }} className={ users.user2.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 30 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(30); 
            }} className={ users.user3.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 30 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(30); 
            }} className={ users.user4.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 30 avail or unavail 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[30] }</th>
      <th scope="rowDay"> { tableDayName(30) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(31); 
            }} className={ users.user1.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 31 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick2(31); 
            }} className={ users.user2.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 2 day 31 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick3(31); 
            }} className={ users.user3.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 3 day 31 avail or unavail 
            </button>      
        </td>
        <td>    
          <button onClick={ () => {
              handleClick4(31); 
            }} className={ users.user4.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 4 day 31 avail or unavail 
            </button>      
        </td>
    </tr>
    
    </tbody>
    </table>

    </div>
  );
}

