import React from "react";
import "./HomePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import Activities from "../../components/Activities/Activities";
import CompanyName from "../../components/CompanyName/CompanyName";

function HomePage() {
  const { loading } = useAuth(); // loading durumunu alın

  if (loading) {
    return <div>Loading...</div>; // Veriler yüklenirken gösterilecek içerik
  }

  return (
    <main className="homepage-main">
      <Navigation />
      <div className="homepage-column">
        <CompanyName />
        <Activities />
      </div>
    </main>
  );
}

export default HomePage;
