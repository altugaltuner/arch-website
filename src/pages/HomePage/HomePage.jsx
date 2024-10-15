import React, { useState } from "react";
import "./HomePage.scss";
import { useAuth } from "../../components/AuthProvider";
import Navigation from "../../components/Navigation/Navigation";
import Activities from "../../components/Activities/Activities";
import CompanyName from "../../components/CompanyName/CompanyName";

function HomePage() {
  const [isLoading, setIsLoading] = useState(false);
  const { loading } = useAuth();
  const [searchTerm, setSearchTerm] = useState("");

  if (loading) {
    return <div>Yükleniyor...</div>;
  }

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    (isLoading && <div>Yükleniyor...</div>) ||
    <main className="homepage-main">
      <Navigation />
      <div className="homepage-column">
        <CompanyName setIsLoading={setIsLoading} onSearch={handleSearch} />
        <Activities searchTerm={searchTerm} />
        <div className="last-surveys">Son Anketler
        </div>
      </div>
    </main>
  );
}

export default HomePage;
