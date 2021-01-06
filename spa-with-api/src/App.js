import React, { useEffect ,useState } from 'react';


function App() {
  const [error, setError] = useState(null);
  const [isLoaded, setIsLoaded] = useState(false);
  const [pages, setPages] = useState([]);
  useEffect(() => {
    fetch("https://qiita.com/api/v2/authenticated_user/items?page=1&per_page=20",{
      headers: {'Authorization': 'Bearer: (2e984cc96dc0efc4ecb90a08ed5cdde2e370fee1)'}
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
            {item.type} {item.message}
          </li>
        ))}
      </ul>
    );
  }
}

export default App;
