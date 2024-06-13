import React from "react";
import "./HomePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import Activities from "../../components/Activities/Activities";
import CompanyName from "../../components/CompanyName/CompanyName";

function HomePage() {

  const auth = useAuth(); // auth'u const {fireStoreUser} = useAuth() şeklinde alırsanız user bilgilerine ulaşabilirsiniz

  return (
    <main className="homepage-main">
      <Navigation />
      <CompanyName />
      <Activities />
    </main>
  );
}

export default HomePage;
