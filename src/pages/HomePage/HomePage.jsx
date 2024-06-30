import React, { useState } from "react";
import "./HomePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import Activities from "../../components/Activities/Activities";
import CompanyName from "../../components/CompanyName/CompanyName";

function HomePage() {
  const { loading } = useAuth(); // loading durumunu alın
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <div>Loading...</div>; // Veriler yüklenirken gösterilecek içerik
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <main className="homepage-main">
      <Navigation />
      <div className="homepage-column">
        <CompanyName onSearch={handleSearch} />
        <Activities searchTerm={searchTerm} />
      </div>
    </main>
  );
}

export default HomePage;
