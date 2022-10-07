import React from 'react';
import {TopBar} from "./components/TopBar";
import {TextValidationPage} from "./components/TextValidationPage";

function App() {
    return (
        <div className="container mx-auto p-4 flex justify-center">
            <TopBar/>
            <TextValidationPage/>
        </div>
    );
}

export default App;
