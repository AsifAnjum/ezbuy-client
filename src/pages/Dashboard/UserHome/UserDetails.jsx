import { dateString, timeAgo } from "../../../lib/helperFunction";

const UserDetails = ({ user }) => {
  const {
    fullName,
    gender,
    email,
    lastLogin,
    status,
    createdAt,
    updatedAt,
    passwordChangedAt,
    role,
  } = user;
  return (
    <div className="w-full max-w-4xl mx-auto overflow-hidden bg-white rounded-lg shadow-lg">
      {/* Header */}
      <div className="px-6 py-4 text-white bg-gray-800">
        <h2 className="text-xl font-semibold">User Profile</h2>
      </div>

      {/* Profile Details */}
      <div className="grid grid-cols-1 gap-6 p-6 md:grid-cols-2">
        {/* Full Name */}
        <div>
          <label className="block font-semibold text-gray-700">Full Name</label>
          <p className="">{fullName}</p>
        </div>

        {/* Email */}
        <div>
          <label className="block font-semibold text-gray-700">Email</label>
          <p className="">{email}</p>
        </div>

        {/* Gender */}
        <div>
          <label className="block font-semibold text-gray-700">Gender</label>
          <p className="">{gender}</p>
        </div>

        {/* Status */}
        <div>
          <label className="block font-semibold text-gray-700">Status</label>
          <p
            className={`${
              status === "active" ? "text-green-500" : "text-slate-400"
            }`}
          >
            {status}
          </p>
        </div>

        <div>
          <label className="block font-semibold text-gray-700">Role</label>
          <p className="uppercase">{role || "User"}</p>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Last Login
          </label>
          <p>{lastLogin ? timeAgo(lastLogin) : "N/A"}</p>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Password Changed
          </label>
          <p>{passwordChangedAt ? dateString(passwordChangedAt) : "N/A"}</p>
        </div>

        {/* Account Created */}
        <div>
          <label className="block font-semibold text-gray-700">
            Member Since
          </label>
          <p className="">{dateString(createdAt)}</p>
        </div>
        <div>
          <label className="block font-semibold text-gray-700">
            Last Profile Update
          </label>
          <p className="">{dateString(updatedAt)}</p>
        </div>
      </div>
    </div>
  );
};
export default UserDetails;
