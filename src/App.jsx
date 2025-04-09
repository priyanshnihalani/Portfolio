import { useRef } from 'react'
import './App.css'
import Footer from './Footer'
import Header from './Header'
import Home from './Home'

function App() {
  const contactRef = useRef(null);

  const scrollToContact = () => {
    contactRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(contactRef.current?.scrollIntoView({ behavior: "smooth" }))
  };

  return (
    <>
      {/* Header stays on top */}
      <div className='pattern border-l-2'>
        <Header onHireMe={scrollToContact} />
        <div className='lexend-normal border-t-2 border-b-2 w-full min-h-screen'>
          <Home contactRef={contactRef} />
        </div>
        <Footer />
      </div>
    </>
  )
}

export default App
