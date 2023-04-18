import React from "react";
import Header from "./Header";
import ChatBot from "./ChatBot";

const App = () => {
  return (
    <div className="App">
      <Header containerClass="justify-content-center" dark={true}>
        ChatBot Without AI
      </Header>
      <ChatBot />
    </div>
  )
}

export default App;