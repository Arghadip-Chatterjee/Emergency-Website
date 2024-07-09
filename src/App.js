// import React from 'react';
// import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
// import MainPage from './Mainpage';
// import Login from './login';
// import BookNow from './BookNow';
// import ThankYouPage from './thanks';
// import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";


// const App = () => {
//   return (
//     <>
//       <header>
//         <SignedOut>
//           <SignInButton />
//         </SignedOut>
//         <SignedIn>
//           <UserButton />
//         </SignedIn>
//       </header>
//       <Router>
//         <div className="App">
//           <Routes>
//             <Route exact path="/main-page" element={<MainPage />} />
//             <Route exact path="/" element={<Login />} />
//             <Route exact path="/book-now" element={<BookNow />} />
//             <Route exact path="/thanks" element={<ThankYouPage />} />
//           </Routes>
//         </div>
//       </Router>
//     </>

//   );
// };

// export default App;

import { SignedIn, SignedOut, SignInButton, UserButton } from "@clerk/clerk-react";

export default function App() {
  return (
    <header>
      <SignedOut>
        <SignInButton />
      </SignedOut>
      <SignedIn>
        <UserButton />
      </SignedIn>
    </header>
  )
}
