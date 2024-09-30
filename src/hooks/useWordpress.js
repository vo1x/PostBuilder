const baseUrl = 'https://uhdmovies.mov/wp-json/wp/v2';
const username = 'volx';
const appPassword = '72vVTAAiPVAGrg462DcEtMQW';

const useWordPress = () => {
  const fetchPosts = async () => {
    const url = `${baseUrl}/posts`; // endpoint to fetch all posts
    try {
      // WIP
    } catch (error) {}
  };

  const createDraft = async (title, content) => {
    const url = `${baseUrl}/posts`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          Authorization: 'Basic ' + btoa(`${username}:${appPassword}`),
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          status: 'draft'
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const newDraft = await response.json();
      console.log('Draft was successfully created!');
    } catch (error) {
      console.error('Error creating draft:', error);
    }
  };

  return { createDraft };
};

export default useWordPress;
