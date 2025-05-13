export const sendQuestion = async (questionText: string) => {
  const headers = {
    "Content-Type": "application/json",
  };

  const payload = {
    text: questionText,
  };

  let result;

  try {
    result = await fetch("http://localhost:3333/speech", {
      method: "POST",
      body: JSON.stringify(payload),
      headers,
    });
  } catch (error) {
    console.error(error);
    throw new Error("Network error");
  }

  if (!result.ok) {
    throw new Error("Error when sending question");
  }

  return await result.json();
};
