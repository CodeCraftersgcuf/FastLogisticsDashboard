import React from "react";
import images from "../../constants/images";

interface ProfileProps {
  name?: string;
  img?: string;
}

const Profile: React.FC<ProfileProps> = ({ name = "Admin", img = images.admin }) => {
  return (
    <div className="flex items-center gap-4 ">
      <img src={img} alt="profile" className="w-14 h-14 rounded-full" />
      <div>
        <h4 className="text-lg ">Hey, {name}</h4>
      </div>
    </div>
  );
};

export default Profile;
