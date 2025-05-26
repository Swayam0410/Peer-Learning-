import "./SessionCard.css"

let SessionCard=({topic,sem,name,subject,onClick})=>{
   return (<div className="outer" onClick={onClick}>
           <h2 className="topic">Topic:{topic}</h2>
           <h3>Semester:{sem}</h3>
           <h3>Subject:{subject}</h3>
           <h3>Contributed by:{name}</h3>
   </div>);
}

export default SessionCard;