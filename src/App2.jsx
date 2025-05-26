import Header from './components/Header.jsx'
import Session from './components/Session.jsx'
import { useContext } from 'react';
import DataContext from './components/Context/dataContext.jsx';
const App2=()=>{
  const [data]=useContext(DataContext);
   return( <>
     <Header/>
     <Session arr={data}/>
    </>);
}
export default App2;