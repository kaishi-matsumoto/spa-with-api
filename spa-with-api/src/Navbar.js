import React, { useEffect ,useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'
import App from './App';
import Pages from './Pages';
import { BrowserRouter as Route } from 'react-router-dom';

function Navbar(props) {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("https://qiita.com/api/v2/items?page=1&per_page=20",{
      method: 'GET',
        headers: {
          'Authorization': 'Bearer ed2180a8c46857854bc6934b13afb55bb2e604fb',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
        },
        mode: 'cors',
      
    })
      .then(res => res.json())
      .then(
        (result) => {
          setIsLoaded(true);
          setPages(result);
          console.log(result.title);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])



  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Ul>
        {/* <PageItems pages={pages} title={pages.title}/> */}
        {pages.map(item => (
           <Li key={item.id}>
           <Link to={`/pages/$(item.id)`}>
               <Title>{item.title}</Title>
               <br />
               <Body>{item.body}</Body>
               <br />
           </Link>
           <Route path="/pages/:id" component={Pages} />
         <Route exact path="/" component={App} />
       </Li>
    ))}
      </Ul>
    );
  }
  
}

/* const PageItems = (props) =>{
   
    return <div>
        {props.pages.map(item => (
            <MatchId item={item}  />
    ))}
</div>
}

const MatchId =({match}) =>{
    return <div>
        
    <Li key={this.props.match.params.item.id}>
        <Link to={`/pages/$(item.id)`}>
            <Title>{this.props.match.item.title}</Title>
            <br />
            <Body>{this.props.match.item.body}</Body>
            <br />
        </Link>
    </Li>
    <Route path="/pages/:id" component={Pages} id={match.params.id} title={match.params.title} body={match.params.body}/>
    <Route exact path="/" component={App} id={match.params.id} title={match.params.title} body={match.params.body}/>
</div>
} */

const Ul = styled.ul`
    width:200px; 
`

const Li = styled.li`
  list-style: none;
  width:200px; 
`

const Title = styled.div`
  font-weight: bold;
  word-wrap: break-word;
  width:200px; 
  margin:5px;
`

const Body = styled.div`
  width:200px; height:100px;
  margin:5px; padding:10px; 
  border:1px solid black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`


export default Navbar;
