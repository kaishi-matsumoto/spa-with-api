import React, { useEffect ,useState } from 'react';
import styled from 'styled-components'
import {
    BrowserRouter as Router,
   /*  Switch, */
    Route,
    Link,
/*     useRouteMatch, */
/*   useParams */
  } from 'react-router-dom';

function App() {
  
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("https://qiita.com/api/v2/items?page=1&per_page=20",{
      method: 'GET',
        headers: {
          'Authorization': 'Bearer 3c5a0b50a1ae7eba9894433624b389da530e0429',
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
  } else if(pages !== []){
  
    return (
      
        <Router>
          <Root>
            <Sidebar>
                {pages.map(item => (
                  <Li key={item.id}>          
                    <Link to={'/pages/' + item.id}>
                    {/* <Link to={`/page/${pages.id}`}> */}
                        <Title>{item.title}</Title>
                        <br />
                        <Body>{item.body}</Body>
                        <br />
                    </Link>
                  </Li>
                    ))}
              </Sidebar>

               {/*  <Switch> */}
                      <Main>
                        <h1>Pages</h1>
                        {pages && (
                          <Route path="/pages/:pageId" render={({match})=>(
                            <Pages pages = {pages.find(p => p.id === match.params.pageId)}/>
                          )}/>
                        )}
                        
                      </Main>                    
                      
              {/*   </Switch> */}
            </Root>
        </Router>
      
    );
  } else {
    return <div>nothing</div>
  }
}

const Pages =({　pages　})=>{
  console.log(pages)
  return <React.Fragment>
           <Title1>{pages.title}</Title1>
          <Body1>{pages.body}</Body1>
          </React.Fragment>
}

const Root =styled.div`
  display: flex;
`
const Main = styled.div`
  flex: 1;
  height: 100vh;
  overflow; auto;
`

const Sidebar = styled.ul`
    width: 33vw;
    height: 100vh;
    overflow: auto;
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

const Title1 = styled.div`
  
  font-weight: bold;
  word-wrap: break-word;
  width:200px; 
  margin:5px;
`

const Body1 = styled.div`
  
  width:200px; height:100px;
  margin:5px; padding:10px; 
  border:1px solid black;
  text-overflow: ellipsis;
  overflow: hidden;
  white-space: nowrap;
`


export default App;
