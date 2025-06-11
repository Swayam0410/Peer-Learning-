import "./Article.css"
import { useLocation } from "react-router-dom";
const Article=()=>{
    const location = useLocation();
  const { entry } = location.state || {};
      return (<div className="whole1">
        <div className="Top_Section">
            <h1>{entry.topic}</h1>
          <div className="inf">
              <p>Contributed by:{entry.name}</p>
            <p>Id:{entry.college_id}</p>
            <p>Subject:{entry.subject}</p>
          </div>
        </div>
          <div className="content">
            <h2>{entry.description}</h2>
          </div>
      </div>);
}
export default Article;