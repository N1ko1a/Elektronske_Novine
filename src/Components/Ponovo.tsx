import { useEffect, useState } from "react";

type ArticalType = {
  _id: number;
  title: string;
  description: string;
  image: string;
  date: string;
};
function Ponovo() {
  const [artical, setArtical] = useState<ArticalType[]>([]);

  const [isLoading, setIsLoading] = useState(true);
  useEffect(() => {
    setIsLoading(true);
    const apiURL = `https://newsapi.org/v2/top-headlines?country=us&category=business&apiKey=a4def157fa5f42c5b5f7cdf28ca49e30`;

    fetch(apiURL)
      .then((res) => res.json())
      .then((data) => {
        const articalResults = data || []; // default to an empty array if results is undefine
        console.log(articalResults.articles);
        setArtical(articalResults);
        setIsLoading(false);
      })
      .catch((error) => {
        console.log("Error: Ne mogu da uzmem podatke", error);
        setIsLoading(false);
      });
  }, []);

  return <div>test</div>;
}

export default Ponovo;
