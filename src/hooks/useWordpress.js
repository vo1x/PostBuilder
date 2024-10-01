const useWordPress = () => {
  const createDraft = async (title, content, imageUrl, imageFileName) => {
    const url = `http://localhost:5000/createDraft`;
    try {
      const response = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          title,
          content,
          imageFileName,
          imageUrl
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`HTTP error! status: ${response.status}, body: ${errorBody}`);
      }

      const newDraft = await response.json();
      console.log('Draft was successfully created!', newDraft);
    } catch (error) {
      console.error('Error creating draft:', error);
    }
  };

  return { createDraft };
};

export default useWordPress;
