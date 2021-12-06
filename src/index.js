import React, { useEffect, useState} from 'react';
import ReactDOM from 'react-dom';
import {getCongressionalDistrictInformation} from './api';


const App = () => {

    const [zipCode, setZipCode] = useState('');
    const [success, setSuccess] = useState(false);
    const [cd, setCd] = useState('');
    
    async function fetchGeneralInformation () {
        event.preventDefault();
        if ( !zipCode) {
            alert("Please enter a number for your zipcode.")
        }
        try {
            const info = await getCongressionalDistrictInformation(zipCode);
            const state = info.normalizedInput.state;
            console.log(state);
            const divisions = info.divisions;
            let count = 0;
            let districtString = '';
            let newNum = '';
            for ( let prop in divisions) {           
                count = prop.length-1;
                districtString = prop;
                console.log(districtString);
                newNum = districtString[count];
                console.log("should be district number",newNum);
                if (!isNaN(newNum)) {
                    break;
                } 
            }
            let num = districtString.length - 1;
            let districtNum = districtString[num];
            let districtName = state + '_' + districtNum;
            setCd(districtName);
            if (info) {
                setSuccess(true);
            }
        } catch (error) {
            console.error(error);
        }
    }

    return (
        <div id="App">
            <h3>Enter your zipcode to find your congressional district</h3>            
            <form onSubmit={fetchGeneralInformation}>
                <label>Zipcode: </label>
                <br/>
                <input
                    value={zipCode}
                    placeholder="Enter your zipcode here."
                    onChange={(event) => {
                        setZipCode(event.target.value);
                    }}>
                </input>
                <button type='submit'>Submit</button>
            </form>
            <p>{success ? cd : null}</p>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);