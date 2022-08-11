import React from 'react'
import {Route,Link} from 'react-router-dom'
// import jquery from 'jquery'

const digiCall = ()=>{
    console.log('success')
    // Window.location.href = 'https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://localhost:8000/callback&state=hello'
//     return(
//         <>
//         <Route
//             path="/privacy-policy"
//             loc="https://meetflo.zendesk.com/hc/en-us/articles/230425728-Privacy-Policies"
//   />
//         </>
//     )
    
}


export const StuDoc  = ()=>{
    return (
        <>
        {/* <button type="submit" onClick={digiCall}>Authorize</button>    */}
        <a href="https://api.digitallocker.gov.in/public/oauth2/1/authorize?response_type=code&client_id=2407FC9F&redirect_uri=http://localhost:8000/callback&state=hello">Authorize</a>
        </>
    )
}

export default StuDoc

// http://localhost:8000/callback?code=ff6cd60f5b684ed18689a09fbade73947dcd0d42&state=hello 