import axios from "axios";
import { useEffect } from "react";

function ComponentTest() {
  const fetchData = async () => {
    try {
      let response = await axios("/home");
      if (response.status) {
        alert("hooray");
      } else {
        alert("OH ! Snap....");
      }
    } catch (err) {
      console.log("err ", err.message);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="App">
      <p > Testing Deployment </p>
    </div>
  );
}

export default ComponentTest;