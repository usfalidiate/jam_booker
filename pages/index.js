//////   INITIAL IMPORTS   //////
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

//////   FIRESTORE/FIREBASE CONFIG   //////
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

//////   CURRENT DATE   //////
let currentDate = new Date();

//////   USERS' NAMES   /////////
const user1Name = 'Meeks';
const user2Name = 'Theuns';
const user3Name = 'Nathan';
const user4Name = 'Troy';

//////   INITIAL SET STATES   //////
const [ activeMonth, setActiveMonth ] = useState( currentDate.getMonth() );
const [ activeYear, setActiveYear ] = useState( currentDate.getFullYear() );
const [ activeDay, setActiveDay ] = useState( currentDate.getDate() );
const [ unlock, setUnlock ] = useState({ user1Unlock: true, user2Unlock: true, user3Unlock:true, user4Unlock:true });
const [ trig, setTrig ] = useState( false );
const [ hide29, setHide29 ] = useState( false );
const [ hide30, setHide30 ] = useState( false );
const [ hide31, setHide31 ] = useState( false );

//////   FIRESTORE DOCREF   //////
const docRef = doc ( db, 'users', activeYear.toString(), 'Availability', activeMonth.toString() )

//////   INITIAL SET USERS DAY AVAILS TO NULL   //////
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
 
//////   CHANGE MONTH NUMBERS TO NAMES   //////
const monthToName = () => {
  if (activeMonth == 0) { return 'Jan' }
  if (activeMonth == 1) { return 'Feb' }
  if (activeMonth == 2) { return 'Mar' }
  if (activeMonth == 3) { return 'Apr' }
  if (activeMonth == 4) { return 'May' }
  if (activeMonth == 5) { return 'Jun' }
  if (activeMonth == 6) { return 'Jul' }
  if (activeMonth == 7) { return 'Aug' }
  if (activeMonth == 8) { return 'Sep' }
  if (activeMonth == 9) { return 'Oct' }
  if (activeMonth == 10) { return 'Nov' }
  if (activeMonth == 11) { return 'Dec' }
  if (activeMonth == undefined) { return currentDate.getMonth }  
}

//////   CHANGE MONTH NUMBERS TO NAMES - FULL NAME   //////
const monthToNameLong = () => {
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

//////   CHANGE WEEK DAY NUMBERS TO NAMES   //////
const tableDayNameArray = [ 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17, 18, 19, 20, 21, 22, 23, 24, 25, 26, 27, 28, 29, 30, 31 ];

function tableDayName (i) {
  let activeDate = new Date(activeYear, activeMonth, tableDayNameArray[i]);
      activeDate.getDay();
      if (activeDate.getDay() == 0) { return 'Sun' }
      if (activeDate.getDay() == 1) { return 'Mon' }
      if (activeDate.getDay() == 2) { return 'Tue' }
      if (activeDate.getDay() == 3) { return 'Wed' }
      if (activeDate.getDay() == 4) { return 'Thu' }
      if (activeDate.getDay() == 5) { return 'Fri' }
      if (activeDate.getDay() == 6) { return 'Sat' }
}

function tableDayNameLong (i) {
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

//////   SET INIT DATA FROM FIRESTORE ON LOAD   //////
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
}, [activeYear, activeMonth]);


//////   UPDATING FIRESTORE ON CLICK   //////
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


//////   HANDLE CLICKS TO UPDATE USERS' STATE   //////
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


//////   SET ALL AVAIL   //////
const setAllAvailUser1 =()=>{
  if (confirm((`${user1Name}, are you SURE that you want to set all dates as AVAILABLE?`)) == true) {
    setUsers(prev=> { return {
    ...users,
      user1: {
          day1: true, 
          day2: true, 
          day3: true, 
          day4: true, 
          day5: true, 
          day6: true, 
          day7: true, 
          day8: true, 
          day9: true, 
          day10: true,   
          day11: true, 
          day12: true, 
          day13: true, 
          day14: true, 
          day15: true, 
          day16: true, 
          day17: true, 
          day18: true, 
          day19: true, 
          day20: true, 
          day21: true, 
          day22: true, 
          day23: true, 
          day24: true, 
          day25: true, 
          day26: true, 
          day27: true, 
          day28: true, 
          day29: true, 
          day30: true, 
          day31: true                
      }}   
  });
  setTrig(prev=>!prev);
  }
  else {}
}

