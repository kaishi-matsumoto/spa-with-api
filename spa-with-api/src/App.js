import React, { useEffect ,useState } from 'react';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState([]);

  useEffect(() => {
    fetch("https://qiita.com/api/v2/items?page=1&per_page=20",{
      method: 'GET',
        credentials: 'include',
        headers: {
          'Authorization': 'Bearer: ed2180a8c46857854bc6934b13afb55bb2e604fb',
          'Content-Type': 'application/json',
          'Access-Control-Allow-Origin': 'http://localhost:3000',
          'Request.credentials': 'omit'
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
  } else {
    return (
      <ul>
        {pages.map(item => (
          <li key={item.id}>
            {item.body}
          </li>
        ))}
      </ul>
    );
  }
  
}

export default App;
