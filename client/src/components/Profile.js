import React from "react";
import AuthService from "../services/auth.service";

const Profile = () => {
  const currentUser = AuthService.getCurrentUser();

  // Example mapping of roles to descriptions
  const roleDescriptions = {
    ROLE_USER: "Regular user with limited access.",
    ROLE_ADMIN: "Administrator with full access.",
    ROLE_MODERATOR: "Moderator with some access.",
    // Add other roles and their descriptions here
  };

  return (
    <div className="container py-5">
      <div className="row justify-content-center">
        <div className="col-lg-8">
          <div className="card shadow-lg">
            <div className="card-header bg-primary text-white">
              <h4 className="mb-0">User Profile</h4>
            </div>
            <div className="card-body">
              <div className="text-center mb-4">
                <img src="https://png.pngtree.com/png-clipart/20210915/ourlarge/pngtree-avatar-icon-abstract-user-login-icon-png-image_3917181.jpg" className="rounded-circle img-fluid" alt="User Avatar" style={{ width: "100px", height: "100px" }} />
                <h5 className="mt-3">{currentUser.username}</h5>
                <p>{currentUser.email}</p>
              </div>
              <div className="mb-4 text-center">
                <h5>Authorities</h5>
                {currentUser.roles.map((role, index) => (
                  <span key={index} className="badge bg-secondary me-2 text-white">
                    {role}: {roleDescriptions[role] || "No description available."}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;