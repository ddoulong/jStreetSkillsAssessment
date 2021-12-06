const URL = 'https://www.googleapis.com/civicinfo/v2/representatives';
const URL_KEY = URL+'?key=AIzaSyAlAkPH_bGbIJMNFsRwHFPkYQYDb-1D0qU';

export async function getCongressionalDistrictInformation (zipcode) {
    try {
        const data = await fetch(`${URL_KEY}&address=${zipcode}`, {
            method:'GET',
            headers: {
                'Content-Type': 'application/json'
        }})
        const response = await data.json();
        console.log(response);
        return response;
    } catch (err) {
        console.error(err);
        throw err;
    }
};
