import React from "react";
import { useView } from "../components/ViewContext";
import MobilePreview from "../components/MobilePreview";
import ProfileDetails from "../components/ProfileDetails";
import LinkForm from "../components/LinkForm";
import { platformLinks } from "../components/shared/InputField";
import { UserProfileProvider } from "../components/Auth/UserProfileContext";

const Home = () => {
  const { activeView } = useView();
  return (
    <main className="container mx-auto mt-8 flex flex-col md:flex-row gap-4 mb-10">
      <UserProfileProvider>
        <MobilePreview links={platformLinks} />
        {activeView === "links" ? <LinkForm /> : <ProfileDetails />}
      </UserProfileProvider>
    </main>
  );
};

export default Home;
