import { useState } from 'react'
import { VideoButton } from './views/home/home';


function App() {
  const [currentView, setCurrentView] = useState('/');
  
  const handleNavigate = (url) => {
    console.log(url);
    setCurrentView(url);
  };

  return (
    <>
     
      {currentView === '/' && <VideoButton currentView={currentView} changeViewFromChild={handleNavigate}/>}  
      {/* {currentView === 'Gallery' && <HeroContent currentView={currentView}/>}  */}
      {/* {currentView === 'Contact' && <HeroContent currentView={currentView} changeViewFromChild={setCurrentView}/>} */}
    </>
  )
}

export default App
