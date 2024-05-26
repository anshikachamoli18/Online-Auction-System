import React from 'react'

export default function Alert(props) {
    const capatilize=(word)=>
    {
        if(word==='danger')
        {
            return "Error";
        }
        const lower=word.toLowerCase();
        return lower.charAt(0).toUpperCase()+lower.slice(1);
    }

  return (
    props.alert &&<div>
      <div className="alert alert-warning alert-dismissible fade show" role="alert" style={{marginTop:"100px",width:"500px",marginLeft:"500px"}}>
      <strong>{capatilize(props.alert.type)}: {props.alert.msg}</strong>
      <button type="button" className="btn-close" data-bs-dismiss="alert" aria-label="Close"></button>
    </div>
    </div>
  )
}