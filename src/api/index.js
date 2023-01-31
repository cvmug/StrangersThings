export const BASE_URL = 'https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT';

export const fetchUser = (token, setUser, setError) => {
    if (token) {
      fetch('https://strangers-things.herokuapp.com/api/2209-FTB-MT-WEB-PT/users/me', {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((result) => {
          const user = result.data;
          setUser(user);
        })
        .catch((error) => setError(error));
    }
  };