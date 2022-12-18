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

  const [listOfAvails, setListOfAvails] = useState([]);
  const [load, setLoad] = useState();
  const [unlock, setUnlock] = useState({ user1Unlock: true, user2Unlock: true, user3Unlock:true, user4Unlock:true });

  const [buttonState1, setButtonState1] = useState();
  const [buttonState2, setButtonState2] = useState();
  const [buttonState3, setButtonState3] = useState();
  const [buttonState4, setButtonState4] = useState();

  const [users, setUsers] = useState({
    user1: {
      available: {
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
      }
    },

    user2: {
      availabile: {
        day1: null,
        day2: null,
        day3: null,
      }
    },

    user3: {
      availabile: {
        day1: null,
        day2: null,
        day3: null,
      }
    },

    user4: {
      availabile: {
        day1: null,
        day2: null,
        day3: null,
      }
    }

  })

  const colRefTest = collection( db, 'users', 'user1', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day' )

  const colRef1 = collection( db, 'users', 'user1', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day' )
  const docRef1 = doc( db, 'users', 'user1', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day', activeDay.toString() )

  const colRef2 = collection( db, 'users', 'user2', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day' )
  const docRef2 = doc( db, 'user2', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day', activeDay.toString(), 'button' )

  const colRef3 = collection( db, 'users', 'user3', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day' )
  const docRef3 = doc( db, 'user3', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day', activeDay.toString(), 'button' )

  const colRef4 = collection( db, 'users', 'user4', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day' )
  const docRef4 = doc( db, 'user4', 'year', activeYear.toString(), 'month', activeMonth.toString(), 'day', activeDay.toString(), 'button' )



useEffect(() => {
  let list1 = [];

  const loadData = async () => {
    const querySnapshot = await getDocs(colRef1);
    querySnapshot.forEach((doc) => {
      const cloudState = doc.data();
      cloudState.id = doc.id;
      list1.push(cloudState);
    });

    setListOfAvails([...list1]);

    
    let day1 = list1.find(obj => {
      return obj.id ==='1';
    });
    let day2 = list1.find(obj => {
      return obj.id ==='2';
    });
    let day3 = list1.find(obj => {
      return obj.id ==='3';
    });
    let day4 = list1.find(obj => {
      return obj.id ==='4';
    });
    let day5 = list1.find(obj => {
      return obj.id ==='5';
    });
    let day6 = list1.find(obj => {
      return obj.id ==='6';
    });
    let day7 = list1.find(obj => {
      return obj.id ==='7';
    });
    let day8 = list1.find(obj => {
      return obj.id ==='8';
    });
    let day9 = list1.find(obj => {
      return obj.id ==='9';
    });
    let day10 = list1.find(obj => {
      return obj.id ==='10';
    });


    setUsers(prev => ({
      ...users, user1: {
        ...users.user1, available: {
          ...users.user1.available, 
          day1: day1.buttonState,
          day2: day2.buttonState,
          day3: day3.buttonState,
          day4: day4.buttonState,
          day5: day5.buttonState,
          day6: day6.buttonState,
          day7: day7.buttonState,
          day8: day8.buttonState,
          day9: day9.buttonState,
          day10: day10.buttonState,

        }
      }
      
    }));
  }

  loadData();
}, [load])





//INITIAL AVAILABILITIES LOAD USER 1 where one at a time works

//   useEffect (() => {
//     getDocs(colRef1)
//     .then((snapshot) => {
//       let cloudState = [];
//       snapshot.docs.forEach((doc) => {
//         cloudState.push({ ...doc.data(), id: doc.id})
//       });

//         let day1 = cloudState.find(obj => {
//           return obj.id === '1';          
//         });
    
//         setUsers({
//           ...users, user1: {
//             ...users.user1, available: {
//               ...users.user1.available, day1: day1.buttonState,
//             }
//           }
//         });

//     })
   
//     .catch(err => {
//       console.warn('stateuser1', err.message)
//     })
// }, []);

///////////////////////////////////////////////////////////////////




// useEffect (() => {
//   getDocs(colRef1)
//   .then((snapshot) => {
//     let cloudState = [];
//     snapshot.docs.forEach((doc) => {
//       cloudState.push({ ...doc.data(), id: doc.id})
//     });

//       let day2 = cloudState.find(obj => {
//         return obj.id === '2';          
//       });
  
//       setUsers({
//         ...users, user1: {
//           ...users.user1, available: {
//             ...users.user1.available, day2: day2.buttonState,
//           }
//         }
//       });

//   })
//   .catch(err => {
//     console.warn('stateuser1', err.message)
//   })
// }, []);


//INITIAL AVAIL USER 

//   useEffect (() => {
//     getDocs(colRef1)
//     .then((snapshot) => {
//       let cloudState = []
//       snapshot.docs.forEach((doc) => {
//         cloudState.push({ ...doc.data(), id: doc.id})
//       })
//       setButtonState1(cloudState[0].buttonState);
//       setUsers({
//         ...users, user1: {
//           ...users.user1, available: {
//             ...users.user1.available, day1: cloudState[0].buttonState
//           }
//         }
//       });

//     })
//     .catch(err => {
//       console.warn('state1', err.message)
//     })
// }, []);

// useEffect (() => {
//   getDocs(colRef2)
//   .then((snapshot) => {
//     let cloudState = []
//     snapshot.docs.forEach((doc) => {
//       cloudState.push({ ...doc.data(), id: doc.id})
//     })
//     setButtonState2(cloudState[0].buttonState)
//   })
//   .catch(err => {
//     console.warn('state2', err.message)
//   })
// }, []);

// useEffect (() => {
//   getDocs(colRef3)
//   .then((snapshot) => {
//     let cloudState = []
//     snapshot.docs.forEach((doc) => {
//       cloudState.push({ ...doc.data(), id: doc.id})
//     })
//     setButtonState3(cloudState[0].buttonState)
//   })
//   .catch(err => {
//     console.warn('state3', err.message)
//   })
// }, []);

// useEffect (() => {
//   getDocs(colRef4)
//   .then((snapshot) => {
//     let cloudState = []
//     snapshot.docs.forEach((doc) => {
//       cloudState.push({ ...doc.data(), id: doc.id})
//     })
//     setButtonState4(cloudState[0].buttonState)
//   })
//   .catch(err => {
//     console.warn('state4', err.message)
//   })
// }, []);

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

// useEffect(() => {
//   if (buttonState1 === true) {
//     try {
//     setDoc(docRef1, {
//       buttonState: true
//     })
//     } catch {
//     addDoc(docRef1, {
//       buttonState: true
//     })
//     }
//   }
//   if (buttonState1 === false) {
//     try {
//     setDoc(docRef1, {
//       buttonState: false
//     })
//     } catch {
//       addDoc(docRef1, {
//         buttonState: false
//       })
//     }
//   }
// });

//////////////////////////////////////////
useEffect(() => {
  let x = activeDay;
  if (users.user1.available[`day${x}`] === true) {
    try {
    setDoc(docRef1, {
  buttonState: true
    })
    } catch {
    addDoc(docRef1, {
      buttonState: true
    })
    }
  }
  if (users.user1.available[`day${x}`] === false) {
    try {
    setDoc(docRef1, {
      buttonState: false
    })
    } catch {
      addDoc(docRef1, {
        buttonState: false
      })
    }
  }
});

//////////////////////////////


// useEffect(() => {
//   if (buttonState2 === true) {
//     try {
//     setDoc(docRef2, {
//       buttonState: true
//     })
//     } catch {
//     addDoc(docRef2, {
//       buttonState: true
//     })
//     }
//   }
//   if (buttonState2 === false) {
//     try {
//     setDoc(docRef2, {
//       buttonState: false
//     })
//     } catch {
//       addDoc(docRef2, {
//         buttonState: false
//       })
//     }
//   }
// });


// useEffect(() => {
//   if (buttonState3 === true) {
//     try {
//     setDoc(docRef3, {
//       buttonState: true
//     })
//     } catch {
//     addDoc(docRef3, {
//       buttonState: true
//     })
//     }
//   }
//   if (buttonState3 === false) {
//     try {
//     setDoc(docRef3, {
//       buttonState: false
//     })
//     } catch {
//       addDoc(docRef3, {
//         buttonState: false
//       })
//     }
//   }
// });

// useEffect(() => {
//   if (buttonState4 === true) {
//     try {
//     setDoc(docRef4, {
//       buttonState: true
//     })
//     } catch {
//     addDoc(docRef4, {
//       buttonState: true
//     })
//     }
//   }
//   if (buttonState4 === false) {
//     try {
//     setDoc(docRef4, {
//       buttonState: false
//     })
//     } catch {
//       addDoc(docRef4, {
//         buttonState: false
//       })
//     }
//   }
// });


const handleClick1 = (i) => {
  setActiveDay(i);
  // setButtonState1 (prev => !prev);
  setUsers (prev=>{return{
    ...users, user1: {
      ...users.user1, available: {
        ...users.user1.available, [`day${i}`]: !users.user1.available[`day${i}`]
      }
    }
  }})
};

const handleClick2 = () => {
  // setButtonState2 (prev => !prev);
}

const handleClick3 = () => {
  // setButtonState3 (prev => !prev);
}

const handleClick4 = () => {
  // setButtonState4 (prev => !prev);
}

// console.log('end users.user1.available.day1', users.user1.available.day1);
// console.log('end users.user1.available.day2', users.user1.available.day2);
// console.log('end users.user1.available.day3', users.user1.available.day3);





  return (
    <div>
      <h1>try again</h1>
      {/* <button onClick={ () => {
        handleClick1();    
      }} className={ buttonState1 ? 'buttonAvail' : 'buttonUnavail' } > user 1 avail or unavail </button> 

       <button onClick={ () => {
        handleClick2();    
      }} className={ buttonState2 ? 'buttonAvail' : 'buttonUnavail' } > user 2 avail or unavail </button> 

      <button onClick={ () => {
        handleClick3();    
      }} className={ buttonState3 ? 'buttonAvail' : 'buttonUnavail' } > user 3 avail or unavail </button> 

      <button onClick={ () => {
        handleClick4();    
      }} className={ buttonState4 ? 'buttonAvail' : 'buttonUnavail' } > user 4 avail or unavail </button>  */}

<h2>Select Year</h2>
        <button onClick={()=> setActiveYear(2022)}> 2022 </button>
        <button onClick={()=> setActiveYear(2023)}> 2023 </button>
        <button onClick={()=> setActiveYear(2024)}> 2024 </button>
        <button onClick={()=> setActiveYear(2025)}> 2025 </button>
        <button onClick={()=> setActiveYear(2026)}> 2026 </button>
        <button onClick={()=> setActiveYear(2027)}> 2027 </button>
        <button onClick={()=> setActiveYear(2028)}> 2028 </button>

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
          }} className={ users.user1.available.day1 ? 'buttonAvail' : 'buttonUnavail' } 
          > user 1 day 1 avail or unavail 
          </button>     
        </td>

        <td>    </td>
        <td>    </td>        
        <td>    </td> 
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[1] }</th>
      <th scope="rowDay"> { tableDayName(1) } </th>
        <td>    
          <button onClick={ () => {
              handleClick1(2); 
            }} className={ users.user1.available.day2 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 2 avail or unavail 
            </button>      
        </td>
        <td>    </td>
        <td>    </td>        
        <td>    </td>    
    </tr>
 
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[2] }</th>
      <th scope="rowDay"> { tableDayName(2) } </th>      
      <td>    
          <button onClick={ () => {
              handleClick1(3); 
            }} className={ users.user1.available.day3 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 3 avail or unavail 
            </button>      
        </td>
        <td>    </td>
        <td>    </td>        
        <td>    </td>
    </tr>
    
    <tr>
      <th scope="colDate">  { monthToName() } { tableDayNameArray[3] } </th>
      <th scope="rowDay"> { tableDayName(3) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(4); 
            }} className={ users.user1.available.day4 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 4 avail or unavail 
            </button>      
        </td>
        <td>    </td>
        <td>    </td>        
        <td>    </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[4] } </th>
      <th scope="rowDay"> { tableDayName(4) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(5); 
            }} className={ users.user1.available.day5 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 5 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[5] } </th>
      <th scope="rowDay"> { tableDayName(5) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(6); 
            }} className={ users.user1.available.day6 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 6 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[6] }</th>
      <th scope="rowDay"> { tableDayName(6) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(7); 
            }} className={ users.user1.available.day7 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 7 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[7] }</th>
      <th scope="rowDay"> { tableDayName(7) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(8); 
            }} className={ users.user1.available.day8 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 8 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[8] }</th>
      <th scope="rowDay"> { tableDayName(8) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(9); 
            }} className={ users.user1.available.day9 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 9 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[9] }</th>
      <th scope="rowDay"> { tableDayName(9) } </th>
      <td>    
          <button onClick={ () => {
              handleClick1(10); 
            }} className={ users.user1.available.day10 ? 'buttonAvail' : 'buttonUnavail' } 
            > user 1 day 10 avail or unavail 
            </button>      
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[10] }</th>
      <th scope="rowDay"> { tableDayName(10) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[11] }</th>
      <th scope="rowDay"> { tableDayName(11) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[12] }</th>
      <th scope="rowDay"> { tableDayName(12) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[13] }</th>
      <th scope="rowDay"> { tableDayName(13) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[14] }</th>
      <th scope="rowDay"> { tableDayName(14) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[15] }</th>
      <th scope="rowDay"> { tableDayName(15) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[16] }</th>
      <th scope="rowDay"> { tableDayName(16) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[17] }</th>
      <th scope="rowDay"> { tableDayName(17) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[18] }</th>
      <th scope="rowDay"> { tableDayName(18) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[19] }</th>
      <th scope="rowDay"> { tableDayName(19) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[20] }</th>
      <th scope="rowDay"> { tableDayName(20) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[21] }</th>
      <th scope="rowDay"> { tableDayName(21) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[22] }</th>
      <th scope="rowDay"> { tableDayName(22) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[23] }</th>
      <th scope="rowDay"> { tableDayName(23) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[24] }</th>
      <th scope="rowDay"> { tableDayName(24) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[25] }</th>
      <th scope="rowDay"> { tableDayName(25) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[26] }</th>
      <th scope="rowDay"> { tableDayName(26) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[27] }</th>
      <th scope="rowDay"> { tableDayName(27) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[28] }</th>
      <th scope="rowDay"> { tableDayName(28) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[29] }</th>
      <th scope="rowDay"> { tableDayName(29) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[30] }</th>
      <th scope="rowDay"> { tableDayName(30) } </th>
        <td>      </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    </tbody>
    </table>

    </div>
  );
}