const setAllAvailUser2 =()=>{
  if (confirm((`${user2Name}, are you SURE that you want to set all dates as AVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user2: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);
  }
  else {}
}
  
const setAllAvailUser3 =()=>{
  if (confirm((`${user3Name}, are you SURE that you want to set all dates as AVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user3: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);
  }
  else {}
}
  
const setAllAvailUser4 =()=>{
  if (confirm((`${user4Name}, are you SURE that you want to set all dates as AVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user4: {
            day1: true, 
            day2: true, 
            day3: true, 
            day4: true, 
            day5: true, 
            day6: true, 
            day7: true, 
            day8: true, 
            day9: true, 
            day10: true,   
            day11: true, 
            day12: true, 
            day13: true, 
            day14: true, 
            day15: true, 
            day16: true, 
            day17: true, 
            day18: true, 
            day19: true, 
            day20: true, 
            day21: true, 
            day22: true, 
            day23: true, 
            day24: true, 
            day25: true, 
            day26: true, 
            day27: true, 
            day28: true, 
            day29: true, 
            day30: true, 
            day31: true                
        }}   
    });
    setTrig(prev=>!prev);
  }
  else {}
}

//////   SET ALL UNAVAIL   //////
const setAllUnAvailUser1 =()=>{
  if (confirm((`${user1Name}, are you SURE that you want to set all dates as UNAVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user1: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);    
  }
  else {}
}

const setAllUnAvailUser2 =()=>{
  if (confirm((`${user2Name}, are you SURE that you want to set all dates as UNAVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user2: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     
  }
  else {}
}
  
const setAllUnAvailUser3 =()=>{
  if (confirm((`${user3Name}, are you SURE that you want to set all dates as UNAVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user3: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     
  }
  else {}
}
  
const setAllUnAvailUser4 =()=>{
  if (confirm((`${user4Name}, are you SURE that you want to set all dates as UNAVAILABLE?`)) == true) {
    setUsers(prev=> { return {
      ...users,
        user4: {
            day1: false, 
            day2: false, 
            day3: false, 
            day4: false, 
            day5: false, 
            day6: false, 
            day7: false, 
            day8: false, 
            day9: false, 
            day10: false,   
            day11: false, 
            day12: false, 
            day13: false, 
            day14: false, 
            day15: false, 
            day16: false, 
            day17: false, 
            day18: false, 
            day19: false, 
            day20: false, 
            day21: false, 
            day22: false, 
            day23: false, 
            day24: false, 
            day25: false, 
            day26: false, 
            day27: false, 
            day28: false, 
            day29: false, 
            day30: false, 
            day31: false                
        }}   
    });
    setTrig(prev=>!prev);     
  }
  else {}
}

//////   HIDE EXTRA DAYS OF MONTHS   //////
  // 31 Days: January, March, May, July, August, October, December
  // 30 Days: April, June, Sept, November
  // 28 Days: February when NOT 2024, 2028, 2032...
  // 29 Days: February when 2024, 2028, 2032...

  // 31 Days: 0, 2, 4, 6, 7, 9, 11
  // 30 Days: 3, 5, 8, 10
  // 28 Days: 1 when activeYear != 2024, 2028, 2032...
  // 29 Days: 1 when activeYear = 2024, 2028, 2032...;
useEffect(() => {
      if ( activeMonth == 0 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }
      if ( activeMonth == 1 ) {
        setHide29( true );
        setHide30( true );
        setHide31( true );
      }

      if ( activeMonth == 2 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }

      if ( activeMonth == 3 ) {
        setHide29( false );
        setHide30( false );
        setHide31( true );
      }

      if ( activeMonth == 4 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }

      if ( activeMonth == 5 ) {
        setHide29( false );
        setHide30( false );
        setHide31( true );
      }

      if ( activeMonth == 6 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }

      if ( activeMonth == 7 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }

      if ( activeMonth == 8 ) {
        setHide29( false );
        setHide30( false );
        setHide31( true );
      }

      if ( activeMonth == 9 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }

      if ( activeMonth == 10 ) {
        setHide29( false );
        setHide30( false );
        setHide31( true );
      }

      if ( activeMonth == 11 ) {
        setHide29( false );
        setHide30( false );
        setHide31( false );
      }
      
},[ trig, activeMonth, activeYear ]);

//////   DATES WHERE ALL ARE FREE   //////
const space = '';

const allFree1 = () => {  
  if ((users.user1.day1 && users.user2.day1 && users.user3.day1 && users.user4.day1) == true ) {
    return [ <br></br>, '(', tableDayNameLong(0) , ' ', tableDayNameArray[0], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {
    
  }   
};

const allFree2 = () => {  
  if ((users.user1.day2 && users.user2.day2 && users.user3.day2 && users.user4.day2) == true ) {
    return [ <br></br>, '(', tableDayNameLong(1), ' ',  tableDayNameArray[1], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree3 = () => {  
  if ((users.user1.day3 && users.user2.day3 && users.user3.day3 && users.user4.day3) == true ) {
    return [ <br></br>, '(', tableDayNameLong(2) , ' ', tableDayNameArray[2], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree4 = () => {  
  if ((users.user1.day4 && users.user2.day4 && users.user3.day4 && users.user4.day4) == true ) {
    return [ <br></br>, '(', tableDayNameLong(3) , ' ', tableDayNameArray[3], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree5 = () => {  
  if ((users.user1.day5 && users.user2.day5 && users.user3.day5 && users.user4.day5) == true ) {
    return [ <br></br>, '(', tableDayNameLong(4) , ' ', tableDayNameArray[4], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree6 = () => {  
  if ((users.user1.day6 && users.user2.day6 && users.user3.day6 && users.user4.day6) == true ) {
    return [ <br></br>, '(', tableDayNameLong(5) , ' ', tableDayNameArray[5], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree7 = () => {  
  if ((users.user1.day7 && users.user2.day7 && users.user3.day7 && users.user4.day7) == true ) {
    return [ <br></br>, '(', tableDayNameLong(6) , ' ', tableDayNameArray[6], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree8 = () => {  
  if ((users.user1.day8 && users.user2.day8 && users.user3.day8 && users.user4.day8) == true ) {
    return [ <br></br>, '(', tableDayNameLong(7) , ' ', tableDayNameArray[7], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree9 = () => {  
  if ((users.user1.day9 && users.user2.day9 && users.user3.day9 && users.user4.day9) == true ) {
    return [ <br></br>, '(', tableDayNameLong(8) , ' ', tableDayNameArray[8], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree10 = () => {  
  if ((users.user1.day10 && users.user2.day10 && users.user3.day10 && users.user4.day10) == true ) {
    return [ <br></br>, '(', tableDayNameLong(9) , ' ', tableDayNameArray[9], ' ', monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree11 = () => {  
  if ((users.user1.day11 && users.user2.day11 && users.user3.day11 && users.user4.day11) == true ) {
    return [ <br></br>, '(', tableDayNameLong(10), ' ', tableDayNameArray[10], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree12 = () => {  
  if ((users.user1.day12 && users.user2.day12 && users.user3.day12 && users.user4.day12) == true ) {
    return [ <br></br>, '(', tableDayNameLong(11), ' ', tableDayNameArray[11], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree13 = () => {  
  if ((users.user1.day13 && users.user2.day13 && users.user3.day13 && users.user4.day13) == true ) {
    return [ <br></br>, '(', tableDayNameLong(12), ' ', tableDayNameArray[12], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree14 = () => {  
  if ((users.user1.day14 && users.user2.day14 && users.user3.day14 && users.user4.day14) == true ) {
    return [ <br></br>, '(', tableDayNameLong(13), ' ', tableDayNameArray[13], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree15 = () => {  
  if ((users.user1.day15 && users.user2.day15 && users.user3.day15 && users.user4.day15) == true ) {
    return [ <br></br>, '(', tableDayNameLong(14), ' ', tableDayNameArray[14], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree16 = () => {  
  if ((users.user1.day16 && users.user2.day16 && users.user3.day16 && users.user4.day16) == true ) {
    return [ <br></br>, '(', tableDayNameLong(15), ' ', tableDayNameArray[15], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree17 = () => {  
  if ((users.user1.day17 && users.user2.day17 && users.user3.day17 && users.user4.day17) == true ) {
    return [ <br></br>, '(', tableDayNameLong(16), ' ', tableDayNameArray[16], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree18 = () => {  
  if ((users.user1.day18 && users.user2.day18 && users.user3.day18 && users.user4.day18) == true ) {
    return [ <br></br>, '(', tableDayNameLong(17), ' ', tableDayNameArray[17], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree19 = () => {  
  if ((users.user1.day19 && users.user2.day19 && users.user3.day19 && users.user4.day19) == true ) {
    return [ <br></br>, '(', tableDayNameLong(18), ' ', tableDayNameArray[18], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree20 = () => {  
  if ((users.user1.day20 && users.user2.day20 && users.user3.day20 && users.user4.day20) == true ) {
    return [ <br></br>, '(', tableDayNameLong(19), ' ', tableDayNameArray[19], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree21 = () => {  
  if ((users.user1.day21 && users.user2.day21 && users.user3.day21 && users.user4.day21) == true ) {
    return [ <br></br>, '(', tableDayNameLong(20), ' ', tableDayNameArray[20], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree22 = () => {  
  if ((users.user1.day22 && users.user2.day22 && users.user3.day22 && users.user4.day22) == true ) {
    return [ <br></br>, '(', tableDayNameLong(21), ' ', tableDayNameArray[21], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree23 = () => {  
  if ((users.user1.day23 && users.user2.day23 && users.user3.day23 && users.user4.day23) == true ) {
    return [ <br></br>, '(', tableDayNameLong(22), ' ', tableDayNameArray[22], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree24 = () => {  
  if ((users.user1.day24 && users.user2.day24 && users.user3.day24 && users.user4.day24) == true ) {
    return [ <br></br>, '(', tableDayNameLong(23), ' ', tableDayNameArray[23], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree25 = () => {  
  if ((users.user1.day25 && users.user2.day25 && users.user3.day25 && users.user4.day25) == true ) {
    return [ <br></br>, '(', tableDayNameLong(24), ' ', tableDayNameArray[24], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree26 = () => {  
  if ((users.user1.day26 && users.user2.day26 && users.user3.day26 && users.user4.day26) == true ) {
    return [ <br></br>, '(', tableDayNameLong(25), ' ', tableDayNameArray[25], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree27 = () => {  
  if ((users.user1.day27 && users.user2.day27 && users.user3.day27 && users.user4.day27) == true ) {
    return [ <br></br>, '(', tableDayNameLong(26), ' ', tableDayNameArray[26], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree28 = () => {  
  if ((users.user1.day28 && users.user2.day28 && users.user3.day28 && users.user4.day28) == true ) {
    return [ <br></br>, '(', tableDayNameLong(27), ' ', tableDayNameArray[27], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
  } else {

  }
};

const allFree29 = () => {  
  if (hide29 == true) {
  } else {  
    if ((users.user1.day29 && users.user2.day29 && users.user3.day29 && users.user4.day29) == true ) {
      return [ <br></br>, '(', tableDayNameLong(28), ' ', tableDayNameArray[28], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
    } else {
    }
  }
};

const allFree30 = () => {  
  if (hide30 == true) {
  } else {
    if ((users.user1.day30 && users.user2.day30 && users.user3.day30 && users.user4.day30) == true ) {
      return [ <br></br>, '(', tableDayNameLong(29), ' ', tableDayNameArray[29], ' ',  monthToNameLong(), ')', <span className = 'pSpace'> {space} </span> ]
    } else {
    }
  }
};

const allFree31 = () => {  
  if (hide31 == true) {
  } else {    
    if ((users.user1.day31 && users.user2.day31 && users.user3.day31 && users.user4.day31) == true ) {
      return [ <br></br>, '(', tableDayNameLong(30), ' ',  tableDayNameArray[30], ' ',  monthToNameLong(), ')',<span className = 'pSpace'> {space} </span>  ]
    } else {
    }
  }
};

//////   RETURN ELEMENTS   //////
return (
<div className = 'myDiv'>
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>

      
<article className = 'tagLineArticle'>
  <h1 className = 'h1TagLine'> Powered by Jam Booker... </h1>
</article>

<article className = 'bandLogoArticle'>
    <img className = 'headerImg'
      src= 'https://i.imgur.com/MJ7Wtvy.jpg' //black bg image
      // src= 'https://i.imgur.com/ALUVQWE.gif' //transparent bg allegedly
    />
</article>

<article className = 'availSumTitleArticle'>
  <h2 className = 'h2AvailSum'>
    For the month of <span className = 'h2AvailSumMonth'> {monthToNameLong()} {activeYear}</span>, everyone is free to jam on:
  </h2>
</article>

<article className = 'availSumDatesArticle'>
  <h2 className = 'h2AllAvailDates'>
  
    {allFree1()} 
    {allFree2()} 
    {allFree3()} 
    {allFree4()} 
    {allFree5()} 
    {allFree6()} 
    {allFree7()} 
    {allFree8()} 
    {allFree9()} 
    {allFree10()} 
    {allFree11()} 
    {allFree12()} 
    {allFree13()} 
    {allFree14()} 
    {allFree15()} 
    {allFree16()} 
    {allFree17()} 
    {allFree18()} 
    {allFree19()} 
    {allFree20()} 
    {allFree21()} 
    {allFree22()} 
    {allFree23()} 
    {allFree24()} 
    {allFree25()} 
    {allFree26()} 
    {allFree27()} 
    {allFree28()} 
    {allFree29()} 
    {allFree30()} 
    {allFree31()} 
    <br></br>
    &nbsp;
  </h2>

</article>

<br></br>

<article className = 'yearArticle' >
  <h2 className = 'h2Year'>Select Year</h2>
    <button className = 'buttonYear' onClick={()=> setActiveYear(2022)}> 2022 </button>
    <button className = 'buttonYear' onClick={()=> setActiveYear(2023)}> 2023 </button>
</article>

<br></br>

<article className = 'monthArticle' >
  <h2>Select Month</h2>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(0)}> Jan </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(1)}> Feb </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(2)}> Mar </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(3)}> Apr </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(4)}> May </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(5)}> Jun </button>
    <br></br>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(6)}> Jul </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(7)}> Aug </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(8)}> Sep </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(9)}> Oct </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(10)}> Nov </button>
    <button className = 'buttonMonth' onClick ={()=> setActiveMonth(11)}> Dec </button>
</article>

<br></br>

<article className = 'activeDateArticle'>
  <h2> You are currently looking at: </h2>
  <h1> { monthToNameLong() } { activeYear } </h1>
</article>

<br></br>


    {/* {NUDE TABLE FOR UNLOCKS} */}
<article>
<table className='tableNude'>
  <tbody>
    <tr>
      <th className='thDateNude'></th>
      <th className='thDayNude'></th>

      <td className='tdUserNude'>
        <button onClick={()=>
          setUnlock(prev=>{return {...prev, user1Unlock: !unlock.user1Unlock};})} 
          className={ unlock.user1Unlock ? 'myButtonLocked' : 'myButtonUnlocked' }
          > { unlock.user1Unlock ? 'Locked' : 'Unlocked'} 
        </button>
      </td>

      <td className='tdUserNude'>
        <button onClick={()=>
          setUnlock(prev=>{return {...prev, user2Unlock: !unlock.user2Unlock}})} 
          className={ unlock.user2Unlock ? 'myButtonLocked' : 'myButtonUnlocked' }
          > { unlock.user2Unlock ? 'Locked' : 'Unlocked'} 
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button onClick={()=>
          setUnlock(prev=>{return {...prev, user3Unlock: !unlock.user3Unlock}})} 
          className={ unlock.user3Unlock ? 'myButtonLocked' : 'myButtonUnlocked' }
          > { unlock.user3Unlock ? 'Locked' : 'Unlocked'} 
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button onClick={()=>
          setUnlock(prev=>{return {...prev, user4Unlock: !unlock.user4Unlock}})} 
          className={ unlock.user4Unlock ? 'myButtonLocked' : 'myButtonUnlocked' }
          > { unlock.user4Unlock ? 'Locked' : 'Unlocked'} 
        </button>
      </td>
    </tr> 

                {/* {NUDE TABLE FOR SET ALL AVAILABLE} */}

    <tr>
    <th className='thDateNude'></th>
      <th className='thDayNude'></th>

      <td className='tdUserNude'>
        <button disabled={ unlock.user1Unlock } 
          className='myButtonSetAllAvail' 
          onClick={ setAllAvailUser1 }>
          Set All <br></br> Available <br></br> { user1Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user2Unlock } 
          className='myButtonSetAllAvail' 
          onClick={ setAllAvailUser2 }>
          Set All <br></br> Available <br></br> { user2Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user3Unlock } 
          className='myButtonSetAllAvail' 
          onClick={ setAllAvailUser3 }>
          Set All <br></br> Available <br></br> { user3Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user4Unlock } 
          className='myButtonSetAllAvail' 
          onClick={ setAllAvailUser4 }>
          Set All <br></br> Available <br></br>{ user4Name }
        </button>
      </td> 
    </tr>
            {/* {NUDE TABLE FOR SET ALL UNAVAILABLE} */}

    <tr>
      <th className='thDateNude'></th>
      <th className='thDayNude'></th>

      <td className='tdUserNude'>
        <button disabled={ unlock.user1Unlock } 
          className='myButtonSetAllUnavail' 
          onClick={ setAllUnAvailUser1 }>
          Set All <br></br> N/A <br></br> { user1Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user2Unlock } 
          className='myButtonSetAllUnavail' 
          onClick={ setAllUnAvailUser2 }>
          Set All <br></br> N/A <br></br> { user2Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user3Unlock } 
          className='myButtonSetAllUnavail' 
          onClick={ setAllUnAvailUser3 }>
          Set All <br></br> N/A <br></br> { user3Name }
        </button>
      </td>
      
      <td className='tdUserNude'>
        <button disabled={ unlock.user4Unlock } 
          className='myButtonSetAllUnavail' 
          onClick={ setAllUnAvailUser4 }>
          Set All <br></br> N/A <br></br>{ user4Name }
        </button>
      </td> 
    </tr>
  </tbody>
</table>
</article>


            {/* { MAIN TABLE FOR TOGGLE AVAILS } */}


<article>
<table className='tableAvails'>
  <tbody>
    <tr>
      <th className="thHeadDate"> Date </th>
      <th className="thHeadDay"> Day </th>
      <th className="thHeadUser"> { user1Name } </th>
      <th className="thHeadUser"> { user2Name } </th>  
      <th className="thHeadUser"> { user3Name } </th>
      <th className="thHeadUser"> { user4Name } </th>
    </tr>
 
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[0] }  </th>
      <th className="thDay"> { tableDayName(0) }  </th>
        <td className = "tdUser">       
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
            handleClick1(1);    
          }} className={ users.user1.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > { users.user1.day1  ? 'Available' : 'N/A' }
          </button>     
        </td>

        <td className = "tdUser">       
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
            handleClick2(1);    
          }} className={ users.user2.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          >{ users.user2.day1  ? 'Available' : 'N/A' } 
          </button>     
        </td>

        <td className = "tdUser">       
        <button 
        disabled={unlock.user3Unlock}
        onClick={ () => {
          handleClick3(1);    
          }} className={ users.user3.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          >{ users.user3.day1  ? 'Available' : 'N/A' } 
          </button>     
        </td>

        <td className = "tdUser">       
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
            handleClick4(1);    
          }} className={ users.user4.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          >{ users.user4.day1  ? 'Available' : 'N/A' } 
          </button>     
        </td>

    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[1] }</th>
      <th className="thDay"> { tableDayName(1) } </th>
        <td className = "tdUser">    
          <button
          disabled={unlock.user1Unlock} 
          onClick={ () => {
              handleClick1(2); 
            }} className={ users.user1.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day2  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(2); 
            }} className={ users.user2.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day2  ? 'Available' : 'N/A' } 
            </button>      
        </td>

        <td className = "tdUser">    
        <button 
        disabled={unlock.user3Unlock}
        onClick={ () => {
          handleClick3(2); 
            }} className={ users.user3.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day2  ? 'Available' : 'N/A' } 
            </button>      
        </td>

        <td className = "tdUser">    
        <button 
        disabled={unlock.user4Unlock}
        onClick={ () => {
          handleClick4(2); 
            }} className={ users.user4.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day2  ? 'Available' : 'N/A' } 
            </button>      
        </td>

    </tr>
 
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[2] }</th>
      <th className="thDay"> { tableDayName(2) } </th>      
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(3); 
            }} className={ users.user1.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day3  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(3); 
            }} className={ users.user2.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day3  ? 'Available' : 'N/A' } 
            </button>      
        </td>

      <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(3); 
            }} className={ users.user3.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day3  ? 'Available' : 'N/A' } 
            </button>      
        </td>

      <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(3); 
            }} className={ users.user4.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day3  ? 'Available' : 'N/A' } 
            </button>      
        </td>

    </tr>
    
    <tr>
      <th className="thDate">  { monthToName() } { tableDayNameArray[3] } </th>
      <th className="thDay"> { tableDayName(3) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(4); 
            }} className={ users.user1.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day4  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(4); 
            }} className={ users.user2.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day4  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(4); 
            }} className={ users.user3.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day4  ? 'Available' : 'N/A' } 
            </button>      
        </td>        
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(4); 
            }} className={ users.user4.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day4  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[4] } </th>
      <th className="thDay"> { tableDayName(4) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(5); 
            }} className={ users.user1.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day5  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(5); 
            }} className={ users.user2.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day5  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(5); 
            }} className={ users.user3.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day5  ? 'Available' : 'N/A' } 
            </button>      
        </td>      
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(5); 
            }} className={ users.user4.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day5  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[5] } </th>
      <th className="thDay"> { tableDayName(5) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(6); 
            }} className={ users.user1.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day6  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(6); 
            }} className={ users.user2.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day6  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(6); 
            }} className={ users.user3.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day6  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(6); 
            }} className={ users.user4.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day6  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[6] }</th>
      <th className="thDay"> { tableDayName(6) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(7); 
            }} className={ users.user1.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day7  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(7); 
            }} className={ users.user2.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day7  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(7); 
            }} className={ users.user3.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day7  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(7); 
            }} className={ users.user4.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day7  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[7] }</th>
      <th className="thDay"> { tableDayName(7) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(8); 
            }} className={ users.user1.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day8  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(8); 
            }} className={ users.user2.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day8  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(8); 
            }} className={ users.user3.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day8  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(8); 
            }} className={ users.user4.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day8  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[8] }</th>
      <th className="thDay"> { tableDayName(8) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(9); 
            }} className={ users.user1.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user1.day9  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(9); 
            }} className={ users.user2.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user2.day9  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(9); 
            }} className={ users.user3.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user3.day9  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(9); 
            }} className={ users.user4.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            >{ users.user4.day9  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[9] }</th>
      <th className="thDay"> { tableDayName(9) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(10); 
            }} className={ users.user1.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day10  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(10); 
            }} className={ users.user2.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day10  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(10); 
            }} className={ users.user3.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day10  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(10); 
            }} className={ users.user4.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day10  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[10] }</th>
      <th className="thDay"> { tableDayName(10) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(11); 
            }} className={ users.user1.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day11  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(11); 
            }} className={ users.user2.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day11  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(11); 
            }} className={ users.user3.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day11  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(11); 
            }} className={ users.user4.day11 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day11  ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[11] }</th>
      <th className="thDay"> { tableDayName(11) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(12); 
            }} className={ users.user1.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day12  ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(12); 
            }} className={ users.user2.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day12 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(12); 
            }} className={ users.user3.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day12 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(12); 
            }} className={ users.user4.day12 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day12 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[12] }</th>
      <th className="thDay"> { tableDayName(12) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(13); 
            }} className={ users.user1.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day13 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(13); 
            }} className={ users.user2.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day13 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(13); 
            }} className={ users.user3.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day13 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(13); 
            }} className={ users.user4.day13 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day13 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[13] }</th>
      <th className="thDay"> { tableDayName(13) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(14); 
            }} className={ users.user1.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day14 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(14); 
            }} className={ users.user2.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day14 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(14); 
            }} className={ users.user3.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day14 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(14); 
            }} className={ users.user4.day14 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day14 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[14] }</th>
      <th className="thDay"> { tableDayName(14) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(15); 
            }} className={ users.user1.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day15 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(15); 
            }} className={ users.user2.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day15 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(15); 
            }} className={ users.user3.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day15 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(15); 
            }} className={ users.user4.day15 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day15 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[15] }</th>
      <th className="thDay"> { tableDayName(15) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(16); 
            }} className={ users.user1.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day16 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(16); 
            }} className={ users.user2.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day16 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(16); 
            }} className={ users.user3.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day16 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(16); 
            }} className={ users.user4.day16 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day16 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[16] }</th>
      <th className="thDay"> { tableDayName(16) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(17); 
            }} className={ users.user1.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day17 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(17); 
            }} className={ users.user2.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day17 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(17); 
            }} className={ users.user3.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day17 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(17); 
            }} className={ users.user4.day17 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day17 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[17] }</th>
      <th className="thDay"> { tableDayName(17) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(18); 
            }} className={ users.user1.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day18 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(18); 
            }} className={ users.user2.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day18 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(18); 
            }} className={ users.user3.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day18 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(18); 
            }} className={ users.user4.day18 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day18 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[18] }</th>
      <th className="thDay"> { tableDayName(18) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(19); 
            }} className={ users.user1.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day19 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(19); 
            }} className={ users.user2.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day19 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(19); 
            }} className={ users.user3.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day19 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(19); 
            }} className={ users.user4.day19 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day19 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[19] }</th>
      <th className="thDay"> { tableDayName(19) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(20); 
            }} className={ users.user1.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day20 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(20); 
            }} className={ users.user2.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day20 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(20); 
            }} className={ users.user3.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day20 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(20); 
            }} className={ users.user4.day20 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day20 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[20] }</th>
      <th className="thDay"> { tableDayName(20) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(21); 
            }} className={ users.user1.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day21 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(21); 
            }} className={ users.user2.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day21 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(21); 
            }} className={ users.user3.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day21 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(21); 
            }} className={ users.user4.day21 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day21 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>

    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[21] }</th>
      <th className="thDay"> { tableDayName(21) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(22); 
            }} className={ users.user1.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day22 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(22); 
            }} className={ users.user2.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day22 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(22); 
            }} className={ users.user3.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day22 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(22); 
            }} className={ users.user4.day22 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day22 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[22] }</th>
      <th className="thDay"> { tableDayName(22) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(23); 
            }} className={ users.user1.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day23 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(23); 
            }} className={ users.user2.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day23 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(23); 
            }} className={ users.user3.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day23 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(23); 
            }} className={ users.user4.day23 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day23 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[23] }</th>
      <th className="thDay"> { tableDayName(23) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(24); 
            }} className={ users.user1.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day24 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(24); 
            }} className={ users.user2.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day24 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(24); 
            }} className={ users.user3.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day24 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(24); 
            }} className={ users.user4.day24 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day24 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[24] }</th>
      <th className="thDay"> { tableDayName(24) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(25); 
            }} className={ users.user1.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day25 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(25); 
            }} className={ users.user2.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day25 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(25); 
            }} className={ users.user3.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day25 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(25); 
            }} className={ users.user4.day25 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day25 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[25] }</th>
      <th className="thDay"> { tableDayName(25) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(26); 
            }} className={ users.user1.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day26 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(26); 
            }} className={ users.user2.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day26 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(26); 
            }} className={ users.user3.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day26 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(26); 
            }} className={ users.user4.day26 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day26 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[26] }</th>
      <th className="thDay"> { tableDayName(26) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(27); 
            }} className={ users.user1.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day27 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(27); 
            }} className={ users.user2.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day27 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(27); 
            }} className={ users.user3.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day27 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(27); 
            }} className={ users.user4.day27 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day27 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[27] }</th>
      <th className="thDay"> { tableDayName(27) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock}
          onClick={ () => {
              handleClick1(28); 
            }} className={ users.user1.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user1.day28 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock}
          onClick={ () => {
              handleClick2(28); 
            }} className={ users.user2.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user2.day28 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock}
          onClick={ () => {
              handleClick3(28); 
            }} className={ users.user3.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user3.day28 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock}
          onClick={ () => {
              handleClick4(28); 
            }} className={ users.user4.day28 ? 'buttonAvail' : 'buttonUnavail' } 
            > { users.user4.day28 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[28] }</th>
      <th className="thDay"> { tableDayName(28) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock || hide29 }
          onClick={ () => {
              handleClick1(29); 
            }} className={ hide29 ? 'buttonUndefined' : users.user1.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide29 ? ' ' : users.user1.day29 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock || hide29 }
          onClick={ () => {
              handleClick2(29); 
            }} className={ hide29 ? 'buttonUndefined' : users.user2.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide29 ? ' ' : users.user2.day29 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock || hide29 }
          onClick={ () => {
              handleClick3(29); 
            }} className={ hide29 ? 'buttonUndefined' : users.user3.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide29 ? ' ' : users.user3.day29 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock || hide29 }
          onClick={ () => {
              handleClick4(29); 
            }} className={ hide29 ? 'buttonUndefined' : users.user4.day29 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide29 ? ' ' : users.user4.day29 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[29] }</th>
      <th className="thDay"> { tableDayName(29) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock || hide30 }
          onClick={ () => {
              handleClick1(30); 
            }} className={ hide30 ? 'buttonUndefined' : users.user1.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide30 ? ' ' : users.user1.day30 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock || hide30}
          onClick={ () => {
              handleClick2(30); 
            }} className={ hide30 ? 'buttonUndefined' : users.user2.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide30 ? ' ' : users.user2.day30 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock || hide30}
          onClick={ () => {
              handleClick3(30); 
            }} className={ hide30 ? 'buttonUndefined' : users.user3.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide30 ? ' ' : users.user3.day30 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock || hide30}
          onClick={ () => {
              handleClick4(30); 
            }} className={ hide30 ? 'buttonUndefined' : users.user4.day30 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide30 ? ' ' : users.user4.day30 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>
    
    <tr>
      <th className="thDate"> { monthToName() } { tableDayNameArray[30] }</th>
      <th className="thDay"> { tableDayName(30) } </th>
      <td className = "tdUser">    
          <button 
          disabled={unlock.user1Unlock || hide31 }
          onClick={ () => {
              handleClick1(31); 
            }} className={ hide31 ? 'buttonUndefined' : users.user1.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide31 ? ' ' : users.user1.day31 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user2Unlock || hide31 }
          onClick={ () => {
              handleClick2(31); 
            }} className={ hide31 ? 'buttonUndefined' : users.user2.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide31 ? ' ' : users.user2.day31 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user3Unlock || hide31 }
          onClick={ () => {
              handleClick3(31); 
            }} className={ hide31 ? 'buttonUndefined' : users.user3.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide31 ? ' ' : users.user3.day31 ? 'Available' : 'N/A' } 
            </button>      
        </td>
        <td className = "tdUser">    
          <button 
          disabled={unlock.user4Unlock || hide31 }
          onClick={ () => {
              handleClick4(31); 
            }} className={ hide31 ? 'buttonUndefined' : users.user4.day31 ? 'buttonAvail' : 'buttonUnavail' } 
            > { hide31 ? ' ' : users.user4.day31 ? 'Available' : 'N/A' } 
            </button>      
        </td>
    </tr>    
  </tbody>
</table>
</article>
</div> 
);
}

