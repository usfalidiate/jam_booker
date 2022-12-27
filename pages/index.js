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

  const [users, setUsers] = useState({
    user1: {
        day1: null,
        day2: null,
        day3: null,
      
    },

    user2: {
        day1: null,
        day2: null,
        day3: null,
      
    },

    user3: {
        day1: null,
        day2: null,
        day3: null,
      
    },

    user4: {
        day1: null,
        day2: null,
        day3: null,
      
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
              
            },
        
            user2: {
                day1: cloudState.user2[0].day1,
                day2: cloudState.user2[1].day2,
                day3: cloudState.user2[2].day3,
              
            },
        
            user3: {
                day1: cloudState.user3[0].day1,
                day2: cloudState.user3[1].day2,
                day3: cloudState.user3[2].day3,
              
            },
        
            user4: {
                day1: cloudState.user4[0].day1,
                day2: cloudState.user4[1].day2,
                day3: cloudState.user4[2].day3,
              
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

//////////    NEED TO MAKE THIS ONLY HAPPEN WHEN SOMETHING IS CLICKED??    /////
useEffect(() => {
  let x = activeDay.toString();
  if (users.user1[`day${x}`] === true) {
    try {
    updateDoc(docRef, {
      user1:[ 
        {day1: users.user1.day1},
        {day2: users.user1.day2}, 
        {day3: users.user1.day3} 
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
        {day3: users.user1.day3} 
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
        {day3: users.user2.day3} 
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
        {day3: users.user2.day3} 
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
        {day3: users.user3.day3} 
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
        {day3: users.user3.day3} 
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
        {day3: users.user4.day3} 
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
        {day3: users.user4.day3} 
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
    
        </td>
        <td>    </td>
        <td>    </td>        
        <td>    </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[4] } </th>
      <th scope="rowDay"> { tableDayName(4) } </th>
      <td>    
    
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>
    
    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[5] } </th>
      <th scope="rowDay"> { tableDayName(5) } </th>
      <td>    
     
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[6] }</th>
      <th scope="rowDay"> { tableDayName(6) } </th>
      <td>    
     
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[7] }</th>
      <th scope="rowDay"> { tableDayName(7) } </th>
      <td>    
     
        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[8] }</th>
      <th scope="rowDay"> { tableDayName(8) } </th>
      <td>    

        </td>
        <td>      </td>
        <td>      </td>       
        <td>      </td>
    </tr>

    <tr>
      <th scope="colDate"> { monthToName() } { tableDayNameArray[9] }</th>
      <th scope="rowDay"> { tableDayName(9) } </th>
      <td>    
      
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

