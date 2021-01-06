import React, { useEffect ,useState } from 'react';
import styled from 'styled-components'
import { Link } from 'react-router-dom'

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
          console.log(result);
        },
        
        (error) => {
          setIsLoaded(true);
          setError(error);
        }
      )
  }, [])

  const {match} = props;

  if (error) {
    return <div>Error: {error.message}</div>;
  } else if (!isLoaded) {
    return <div>Loading...</div>;
  } else {
    return (
      <Ul>
        {pages.map(item => (
          <Link to='/Page'>
            <Li key={item.id}>
                <Title>{item.title}</Title>
                <br />
                <Body>{item.body}</Body>
                <br />
            </Li>
          </Link>
        ))}
      </Ul>
    );
  }
  
}

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
