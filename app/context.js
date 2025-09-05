import { useContext ,createContext,useState} from "react";


const AppContext= createContext()

const AppProvider=({children})=>{

  const [isDark, setIsDark] = useState(false);
  const textColor=!isDark?'black':'white'
  const secondBackground=!isDark?'white':'hsl(0, 0%, 0%)'
  const mainBackground=!isDark?'#E6E6E6':'hsl(0, 0%, 11%)'
  const btnColor='#007AFF'

 return(
  <AppContext.Provider
  value={{
   textColor,
   secondBackground,
   mainBackground,
   btnColor,
   isDark,
   setIsDark
  }}
  >
    {children}
  </AppContext.Provider>
 )
}


export const useGlobal=()=>{
 return useContext(AppContext)
}

export default AppProvider