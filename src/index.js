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
            let firstNum = '';
            let secondNum = '';
            for ( let prop in divisions) {           
                count = prop.length-1;
                districtString = prop;
                console.log(districtString);
                firstNum = districtString[count];
                console.log("should be district number",firstNum);
                if (!isNaN(firstNum)) {
                    let secondToLast = prop.length-2;
                    let twoDigitDistrictNum = districtString[secondToLast];
                    if (!isNaN(twoDigitDistrictNum)) {
                        secondNum = twoDigitDistrictNum;
                    }
                    break;
                } 
            }
            if (isNaN(firstNum)) {
                throw error;
            }
            if (firstNum) {
                newNum = firstNum;
            }
            if (secondNum) {
                newNum = secondNum + firstNum;
            }
            let districtName = state + '_' + newNum;
            setCd(districtName);
            if (info) {
                setSuccess(true);
            }
        } catch (error) {
            alert('Please provide a valid five digit zipcode in the United States.')
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
            <h3>Congressional District:</h3>
            <p>{success ? cd : null}</p>
        </div>
    );
}

ReactDOM.render(
    <App />,
    document.getElementById('root')
);